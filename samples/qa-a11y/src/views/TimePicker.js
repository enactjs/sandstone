import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import TimePicker, {timeToLocaleString} from '@enact/sandstone/TimePicker';
import React from 'react';

class TimePickerItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			value: null
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})
	handleChange = ({value}) => this.setState({value: timeToLocaleString(value)})

	render () {
		return (
			<>
				<Item label={this.state.value || 'Not selected'} onClick={this.handleOpen}>Time</Item>
				<FixedPopupPanels
					onClose={this.handleClose}
					open={this.state.open}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<TimePicker
							{...this.props}
							onChange={this.handleChange}
						/>
					</Panel>
				</FixedPopupPanels>
			</>
		);
	}
}

const TimePickerView = () => (
	<>
		<Heading showLine>TimePicker</Heading>
		<TimePickerItem
			title="Time"
		/>

		<h2>Customizable aria-labels</h2>
		<Heading showLine>TimePicker</Heading>
		<TimePickerItem
			hourAriaLabel="Hour picker"
			meridiemAriaLabel="Meridiem picker"
			minuteAriaLabel="Minute picker"
			title="Time"
		/>
	</>
);

export default TimePickerView;
