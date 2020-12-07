import TimePicker from '../../../../TimePicker';
import React from 'react';

const TimePickerTests = [
	<TimePicker defaultValue={new Date(2009, 5, 6)} />,
	{
		locale: 'ar-SA',
		component: <TimePicker defaultValue={new Date(2009, 5, 6)} />
	}

];
export default TimePickerTests;
