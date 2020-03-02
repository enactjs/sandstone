import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount} from 'enzyme';

import {InputPopup} from '../InputPopup';
import css from '../InputPopup.module.less';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('InputPopup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const inputPopup = mount(
			<FloatingLayerController>
				<InputPopup open />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = inputPopup.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const inputPopup = mount(
			<FloatingLayerController>
				<InputPopup open title={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = inputPopup.find(`.${css.title}`).at(0).text();

		expect(actual).toBe(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const inputPopup = mount(
			<FloatingLayerController>
				<InputPopup open subtitle={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = inputPopup.find(`.${css.subtitle}`).at(0).text();

		expect(actual).toBe(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = 'value text';
		const inputPopup = mount(
			<FloatingLayerController>
				<InputPopup open value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = inputPopup.find('input').prop('value');

		expect(actual).toBe(expected);
	});

	test('should set placeholder at input when there is placeholder text', () => {
		const str = 'placeholder text';
		const inputPopup = mount(
			<FloatingLayerController>
				<InputPopup open placeholder={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = inputPopup.find('input').prop('placeholder');

		expect(actual).toBe(expected);
	});

	test('should set type to password at input when input type is "password"', () => {
		const inputPopup = mount(
			<FloatingLayerController>
				<InputPopup open type="password" />
			</FloatingLayerController>
		);

		const expected = 'password';
		const actual = inputPopup.find('input').prop('type');

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when popup is disabled', () => {
		const inputPopup = mount(<InputPopup disabled />);

		const expected = true;
		const actual = inputPopup.find('[role="button"]').prop('disabled');

		expect(actual).toBe(expected);
	});
});
