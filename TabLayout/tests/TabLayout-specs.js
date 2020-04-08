import React from 'react';
import {shallow} from 'enzyme';

import {TabLayoutBase, TabLayoutItem} from '../TabLayout';

describe('TabLayout specs', () => {
	it('should be collapsed when collapsed is true', () => {
		const subject = shallow(
			<TabLayoutBase
				collapsed
			>
				<TabLayoutItem title="Home" icon="home">
					<div>Home</div>
				</TabLayoutItem>
				<TabLayoutItem title="Button" icon="image">
					<div>Button</div>
				</TabLayoutItem>
				<TabLayoutItem title="Item" icon="resumeplay">
					<div>Item</div>
				</TabLayoutItem>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('collapsed');
	});

	it('should have default orientation of vertical', () => {
		const subject = shallow(
			<TabLayoutBase>
				<TabLayoutItem title="Home" icon="home">
					<div>Home</div>
				</TabLayoutItem>
				<TabLayoutItem title="Button" icon="image">
					<div>Button</div>
				</TabLayoutItem>
				<TabLayoutItem title="Item" icon="resumeplay">
					<div>Item</div>
				</TabLayoutItem>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('vertical');
	});

	it('should have orientation of horizontal when orientation is set to horizontal', () => {
		const subject = shallow(
			<TabLayoutBase
				orientation="horizontal"
			>
				<TabLayoutItem title="Home" icon="home">
					<div>Home</div>
				</TabLayoutItem>
				<TabLayoutItem title="Button" icon="image">
					<div>Button</div>
				</TabLayoutItem>
				<TabLayoutItem title="Item" icon="resumeplay">
					<div>Item</div>
				</TabLayoutItem>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('horizontal');
	});
});
