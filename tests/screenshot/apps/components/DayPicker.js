import DayPicker from '../../../../DayPicker';

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
	}
];

export default DayPickerTests;
