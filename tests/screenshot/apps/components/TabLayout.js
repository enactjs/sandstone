import {TabLayout, Tab} from '../../../../TabLayout';
import React from 'react';

const SimpleTab = ({title, icon}) => (
	<Tab title={title} icon={icon}>
		<div>{`View ${title}`}</div>
	</Tab>
);

const tabs = [
	SimpleTab({title: 'One'}),
	SimpleTab({title: 'Two'}),
	SimpleTab({title: 'Three'}),
	SimpleTab({title: 'Four'}),
	SimpleTab({title: 'Five'}),
	SimpleTab({title: 'Six'})
];

const tabsWithIcons = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({title: 'Two', icon: 'home'}),
	SimpleTab({title: 'Three', icon: 'plug'}),
	SimpleTab({title: 'Four', icon: 'lock'}),
	SimpleTab({title: 'Five', icon: 'info'}),
	SimpleTab({title: 'Six', icon: 'picture'})
];

const oneTabWithIcons = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({title: 'Two'}),
	SimpleTab({title: 'Three'}),
	SimpleTab({title: 'Four'}),
	SimpleTab({title: 'Five'}),
	SimpleTab({title: 'Six'})
];

const someTabsWithIcons = [
	SimpleTab({title: 'One', icon: 'star'}),
	SimpleTab({title: 'Two'}),
	SimpleTab({title: 'Three', icon: 'plug'}),
	SimpleTab({title: 'Four', icon: 'lock'}),
	SimpleTab({title: 'Five'}),
	SimpleTab({title: 'Six', icon: 'picture'})
];

const TabLayoutTests = [
	{
		component: <TabLayout>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout>{tabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout>{someTabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout>{oneTabWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{tabs}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{tabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{someTabsWithIcons}</TabLayout>,
		wrapper: {full: true}
	},
	{
		component: <TabLayout collapsed>{oneTabWithIcons}</TabLayout>,
		wrapper: {full: true}
	}
];
export default TabLayoutTests;
