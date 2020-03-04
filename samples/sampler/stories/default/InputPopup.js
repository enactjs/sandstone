import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Input, {InputBase} from '@enact/sandstone/Input';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

const prop = {
	type: ['text', 'password', 'number', 'passwordnumber']
};

storiesOf('Sandstone', module)
	.add(
		'Input',
		() => (
			<div>
				<Input
					disabled={boolean('disabled', Config)}
					onComplete={action('onComplete')}
					length={number('length', Config, {range: true, min: 1, max: 10}, 4)}
					placeholder={text('placeholder', Config, 'placeholder text')}
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
