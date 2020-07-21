import DayPicker from '@enact/sandstone/DayPicker';
import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import React from 'react';

import Section from '../components/Section';

class DayPickerItem extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			content: null,
			open: false
		};
	}

	handleClose = () => this.setState({open: false})

	handleOpen = () => this.setState({open: true})

	handleSelect = ({content}) => this.setState({content: content})

	render () {
		return (
			<>
				<Item label={this.state.content || 'Not selected'} onClick={this.handleOpen}>Day</Item>
				<FixedPopupPanels
					onClose={this.handleClose}
					open={this.state.open}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<DayPicker
							{...this.props}
							onSelect={this.handleSelect}
						/>
					</Panel>
				</FixedPopupPanels>
			</>
		);
	}
}

const DayPickerView = () => (
	<>
		<Section title="Default">
			<DayPickerItem alt="Normal" title="Day" />
			<DayPickerItem alt="Disabled" disabled title="Day" />
		</Section>
	</>
);

export default DayPickerView;
