import React from 'react';
import spotlight from '@enact/spotlight';

import {Header} from '../../../../Panels';
import Item from '../../../../Item';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '../../../../PopupTabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<PopupTabLayout
		id="tabLayout"
		open
	>
		<Tab icon="brightness" title="Display">
			<TabPanels id="display">
				<TabPanel>
					<Header title="Display Settings" type="compact" />
					<Item>Picture Modes</Item>
					<Item>Color Adjust</Item>
				</TabPanel>
			</TabPanels>
		</Tab>
		<Tab icon="speakers" title="Sound">
			<TabPanels id="sound">
				<TabPanel>
					<Header title="Sound Settings" type="compact" />
					<Item>Advanced Audio</Item>
				</TabPanel>
			</TabPanels>
		</Tab>
	</PopupTabLayout>
</div>;

export default ThemeDecorator(app);
