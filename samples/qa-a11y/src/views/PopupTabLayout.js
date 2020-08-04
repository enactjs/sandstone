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
import React from 'react';

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
	{icon: 'minus', children: 'Item 1', key: 1},
];
const TooltipButton = TooltipDecorator(Button);

class PopupTabLayoutView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			indexDisplay: 0,
			indexNetwork: 0,
			indexSound: 0,

			openPopupTabLayout: false,
			openAlert: false,
			openKeyGuide: false,
			openPopup: false
		};
	}

	handleClose = () => this.setState({openPopupTabLayout: false});
	handleOpenPopupTabLayout = () => this.setState({openPopupTabLayout: true});

	handleDisplayNext = () => this.setState((state) => ({indexDisplay: state.indexDisplay + 1}));
	handleDisplayPrev = () => this.setState((state) => ({indexDisplay: state.indexDisplay - 1}));
	handleNetworkNext = () => this.setState((state) => ({indexNetwork: state.indexNetwork + 1}));
	handleNetworkPrev = () => this.setState((state) => ({indexNetwork: state.indexNetwork - 1}));
	handleSoundNext = () => this.setState((state) => ({indexDisplay: state.indexSound + 1}));
	handleSoundPrev = () => this.setState((state) => ({indexDisplay: state.indexSound - 1}));

	renderContextualPopup = () => (
		<div>
			<Button>Text 0</Button>
			<Button>Text 1</Button>
		</div>
	);

	render () {
		const {
			indexDisplay,
			indexNetwork,
			indexSound,
			openPopupTabLayout,
			openAlert,
			openKeyGuide,
			openPopup
		} = this.state;

		return (
			<>
				<Button onClick={this.handleOpenPopupTabLayout}>Open</Button>

				<PopupTabLayout
					onClose={this.handleClose}
					open={openPopupTabLayout}
					spotlightRestrict="self-only"
				>
					<Tab icon="picture" title="Display">
						<TabPanels index={indexDisplay} onBack={this.handleDisplayPrev} onClose={this.handleClose}>
							<TabPanel>
								<Header title="Display Settings" type="compact" />
								<Item onClick={this.handleDisplayNext}>Picture Modes</Item>
								<Item onClick={this.handleDisplayNext}>Color Adjust</Item>
								<Item onClick={this.handleDisplayNext} disabled>Energy saving</Item>
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
						<TabPanels index={indexSound} onBack={this.handleSoundPrev} onClose={this.handleClose}>
							<TabPanel>
								<Header title="Sound Settings" type="compact" />
								<Item onClick={this.handleSoundNext}>Advanced Audio</Item>
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
						<TabPanels index={indexNetwork} onBack={this.handleNetworkPrev} onClose={this.handleClose}>
							<TabPanel>
								<Header title="Network Settings" type="compact" />
								<Item onClick={this.handleNetworkNext}>Wired</Item>
								<Item onClick={this.handleNetworkNext}>Wireless</Item>
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
						<TabPanels index={indexSound} onBack={this.handleSoundPrev} onClose={this.handleClose}>
							<TabPanel>
								<Header title="Components in FloatLayer" type="compact" />

								<Button onClick={() => this.setState({openAlert: true})}>Open Alert</Button>
								<Dropdown placeholder="Open Dropdown" size="large">
									{['Text 0', 'Text 1']}
								</Dropdown>
								<ContextualMenuButton alt="With Menu Item" menuItems={contextaulMenuItems}>Open ContextualMenuDecorator</ContextualMenuButton>
								<ContextualPopupButton alt="With Buttons" popupComponent={this.renderContextualPopup} spotlightRestrict="self-only">Open ContextualPopupDecorator</ContextualPopupButton>
								<Input placeholder="Open Input" />
								<Button onClick={() => this.setState({openKeyGuide: !openKeyGuide})}>Toggle KeyGuide</Button>
								<Button onClick={() => this.setState({openPopup: true})}>Open Popup</Button>
								<TooltipButton
									aria-label="This is Text."
									tooltipPosition="below right"
									tooltipProps={{'aria-hidden': true}}
									tooltipText="Text"
								>
									TooltipDecorator
								</TooltipButton>

								<Alert
									onClose={() => this.setState({openAlert: false})}
									open={openAlert}
									title="Heading Title"
								>
									<span>Content</span>
									<buttons>
										<Button onClick={this.handleClose1}>Text</Button>
									</buttons>
								</Alert>
								<KeyGuide open={openKeyGuide} onClick={() => this.setState({openKeyGuide: true})}>{keyGuideItems}</KeyGuide>
								<Popup
									onClose={() => this.setState({openPopup: false})}
									open={openPopup}
								>
									<Button>Text 0</Button>
									<Button>Text 1</Button>
								</Popup>
							</TabPanel>
						</TabPanels>
					</Tab>
				</PopupTabLayout>
			</>
		);
	}
}

export default PopupTabLayoutView;
