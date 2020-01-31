import DatePicker from '../../../../DatePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<DatePicker
			id="datePickerDefaultClosedWithoutNoneText"
			title="Date Picker Default"
		/>
		<DatePicker
			id="datePickerDefaultClosedWithNoneText"
			noneText="Nothing Selected"
			title="Date Picker Default With noneText"
		/>
		<DatePicker
			id="datePickerDefaultOpenWithNoneText"
			defaultOpen
			noneText="Nothing Selected"
			title="Date Picker Default Open"
		/>
		<DatePicker
			id="datePickerWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			title="Date Picker With Default Value"
		/>
		<DatePicker
			id="datePickerNoLabels"
			noLabels
			title="Date Picker noLabels"
		/>
		<DatePicker
			id="datePickerDisabledWithNoneText"
			disabled
			noneText="Nothing Selected"
			title="Date Picker Disabled"
		/>
		<DatePicker
			id="datePickerDisabledOpenWithNoneText"
			defaultOpen
			disabled
			noneText="Nothing Selected"
			title="Date Picker Disabled Open"
		/>
		<DatePicker
			id="datePickerDisabledOpenWithDefaultValue"
			defaultOpen
			defaultValue={new Date(2009, 5, 6)}
			disabled
			noneText="Nothing Selected"
			title="Date Picker Disabled Open With Default Value"
		/>
		<DatePicker
			id="datePickerDisabledWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			disabled
			noneText="Nothing Selected"
			title="Date Picker Disabled With Default Value"
		/>
		<DatePicker
			id="datePickerDefaultOpenWithDefaultValue"
			defaultOpen
			defaultValue={new Date(2009, 5, 6)}
			noneText="Nothing Selected"
			title="Date Picker Default Open With Default Value"
		/>
	</div>
</div>;

export default ThemeDecorator(app);
