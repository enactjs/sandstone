import DatePicker, {dateToLocaleString} from '@enact/sandstone/DatePicker';
import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

class DatePickerItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			value: null
		};
	}

	handleClose = () => this.setState({open: false})
	handleOpen = () => this.setState({open: true})
	handleChange = ({value}) => this.setState({value: dateToLocaleString(value)})

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
		<Section title="Default">
			<DatePickerItem alt="Normal" title="Date"/>
			<DatePickerItem alt="Disabled" disabled title="Date"/>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<DatePickerItem
				alt="Aria-labelled"
				dayAriaLabel="Day picker"
				monthAriaLabel="Month picker"
				title="Date"
				yearAriaLabel="Year picker"
			/>
			<DatePickerItem
				alt="Aria-labelled and Disabled"
				dayAriaLabel="Day picker"
				disabled
				monthAriaLabel="Month picker"
				title="Date"
				yearAriaLabel="Year picker"
			/>
		</Section>
	</>
);

export default DatePickerView;
