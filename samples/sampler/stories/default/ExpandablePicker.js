import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ExpandablePicker, {ExpandablePickerBase} from '@enact/malachite/ExpandablePicker';

const Config = mergeComponentMetadata('ExpandablePicker', ExpandablePicker, ExpandablePickerBase);
ExpandablePicker.displayName = 'ExpandablePicker';

const emoticons = ['💥 boom', '😩🖐 facepalm', '🍩 doughnut', '👻 ghost', '💍 ring', '🎮 videogame', '🍌🍌 bananas'];

storiesOf('Malachite', module)
	.add(
		'ExpandablePicker',
		() => (
			<ExpandablePicker
				checkButtonAriaLabel={text('checkButtonAriaLabel', Config, '')}
				disabled={boolean('disabled', Config)}
				decrementAriaLabel={text('decrementAriaLabel', Config, '')}
				incrementAriaLabel={text('incrementAriaLabel', Config, '')}
				joined={boolean('joined', Config)}
				onChange={action('onChange')}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				pickerAriaLabel={text('pickerAriaLabel', Config, '')}
				title={text('title', Config, 'Favorite Emoji')}
				width={select('width', ['small', 'medium', 'large'], Config)}
			>
				{emoticons}
			</ExpandablePicker>
		),
		{
			info: {
				text: 'Basic usage of ExpandablePicker'
			}
		}
	);
