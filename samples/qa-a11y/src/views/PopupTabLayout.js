import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
import Group from '@enact/ui/Group';
import React from 'react';

class PopupTabLayoutView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			indexDisplay: 0,
			indexNetwork: 0,
			indexSound: 0,
			open: false
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})

	handleDisplayNext = () => this.setState((state) => ({indexDisplay: state.indexDisplay + 1}))
	handleDisplayPrev = () => this.setState((state) => ({indexDisplay: state.indexDisplay - 1}))
	handleNetworkNext = () => this.setState((state) => ({indexNetwork: state.indexNetwork + 1}))
	handleNetworkPrev = () => this.setState((state) => ({indexNetwork: state.indexNetwork - 1}))
	handleSoundNext = () => this.setState((state) => ({indexDisplay: state.indexSound + 1}))
	handleSoundPrev = () => this.setState((state) => ({indexDisplay: state.indexSound - 1}))

	render () {
		const {
			indexDisplay,
			indexNetwork,
			indexSound,
			open
		} = this.state;

		return (
			<>
				<Button onClick={this.handleOpen}>Open</Button>

				<PopupTabLayout
					onClose={this.handleClose}
					open={open}
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
				</PopupTabLayout>
			</>
		);
	}
}

export default PopupTabLayoutView;
