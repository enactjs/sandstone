import {generateDate} from '@enact/ui-test-utils/utils';

import DatePicker from '../../../../DatePicker';

import {withConfig} from "./utils";

const jan30 = generateDate('2019-01-30');
const jan31 = generateDate('2019-01-31');
const maxYear = generateDate('2099-01-30');
const minYear = generateDate('1900-01-30');

const DatePickerTests = [
	<DatePicker defaultValue={jan31} />,
	<DatePicker defaultValue={jan31} disabled />,
	<DatePicker defaultValue={jan31} noLabel />,
	// with max/min value [QWTC-2094]
	<DatePicker defaultValue={maxYear} noLabel />,
	<DatePicker defaultValue={minYear} noLabel />,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <DatePicker defaultValue={jan31} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker defaultValue={jan31} disabled />
	},
	// *************************************************************
	// large text [QWTC-2092]
	{
		textSize: 'large',
		component: <DatePicker defaultValue={jan31} disabled />
	},

	// *************************************************************
	// focused
	// *************************************************************
	...withConfig({focus: true}, [
		<DatePicker defaultValue={jan30} />,
		<DatePicker defaultValue={jan30} disabled />,
		<DatePicker defaultValue={jan30} noLabel />
	])
];
export default DatePickerTests;
