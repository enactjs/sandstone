import Calendar, {CalendarBase} from '@enact/sandstone/Calendar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {useEffect, useState} from "react";

Calendar.displayName = 'Calendar';
const Config = mergeComponentMetadata('Calendar', CalendarBase, Calendar);

export default {
	title: 'Sandstone/Calendar',
	component: 'Calendar'
};

const days = [6, 12, 15, 20, 22, 28];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
const years = [2021, 2022, 2023, 2024, 2025, 2026];

export const _Calendar = (args) => {
	const [day, setDay] = useState(new Date(args['year'], months.indexOf(args['month']), args['day']));

	useEffect(() => setDay(new Date(args['year'], months.indexOf(args['month']), args['day'])), [args]);

	return (
		<Calendar
			disabled={args['disabled']}
			selectedDate={day}
			setSelectedDate={setDay}
		/>
	);
};

boolean('disabled', _Calendar, Config);
select('day', _Calendar, days, Config, 6);
select('month', _Calendar, months, Config, 'February');
select('year', _Calendar, years, Config, 2025);

_Calendar.storyName = 'Calendar';
_Calendar.parameters = {
	info: {
		text: 'Standalone Calendar component. The component used in Input type="date".'
	}
};
