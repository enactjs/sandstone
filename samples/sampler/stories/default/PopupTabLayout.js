/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';
import compose from 'ramda/src/compose';
import Group from '@enact/ui/Group';

import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import Popup, {PopupBase} from '@enact/sandstone/Popup';
import TabLayout, {TabLayoutBase} from '@enact/sandstone/TabLayout';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';

import spriteGear2k from '../../images/sprite-gear-2k.png';
import spriteGear4k from '../../images/sprite-gear-4k.png';

PopupTabLayout.displayName = 'PopupTabLayout';

const Config = mergeComponentMetadata('PopupTabLayout', PopupBase, Popup, TabLayoutBase, TabLayout);

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
			const includeIcons = boolean('include icons', Config, true);

			const [open, setOpenState] = React.useState(false);
			const toggleOpen = () => setOpenState(!open);
			const handleClose = compose(toggleOpen, action('onClose'));

			const [indexDisplay, setIndexDisplay] = React.useState(0);
			const [indexGeneral, setIndexGeneral] = React.useState(0);
			const [indexNetwork, setIndexNetwork] = React.useState(0);
			const [indexSound, setIndexSound] = React.useState(0);

			const handleDisplayNext = navNext(setIndexDisplay, indexDisplay, 'onNext');
			const handleDisplayPrev = navPrev(setIndexDisplay, indexDisplay, 'onBack');
			const handleGeneralNext = navNext(setIndexGeneral, indexGeneral, 'onNext');
			const handleGeneralPrev = navPrev(setIndexGeneral, indexGeneral, 'onBack');
			const handleNetworkNext = navNext(setIndexNetwork, indexNetwork, 'onNext');
			const handleNetworkPrev = navPrev(setIndexNetwork, indexNetwork, 'onBack');
			const handleSoundNext = navNext(setIndexSound, indexSound, 'onNext');
			const handleSoundPrev = navPrev(setIndexSound, indexSound, 'onBack');

			return (<div>
				<Button focusEffect="static" onClick={toggleOpen}>Open PopupTabLayout</Button>

				<PopupTabLayout
					open={open}
					onClose={handleClose}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onTabAnimationEnd={action('onTabAnimationEnd')}
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				>
					<Tab icon={includeIcons ? 'picture' : null} onTabClick={action('onTabClick')} title="Display">
						<TabPanels index={indexDisplay} onBack={handleDisplayPrev} onClose={handleClose}>
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
					<Tab icon={includeIcons ? 'speaker' : null} onTabClick={action('onTabClick')} title="Sound">
						<TabPanels index={indexSound} onBack={handleSoundPrev} onClose={handleClose}>
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
					<Tab icon={includeIcons ? 'arrowupdown' : null} onTabClick={action('onTabClick')} title="Network">
						<TabPanels index={indexNetwork} onBack={handleNetworkPrev} onClose={handleClose}>
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
					<Tab
						icon={includeIcons ? 'none' : null}
						onTabClick={action('onTabClick')}
						sprite={{
							columns: 6,
							rows: 5,
							iterations: 1,
							src: {
								fhd: spriteGear2k,
								uhd: spriteGear4k
							}
						}}
						title="General"
					>
						<TabPanels index={indexGeneral} onBack={handleGeneralPrev} onClose={handleClose}>
							<TabPanel>
								<Header title="General Settings" type="compact" />
								<Item onClick={handleGeneralNext}>About</Item>
								<Item onClick={handleGeneralNext}>Reset</Item>
							</TabPanel>
							<TabPanel>
								<Header title="Wired Settings" type="compact" />
								<Group
									childComponent={Item}
									component="div"
									select="radio"
									selectedProp="selected"
								>
									{['Version number', 'Restore factory settings']}
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
