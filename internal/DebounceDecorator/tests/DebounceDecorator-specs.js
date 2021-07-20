import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {mount} from 'enzyme';
import DebounceDecorator from '../';

describe('DebounceDecorator', () => {
	test(
		'should emit the event after the delay',
		(done) => {
			const spy = jest.fn();

			const Component = DebounceDecorator(
				{debounce: 'onClick', delay: 100},
				function Base () {
					return <div />;
				}
			);

			render(<div onClick={spy} data-testid="component"><Component onClick={spy} data-testid="component" /></div>);
			screen.debug();

			fireEvent.click(screen.getByTestId("component").children.item(0));

			expect(spy).not.toHaveBeenCalled();

			setTimeout(() => {
				expect(spy).toHaveBeenCalled();
				done();
			}, 200);
		}
	);

	// test(
	// 	'should restart the delay if another event occurs before timeout',
	// 	(done) => {
	// 		const Component = DebounceDecorator(
	// 			{debounce: 'onChange', delay: 100},
	// 			function Base () {
	// 				return <div />;
	// 			}
	// 		);
	//
	// 		const spy = jest.fn();
	// 		const subject = mount(<Component onChange={spy} />);
	//
	// 		setTimeout(() => {
	// 			expect(spy).not.toHaveBeenCalled();
	// 			subject.find('Base').invoke('onChange')();
	// 		}, 50);
	//
	// 		setTimeout(() => {
	// 			expect(spy).not.toHaveBeenCalled();
	// 		}, 125);
	//
	// 		setTimeout(() => {
	// 			expect(spy).toHaveBeenCalled();
	// 			done();
	// 		}, 200);
	// 	}
	// );

	// test(
	// 	'should not emit the event if the cancel event occurs before the delay',
	// 	(done) => {
	// 		const Component = DebounceDecorator(
	// 			{cancel: 'onCancel', debounce: 'onChange', delay: 100},
	// 			function Base () {
	// 				return <div />;
	// 			}
	// 		);
	//
	// 		const spy = jest.fn();
	// 		const subject = mount(<Component onChange={spy} />);
	//
	// 		subject.find('Base').invoke('onChange')();
	// 		subject.find('Base').invoke('onCancel')();
	//
	// 		expect(spy).not.toHaveBeenCalled();
	//
	// 		setTimeout(() => {
	// 			expect(spy).not.toHaveBeenCalled();
	// 			done();
	// 		}, 150);
	// 	}
	// );
	//
	// test(
	// 	'should emit the onCancel event immediately',
	// 	() => {
	// 		const Component = DebounceDecorator(
	// 			{cancel: 'onCancel', debounce: 'onChange', delay: 100},
	// 			function Base () {
	// 				return <div />;
	// 			}
	// 		);
	//
	// 		const spy = jest.fn();
	// 		const subject = mount(<Component onCancel={spy} />);
	//
	// 		subject.find('Base').invoke('onCancel')();
	//
	// 		expect(spy).toHaveBeenCalled();
	// 	}
	// );
});
