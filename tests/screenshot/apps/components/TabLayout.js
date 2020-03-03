/* eslint-disable react/no-children-prop */
import TabLayout from '../../../../TabLayout';
import React from 'react';

const tabs = [
	{title: 'One'},
	{title: 'Two'},
	{title: 'Three'},
	{title: 'Four'},
	{title: 'Five'},
	{title: 'Six'}
];

const tabsWithIcons = [
	{title: 'One', icon: 'star'},
	{title: 'Two', icon: 'home'},
	{title: 'Three', icon: 'plug'},
	{title: 'Four', icon: 'lock'},
	{title: 'Five', icon: 'info'},
	{title: 'Six', icon: 'picture'}
];

const oneTabWithIcons = [
	{title: 'One', icon: 'star'},
	{title: 'Two'},
	{title: 'Three'},
	{title: 'Four'},
	{title: 'Five'},
	{title: 'Six'}
];

const someTabsWithIcons = [
	{title: 'One', icon: 'star'},
	{title: 'Two'},
	{title: 'Three', icon: 'plug'},
	{title: 'Four', icon: 'lock'},
	{title: 'Five'},
	{title: 'Six', icon: 'picture'}
];

const views = [
	<div>View One</div>,
	<div>View Two</div>,
	<div>View Three</div>,
	<div>View Four</div>,
	<div>View Five</div>,
	<div>View Six</div>
];

const TabLayoutTests = [
	<TabLayout children={views} tabs={tabs} />,
	<TabLayout children={views} tabs={tabsWithIcons} />,
	<TabLayout children={views} tabs={someTabsWithIcons} />,
	<TabLayout children={views} tabs={oneTabWithIcons} />,
	<TabLayout children={views} orientation="horizontal" tabs={tabs} />,
	<TabLayout children={views} orientation="horizontal" tabs={tabsWithIcons} />,
	<TabLayout children={views} orientation="horizontal" tabs={someTabsWithIcons} />,
	<TabLayout children={views} orientation="horizontal" tabs={oneTabWithIcons} />,
	<TabLayout children={views} collapsed tabs={tabs} />,
	<TabLayout children={views} collapsed tabs={tabsWithIcons} />,
	<TabLayout children={views} collapsed tabs={someTabsWithIcons} />,
	<TabLayout children={views} collapsed tabs={oneTabWithIcons} />,
	<TabLayout children={views} collapsed orientation="horizontal" tabs={tabs} />,
	<TabLayout children={views} collapsed orientation="horizontal" tabs={tabsWithIcons} />,
	<TabLayout children={views} collapsed orientation="horizontal" tabs={someTabsWithIcons} />,
	<TabLayout children={views} collapsed orientation="horizontal" tabs={oneTabWithIcons} />
];
export default TabLayoutTests;
