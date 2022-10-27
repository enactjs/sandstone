import DayPicker from '@enact/sandstone/DayPicker';
import Scroller from '@enact/sandstone/Scroller';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';

DayPicker.displayName = 'DayPicker';

export default {
	title: 'Sandstone/DayPicker',
	component: 'DayPicker',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _DayPicker = (args) => (
	<Scroller>
		<DayPicker
			aria-label={args['aria-label']}
			disabled={args['disabled']}
			onSelect={action('onSelect')}
		/>
	</Scroller>
);

text('aria-label', _DayPicker, DayPicker);
boolean('disabled', _DayPicker, DayPicker);

_DayPicker.storyName = 'DayPicker';
_DayPicker.parameters = {
	info: {
		text: 'The basic DayPicker'
	}
};
