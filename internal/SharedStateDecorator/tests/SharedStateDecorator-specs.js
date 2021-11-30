import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Component as ReactComponent} from 'react';

import SharedStateDecorator, {SharedState} from '../SharedStateDecorator';

describe('SharedStateDecorator Specs', () => {
	test('should provide a set method via context', () => {
		const fn = jest.fn();
		const ComponentSet = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					fn(value.set);

					return null;
				}}
			</SharedState.Consumer>
		));

		render(<ComponentSet />);

		const expected = 'function';
		const actual = typeof fn.mock.calls[0][0];

		expect(actual).toBe(expected);
	});

	test('should provide a get method via context', () => {
		const fn = jest.fn();
		const ComponentGet = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					fn(value.get);

					return null;
				}}
			</SharedState.Consumer>
		));

		render(<ComponentGet />);

		const expected = 'function';
		const actual = typeof fn.mock.calls[0][0];

		expect(actual).toBe(expected);
	});

	test('should provide a delete method via context', () => {
		const fn = jest.fn();
		const ComponentDelete = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					fn(value.delete);

					return null;
				}}
			</SharedState.Consumer>
		));

		render(<ComponentDelete />);

		const expected = 'function';
		const actual = typeof fn.mock.calls[0][0];

		expect(actual).toBe(expected);
	});

	test('should supporting setting and getting a value by key when {id} is set', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id="outer" />);

		const actual = screen.getByText('value');

		expect(actual).toBeInTheDocument();
	});

	test('should supporting setting and getting a value by key when {id} is set to a non-zero value', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id={-1} />);

		const actual = screen.getByText('value');

		expect(actual).toBeInTheDocument();
	});

	test('should supporting setting and getting a value by key when {id} is set to zero', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id={0} />);

		const actual = screen.getByText('value');

		expect(actual).toBeInTheDocument();
	});

	test('should not set or return values when {id} is not set', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component />);

		const actual = screen.queryByText('value');

		expect(actual).toBeNull();
	});

	test('should not set or return values when {id} is set to an empty string', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id="" />);

		const actual = screen.queryByText('value');

		expect(actual).toBeNull();
	});

	test('should not set or return values when {id} is set to null', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id={null} />);

		const actual = screen.queryByText('value');

		expect(actual).toBeNull();
	});

	test('should not set or return values when {id} and {noSharedState} are set', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id="outer" noSharedState />);

		const actual = screen.queryByText('value');

		expect(actual).toBeNull();
	});

	test('should supporting deleting a value by key when {id} is set', () => {
		const Component = SharedStateDecorator(() => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');
					value.delete('key');

					return value.get('key');
				}}
			</SharedState.Consumer>
		));

		render(<Component id="outer" />);

		const actual = screen.queryByText('value');

		expect(actual).toBeNull();
	});

	test('should share data upstream when inside another SharedStateDecorator', () => {
		const Component = SharedStateDecorator(({children, ...rest}) => (
			<SharedState.Consumer>
				{value => {
					value.set('key', 'value');

					return (
						<div {...rest}>
							<span>{value.get('key')}</span>
							{children}
						</div>
					);
				}}
			</SharedState.Consumer>
		));

		render(
			<Component id="outer">
				<Component id="inner" />
			</Component>
		);

		const expected = '<div id="outer"><span>value</span><div id="inner"><span>value</span></div></div>';
		const actual = screen.getAllByText('value')[0].parentElement.parentElement.innerHTML;

		expect(actual).toEqual(expected);
	});

	test('should restore shared state from ancestor', () => {
		class Base extends ReactComponent {
			static contextType = SharedState;

			render () {
				const {children, value: propValue, ...rest} = this.props;

				if (propValue) {
					this.context.set('key', propValue);
				}

				return (
					<div {...rest}>
						<span>{this.context.get('key')}</span>
						{children}
					</div>
				);
			}
		}
		const Component = SharedStateDecorator({updateOnMount: true}, Base);

		const {rerender} = render(
			<Component id="outer" value="value">
				<Component id="inner" value="from-prop" />
			</Component>
		);

		// remove the children which drops inner's shared state
		rerender(
			<Component id="outer" value="value" />
		);

		// recreate it with the same id but no initial value to validate the previous state is
		// restored. updateOnMount is used above to coerce a re-render on mount since the shared
		// state value is used in the render method and isn't available on first render otherwise.
		rerender(
			<Component id="outer" value="value">
				<Component id="inner" />
			</Component>
		);

		const actual = screen.getByText('from-prop');

		expect(actual).toBeInTheDocument();
	});
});
