import React from 'react';
import spotlight from '@enact/spotlight';

import TabLayout from '../../../../TabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

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
	{title: 'Five', icon: 'picture'},
	{title: 'Six', icon: 'search'}
];

const views = [
	<div id="view1" key={1}>View One</div>,
	<div id="view2" key={2}>View Two</div>,
	<div id="view3" key={3}>View Three</div>,
	<div id="view4" key={4}>View Four</div>,
	<div id="view5" key={5}>View Five</div>,
	<div id="view6" key={6}>View Six</div>
];

const app = (props) => <div {...props}>
	<div>
		<TabLayout
			id="tabLayoutDefaultWithoutIcons"
			tabs={tabs}
		>
			{views}
		</TabLayout>
		<TabLayout
			id="tabLayoutCollapsedWithoutIcons"
			collapsed
			tabs={tabs}
		>
			{views}
		</TabLayout>
		<TabLayout
			id="tabLayoutCollapsedWithIcons"
			collapsed
			tabs={tabsWithIcons}
		>
			{views}
		</TabLayout>
		<TabLayout
			id="tabLayoutHorizontal"
			orientation="horizontal"
			tabs={tabs}
		>
			{views}
		</TabLayout>
	</div>
</div>;

export default ThemeDecorator(app);
