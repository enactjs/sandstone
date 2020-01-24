import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
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
				dayNameLength={select('dayNameLength', ['short', 'medium', 'long', 'full'], DayPicker, 'long')}
				disabled={boolean('disabled', DayPicker)}
				everyDayText={text('everyDayText', DayPicker)}
				everyWeekdayText={text('everyWeekdayText', DayPicker)}
				everyWeekendText={text('everyWeekendText', DayPicker)}
				noneText={text('noneText', DayPicker, 'none')}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				onSelect={action('onSelect')}
				title={text('title', DayPicker, 'Day Picker')}
			/>
		),
		{
			info: {
				text: 'The basic DayPicker'
			}
		}
	);
