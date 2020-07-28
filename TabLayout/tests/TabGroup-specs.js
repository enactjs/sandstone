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
					{title: 'Home', icon: 'home'},
					{title: 'Button'},
					{title: 'Item', icon: 'playcircle'}
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
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
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
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 3;
		const actual = subject.find('Icon').length;

		expect(actual).toEqual(expected);
	});

	it('should disable the list icon when collapsed and all tabs are disabled', () => {
		const subject = mount(
			<TabGroup
				collapsed
				orientation="vertical"
				tabs={[
					{title: 'Home', disabled: true},
					{title: 'Button', disabled: true},
					{title: 'Item', disabled: true}
				]}
			/>
		);

		const expected = true;
		const actual = subject.find('Tab').prop('disabled');

		expect(actual).toBe(expected);
	});

	it('should not disable the list icon when collapsed and all tabs are not disabled', () => {
		const subject = mount(
			<TabGroup
				collapsed
				orientation="vertical"
				tabs={[
					{title: 'Home', disabled: true},
					{title: 'Button', disabled: false},
					{title: 'Item', disabled: true}
				]}
			/>
		);

		const expected = false;
		const actual = subject.find('Tab').prop('disabled');

		expect(actual).toBe(expected);
	});

	it('should generate keys automatically', () => {
		const subject = mount(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 'tabs_Homehome';
		const actual = subject.find('GroupItem').first().key();

		expect(actual).toEqual(expected);
	});

	it('should use a custom key if supplied', () => {
		const subject = mount(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home', tabKey: 'myCustomKey'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = 'myCustomKey';
		const actual = subject.find('GroupItem').first().key();

		expect(actual).toEqual(expected);
	});

	it('should support zero as a custom key', () => {
		const subject = mount(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home', tabKey: 0},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		const expected = '0';
		const actual = subject.find('GroupItem').first().key();

		expect(actual).toEqual(expected);
	});
});
