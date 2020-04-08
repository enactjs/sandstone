import DayPicker from '@enact/sandstone/DayPicker';
import Heading from '@enact/sandstone/Heading';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const DayPickerView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<DayPicker
				noneText="none"
				title="Day Picker"
			/>
			<Heading showLine>Customizable labels</Heading>
			<DayPicker
				everyDayText="Selected every day"
				everyWeekdayText="Selected every weekday"
				everyWeekendText="Selected every weekend"
				noneText="none"
				title="Day Picker"
			/>
		</Cell>
	</Layout>
);

export default DayPickerView;
