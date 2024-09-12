/* eslint-disable react/jsx-no-bind */

import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import TimePicker, {timeToLocaleString} from '@enact/sandstone/TimePicker';
import {useState} from 'react';

import Section from '../components/Section';
import useArrayState from '../components/useArrayState';

import appCss from '../App/App.module.scss';

const TimePickerItem = (props) => {
	const [open, handleOpen] = useArrayState(1);
	const [value, setValue] = useState(null);

	const handleChange = ({value: newValue}) => setValue(timeToLocaleString(newValue));

	return (
		<>
			<Item label={value || 'Not selected'} onClick={handleOpen(0, true)}>Time</Item>
			<FixedPopupPanels
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<Panel>
					<Header>
						<title>Header Title</title>
						<subtitle>Subtitle</subtitle>
					</Header>
					<TimePicker
						{...props}
						onChange={handleChange}
					/>
				</Panel>
			</FixedPopupPanels>
		</>
	);
};

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

		<Section className={appCss.marginTop} title="Aria-labelled">
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
