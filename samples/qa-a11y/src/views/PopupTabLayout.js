/* eslint-disable react/jsx-no-bind */
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import Dropdown from '@enact/sandstone/Dropdown';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import KeyGuide from '@enact/sandstone/KeyGuide';
import {Header} from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import {useCallback, useState} from 'react';

import Section from '../components/Section';

const contextaulMenuItems = ['Item 0', 'Item 1'];
const ContextualMenuButton = ContextualMenuDecorator(Button);
const ContextualPopupButton = Toggleable(
	{prop: 'open', toggle: 'onClick', deactivate: 'onClose'},
	ContextualPopupDecorator(
		Button
	)
);
const keyGuideItems = [
	{icon: 'plus', children: 'Item 0', key: 0},
	{icon: 'minus', children: 'Item 1', key: 1}
];
const TooltipButton = TooltipDecorator(Button);

const PopupTabLayoutView = () => {
	const [indexDisplay, setIndexDisplay] = useState(0);
	const [indexNetwork, setIndexNetwork] = useState(0);
	const [indexSound, setIndexSound] = useState(0);
	const [indexFloatLayer, setIndexFloatLayer] = useState(0);
	const [openPopupTabLayout, setOpenPopupTabLayout] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [openKeyGuide, setOpenKeyGuide] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);

	const handleClose = () => setOpenPopupTabLayout(false);
	const handleOpenPopupTabLayout = () => setOpenPopupTabLayout(true);
	const handleClose1 = () => {
		setOpenPopupTabLayout(false);
		setOpenAlert(false);
	};

	const handleDisplayNext = () => setIndexDisplay(indexDisplay + 1);
	const handleDisplayPrev = () => setIndexDisplay(indexDisplay - 1);
	const handleNetworkNext = () => setIndexNetwork(indexNetwork + 1);
	const handleNetworkPrev = () => setIndexNetwork(indexNetwork - 1);
	const handleSoundNext = () => setIndexSound(indexSound + 1);
	const handleSoundPrev = () => setIndexSound(indexSound - 1);
	const handleFloatPrev = () => setIndexFloatLayer(indexFloatLayer - 1);

	const renderContextualPopup = useCallback(() => (
		<div>
			<Button>Text 0</Button>
			<Button>Text 1</Button>
		</div>
	), []);

	return (
		<Section title="Default">
			<Button alt="Normal" onClick={handleOpenPopupTabLayout}>Open 0</Button>

			<PopupTabLayout
				onClose={handleClose}
				open={openPopupTabLayout}
				spotlightRestrict="self-only"
			>
				<Tab icon="picture" title="Display">
					<TabPanels index={indexDisplay} onBack={handleDisplayPrev} onClose={handleClose}>
						<TabPanel>
							<Header title="Display Settings" type="compact" />
							<Item onClick={handleDisplayNext}>Picture Modes</Item>
							<Item onClick={handleDisplayNext}>Color Adjust</Item>
							<Item onClick={handleDisplayNext} disabled>Energy saving</Item>
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

				<Tab icon="speaker" title="Sound">
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

				<Tab icon="arrowupdown" title="Network">
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

				<Tab icon="speaker" title="FloatLayer">
					<TabPanels index={indexFloatLayer} onBack={handleFloatPrev} onClose={handleClose}>
						<TabPanel>
							<Header title="Components in FloatLayer" type="compact" />

							<Button onClick={() => setOpenAlert(true)}>Open Alert</Button>
							<Dropdown placeholder="Open Dropdown" size="large">
								{['Text 0', 'Text 1']}
							</Dropdown>
							<ContextualMenuButton alt="With Menu Item" menuItems={contextaulMenuItems}>Open ContextualMenuDecorator</ContextualMenuButton>
							<ContextualPopupButton alt="With Buttons" popupComponent={renderContextualPopup} spotlightRestrict="self-only">Open ContextualPopupDecorator</ContextualPopupButton>
							<Input placeholder="Open Input" />
							<Button onClick={() => setOpenKeyGuide(!openKeyGuide)}>Toggle KeyGuide</Button>
							<Button onClick={() => setOpenPopup(true)}>Open Popup</Button>
							<TooltipButton
								aria-label="This is Text."
								tooltipPosition="below right"
								tooltipProps={{'aria-hidden': true}}
								tooltipText="Text"
							>
								TooltipDecorator
							</TooltipButton>

							<Alert
								onClose={() => setOpenAlert(false)}
								open={openAlert}
								title="Heading Title"
							>
								<span>Content</span>
								<buttons>
									<Button onClick={handleClose1}>Text</Button>
								</buttons>
							</Alert>
							<KeyGuide open={openKeyGuide} onClick={() => setOpenKeyGuide(true)}>{keyGuideItems}</KeyGuide>
							<div aria-owns="popup">
								<Popup
									id="popup"
									onClose={() => setOpenPopup(false)}
									open={openPopup}
								>
									<Button>Text 0</Button>
									<Button>Text 1</Button>
								</Popup>
							</div>
						</TabPanel>
					</TabPanels>
				</Tab>
			</PopupTabLayout>
		</Section>
	);
};

export default PopupTabLayoutView;
