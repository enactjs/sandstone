import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount} from 'enzyme';

import {NumberInputPopup} from '../InputPopup';
import css from '../NumberInputPopup.module.less';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('NumberInputPopup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const numberInputPopup = mount(
			<FloatingLayerController>
				<NumberInputPopup open length={4} />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = numberInputPopup.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should set title when there is title text', () => {
		const str = 'title text';
		const numberInputPopup = mount(
			<FloatingLayerController>
				<NumberInputPopup open length={4} title={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = numberInputPopup.find(`.${css.title}`).at(0).text();

		expect(actual).toBe(expected);
	});

	test('should set title below when there is title below text', () => {
		const str = 'title below text';
		const numberInputPopup = mount(
			<FloatingLayerController>
				<NumberInputPopup open length={4} subtitle={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = numberInputPopup.find(`.${css.subtitle}`).at(0).text();

		expect(actual).toBe(expected);
	});

	test('should set value at input when there is value text', () => {
		const str = '1234';
		const numberInputPopup = mount(
			<FloatingLayerController>
				<NumberInputPopup open length={4} value={str} />
			</FloatingLayerController>
		);

		const expected = str;
		const actual = numberInputPopup.find(`.${css.previewArea}`).text();

		expect(actual).toBe(expected);
	});

	test('should change value to asterisk when input type is "password"', () => {
		const numberInputPopup = mount(
			<FloatingLayerController>
				<NumberInputPopup open length={4} value={'1234'} inputType={'password'} />
			</FloatingLayerController>
		);

		const expected = '****';
		const actual = numberInputPopup.find(`.${css.previewArea}`).text();

		expect(actual).toBe(expected);
	});

	test('should set disabled at button when the component is disabled', () => {
		const numberInputPopup = mount(<NumberInputPopup length={4} disabled />);

		const expected = true;
		const actual = numberInputPopup.find('[role="button"]').prop('disabled');

		expect(actual).toBe(expected);
	});
});
