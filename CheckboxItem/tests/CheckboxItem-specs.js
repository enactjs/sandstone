import React from 'react';
import {mount} from 'enzyme';
import {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		const expected = 'trash';

		const subject = mount(
			<CheckboxItemBase icon={expected}>
				Hello CheckboxItem
			</CheckboxItemBase>
		);

		const actual = subject.find('.checkbox').first().prop('children');

		expect(actual).toBe(expected);
	});
});
