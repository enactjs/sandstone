import React from 'react';
import {mount} from 'enzyme';
import SwitchItem from '../SwitchItem';
import css from '../SwitchItem.module.less';


describe('SwitchItem Specs', () => {

	test('should contain a Switch', () => {

		const switchItem = mount(
			<SwitchItem>
				SwitchItem
			</SwitchItem>
		);

		const expected = 1;
		const actual = switchItem.find('Switch').length;

		expect(actual).toBe(expected);
	});

	test('should pass selected to Switch element', () => {

		const switchItem = mount(
			<SwitchItem selected>
				SwitchItem
			</SwitchItem>
		);

		const SwitchComponent = switchItem.find('Switch');

		const expected = true;
		const actual = SwitchComponent.prop('selected');

		expect(actual).toBe(expected);
	});

	it('should have switchOnly class.', function () {
		const switchItem = mount(
			<SwitchItem selected switchOnly>
				SwitchItem
			</SwitchItem>
		);

		const expected = css.switchOnly;
		const actual = switchItem.find('Item').prop('className');

		expect(actual).toContain(expected);
	});
});
