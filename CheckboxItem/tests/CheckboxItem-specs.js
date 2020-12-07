import React from 'react';
import {shallow} from 'enzyme';
import {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		const expected = 'trash';

		const subject = shallow(
			<CheckboxItemBase icon={expected}>
				Hello CheckboxItem
			</CheckboxItemBase>
		);

		const actual = subject.find('Checkbox').prop('children');

		expect(actual).toBe(expected);
	});
});
