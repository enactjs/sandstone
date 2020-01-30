import React from 'react';
import { shallow } from 'enzyme';

import {RadioItemBase} from '../RadioItem';
import css from '../RadioItem.module.less';

describe('RadioItem Specs', () => {
	test('should render correct icon when not selected', () => {
		const radioItem = shallow(
			<RadioItemBase>
				Hello RadioItem
			</RadioItemBase>
		);

		const expected = 0;
		const actual = radioItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {
		const radioItem = shallow(
			<RadioItemBase selected>
				Hello RadioItem
			</RadioItemBase>
		);

		console.log(radioItem.debug());
		const expected = 1;
		const actual = radioItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

});
