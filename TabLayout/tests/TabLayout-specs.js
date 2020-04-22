import React from 'react';
import {shallow} from 'enzyme';

import {TabLayoutBase, Tab} from '../TabLayout';
import css from '../TabLayout.module.less';

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

		const expected = css.collapsed;
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
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

		const expected = css.vertical;
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
				<Tab title="Button" icon="image">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="resumeplay">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = css.horizontal;
		const actual = subject.prop('className');

		expect(actual).toContain(expected);
	});
});
