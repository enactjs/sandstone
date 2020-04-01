import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TimePicker from '@enact/sandstone/TimePicker';

const Config = mergeComponentMetadata('TimePicker', TimePicker);
TimePicker.displayName = 'TimePicker';

storiesOf('Sandstone', module)
	.add(
		'TimePicker',
		() => (
			<TimePicker
				disabled={boolean('disabled', Config)}
				hourAriaLabel={text('hourAriaLabel', Config, '')}
				hourLabel={text('hourLabel', Config, '')}
				meridiemAriaLabel={text('meridiemAriaLabel', Config, '')}
				meridiemLabel={text('meridiemLabel', Config, '')}
				minuteAriaLabel={text('minuteAriaLabel', Config, '')}
				minuteLabel={text('minuteLabel', Config, '')}
				onChange={action('onChange')}
			/>
		),
		{
			info: {
				text: 'The basic TimePicker'
			}
		}
	);
