/* eslint-disable react/jsx-no-bind */

import React from 'react';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import SwitchItem from '@enact/sandstone/SwitchItem';

import {storiesOf} from '@storybook/react';

PopupTabLayout.displayName = 'PopupTabLayout';

storiesOf('PopupTabLayout', module)
	.add(
		'with button',
		() => {
			return (
				<Panel>
					<PopupTabLayout
						open
					>
						<Tab icon={'brightness'} title="Display">
							<TabPanels index={0}>
								<TabPanel>
									<Header title="Display Settings" type="compact" />
									<SwitchItem>Picture Modes</SwitchItem>
									<Button size="small">button button button</Button>
									<Heading>heading</Heading>
									<Item>Color Adjust</Item>
									<Button>button</Button>
								</TabPanel>
							</TabPanels>
						</Tab>
						<Tab icon={'speakers'} title="Sound">
							<TabPanels index={0}>
								<TabPanel>
									<Header title="Sound Settings" type="compact" />
									<Item>Advanced Audio</Item>
								</TabPanel>
							</TabPanels>
						</Tab>
					</PopupTabLayout>
				</Panel>
			);
		});
