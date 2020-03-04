import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Input, {InputBase} from '@enact/sandstone/Input';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

const prop = {
	type: ['number', 'password'],
	popupType: ['full', 'overlay']
};

storiesOf('Sandstone', module)
	.add(
		'Input OldNumericPopup',
		() => (
			<div>
				<Input
					disabled={boolean('disabled', Config)}
					length={number('length', Config)}
					onComplete={action('onComplete')}
					placeholder={text('placeholder', Config, 'placeholder text')}
					popupType={select('popupType', prop.popupType, Config)}
					subtitle={text('subtitle', Config, 'Title Below Text')}
					title={text('title', Config, 'Title Text')}
					type={select('type', prop.type, Config)}
				/>
			</div>
		),
		{
			info: {
				text: 'Basic usage of Input'
			}
		}
	);
