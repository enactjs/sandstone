import Button from '@enact/sandstone/Button';
import {FlexiblePopupPanels, Header, Panel} from '@enact/sandstone/FlexiblePopupPanels';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';

class FlexiblePopupPanelsView extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			index: 0,
			open: false
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})

	onNextPanel = () => this.setState((state) => ({index: state.index + 1}))
	onPrevPanel = () => this.setState((state) => ({index: state.index - 1}))

	render () {
		const {index, open} = this.state;
		const prevButton = <Button icon="closex" aria-label="This is Exit." onClick={this.handleClose} />;
		const nextButton = <Button icon="closex" aria-label="This is Quit." onClick={this.handleClose} />;

		return (
			<Section title="Default">
				<Button alt="Normal" onClick={this.handleOpen}>Open</Button>

				<FlexiblePopupPanels
					index={index}
					open={open}
					onNextClick={this.onNextPanel}
					onPrevClick={this.onPrevPanel}
					noCloseButton
				>
					<Panel prevButton={prevButton}>
						<Header title="List of options" />
						<Scroller style={{width: ri.scaleToRem(900)}}>
							<Item onClick={this.onNextPanel}>Item 1</Item>
							<Item onClick={this.onNextPanel}>Item 2</Item>
							<Item onClick={this.onNextPanel}>Item 3</Item>
							<Item onClick={this.onNextPanel}>Item 4</Item>
							<Item onClick={this.onNextPanel} disabled>Item 5</Item>
						</Scroller>
					</Panel>
					<Panel>
						<Header title="Vertical Slider" />
						<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
					</Panel>
					<Panel nextButton={nextButton}>
						<Header title="Third panel" />
						<Scroller style={{width: ri.scaleToRem(900)}}>
							<Item>Item 1</Item>
						</Scroller>
					</Panel>
				</FlexiblePopupPanels>
			</Section>
		);
	}
}

export default FlexiblePopupPanelsView;
