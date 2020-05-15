import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Input, {InputBase, InputPopup, InputPopupBase} from '@enact/sandstone/Input';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputPopupBase, InputPopup, InputBase, Input);

const prop = {
	popupType: ['fullscreen', 'overlay'],
	size: ['small', 'large'],
	type: ['text', 'password', 'number', 'passwordnumber']
};

storiesOf('Sandstone', module)
	.add(
		'Input',
		() => (
			<div>
				<Input
					disabled={boolean('disabled', Config)}
					onChange={action('onChange')}
					onClose={action('onClose')}
					onComplete={action('onComplete')}
					onOpenPopup={action('onOpenPopup')}
					invalid={boolean('invalid', Config)}
					invalidMessage={text('invalidMessage', Config, 'This is a bad value')}
					length={number('length', Config, {range: true, min: 1, max: 10}, 4)}
					placeholder={text('placeholder', Config, 'placeholder text')}
					subtitle={text('subtitle', Config, 'Title Below Text')}
					title={text('title', Config, 'Title Text')}
					separateDigitsLimit={number('separateDigitsLimit', Config, {range: true, min: 1, max: 10}, 6)}
					size={select('size', prop.size, Config)}
					type={select('type', prop.type, Config)}
					popupType={select('popupType', prop.popupType, Config)}
				/>
			</div>
		),
		{
			info: {
				text: 'Basic usage of Input'
			}
		}
	);
