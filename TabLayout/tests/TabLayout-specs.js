import React from 'react';
import {shallow} from 'enzyme';

import {TabLayoutBase} from '../TabLayout';

describe('TabLayout specs', () => {
	it('should be collapsed when collapsed is true', () => {
		const subject = shallow(
			<TabLayoutBase
				collapsed
				tabs={[
					{children: 'Home', icon: 'home'},
					{children: 'Button', icon: 'image'},
					{children: 'Item', icon: 'resumeplay'}
				]}
			>
				<div>Home</div>
				<div>Button</div>
				<div>Item</div>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('collapsed');
	});

	it('should have default orientation of horizontal', () => {
		const subject = shallow(
			<TabLayoutBase
				tabs={[
					{children: 'Home', icon: 'home'},
					{children: 'Button', icon: 'image'},
					{children: 'Item', icon: 'resumeplay'}
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
					{children: 'Home', icon: 'home'},
					{children: 'Button', icon: 'image'},
					{children: 'Item', icon: 'resumeplay'}
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
