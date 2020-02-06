import React from 'react';
import {shallow} from 'enzyme';

import {RadioItemBase} from '../RadioItem';

describe('RadioItem Specs', () => {
	test('should support a custom icon', () => {
		const expected = 'check';

		const subject = shallow(
			<RadioItemBase icon={expected}>
				Hello RadioItem
			</RadioItemBase>
		);

		const actual = subject.find('.icon').prop('children');

		expect(actual).toBe(expected);
	});
});
