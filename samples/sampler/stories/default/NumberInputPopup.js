import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {NumberInputPopup, NumberInputPopupBase} from '@enact/sandstone/InputPopup';

NumberInputPopup.displayName = 'NumberInputPopup';
const Config = mergeComponentMetadata('NumberInputPopup', NumberInputPopupBase, NumberInputPopup);

const prop = {
	type: ['number', 'password'],
	popupType: ['full', 'overlay']
};

storiesOf('Sandstone', module)
	.add(
		'NumberInputPopup',
		() => (
			<div>
				<NumberInputPopup
					length={number('length', Config)}
					title={text('title', Config, 'Title Text')}
					subtitle={text('subtitle', Config, 'Title Below Text')}
					placeholder={text('placeholder', Config, 'placeholder text')}
					type={select('type', prop.type, Config)}
					popupType={select('popupType', prop.popupType, Config)}
					onComplete={action('onComplete')}
					disabled={boolean('disabled', Config)}
				/>
			</div>
		),
		{
			info: {
				text: 'Basic usage of NumberInputPopup'
			}
		}
	);
