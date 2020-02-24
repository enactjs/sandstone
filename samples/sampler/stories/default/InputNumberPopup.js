import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {InputNumberPopup} from '@enact/sandstone/InputPopup';

const Config = mergeComponentMetadata('InputNumberPopup', InputNumberPopup);

const prop = {
	inputType: ['number', 'password'],
	popupType: ['full', 'overlay']
};

storiesOf('Sandstone', module)
	.add(
		'InputNumberPopup',
		() => (
			<div>
				<InputNumberPopup
					length={number('length', Config, 4)}
					title={text('title', Config, 'Title Text')}
					titleBelow={text('titleBelow', Config, 'Title Below Text')}
					placeholder={text('placeholder', Config, 'placeholder text')}
					inputType={select('inputType', prop.inputType, Config, prop.inputType[0])}
					popupType={select('popupType', prop.popupType, Config, prop.popupType[0])}
					onComplete={action('onComplete')}
					disabled={boolean('disabled', Config)}
				/>
			</div>
		),
		{
			info: {
				text: 'Basic usage of InputNumberPopup'
			}
		}
	);
