import DatePicker from '../../../../DatePicker';
import {generateDate} from '@enact/ui-test-utils/utils';
import React from 'react';


const jan31 = generateDate('2019-01-31');

const DatePickerTests = [
	<DatePicker title="Date Picker" />,
	<DatePicker title="Date Picker" defaultOpen defaultValue={jan31} />,
	<DatePicker title="Date Picker" defaultOpen defaultValue={jan31} disabled />,
	<DatePicker title="Date Picker" disabled />,
	<DatePicker title="Date Picker" noLabels />,
	<DatePicker title="Date Picker" noneText="ReplacingNoneTextString" />,
	<DatePicker title="Date Picker" defaultOpen defaultValue={jan31} dayLabel="DayLabelTest" />,
	<DatePicker title="Date Picker" defaultOpen defaultValue={jan31} monthLabel="MonthLabelTest" />,
	<DatePicker title="Date Picker" defaultOpen defaultValue={jan31} yearLabel="YearLabelTest" />,
	<DatePicker title="Date Picker" defaultOpen defaultValue={jan31} dayLabel="DayLabelTest" monthLabel="MonthLabelTest" yearLabel="YearLabelTest" />,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" defaultOpen defaultValue={jan31} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" defaultOpen defaultValue={jan31} disabled />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" noLabels />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" noneText="NoneTextString" />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" defaultOpen defaultValue={jan31} dayLabel="DayLabelTest" />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" defaultOpen defaultValue={jan31} monthLabel="MonthLabelTest" />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" defaultOpen defaultValue={jan31} yearLabel="YearLabelTest" />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker title="Date Picker" defaultOpen defaultValue={jan31} dayLabel="DayLabelTest" monthLabel="MonthLabelTest" yearLabel="YearLabelTest" />
	}
];
export default DatePickerTests;
