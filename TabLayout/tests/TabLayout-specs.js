import React from 'react';
import {shallow} from 'enzyme';

import {TabLayout, TabLayoutBase} from '../TabLayout';

describe('TabLayout specs', () => {
	it('should be minimized when minimized is true', () => {
		const subject = shallow(
			<TabLayoutBase
				minimized
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'image'},
					{title: 'Item', icon: 'resumeplay'}
				]}
			>
				<div>Home</div>
				<div>Button</div>
				<div>Item</div>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('minimized');
	});

	it('should have default orientation of horizontal', () => {
		const subject = shallow(
			<TabLayoutBase
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'image'},
					{title: 'Item', icon: 'resumeplay'}
				]}
			>
				<div>Home</div>
				<div>Button</div>
				<div>Item</div>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('vertical');
	});

	it('should have orientation of horizontal when orientation is set to horizontal', () => {
		const subject = shallow(
			<TabLayoutBase
				orientation="horizontal"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'image'},
					{title: 'Item', icon: 'resumeplay'}
				]}
			>
				<div>Home</div>
				<div>Button</div>
				<div>Item</div>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('horizontal');
	});
});
