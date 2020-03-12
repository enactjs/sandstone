import React from 'react';
import spotlight from '@enact/spotlight';

import TabLayout from '../../../../TabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

import {tabs, views, tabsWithIcons} from './TabComponents';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);


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
