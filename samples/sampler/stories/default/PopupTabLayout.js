/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import React from 'react';
import {storiesOf} from '@storybook/react';
import compose from 'ramda/src/compose';
import Group from '@enact/ui/Group';

import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';

PopupTabLayout.displayName = 'PopupTabLayout';

const navPrev = (callback, value, actionName) => () => {
	const index = Math.max(value - 1, 0);
	action(actionName)({index});
	callback(index);
};
const navNext = (callback, value) => () => {
	const index = Math.min(value + 1, 5);
	// action(actionName)({index});
	callback(index);
};

storiesOf('Sandstone', module)
	.add(
		'PopupTabLayout',
		() => {
			const [open, setOpenState] = React.useState(false);
			const toggleOpen = () => setOpenState(!open);
			const handleClose = compose(toggleOpen, action('onClose'));

			const [indexDisplay, setIndexDisplay] = React.useState(0);
			const [indexNetwork, setIndexNetwork] = React.useState(0);
			const [indexSound, setIndexSound] = React.useState(0);

			const handleDisplayNext = navNext(setIndexDisplay, indexDisplay, 'onNext');
			const handleDisplayPrev = navPrev(setIndexDisplay, indexDisplay, 'onBack');
			const handleNetworkNext = navNext(setIndexNetwork, indexNetwork, 'onNext');
			const handleNetworkPrev = navPrev(setIndexNetwork, indexNetwork, 'onBack');
			const handleSoundNext = navNext(setIndexSound, indexSound, 'onNext');
			const handleSoundPrev = navPrev(setIndexSound, indexSound, 'onBack');

			return (<div>
				<Button onClick={toggleOpen}>Open PopupTabLayout</Button>

				<PopupTabLayout
					open={open}
					onClose={handleClose}
				>
					<Tab icon="brightness" title="Display">
						<TabPanels index={indexDisplay} onBack={handleDisplayPrev}>
							<TabPanel>
								<Header title="Display Settings" type="compact" />
								<Item onClick={handleDisplayNext}>Picture Modes</Item>
								<Item onClick={handleDisplayNext}>Color Adjust</Item>
							</TabPanel>
							<TabPanel>
								<Header title="Picture Modes" type="compact" />
								<Scroller>
									<Group
										childComponent={Item}
										component="div"
										select="radio"
										selectedProp="selected"
									>
										{['Vivid', 'Standard', 'Game', 'HDR', 'News', 'Cinema', 'APS', 'Custom', 'Custom 2', 'Expert', 'Expert 2']}
									</Group>
								</Scroller>
							</TabPanel>
						</TabPanels>
					</Tab>
					<Tab icon="speakers" title="Sound">
						<TabPanels index={indexSound} onBack={handleSoundPrev}>
							<TabPanel>
								<Header title="Sound Settings" type="compact" />
								<Item onClick={handleSoundNext}>Advanced Audio</Item>
							</TabPanel>
							<TabPanel>
								<Header title="Advanced Audio Settings" type="compact" />
								<Group
									childComponent={Item}
									component="div"
									select="radio"
									selectedProp="selected"
								>
									{['Balance', 'Fade']}
								</Group>
							</TabPanel>
						</TabPanels>
					</Tab>
					<Tab icon="arrowupdown" title="Network">
						<TabPanels index={indexNetwork} onBack={handleNetworkPrev}>
							<TabPanel>
								<Header title="Network Settings" type="compact" />
								<Item onClick={handleNetworkNext}>Wired</Item>
								<Item onClick={handleNetworkNext}>Wireless</Item>
							</TabPanel>
							<TabPanel>
								<Header title="Wired Settings" type="compact" />
								<Group
									childComponent={Item}
									component="div"
									select="radio"
									selectedProp="selected"
								>
									{['IP Address', 'Subnet', 'Gateway / Router', 'DNS 1', 'DNS 2']}
								</Group>
							</TabPanel>
						</TabPanels>
					</Tab>
				</PopupTabLayout>
			</div>);
		},
		{
			info: {
				text: 'Intended for use with a single "control" at a time, to maximize the amount of background visible.'
			}
		}
	);
