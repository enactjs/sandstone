import React from 'react';

import Button from '../../../../Button';
import {TabLayoutItem} from '../../../../TabLayout'

export const tabs = [
	<TabLayoutItem title="One" icon="">
		<div id="view1">View One</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Two" icon="">
		<div id="view2"><Button id="button2">Button Two</Button></div>
	</TabLayoutItem>,
	<TabLayoutItem title="Three" icon="">
		<div id="view3">View Three</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Four" icon="">
		<div id="view4"><Button id="button4">Button Four</Button></div>
	</TabLayoutItem>,
	<TabLayoutItem title="Five" icon="">
		<div id="view5">View Five</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Six" icon="">
		<div id="view6"><Button id="button6">Button Six</Button></div>
	</TabLayoutItem>
];

export const tabsWithIcons = [
	<TabLayoutItem title="One" icon="star">
		<div id="view1">View One</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Two" icon="home">
		<div id="view2"><Button id="button2">Button Two</Button></div>
	</TabLayoutItem>,
	<TabLayoutItem title="Three" icon="plug">
		<div id="view3">View Three</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Four" icon="lock">
		<div id="view4"><Button id="button4">Button Four</Button></div>
	</TabLayoutItem>,
	<TabLayoutItem title="Five" icon="picture">
		<div id="view5">View Five</div>
	</TabLayoutItem>,
	<TabLayoutItem title="Six" icon="search">
		<div id="view6"><Button id="button6">Button Six</Button></div>
	</TabLayoutItem>
];
