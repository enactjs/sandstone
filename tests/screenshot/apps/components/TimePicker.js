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
	// start of [QWTC-2102]
	{
		locale: 'es-ES',
		component: <TimePicker defaultValue={new Date(2009, 5, 6)} />
	},
	...withConfig({locale: 'ko-KR'}, [
		<TimePicker defaultValue={new Date(2009, 5, 7, 11)} />,
		<TimePicker defaultValue={new Date(2009, 5, 7, 13)} />
	]),
	...withConfig({locale: 'zh-HK'}, [
		<TimePicker defaultValue={new Date(2009, 5, 7, 11)} />,
		<TimePicker defaultValue={new Date(2009, 5, 7, 13)} />
	]),
	...withConfig({locale: 'am-ET'}, [
		<TimePicker defaultValue={new Date(2009, 5, 7, 9)}>AM</TimePicker>,
		<TimePicker defaultValue={new Date(2009, 5, 7, 12)}>Noon</TimePicker>,
		<TimePicker defaultValue={new Date(2009, 5, 7, 13)}>PM</TimePicker>,
		<TimePicker defaultValue={new Date(2009, 5, 7, 18)}>Evening</TimePicker>,
		<TimePicker defaultValue={new Date(2009, 5, 7, 24)}>Late Evening</TimePicker>
	]),
	// end of [QWTC-2102]

	// *************************************************************
	// focused
	// *************************************************************
	...withConfig({focus: true}, [
		<TimePicker defaultValue={new Date(2009, 5, 7)} />,
		<TimePicker defaultValue={new Date(2009, 5, 7)} disabled />,
		<TimePicker defaultValue={new Date(2009, 5, 7)} noLabel />
	]),

	// with largeText [QWTC-2100]
	...withConfig({
		textSize: 'large'
	}, [
		<TimePicker defaultValue={new Date(2009, 5, 7)} />
	])
];
export default TimePickerTests;
