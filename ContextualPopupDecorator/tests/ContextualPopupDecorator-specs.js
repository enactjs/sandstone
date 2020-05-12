import React from 'react';
import {mount} from 'enzyme';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Button from '../../Button';

const ContextualButton = ContextualPopupDecorator(Button);
describe('ContextualPopupDecorator Specs', () => {
	test('should bind callback to instance', () => {
		const callback = jest.fn();
		class CallbackInterceptor {
			get containerNode () {
				return callback();
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

		const expected = 0;
		const actual = callback.mock.calls.length;

		expect(actual).toBe(expected);
	});
});
