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
					disabled={boolean('disabled', Config)}
					onComplete={action('onComplete')}
					placeholder={text('placeholder', Config, 'placeholder text')}
					subtitle={text('subtitle', Config, 'Title Below Text')}
					title={text('title', Config, 'Title Text')}
					type={select('type', prop.type, Config)}
				/>
			</div>
		),
		{
			info: {
				text: 'Basic usage of InputPopup'
			}
		}
	);
