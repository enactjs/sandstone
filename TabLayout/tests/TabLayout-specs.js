import React from 'react';
import {mount, shallow} from 'enzyme';

import TabLayout, {TabLayoutBase, Tab} from '../TabLayout';

describe('TabLayout specs', () => {
	it('should be collapsed when collapsed is true', () => {
		const subject = shallow(
			<TabLayoutBase
				collapsed
			>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = 'collapsed';
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
	});

	it('should have default orientation of vertical', () => {
		const subject = shallow(
			<TabLayoutBase>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = 'vertical';
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
	});

	it('should have orientation of horizontal when orientation is set to horizontal', () => {
		const subject = shallow(
			<TabLayoutBase
				orientation="horizontal"
			>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = 'horizontal';
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
	});

	it('should call onTabAnimationEnd for vertical tabs', () => {
		const spy = jest.fn();
		const subject = mount(
			<TabLayout orientation="vertical" onTabAnimationEnd={spy}>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = subject.find('Cell.tabs').first();
		tabs.simulate('transitionend', {target: tabs.getDOMNode(), propertyName: 'max-width'});

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should include expected payload in onTabAnimationEnd', () => {
		const spy = jest.fn();
		const subject = mount(
			<TabLayout orientation="vertical" onTabAnimationEnd={spy} collapsed>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = subject.find('Cell.tabs').first();
		tabs.simulate('transitionend', {target: tabs.getDOMNode(), propertyName: 'max-width'});

		const expected = {
			type: 'onTabAnimationEnd',
			collapsed: true
		};
		const actual = spy.mock.calls[0][0];

		expect(actual).toEqual(expected);
	});

	it('should call not onTabAnimationEnd for horizontal tabs', () => {
		const spy = jest.fn();
		const subject = mount(
			<TabLayout orientation="horizontal" onTabAnimationEnd={spy}>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = subject.find('Cell.tabs').first();
		tabs.simulate('transitionend', {target: tabs.getDOMNode(), propertyName: 'max-width'});

		expect(spy).not.toHaveBeenCalled();
	});
});
