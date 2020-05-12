import React from 'react';
import {mount} from 'enzyme';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Button from '../../Button';

const ContextualButton = ContextualPopupDecorator(Button);
describe('ContextualPopupDecorator Specs', () => {
	test('should bind callback to instance', () => {
		let called = false;
		class CallbackInterceptor {
			get containerNode () {
				called = true;
			}
		}

		const subject = mount(
			<ContextualButton
				popupComponent={Button}
			>
				Button
			</ContextualButton>
		);

		Reflect.apply(subject.instance().positionContextualPopup, new CallbackInterceptor(), []);

		const expected = false;
		const actual = called;

		expect(actual).toBe(expected);
	});
});
