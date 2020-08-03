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
			open0: false,
			open1: false,
			open2: false,
			open3: false,

			index0: 0,
			index1: 0,
			index2: 0,
			index3: 0,
		};

		this.handleOpen0 = this.handleOpen(0);
		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);
		this.handleOpen3 = this.handleOpen(3);

		this.handleClose0 = this.handleClose(0);
		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true})

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false})

	nextPanel = (expNum) => () => this.setState({['index' + expNum]: 1})

	prevPanel = (expNum) => () => this.setState({['index' + expNum]: 0})

	render () {
		return (<>
			<Section title="Default">
				<Button alt="With Title and Subtitle" onClick={this.handleOpen0}>Open 0</Button>
				<Button alt="With Title" onClick={this.handleOpen1}>Open 1</Button>
				<Button alt="With Title and Disabled Items" onClick={this.handleOpen2}>Open 2</Button>

				<FixedPopupPanels
					index={this.state.index0}
					onClose={this.handleClose0}
					open={this.state.open0}
				>
					<Panel>
						<Header>
							<title>Header Title 0</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<Scroller direction="vertical" style={{height: ri.scaleToRem(780)}}>
							{itemData.map((item, i) => <Item key={i} onClick={this.nextPanel(0)}>{item}</Item>)}
						</Scroller>
						<Button onClick={this.nextPanel(0)}>Text 0</Button>
						<Button onClick={this.nextPanel(0)}>Text 1</Button>
					</Panel>
					<Panel>
						<Header>
							<title>Header Title 1</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<Scroller direction="vertical" style={{height: ri.scaleToRem(408)}}>
							{itemData.map((item, i) => <Item key={i} onClick={this.prevPanel}>{item}</Item>)}
						</Scroller>
						<Button onClick={this.prevPanel}>Text 0</Button>
						<Button onClick={this.prevPanel}>Text 1</Button>
					</Panel>
				</FixedPopupPanels>

				<FixedPopupPanels
					index={this.state.index1}
					onClose={this.handleClose1}
					open={this.state.open1}
				>
					<Panel>
						<Header>
							<title>Option 0</title>
						</Header>
						<Item onClick={this.nextPanel(1)}>Item 0</Item>
						<Item onClick={this.nextPanel(1)}>Item 1</Item>
						<Item onClick={this.nextPanel(1)}>Item 2</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option 1</title>
						</Header>
						<Item onClick={this.prevPanel(1)}>Item 0</Item>
						<Item onClick={this.prevPanel(1)}>Item 1</Item>
						<Item onClick={this.prevPanel(1)}>Item 2</Item>
					</Panel>
				</FixedPopupPanels>

				<FixedPopupPanels
					index={this.state.index2}
					onClose={this.handleClose2}
					open={this.state.open2}
				>
					<Panel>
						<Header>
							<title>Option 2</title>
						</Header>
						<Item onClick={this.nextPanel(2)} disabled>Item 0</Item>
						<Item onClick={this.nextPanel(2)} disabled>Item 1</Item>
						<Item onClick={this.nextPanel(2)}>Item 2</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option 3</title>
						</Header>
						<Item onClick={this.prevPanel(2)} disabled>Item 0</Item>
						<Item onClick={this.prevPanel(2)} disabled>Item 1</Item>
						<Item onClick={this.prevPanel(2)}>Item 2</Item>
					</Panel>
				</FixedPopupPanels>
			</Section>

			<Section title="Variation">
				<Button alt={'Scroller with focusableScrollbar="byEnter"'} onClick={this.handleOpen3}>Open 3</Button>

				<FixedPopupPanels
					index={this.state.index3}
					onClose={this.handleClose3}
					open={this.state.open3}
				>
					<Panel>
						<Header>
							<title>Header Title 0</title>
						</Header>
						<Scroller direction="vertical" focusableScrollbar="byEnter" style={{height: 100}}>
							<span>Text 0</span>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</Scroller>
						<Item onClick={this.nextPanel(3)}>Text 1</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Header Title 1</title>
						</Header>
						<Scroller aria-label="This is Scroller." direction="vertical" focusableScrollbar="byEnter" style={{height: 100}}>
							<span>Text 0</span>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</Scroller>
						<Item onClick={this.prevPanel(3)}>Text 1</Item>
					</Panel>
				</FixedPopupPanels>
			</Section>
		</>);
	}
}

export default FixedPopupPanelsView;
