/* eslint-disable react/jsx-no-bind */

import DayPicker from '@enact/sandstone/DayPicker';
import {FixedPopupPanels, Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import {useState} from 'react';

import Section from '../components/Section';
import useArrayState from '../components/useArrayState';

const DayPickerItem = (props) => {
	const [open, handleOpen] = useArrayState(1);
	const [value, setValue] = useState(null);

	const handleSelect = ({content}) => setValue(content);

	return (
		<>
			<Item label={value || 'Not selected'} onClick={handleOpen(0, true)}>Day</Item>
			<FixedPopupPanels
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<Panel>
					<Header>
						<title>Header Title</title>
						<subtitle>Subtitle</subtitle>
					</Header>
					<DayPicker
						{...props}
						onSelect={handleSelect}
					/>
				</Panel>
			</FixedPopupPanels>
		</>
	);
};

const DayPickerView = () => (
	<>
		<Section title="Default">
			<DayPickerItem alt="Normal" title="Day" />
			<DayPickerItem alt="Disabled" disabled title="Day" />
		</Section>
	</>
);

export default DayPickerView;
