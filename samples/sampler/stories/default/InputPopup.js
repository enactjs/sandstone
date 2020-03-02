import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import InputPopup, {InputPopupBase} from '@enact/sandstone/InputPopup';

InputPopup.displayName = 'InputPopup';
const Config = mergeComponentMetadata('InputPopup', InputPopupBase, InputPopup);

const prop = {
	type: ['text', 'password']
};

storiesOf('Sandstone', module)
	.add(
		'InputPopup',
		() => (
			<div>
				<InputPopup
					title={text('title', Config, 'Title Text')}
					subtitle={text('subtitle', Config, 'Title Below Text')}
					placeholder={text('placeholder', Config, 'placeholder text')}
					type={select('type', prop.type, Config)}
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
