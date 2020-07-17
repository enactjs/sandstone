/* eslint-disable react/jsx-no-bind */
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';

const itemData = [];
for (let i = 0; i < 6; i++) {
	itemData.push(`Item ${i}`);
}

class FixedPopupPanelsView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open1: false,
			open2: false,
			open3: false,
			panelIndex: 0
		};

		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);
		this.handleOpen3 = this.handleOpen(3);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true})

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false})

	nextPanel = () => this.setState({panelIndex: 1})

	prevPanel = () => this.setState({panelIndex: 0})

	render () {
		return (
			<Section title="Default">
				<Button alt="With Title and Subtitle" onClick={this.handleOpen1}>Open</Button>
				<Button alt="With Title" onClick={this.handleOpen2}>Open</Button>
				<Button alt="With Title and Disabled Items" onClick={this.handleOpen3}>Open</Button>

				<FixedPopupPanels
					index={this.state.panelIndex}
					onClose={this.handleClose1}
					open={this.state.open1}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<Scroller direction="vertical" style={{height: ri.scaleToRem(780)}}>
							{itemData.map((item, i) => <Item key={i} onClick={this.nextPanel}>{item}</Item>)}
						</Scroller>
						<Button onClick={this.nextPanel}>Button 1</Button>
						<Button onClick={this.nextPanel}>Button 2</Button>
					</Panel>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<Scroller direction="vertical" style={{height: ri.scaleToRem(408)}}>
							{itemData.map((item, i) => <Item key={i} onClick={this.prevPanel}>{item}</Item>)}
						</Scroller>
						<Button onClick={this.prevPanel}>Button 1</Button>
						<Button onClick={this.prevPanel}>Button 2</Button>
					</Panel>
				</FixedPopupPanels>

				<FixedPopupPanels
					index={this.state.panelIndex}
					onClose={this.handleClose2}
					open={this.state.open2}
				>
					<Panel>
						<Header>
							<title>Option</title>
						</Header>
						<Item onClick={this.nextPanel}>Item 1</Item>
						<Item onClick={this.nextPanel}>Item 2</Item>
						<Item onClick={this.nextPanel}>Item 3</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option</title>
						</Header>
						<Item onClick={this.prevPanel}>Item 1</Item>
						<Item onClick={this.prevPanel}>Item 2</Item>
						<Item onClick={this.prevPanel}>Item 3</Item>
					</Panel>
				</FixedPopupPanels>

				<FixedPopupPanels
					index={this.state.panelIndex}
					onClose={this.handleClose3}
					open={this.state.open3}
				>
					<Panel>
						<Header>
							<title>Option</title>
						</Header>
						<Item onClick={this.nextPanel} disabled>Item 1</Item>
						<Item onClick={this.nextPanel} disabled>Item 2</Item>
						<Item onClick={this.nextPanel}>Item 3</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option</title>
						</Header>
						<Item onClick={this.prevPanel} disabled>Item 1</Item>
						<Item onClick={this.prevPanel} disabled>Item 2</Item>
						<Item onClick={this.prevPanel}>Item 3</Item>
					</Panel>
				</FixedPopupPanels>
			</Section>
		);
	}
}

export default FixedPopupPanelsView;
