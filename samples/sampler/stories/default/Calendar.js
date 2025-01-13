import Calendar, {CalendarBase} from '@enact/sandstone/Calendar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean} from '@enact/storybook-utils/addons/controls';

Calendar.displayName = 'Calendar';
const Config = mergeComponentMetadata('Calendar', CalendarBase, Calendar);

export default {
	title: 'Sandstone/Calendar',
	component: 'Calendar'
};

export const _Calendar = (args) => (
	<Calendar
		disabled={args['disabled']}
	/>
);

boolean('disabled', _Calendar, Config);

_Calendar.storyName = 'Calendar';
_Calendar.parameters = {
	info: {
		text: 'Standalone Calendar component. The component used in Input type="date".'
	}
};
