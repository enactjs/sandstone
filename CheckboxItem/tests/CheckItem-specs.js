import React from 'react';
import {shallow, mount} from 'enzyme';
import {CheckboxItemBase} from '../CheckboxItem';
import css from '../RadioItem.module.less';

describe('CheckboxItem Specs', () => {
	test('should render correct icon when not selected', () => {
		const checkboxItem = shallow(
			<CheckboxItemBase>
				Hello RadioItem
			</CheckboxItemBase>
		);

		const expected = 0;
		const actual = checkboxItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {
		const checkboxItem = shallow(
			<CheckboxItemBase selected>
				Hello RadioItem
			</CheckboxItemBase>
		);

		const expected = 1;
		const actual = checkboxItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});
});