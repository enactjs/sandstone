/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {mount} from 'enzyme';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Button from '../../Button';

const ContextualButton = ContextualPopupDecorator(Button);
describe('ContextualPopupDecorator Specs', () => {
	test('should bind callback to instance', () => {
		let called = false;
		// Create a context with a prop on it we can use to detect access to this prop inside the
		// instance method.
		class CallbackInterceptor {
			get containerNode () {
				called = true;
				return null;
			}
		}

		const subject = mount(
			<ContextualButton
				popupComponent={Button}
			>
				Button
			</ContextualButton>
		);

		// Call `positionContextualPopup` setting `this` to our interceptor.  Bound function should
		// ignore the value of `this` we pass in.  If not, it will access `containerNode` above.
		Reflect.apply(subject.instance().positionContextualPopup, new CallbackInterceptor(), []);

		const expected = false;
		const actual = called;

		expect(actual).toBe(expected);
	});

	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';

		const subject = mount(
			<Root>
				<ContextualButton
					open
					popupComponent={() => <div>{message}</div>}
				>
					Hello
				</ContextualButton>
			</Root>
		);

		const expected = message;
		const actual = subject.find('FloatingLayer').text();

		expect(actual).toBe(expected);
	});

	test('should not render into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';

		const subject = mount(
			<Root>
				<ContextualButton
					popupComponent={() => <div>{message}</div>}
				>
					Hello
				</ContextualButton>
			</Root>
		);

		const expected = '';
		const actual = subject.find('FloatingLayer').text();

		expect(actual).toBe(expected);
	});
});
