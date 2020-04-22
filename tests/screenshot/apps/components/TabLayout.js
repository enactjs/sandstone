import {TabLayout, Tab} from '../../../../TabLayout';
import React from 'react';

const tabs = [
	<Tab title="One">
		<div>View One</div>
	</Tab>,
	<Tab title="Two">
		<div>View Two</div>
	</Tab>,
	<Tab title="Three">
		<div>View Three</div>
	</Tab>,
	<Tab title="Four">
		<div>View Four</div>
	</Tab>,
	<Tab title="Five">
		<div>View Five</div>
	</Tab>,
	<Tab title="Six">
		<div>View Six</div>
	</Tab>

];

const tabsWithIcons = [
	<Tab title="One" icon="star">
		<div>View One</div>
	</Tab>,
	<Tab title="Two" icon="home">
		<div>View Two</div>
	</Tab>,
	<Tab title="Three" icon="plug">
		<div>View Three</div>
	</Tab>,
	<Tab title="Four" icon="lock">
		<div>View Four</div>
	</Tab>,
	<Tab title="Five" icon="info">
		<div>View Five</div>
	</Tab>,
	<Tab title="Six" icon="picture">
		<div>View Six</div>
	</Tab>
];

const oneTabWithIcons = [
	<Tab title="One" icon="star">
		<div>View One</div>
	</Tab>,
	<Tab title="Two">
		<div>View Two</div>
	</Tab>,
	<Tab title="Three">
		<div>View Three</div>
	</Tab>,
	<Tab title="Four">
		<div>View Four</div>
	</Tab>,
	<Tab title="Five">
		<div>View Five</div>
	</Tab>,
	<Tab title="Six">
		<div>View Six</div>
	</Tab>
];

const someTabsWithIcons = [
	<Tab title="One" icon="star">
		<div>View One</div>
	</Tab>,
	<Tab title="Two">
		<div>View Two</div>
	</Tab>,
	<Tab title="Three" icon="plug">
		<div>View Three</div>
	</Tab>,
	<Tab title="Four" icon="lock">
		<div>View Four</div>
	</Tab>,
	<Tab title="Five">
		<div>View Five</div>
	</Tab>,
	<Tab title="Six" icon="picture">
		<div>View Six</div>
	</Tab>
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
