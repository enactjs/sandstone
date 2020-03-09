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
	<TabLayout tabs={tabs}>
		{views}
	</TabLayout>,
	<TabLayout tabs={tabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout tabs={someTabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout tabs={oneTabWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout orientation="horizontal" tabs={tabs}>
		{views}
	</TabLayout>,
	<TabLayout orientation="horizontal" tabs={tabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout orientation="horizontal" tabs={someTabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout orientation="horizontal" tabs={oneTabWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout collapsed tabs={tabs}>
		{views}
	</TabLayout>,
	<TabLayout collapsed tabs={tabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout collapsed tabs={someTabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout collapsed tabs={oneTabWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout collapsed orientation="horizontal" tabs={tabs}>
		{views}
	</TabLayout>,
	<TabLayout collapsed orientation="horizontal" tabs={tabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout collapsed orientation="horizontal" tabs={someTabsWithIcons}>
		{views}
	</TabLayout>,
	<TabLayout collapsed orientation="horizontal" tabs={oneTabWithIcons}>
		{views}
	</TabLayout>
];
export default TabLayoutTests;
