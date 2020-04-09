import {TabLayout, TabLayoutItem} from '../../../../TabLayout';
import React from 'react';

const tabs = [
	<TabLayoutItem title="One">
		<div>View One</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Two">
		<div>View Two</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Three">
		<div>View Three</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Four">
		<div>View Four</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Five">
		<div>View Five</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Six">
		<div>View Six</div>
	</TabLayoutItem>

];

const tabsWithIcons = [
	<TabLayoutItem title="One" icon="star">
		<div>View One</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Two" icon="home">
		<div>View Two</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Three" icon="plug">
		<div>View Three</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Four" icon="lock">
		<div>View Four</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Five" icon="info">
		<div>View Five</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Six" icon="picture">
		<div>View Six</div>
	</TabLayoutItem>
];

const oneTabWithIcons = [
	<TabLayoutItem title="One" icon="star">
		<div>View One</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Two">
		<div>View Two</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Three">
		<div>View Three</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Four">
		<div>View Four</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Five">
		<div>View Five</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Six">
		<div>View Six</div>
	</TabLayoutItem>
];

const someTabsWithIcons = [
	<TabLayoutItem title="One" icon="star">
		<div>View One</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Two">
		<div>View Two</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Three" icon="plug">
		<div>View Three</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Four" icon="lock">
		<div>View Four</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Five">
		<div>View Five</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Six" icon="picture">
		<div>View Six</div>
	</TabLayoutItem>
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
