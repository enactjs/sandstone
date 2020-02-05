import TimePicker from '../../../../TimePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<TimePicker
			id="timePickerDefaultClosedWithoutNoneText"
			title="Time Picker Default"
		/>
		<TimePicker
			id="timePickerDefaultClosedWithNoneText"
			noneText="Nothing Selected"
			title="Time Picker Default With noneText"
		/>
		<TimePicker
			id="timePickerDefaultOpenWithNoneText"
			defaultOpen
			noneText="Nothing Selected"
			title="Time Picker Default Open"
		/>
		<TimePicker
			id="timePickerWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			title="Time Picker With Default Value"
		/>
		<TimePicker
			id="timePickerNoLabels"
			noLabels
			title="Time Picker noLabels"
		/>
		<TimePicker
			id="timePickerDisabledWithNoneText"
			disabled
			noneText="Nothing Selected"
			title="Time Picker Disabled"
		/>
		<TimePicker
			id="timePickerDisabledOpenWithNoneText"
			defaultOpen
			disabled
			noneText="Nothing Selected"
			title="Time Picker Disabled Open"
		/>
		<TimePicker
			id="timePickerDisabledOpenWithDefaultValue"
			defaultOpen
			defaultValue={new Date(2009, 5, 6)}
			disabled
			noneText="Nothing Selected"
			title="Time Picker Disabled Open With Default Value"
		/>
		<TimePicker
			id="timePickerDisabledWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			disabled
			noneText="Nothing Selected"
			title="Time Picker Disabled With Default Value"
		/>
		<TimePicker
			id="timePickerDefaultOpenWithDefaultValue"
			defaultOpen
			defaultValue={new Date(2009, 5, 6)}
			noneText="Nothing Selected"
			title="Time Picker Default Open With Default Value"
		/>
	</div>
</div>;

export default ThemeDecorator(app);
