import TimePicker from '@enact/sandstone/TimePicker';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('TimePicker', TimePicker);
TimePicker.displayName = 'TimePicker';

export default {
	title: 'Sandstone/TimePicker',
	component: 'TimePicker'
};

export const _TimePicker = (args) => (
	<TimePicker
		disabled={args['disabled']}
		spotlightDisabled={args['spotlightDisabled']}
		noLabel={args['noLabel']}
		hourAriaLabel={args['hourAriaLabel']}
		minuteAriaLabel={args['minuteAriaLabel']}
		meridiemAriaLabel={args['meridiemAriaLabel']}
		onChange={action('onChange')}
		onComplete={action('onComplete')}
	/>
);

boolean('disabled', _TimePicker, Config);
boolean('spotlightDisabled', _TimePicker, Config);
boolean('noLabel', _TimePicker, Config);
text('hourAriaLabel', _TimePicker, Config, '');
text('minuteAriaLabel', _TimePicker, Config, '');
text('meridiemAriaLabel', _TimePicker, Config, '');

_TimePicker.storyName = 'TimePicker';
_TimePicker.parameters = {
	info: {
		text: 'The basic TimePicker'
	}
};
