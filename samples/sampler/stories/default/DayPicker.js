import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, text } from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import DayPicker from '@enact/sandstone/DayPicker';
import Scroller from '@enact/sandstone/Scroller';

DayPicker.displayName = 'DayPicker';

export default {
	title: 'Sandstone',
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

_DayPicker.story = {
	name: 'DayPicker',

	parameters: {
		info: {
			text: 'The basic DayPicker',
		},
	},
};
