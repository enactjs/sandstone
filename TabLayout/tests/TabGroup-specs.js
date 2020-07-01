import React from 'react';
import {mount} from 'enzyme';

import TabGroup from '../TabGroup';

describe('TabGroup specs', () => {
	it('should only have one icon item when collapsed and vertical orientation when there is a tab without an icon', () => {
		const subject = mount(
			<TabGroup
				orientation="vertical"
				collapsed
				tabs={[
					{children: 'Home', icon: 'home'},
					{children: 'Button'},
					{children: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 1;
		const actual = subject.find('Tab').length;

		expect(actual).toEqual(expected);
	});

	it('should only have 3 item tabs when 3 tabs were specified', () => {
		const subject = mount(
			<TabGroup
				tabs={[
					{children: 'Home', icon: 'home'},
					{children: 'Button', icon: 'demosync'},
					{children: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 3;
		const actual = subject.find('Tab').length;

		expect(actual).toEqual(expected);
	});

	it('should render icons', () => {
		const subject = mount(
			<TabGroup
				tabs={[
					{children: 'Home', icon: 'home'},
					{children: 'Button', icon: 'demosync'},
					{children: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 3;
		const actual = subject.find('Icon').length;

		expect(actual).toEqual(expected);
	});
});
