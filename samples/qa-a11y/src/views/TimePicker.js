import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import TimePicker, {timeToLocaleString} from '@enact/sandstone/TimePicker';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

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
		<Section title="Default">
			<TimePickerItem
				alt="Normal"
				title="Time"
			/>

			<TimePickerItem
				alt="Disabled"
				disabled
				title="Time"
			/>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<TimePickerItem
				alt="Normal"
				hourAriaLabel="Hour picker"
				meridiemAriaLabel="Meridiem picker"
				minuteAriaLabel="Minute picker"
				title="Time"
			/>

			<TimePickerItem
				alt="Disabled"
				disabled
				hourAriaLabel="Hour picker"
				meridiemAriaLabel="Meridiem picker"
				minuteAriaLabel="Minute picker"
				title="Time"
			/>
		</Section>
	</>
);

export default TimePickerView;
