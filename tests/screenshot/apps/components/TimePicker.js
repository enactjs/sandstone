import TimePicker from '../../../../TimePicker';

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
	}
];
export default TimePickerTests;
