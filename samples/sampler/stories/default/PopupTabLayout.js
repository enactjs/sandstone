/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';
import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import {adaptEvent, handle, forward} from '@enact/core/handle';
import Group from '@enact/ui/Group';
import Changeable from '@enact/ui/Changeable';

import PopupTabLayout, {PopupTabLayoutBase, Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';

PopupTabLayout.displayName = 'PopupTabLayout';
const Config = mergeComponentMetadata('PopupTabLayout', PopupTabLayoutBase, PopupTabLayout);

const navPrev = (prop, callbackName) => handle(
	adaptEvent((ev, props) => ({[prop]: Math.max(props[prop] - 1, 0)}), forward(callbackName))
);
const navNext = (prop, callbackName) => handle(
	adaptEvent((ev, props) => ({[prop]: Math.min(props[prop] + 1, 5)}), forward(callbackName))
);

const PopupTabLayoutStoryBase = kind({
	name: 'PopupTabLayoutStory',

	propTypes: {
		indexDisplay: PropTypes.number,
		indexNetwork: PropTypes.number,
		indexSound: PropTypes.number,
		onNavDisplay: PropTypes.func,
		onNavNetwork: PropTypes.func,
		onNavSound: PropTypes.func
	},

	defaultProps: {
		indexDisplay: 0,
		indexNetwork: 0,
		indexSound: 0
	},

	handlers: {
		onNavDisplayNext: navNext('indexDisplay', 'onNavDisplay'),
		onNavDisplayPrev: navPrev('indexDisplay', 'onNavDisplay'),
		onNavNetworkNext: navNext('indexNetwork', 'onNavNetwork'),
		onNavNetworkPrev: navPrev('indexNetwork', 'onNavNetwork'),
		onNavSoundNext: navNext('indexSound', 'onNavSound'),
		onNavSoundPrev: navPrev('indexSound', 'onNavSound')
	},

	render: ({
		indexDisplay,
		indexSound,
		indexNetwork,
		onNavDisplayNext,
		onNavDisplayPrev,
		onNavNetworkNext,
		onNavNetworkPrev,
		onNavSoundNext,
		onNavSoundPrev,
		...rest
	}) =>  {
		delete rest.onNavDisplay;
		delete rest.onNavSound;
		delete rest.onNavNetwork;

		return (
			<PopupTabLayout {...rest}>
				<Tab icon="brightness" title="Display">
					<TabPanels index={indexDisplay} onBack={onNavDisplayPrev}>
						<TabPanel>
							<Header title="Display Settings" type="compact" />
							<Item onClick={onNavDisplayNext}>Picture Modes</Item>
							<Item onClick={onNavDisplayNext}>Color Adjust</Item>
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
					<TabPanels index={indexSound} onBack={onNavSoundPrev}>
						<TabPanel>
							<Header title="Sound Settings" type="compact" />
							<Item onClick={onNavSoundNext}>Advanced Audio</Item>
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
					<TabPanels index={indexNetwork} onBack={onNavNetworkPrev}>
						<TabPanel>
							<Header title="Network Settings" type="compact" />
							<Item onClick={onNavNetworkNext}>Wired</Item>
							<Item onClick={onNavNetworkNext}>Wireless</Item>
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
		);
	}
});

const PopupTabLayoutStoryDecorator = compose(
	Changeable({prop: 'indexDisplay', change: 'onNavDisplay'}),
	Changeable({prop: 'indexSound', change: 'onNavSound'}),
	Changeable({prop: 'indexNetwork', change: 'onNavNetwork'})
);

const PopupTabLayoutStory = PopupTabLayoutStoryDecorator(PopupTabLayoutStoryBase);

storiesOf('Sandstone', module)
	.add(
		'PopupTabLayout',
		() => {
			const defaultOpen = false;
			const [open, setOpenState] = React.useState(defaultOpen);
			const toggleOpen = () => setOpenState(!open);
			const handleClose = compose(toggleOpen, action('onClose'));

			return (<div>
				<Button onClick={toggleOpen} icon={open ? 'circle' : 'gear'}>Open PopupTabLayout</Button>

				<PopupTabLayoutStory
					open={open}
					onClose={handleClose}
				/>
			</div>);
		},
		{
			info: {
				text: 'Intended for use with a single "control" at a time, to maximize the amount of background visible.'
			}
		}
	);
