import React from 'react';
import {shallow} from 'enzyme';

import {CheckboxBase} from '../Checkbox';
import css from '../Checkbox.module.less';

describe('CheckboxItem Specs', () => {
	test('should not include the selected class when not selected', () => {
		const subject = shallow(
			<CheckboxBase />
		);

		const expected = css.selected;
		const actual = subject.prop('className');

		expect(actual).not.toContain(expected);
	});

	test('should add the selected class when given the selected prop', () => {
		const subject = shallow(
			<CheckboxBase selected />
		);

		const expected = css.selected;
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
	});

	test('should not include the indeterminate class when not indeterminate', () => {
		const subject = shallow(
			<CheckboxBase />
		);

		const expected = css.indeterminate;
		const actual = subject.prop('className');

		expect(actual).not.toContain(expected);
	});

	test('should add the indeterminate class when given the indeterminate prop', () => {
		const subject = shallow(
			<CheckboxBase indeterminate />
		);

		const expected = css.indeterminate;
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
	});

	test('should prioritize indeterminate over selected', () => {
		const subject = shallow(
			<CheckboxBase indeterminate selected indeterminateIcon="Ind">Sel</CheckboxBase>
		);

		const expected = 'Ind';
		const actual = subject.prop('children');

		expect(actual).toBe(expected);
	});
});
