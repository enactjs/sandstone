import TimePicker from '../../../../TimePicker';

import {withConfig} from "./utils";

const TimePickerTests = [
	<TimePicker defaultValue={new Date(2009, 5, 6)} />,
	<TimePicker defaultValue={new Date(2009, 5, 6)} disabled />,
	<TimePicker defaultValue={new Date(2009, 5, 6)} noLabel />,
	// RTL
	{
		locale: 'ar-SA',
		component: <TimePicker defaultValue={new Date(2009, 5, 6)} />
	},
	{
		locale: 'ar-SA',
		component: <TimePicker defaultValue={new Date(2009, 5, 6)} disabled />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <TimePicker defaultValue={new Date(2009, 5, 6)} />
	},

	// *************************************************************
	// focused
	// *************************************************************
	...withConfig({focus: true}, [
		<TimePicker defaultValue={new Date(2009, 5, 7)} />,
		<TimePicker defaultValue={new Date(2009, 5, 7)} disabled />,
		<TimePicker defaultValue={new Date(2009, 5, 7)} noLabel />
	])
];
export default TimePickerTests;
