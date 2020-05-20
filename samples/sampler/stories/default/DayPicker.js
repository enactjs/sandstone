import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import DayPicker from '@enact/sandstone/DayPicker';

DayPicker.displayName = 'DayPicker';

storiesOf('Sandstone', module)
	.add(
		'DayPicker',
		() => (
			<DayPicker
				aria-label={text('aria-label', DayPicker)}
				disabled={boolean('disabled', DayPicker)}
				onSelect={action('onSelect')}
			/>
		),
		{
			info: {
				text: 'The basic DayPicker'
			}
		}
	);
