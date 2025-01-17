import Calendar, {CalendarBase} from '@enact/sandstone/Calendar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';

Calendar.displayName = 'Calendar';
const Config = mergeComponentMetadata('Calendar', CalendarBase, Calendar);

export default {
	title: 'Sandstone/Calendar',
	component: 'Calendar'
};

export const _Calendar = (args) => {
	return (
		<Calendar
			disabled={args['disabled']}
			setSelectedDate={action('setSelectedDate')}
		/>
	);
};

boolean('disabled', _Calendar, Config);

_Calendar.storyName = 'Calendar';
_Calendar.parameters = {
	info: {
		text: 'Standalone Calendar component. The component used in Input type="date".'
	}
};
