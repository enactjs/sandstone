import React from 'react';
import {shallow} from 'enzyme';
import {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem Specs', () => {

	test('should contain a Switch', () => {

		const subject = shallow(
			<SwitchItemBase>
				SwitchItem
			</SwitchItemBase>
		);

		const expected = 1;
		const actual = subject.find('Switch').length;

		expect(actual).toBe(expected);
	});

	test('should pass selected to Switch element', () => {

		const subject = shallow(
			<SwitchItemBase selected>
				SwitchItem
			</SwitchItemBase>
		);

		const expected = true;
		const actual = subject.find('Switch').prop('selected');

		expect(actual).toBe(expected);
	});
});
