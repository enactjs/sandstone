import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {InputPopup} from '@enact/sandstone/InputPopup';

const Config = mergeComponentMetadata('InputPopup', InputPopup);

const prop = {
	inputType: ['text', 'password']
};

storiesOf('Sandstone', module)
	.add(
		'InputPopup',
		() => (
			<div>
				<InputPopup
					title={text('title', Config, 'Title Text')}
					titleBelow={text('titleBelow', Config, 'Title Below Text')}
					placeholder={text('placeholder', Config, 'placeholder text')}
					inputType={select('inputType', prop.inputType, Config, prop.inputType[0])}
					onComplete={action('onComplete')}
					disabled={boolean('disabled', Config)}
				/>
			</div>
		),
		{
			info: {
				text: 'Basic usage of InputPopup'
			}
		}
	);
