import React from 'react';
import {shallow} from 'enzyme';

import {CheckboxBase} from '../Checkbox';
import css from '../Item.module.less';

describe('CheckboxItem Specs', () => {
	test('should not include the selected class when not selected', () => {
		const subject = shallow(
			<CheckboxBase>
				check
			</CheckboxBase>
		);

		const expected = css.selected;
		const actual = subject.first().prop('className');

		expect(actual).not.toContain(expected);
	});

	test('should add the selected class when given the selected prop', () => {
		const subject = shallow(
			<CheckboxBase selected>
				check
			</CheckboxBase>
		);

		const expected = css.selected;
		const actual = subject.first().prop('className');

		expect(actual).toContain(expected);
	});
});
