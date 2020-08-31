import React from 'react';

import Button from '../../../../Button';
import {Tab} from '../../../../TabLayout';

export const tabs = [
	<Tab title="One">
		<div id="view1">
			View One
			<Button id="button1">Button One</Button>
		</div>
	</Tab>,
	<Tab title="Two">
		<div id="view2"><Button id="button2">Button Two</Button></div>
	</Tab>,
	<Tab title="Three">
		<div id="view3">View Three</div>
	</Tab>,
	<Tab disabled title="Four">
		<div id="view4"><Button id="button4">Button Four</Button></div>
	</Tab>,
	<Tab title="Five">
		<div id="view5">View Five</div>
	</Tab>,
	<Tab title="Six" spotlightDisabled>
		<div id="view6"><Button id="button6">Button Six</Button></div>
	</Tab>
];

export const tabsWithIcons = [
	<Tab title="One" icon="star">
		<div id="view1">View One</div>
	</Tab>,
	<Tab title="Two" icon="home">
		<div id="view2"><Button id="button2">Button Two</Button></div>
	</Tab>,
	<Tab title="Three" icon="plug">
		<div id="view3">View Three</div>
	</Tab>,
	<Tab disabled title="Four" icon="lock">
		<div id="view4"><Button id="button4">Button Four</Button></div>
	</Tab>,
	<Tab title="Five" icon="picture">
		<div id="view5">View Five</div>
	</Tab>,
	<Tab title="Six" icon="search" spotlightDisabled>
		<div id="view6"><Button id="button6">Button Six</Button></div>
	</Tab>
];
