import TimePicker from '../../../../TimePicker';

const TimePickerTests = [
	<TimePicker defaultValue={new Date(2009, 5, 6)} />,
	<TimePicker disabled value={new Date()} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <TimePicker defaultValue={new Date(2009, 5, 6)} />
	},
	{
		locale: 'ar-SA',
		component: <TimePicker disabled value={new Date()} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <TimePicker disabled value={new Date()} />
	}
];
export default TimePickerTests;
