import DatePicker from '../../../../DatePicker';
import {generateDate} from '@enact/ui-test-utils/utils';
import React from 'react';


const jan31 = generateDate('2019-01-31');

const DatePickerTests = [
	<DatePicker />,
	<DatePicker defaultValue={jan31} />,
	<DatePicker defaultValue={jan31} disabled />,
	<DatePicker disabled />,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <DatePicker />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker disabled />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker defaultValue={jan31} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker defaultValue={jan31} disabled />
	}
];
export default DatePickerTests;
