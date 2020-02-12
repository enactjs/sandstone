import DayPicker from '../../../../DayPicker';
import React from 'react';

const DayPickerTests = [
	<DayPicker title="Day Picker" />,
	<DayPicker title="DayPicker Picker" open />,
	<DayPicker title="Day Picker" open disabled />,
	<DayPicker title="Day Picker" disabled />,
	<DayPicker title="Day Picker" noneText="none" disabled />,
	<DayPicker title="Day Picker" noneText="none" />,
	<DayPicker title="Day Picker" noneText="ReplacingNoneTextString" />,
	<DayPicker title="Day Picker" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} everyDayText="Every Day" />,
	<DayPicker title="Day Picker" defaultOpen selected={[1, 2, 3, 4, 5]} everyWeekdayText="Every Weekday" />,
	<DayPicker title="Day Picker" defaultOpen selected={[0, 6]} everyWeekendText="Every Weekend" />,
	<DayPicker title="Day Picker" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} everyDayText="Every Day" disabled />,
	<DayPicker title="Day Picker" defaultOpen selected={[1, 2, 3, 4, 5]} everyWeekdayText="Every Weekday" disabled />,
	<DayPicker title="Day Picker" defaultOpen selected={[0, 6]} everyWeekendText="Every Weekend" disabled />,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="DayPicker Picker" open />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" open disabled />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" disabled />
	},
	<DayPicker title="Day Picker" noneText="none" disabled />,
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" noneText="none" />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" noneText="ReplacingNoneTextString" />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} everyDayText="Every Day" />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" defaultOpen selected={[1, 2, 3, 4, 5]} everyWeekdayText="Every Weekday" />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" defaultOpen selected={[0, 6]} everyWeekendText="Every Weekend" />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} everyDayText="Every Day" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" defaultOpen selected={[1, 2, 3, 4, 5]} everyWeekdayText="Every Weekday" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker title="Day Picker" defaultOpen selected={[0, 6]} everyWeekendText="Every Weekend" disabled />
	}
];
export default DayPickerTests;
