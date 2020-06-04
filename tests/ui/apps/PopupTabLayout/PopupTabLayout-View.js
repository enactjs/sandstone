import React from 'react';
import spotlight from '@enact/spotlight';

import {Header} from '../../../../Panels';
import Item from '../../../../Item';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '../../../../PopupTabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => (
	<PopupTabLayout
		{...props}
		id="tabLayout"
		open
	>
		<Tab icon="picture" title="Display">
			<TabPanels id="display">
				<TabPanel autoFocus="#colorAdjust">
					<Header title="Display Settings" type="compact" />
					<Item>Picture Modes</Item>
					<Item id="colorAdjust">Color Adjust</Item>
				</TabPanel>
			</TabPanels>
		</Tab>
		<Tab icon="speaker" title="Sound">
			<TabPanels id="sound">
				<TabPanel>
					<Header title="Sound Settings" type="compact" />
					<Item>Advanced Audio</Item>
				</TabPanel>
			</TabPanels>
		</Tab>
	</PopupTabLayout>
);

export default UrlPropsDecorator(ThemeDecorator(app));
