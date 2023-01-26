import DayPicker from '@enact/sandstone/DayPicker';
import Scroller from '@enact/sandstone/Scroller';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, text} from '@enact/storybook-utils/addons/controls';

DayPicker.displayName = 'DayPicker';

export default {
	title: 'Sandstone/DayPicker',
	component: 'DayPicker'
};

export const _DayPicker = (args) => (
	<Scroller>
		<DayPicker
			aria-label={args['aria-label']}
			disabled={args['disabled']}
			selected={args['selected']}
			onSelect={action('onSelect')}
		/>
	</Scroller>
);

text('aria-label', _DayPicker, DayPicker);
boolean('disabled', _DayPicker, DayPicker);
number('selected', _DayPicker, DayPicker);

_DayPicker.storyName = 'DayPicker';
_DayPicker.parameters = {
	info: {
		text: 'The basic DayPicker'
	}
};
