import DayPicker from '../../../../DayPicker';

import {withConfig} from "./utils";

const DayPickerTests = [
	<DayPicker />,
	<DayPicker selected={1} />,
	<DayPicker disabled />,
	<DayPicker disabled selected={1} />,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <DayPicker />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker selected={1} />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker disabled />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker disabled selected={1} />
	},

	...withConfig({focus: true}, [
		<DayPicker selected={2} />,
		<DayPicker disabled selected={2} />
	])
];

export default DayPickerTests;
