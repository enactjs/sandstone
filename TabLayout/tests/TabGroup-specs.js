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
					{children: 'Item', icon: 'resumeplay'}
				]}
			/>
		);

		expect(subject.find('Item').length).toEqual(1);
	});


	it('should only have same amount of icon item when collapsed', () => {
		const subject = mount(
			<TabGroup
				collapsed
				tabs={[
					{children: 'Home', icon: 'home'},
					{children: 'Button', icon: 'image'},
					{children: 'Item', icon: 'resumeplay'}
				]}
			/>
		);

		expect(subject.find('Item').length).toEqual(3);
	});
});
