import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import TimePicker from '@enact/sandstone/TimePicker';

const Config = mergeComponentMetadata('TimePicker', TimePicker);
TimePicker.displayName = 'TimePicker';

export default {
	title: 'Sandstone/TimePicker',
	component: 'TimePicker'
};

export const _TimePicker = () => (
	<TimePicker
		disabled={boolean('disabled', Config)}
		spotlightDisabled={boolean('spotlightDisabled', Config)}
		noLabel={boolean('noLabel', Config)}
		hourAriaLabel={text('hourAriaLabel', Config, '')}
		minuteAriaLabel={text('minuteAriaLabel', Config, '')}
		meridiemAriaLabel={text('meridiemAriaLabel', Config, '')}
		onChange={action('onChange')}
		onComplete={action('onComplete')}
	/>
);

_TimePicker.storyName = 'TimePicker';
_TimePicker.parameters = {
	info: {
		text: 'The basic TimePicker'
	}
};
