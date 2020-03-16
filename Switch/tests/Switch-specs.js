import React from 'react';
import {shallow} from 'enzyme';

import {SwitchBase} from '../Switch';
import css from '../Switch.module.less';

describe('Switch Specs', () => {

	test('should have selected', () => {

		const switchIcon = shallow(
			<SwitchBase selected />
		);

		const expected = css.selected;
		const actual = switchIcon.prop('className');

		expect(actual).toContain(expected);
	});

	test('should have animated', () => {

		const switchIcon = shallow(
			<SwitchBase />
		);

		const expected = css.animated;
		const actual = switchIcon.prop('className');

		expect(actual).toContain(expected);
	});

	test('should have not animated', () => {

		const switchIcon = shallow(
			<SwitchBase noAnimation />
		);

		const expected = css.animated;
		const actual = switchIcon.prop('className');

		expect(actual).not.toContain(expected);
	});
});
