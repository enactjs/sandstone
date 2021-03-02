import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import DayPicker from '@enact/sandstone/DayPicker';
import Scroller from '@enact/sandstone/Scroller';

DayPicker.displayName = 'DayPicker';

export default {
	title: 'Sandstone/DayPicker',
	component: 'DayPicker'
};

export const _DayPicker = () => (
	<Scroller>
		<DayPicker
			aria-label={text('aria-label', DayPicker)}
			disabled={boolean('disabled', DayPicker)}
			onSelect={action('onSelect')}
		/>
	</Scroller>
);

_DayPicker.storyName = 'DayPicker';
_DayPicker.parameters = {
	info: {
		text: 'The basic DayPicker'
	}
};
