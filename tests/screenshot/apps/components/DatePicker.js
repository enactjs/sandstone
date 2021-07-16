import DatePicker from '../../../../DatePicker';
import {generateDate} from '@enact/ui-test-utils/utils';


const jan31 = generateDate('2019-01-31');

const DatePickerTests = [
	<DatePicker defaultValue={jan31} />,
	<DatePicker defaultValue={jan31} disabled />,
	<DatePicker defaultValue={jan31} noLabel />,
	// *************************************************************
	// locale = 'ar-SA'
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
