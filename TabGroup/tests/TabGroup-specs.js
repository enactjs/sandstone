import React from 'react';
import {mount} from 'enzyme';

import TabGroup from '../TabGroup';

describe('TabGroup specs', () => {
	it('should only have one icon button when minimized and vertical orientation when there is a tab without an icon', () => {
		const subject = mount(
			<TabGroup
				orientation="vertical"
				minimized
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button'},
					{title: 'Item', icon: 'resumeplay'}
				]}
			/>
		);

		expect(subject.find('Button').length).toEqual(1);
	});


	it('should only have same amount of icon buttons when minimized', () => {
		const subject = mount(
			<TabGroup
				minimized
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'image'},
					{title: 'Item', icon: 'resumeplay'}
				]}
			/>
		);

		expect(subject.find('Button').length).toEqual(3);
	});
});
