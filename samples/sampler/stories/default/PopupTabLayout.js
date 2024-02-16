/* eslint-disable react/jsx-no-bind */

import {is} from '@enact/core/keymap';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Popup, {PopupBase} from '@enact/sandstone/Popup';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import {Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {TabLayoutBase} from '@enact/sandstone/TabLayout';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';
import {useState} from 'react';
import compose from 'ramda/src/compose';

import spriteGear2k from '../../images/sprite-gear-2k.png';
import spriteGear4k from '../../images/sprite-gear-4k.png';

PopupTabLayout.displayName = 'PopupTabLayout';
const Config = mergeComponentMetadata('PopupTabLayout', PopupBase, Popup, TabLayoutBase, TabLayout);

const isRight = is('right');

const navPrev = (callback, value, actionName) => () => {
	const index = Math.max(value - 1, 0);
	action(actionName)({index});
	callback(index);
};
const navNext = (callback, value) => () => {
	const index = Math.min(value + 1, 1);
	// action(actionName)({index});
	callback(index);
};

export default {
	title: 'Sandstone/PopupTabLayout',
	component: 'PopupTabLayout'
};

const PopupTabLayoutSamplesBase = ({args, rtl}) => {
	const includeIcons = args['include icons'];

	const [open, setOpenState] = useState(false);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = compose(toggleOpen, action('onClose'));

	const [indexDisplay, setIndexDisplay] = useState(0);
	const [indexGeneral, setIndexGeneral] = useState(0);
	const [indexNetwork, setIndexNetwork] = useState(0);
	const [indexSound, setIndexSound] = useState(0);

	const handleDisplayNext = navNext(setIndexDisplay, indexDisplay, 'onNext');
	const handleDisplayPrev = navPrev(setIndexDisplay, indexDisplay, 'onBack');
	const handleGeneralNext = navNext(setIndexGeneral, indexGeneral, 'onNext');
	const handleGeneralPrev = navPrev(setIndexGeneral, indexGeneral, 'onBack');
	const handleNetworkNext = navNext(setIndexNetwork, indexNetwork, 'onNext');
	const handleNetworkPrev = navPrev(setIndexNetwork, indexNetwork, 'onBack');
	const handleSoundNext = navNext(setIndexSound, indexSound, 'onNext');
	const handleSoundPrev = navPrev(setIndexSound, indexSound, 'onBack');

	// Navigate menus with the right key. The left key is handled by framework.
	const handleKeyDown = (setState, state) => (ev) => {
		const {keyCode} = ev;

		if (!rtl && isRight(keyCode)) {
			navNext(setState, state, 'onNext')();
		}
	};

	return (
		<div>
			<Button focusEffect="static" onClick={toggleOpen}>
				Open PopupTabLayout
			</Button>

			<PopupTabLayout
				open={open}
				onClose={handleClose}
				noAnimation={args['noAnimation']}
				noAutoDismiss={args['noAutoDismiss']}
				onTabAnimationEnd={action('onTabAnimationEnd')}
				onHide={action('onHide')}
				onSelect={action('onSelect')}
				onShow={action('onShow')}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
			>
				<Tab
					icon={includeIcons ? 'picture' : null}
					onTabClick={action('onTabClick')}
					title="Display"
				>
					<TabPanels index={indexDisplay} onBack={handleDisplayPrev}>
						<TabPanel>
							<Header title="Display Settings" type="compact" />
							<Item onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>Picture Modes</Item>
							<Item onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>Color Adjust</Item>
						</TabPanel>
						<TabPanel>
							<Header title="Picture Modes" type="compact" />
							<Scroller>
								<Group childComponent={Item} component="div" select="radio" selectedProp="selected">
									{[
										'Vivid',
										'Standard',
										'Game',
										'HDR',
										'News',
										'Cinema',
										'APS',
										'Custom',
										'Custom 2',
										'Expert',
										'Expert 2'
									]}
								</Group>
							</Scroller>
						</TabPanel>
					</TabPanels>
				</Tab>
				<Tab icon={includeIcons ? 'speaker' : null} onTabClick={action('onTabClick')} title="Sound">
					<TabPanels index={indexSound} onBack={handleSoundPrev}>
						<TabPanel>
							<Header title="Sound Settings" type="compact" />
							<Item onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)}>Advanced Audio</Item>
						</TabPanel>
						<TabPanel>
							<Header title="Advanced Audio Settings" type="compact" />
							<Group childComponent={Item} component="div" select="radio" selectedProp="selected">
								{['Balance', 'Fade']}
							</Group>
						</TabPanel>
					</TabPanels>
				</Tab>
				<Tab
					icon={includeIcons ? 'arrowupdown' : null}
					onTabClick={action('onTabClick')}
					title="Network"
				>
					<TabPanels index={indexNetwork} onBack={handleNetworkPrev}>
						<TabPanel>
							<Header title="Network Settings" type="compact" />
							<Item onClick={handleNetworkNext} onKeyDown={handleKeyDown(setIndexNetwork, indexNetwork)}>Wired</Item>
							<Item onClick={handleNetworkNext} onKeyDown={handleKeyDown(setIndexNetwork, indexNetwork)}>Wireless</Item>
						</TabPanel>
						<TabPanel>
							<Header title="Wired Settings" type="compact" />
							<Group childComponent={Item} component="div" select="radio" selectedProp="selected">
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
					<TabPanels index={indexGeneral} onBack={handleGeneralPrev}>
						<TabPanel>
							<Header title="General Settings" type="compact" />
							<Item onClick={handleGeneralNext} onKeyDown={handleKeyDown(setIndexGeneral, indexGeneral)}>About</Item>
							<Item onClick={handleGeneralNext} onKeyDown={handleKeyDown(setIndexGeneral, indexGeneral)}>Reset</Item>
						</TabPanel>
						<TabPanel>
							<Header title="Wired Settings" type="compact" />
							<Group childComponent={Item} component="div" select="radio" selectedProp="selected">
								{['Version number', 'Restore factory settings']}
							</Group>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</div>
	);
};

PopupTabLayoutSamplesBase.propTypes = {
	args: PropTypes.object,
	rtl: PropTypes.bool
};

const PopupTabLayoutSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	PopupTabLayoutSamplesBase
);
export const _PopupTabLayout = (args) => <PopupTabLayoutSamples args={args} />;

boolean('include icons', _PopupTabLayout, Config, true);
boolean('noAnimation', _PopupTabLayout, Config);
boolean('noAutoDismiss', _PopupTabLayout, Config);
select(
	'scrimType',
	_PopupTabLayout,
	['none', 'translucent', 'transparent'],
	Config,
	'translucent'
);
select(
	'spotlightRestrict',
	_PopupTabLayout,
	['self-first', 'self-only'],
	Config,
	'self-only'
);

_PopupTabLayout.storyName = 'PopupTabLayout';
_PopupTabLayout.parameters = {
	info: {
		text:
			'Intended for use with a single "control" at a time, to maximize the amount of background visible.'
	}
};
