/* eslint-disable react/jsx-no-bind */

import React from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
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
						<Tab icon="picture" title="Display">
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
						<Tab icon="sound" title="Sound">
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
		})
	.add(
		'with bodyText',
		() => {
			return (
				<Panel>
					<PopupTabLayout
						open
					>
						<Tab icon="picture" title="Display">
							<TabPanels index={0}>
								<TabPanel>
									<Scroller focusableScrollbar="byEnter">
										<BodyText>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula turpis vel accumsan sollicitudin. Vivamus id tellus non arcu congue bibendum. Mauris cursus sed libero nec finibus. Sed faucibus pulvinar hendrerit. Etiam efficitur feugiat lectus, sit amet egestas arcu bibendum nec. Ut dignissim neque vel nisl porttitor lobortis. Aenean accumsan, nibh in maximus cursus, ipsum lectus porttitor dolor, quis bibendum est nunc eget lorem. Vivamus sit amet convallis odio. Nam luctus lacus vitae leo molestie, dapibus elementum ligula auctor. Phasellus ultrices nisi ut dolor feugiat ullamcorper. Etiam pharetra vestibulum vestibulum. Ut finibus sapien ut diam mattis, non condimentum urna gravida. Nulla pulvinar sagittis tellus pharetra vulputate. Phasellus sodales leo vitae sem scelerisque, ac posuere elit vehicula. Nullam vitae urna at dui hendrerit gravida. Suspendisse molestie ex et tincidunt dictum. Curabitur eu lectus risus. Duis viverra cursus dolor, elementum ornare tortor vulputate ac. Praesent facilisis egestas dui, eu posuere nunc ultrices in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus a bibendum mi, id blandit lectus. Aenean nec consectetur nisl. Aliquam gravida libero nunc, nec dapibus velit ultricies quis.
										</BodyText>
									</Scroller>
								</TabPanel>
							</TabPanels>
						</Tab>
					</PopupTabLayout>
				</Panel>
			);
		})
	.add(
		'with input',
		() => {
			return (
				<Panel>
					<PopupTabLayout
						open
					>
						<Tab icon="picture" title="Display">
							<TabPanels index={0}>
								<TabPanel>
									<Header title="Display" type="compact" />
									<Input value="Input" />
								</TabPanel>
							</TabPanels>
						</Tab>
					</PopupTabLayout>
				</Panel>
			);
		});
