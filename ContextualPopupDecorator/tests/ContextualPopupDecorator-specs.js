import React from 'react';
import {mount} from 'enzyme';
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

	// Sort of low-quality test, but otherwise we'd need to set up the FloatingLayerDecorator
	test('should open FloatingLayer if open is set', () => {
		const contextualButton = mount(
			<ContextualButton
				open
				popupComponent={Button}
			>
				Hello
			</ContextualButton>
		);

		const expected = true;
		const actual = contextualButton.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	// Sort of low-quality test, but otherwise we'd need to set up the FloatingLayerDecorator
	test('should not open FloatingLayer if open is not set', () => {
		const contextualButton = mount(
			<ContextualButton
				popupComponent={Button}
			>
				Hello
			</ContextualButton>
		);

		const expected = false;
		const actual = contextualButton.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});
});
