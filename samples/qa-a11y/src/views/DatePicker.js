import DatePicker, {dateToLocaleString} from '@enact/sandstone/DatePicker';
import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import React from 'react';

class DatePickerItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			value: null
		};
	}

	handleClose = () => this.setState({open: false});
	handleOpen = () => this.setState({open: true});
	handleChange = ({value}) => this.setState({value: dateToLocaleString(value)});

	render () {
		return (
			<>
				<Item label={this.state.value || 'Not selected'} onClick={this.handleOpen}>Date</Item>
				<FixedPopupPanels
					onClose={this.handleClose}
					open={this.state.open}
				>
					<Panel>
						<Header>
							<title>Header Title</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<DatePicker
							{...this.props}
							onChange={this.handleChange}
						/>
					</Panel>
				</FixedPopupPanels>
			</>
		);
	}
}

const DatePickerView = () => (
	<>
		<Heading showLine>DatePicker</Heading>
		<DatePickerItem
			title="Date"
		/>

		<h2>Customizable aria-labels</h2>
		<Heading showLine>DatePicker</Heading>
		<DatePickerItem
			dayAriaLabel="Day picker"
			monthAriaLabel="Month picker"
			title="Date"
			yearAriaLabel="Year picker"
		/>
	</>
);

export default DatePickerView;
