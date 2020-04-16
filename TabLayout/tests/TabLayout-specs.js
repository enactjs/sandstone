import React from 'react';
import {shallow} from 'enzyme';

import {TabLayoutBase, Tab} from '../TabLayout';

describe('TabLayout specs', () => {
	it('should be collapsed when collapsed is true', () => {
		const subject = shallow(
			<TabLayoutBase
				collapsed
			>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="image">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="resumeplay">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('collapsed');
	});

	it('should have default orientation of vertical', () => {
		const subject = shallow(
			<TabLayoutBase>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="image">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="resumeplay">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('vertical');
	});

	it('should have orientation of horizontal when orientation is set to horizontal', () => {
		const subject = shallow(
			<TabLayoutBase
				orientation="horizontal"
			>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="image">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="resumeplay">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		expect(subject.prop('className').split(' ')).toContain('horizontal');
	});
});
