/* eslint-disable react/jsx-no-bind */

import DatePicker, {dateToLocaleString} from '@enact/sandstone/DatePicker';
import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import React from 'react';

import Section from '../components/Section';
import useEventHandlers from '../components/useEventHandlers';

import appCss from '../App/App.module.less';

const DatePickerItem = (props) => {
	const [open, handleOpen] = useEventHandlers(1);
	const [value, setValue] = React.useState(null);
	const handleChange = ({value: newValue}) => setValue(dateToLocaleString(newValue));

	return (
		<>
			<Item label={value || 'Not selected'} onClick={handleOpen(0, true)}>Date</Item>
			<FixedPopupPanels
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<Panel>
					<Header>
						<title>Header Title</title>
						<subtitle>Subtitle</subtitle>
					</Header>
					<DatePicker
						{...props}
						onChange={handleChange}
					/>
				</Panel>
			</FixedPopupPanels>
		</>
	);
};

const DatePickerView = () => (
	<>
		<Section title="Default">
			<DatePickerItem alt="Normal" title="Date" />
			<DatePickerItem alt="Disabled" disabled title="Date" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
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
