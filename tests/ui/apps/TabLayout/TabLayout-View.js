import React from 'react';
import spotlight from '@enact/spotlight';

import Button from '../../../../Button';
import TabLayout from '../../../../TabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const tabs = [
	{id: 'tab1', title: 'One'},
	{id: 'tab2', title: 'Two'},
	{id: 'tab3', title: 'Three'},
	{id: 'tab4', title: 'Four'},
	{id: 'tab5', title: 'Five'},
	{id: 'tab6', title: 'Six'}
];

const tabsWithIcons = [
	{id: 'tab1', title: 'One', icon: 'star'},
	{id: 'tab2', title: 'Two', icon: 'home'},
	{id: 'tab3', title: 'Three', icon: 'plug'},
	{id: 'tab4', title: 'Four', icon: 'lock'},
	{id: 'tab5', title: 'Five', icon: 'picture'},
	{id: 'tab6', title: 'Six', icon: 'search'}
];

const views = [
	<div id="view1" key={1}>View One</div>,
	<div id="view2" key={2}><Button id="button2">Button Two</Button></div>,
	<div id="view3" key={3}>View Three</div>,
	<div id="view4" key={4}><Button id="button4">Button Four</Button></div>,
	<div id="view5" key={5}>View Five</div>,
	<div id="view6" key={6}><Button id="button6">Button Six</Button></div>
];

const app = (props) => <div {...props}>
	<div>
		<TabLayout
			id="tabLayoutWithoutIcons"
			tabs={tabs}
		>
			{views}
		</TabLayout>
		<TabLayout
			id="tabLayoutWithIcons"
			tabs={tabsWithIcons}
		>
			{views}
		</TabLayout>
		<TabLayout
			id="tabLayoutCollapsedWithoutIcons"
			defaultCollapsed
			tabs={tabs}
		>
			{views}
		</TabLayout>
		<TabLayout
			id="tabLayoutCollapsedWithIcons"
			defaultCollapsed
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
		<TabLayout
			id="tabLayoutHorizontalCollapsed"
			defaultCollapsed
			orientation="horizontal"
			tabs={tabs}
		>
			{views}
		</TabLayout>
	</div>
</div>;

export default ThemeDecorator(app);
