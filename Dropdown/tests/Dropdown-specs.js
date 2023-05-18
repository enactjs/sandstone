import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {DropdownBase} from '../Dropdown';
import DropdownList from '../DropdownList';

const FloatingLayerController = FloatingLayerDecorator('div');

const children = ['option1', 'option2', 'option3'];
const placeholder = 'Dropdown select';
const title = 'Options';

describe('Dropdown', () => {
	test('should have default `placeholder` when a value is not provided', () => {
		render(
			<DropdownBase>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText('No Selection');

		expect(actual).toBeInTheDocument();
	});

	test('should have `placeholder` when a value is provided', () => {
		render(
			<DropdownBase placeholder={placeholder}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(placeholder);

		expect(actual).toBeInTheDocument();
	});

	test('should have `title`', () => {
		render(
			<DropdownBase title={title}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(title);
		const titleContainer = actual.parentElement.parentElement;

		expect(actual).toBeInTheDocument();
		expect(titleContainer).toHaveClass('heading');
	});

	test('should apply id to dropdown', () => {
		render(
			<DropdownBase id="drop">
				{children}
			</DropdownBase>
		);

		const expected = 'drop';
		const actual = screen.getByRole('region');

		expect(actual).toHaveAttribute('id', expected);
	});

	test('should apply aria label id to `title`', () => {
		render(
			<DropdownBase title={title} id="drop">
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(title);
		const titleContainer = actual.parentElement.parentElement;

		expect(actual).toBeInTheDocument();
		expect(titleContainer).toHaveAttribute('id', 'drop_title');
	});

	test('should apply aria-labelled-by to dropdown with title', () => {
		render(
			<DropdownBase title={title} id="drop">
				{children}
			</DropdownBase>
		);

		const expected = 'drop_title';
		const actual = screen.getByRole('region');

		expect(actual).toHaveAttribute('aria-labelledby', expected);
	});

	test('should not apply aria-labelled-by when no title exists', () => {
		render(
			<DropdownBase id="drop">
				{children}
			</DropdownBase>
		);

		const actual = screen.getByRole('region');

		expect(actual).not.toHaveAttribute('aria-labelledby');
	});

	test('should have `placeholder` when `children` is invalid', () => {
		render(
			<DropdownBase placeholder={placeholder}>
				{null}
			</DropdownBase>
		);

		const actual = screen.getByText(placeholder);

		expect(actual).toBeInTheDocument();
	});

	test('should have `placeholder` that reflects `selected` option', () => {
		const selectedIndex = 1;
		render(
			<DropdownBase selected={selectedIndex}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(children[selectedIndex]);

		expect(actual).toBeInTheDocument();
	});

	test('should have `placeholder` when `selected` is invalid', () => {
		render(
			<DropdownBase placeholder={placeholder} selected={-1}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(placeholder);

		expect(actual).toBeInTheDocument();
	});

	test('should be disabled when `children` is omitted', () => {
		render(
			<DropdownBase title={title} />
		);

		const expected = 'true';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should be disabled when there are no `children`', () => {
		render(
			<DropdownBase title={title}>
				{[]}
			</DropdownBase>
		);

		const expected = 'true';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should update when children are removed or added', () => {
		const {rerender} = render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{children}
				</DropdownBase>
			</FloatingLayerController>
		);

		const lessChildren = children.slice(0, -1);

		rerender(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{lessChildren}
				</DropdownBase>
			</FloatingLayerController>
		);

		const lessChildrenExpected = 2;
		const lessChildrenActual = screen.getByRole('list').children;

		expect(lessChildrenActual).toHaveLength(lessChildrenExpected);

		const moreChildren = children.concat('option3');

		rerender(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{moreChildren}
				</DropdownBase>
			</FloatingLayerController>
		);

		const moreChildrenExpected = 3;
		const moreChildrenActual = screen.getByRole('list').children;

		expect(moreChildrenActual).toHaveLength(moreChildrenExpected);
	});

	test('should set the `role` of items to "checkbox"', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{['item']}
				</DropdownBase>
			</FloatingLayerController>
		);

		const expected = 'layout item';
		const actual = screen.getByRole('checkbox');

		expect(actual).toBeInTheDocument();
		expect(actual).toHaveClass(expected);
	});

	test('should set the `aria-checked` state of the `selected` item', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open selected={0} title={title}>
					{['item']}
				</DropdownBase>
			</FloatingLayerController>
		);

		const expected = 'true';
		const actual = screen.getByRole('checkbox');

		expect(actual).toHaveAttribute('aria-checked', expected);
	});

	test('should pass through members of child objects to props for each item', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{[{
						disabled: true,
						children: 'child',
						key: 'item-0'
					}]}
				</DropdownBase>
			</FloatingLayerController>
		);

		const expected = 'true';
		const actual = screen.getByRole('checkbox');

		expect(actual).toHaveAttribute('aria-disabled', expected);
	});

	test('should allow members in child object to override injected aria values', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open selected={0} title={title}>
					{[{
						disabled: true,
						children: 'child',
						key: 'item-0',
						role: 'button',
						'aria-checked': false
					}]}
				</DropdownBase>
			</FloatingLayerController>
		);

		const actual = within(screen.getByRole('list')).getByRole('button');

		expect(actual).toHaveAttribute('aria-checked', 'false');
	});

	test('should fire `onSelect` event with type `onSelect`', async () => {
		const handleSelect = jest.fn();
		const user = userEvent.setup();
		render(
			<FloatingLayerController>
				<DropdownBase open onSelect={handleSelect} title={title}>
					{children}
				</DropdownBase>
			</FloatingLayerController>
		);

		const firstItem = screen.getByRole('list').children[0].children[0];

		await user.click(firstItem);

		expect(handleSelect).toHaveBeenCalledWith({data: 'option1', selected: 0, type: 'onSelect'});
	});

	describe('DropdownList', () => {
		test('should include `data` and `selected` in `onSelect` callback', async () => {
			const handler = jest.fn();
			const user = userEvent.setup();
			render(
				<DropdownList onSelect={handler}>
					{children}
				</DropdownList>
			);
			const firstItem = screen.getByRole('list').children[0].children[0];

			await user.click(firstItem);

			const expected = {data: 'option1', selected: 0};
			const actual = handler.mock.calls[0][0];

			expect(actual).toEqual(expected);
		});
	});
});
