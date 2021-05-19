import DayPicker from '../../../../DayPicker';

const DayPickerTests = [
	<DayPicker />,
	<DayPicker disabled />,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <DayPicker />
	},
	{
		locale: 'ar-SA',
		component: <DayPicker disabled />
	}
];

export default DayPickerTests;
