/* eslint-disable react/jsx-no-bind */
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import ri from '@enact/ui/resolution';
import React from 'react';

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
			open4: false,
			panelIndex: 0
		};

		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true});

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false});

	nextPanel = () => this.setState({panelIndex: 1});

	prevPanel = () => this.setState({panelIndex: 0});

	render () {
		return (
			<>
				<Button onClick={this.handleOpen1}>Settings Popup</Button>
				<Button onClick={this.handleOpen2}>Option detail Popup</Button>
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
						<Item onClick={this.nextPanel}>Example Item 1</Item>
						<Item onClick={this.nextPanel}>Example Item 2</Item>
						<Item onClick={this.nextPanel}>Example Item 3</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option</title>
						</Header>
						<Item onClick={this.prevPanel}>Example Item 1</Item>
						<Item onClick={this.prevPanel}>Example Item 2</Item>
						<Item onClick={this.prevPanel}>Example Item 3</Item>
					</Panel>
				</FixedPopupPanels>
			</>
		);
	}
}

export default FixedPopupPanelsView;
