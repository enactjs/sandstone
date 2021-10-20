import {is} from '@enact/core/keymap';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Group from '@enact/ui/Group';
import {useState} from 'react';

import spriteGear2k from '../webos-meta/sprite-gear-2k.png';
import spriteGear4k from '../webos-meta/sprite-gear-4k.png';


const isRight = is('right');

const navPrev = (callback, value, actionName) => () => {
	const index = Math.max(value - 1, 0);
	callback(index);
};
const navNext = (callback, value) => () => {
	const index = Math.min(value + 1, 1);
	callback(index);
};

const PopupTabLayoutSample = (props) => {
	const [open, setOpenState] = useState(false);
	const toggleOpen = () => setOpenState(!open);
	const handleClose = toggleOpen;

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

		if (!props.rtl && isRight(keyCode)) {
			navNext(setState, state, 'onNext')();
		}
	};

	return (
		<div {...props}>
			<Button focusEffect="static" onClick={toggleOpen}>
				Open PopupTabLayout
			</Button>

			<PopupTabLayout
				open={open}
				onClose={handleClose}
			>
				<Tab
					icon="picture"
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
				<Tab icon="speaker" title="Sound">
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
					icon="arrowupdown"
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
					icon="none"
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

export default ThemeDecorator(PopupTabLayoutSample);
