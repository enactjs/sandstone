import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Input, {InputBase, InputPopup, InputPopupBase} from '@enact/sandstone/Input';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);
const ConfigPopup = mergeComponentMetadata('InputPopup', InputPopupBase, InputPopup);

const prop = {
	numericKind: ['auto', 'joined', 'separated', 'field'],
	popupType: ['fullscreen', 'overlay'],
	size: ['small', 'large'],
	type: ['text', 'password', 'number', 'passwordnumber']
};

storiesOf('Sandstone', module)
	.add(
		'Input',
		() => {
			const props = {
				// Actions
				onChange: action('onChange'),
				onClose: action('onClose'),
				onComplete: action('onComplete'),
				onOpenPopup: action('onOpenPopup'),

				// Knobs
				type: select('type', prop.type, ConfigPopup),
				popupType: select('popupType', prop.popupType, ConfigPopup),
				size: select('size', prop.size, Config),
				invalid: boolean('invalid', ConfigPopup),
				invalidMessage: text('invalidMessage', ConfigPopup, 'This is a bad value'),
				placeholder: text('placeholder', Config, 'placeholder string'),
				subtitle: text('subtitle', ConfigPopup, 'Title Below Text'),
				title: text('title', ConfigPopup, 'Title Text'),
				disabled: boolean('disabled', Config)
			};

			// Numeric specific props
			if (props.type === 'number' || props.type === 'passwordnumber') {
				props.numberInputField = select('numberInputField', prop.numericKind, ConfigPopup);

				const minMax = boolean('customize min/max', ConfigPopup, false);
				if (minMax) {
					props.maxLength = number('maxLength', ConfigPopup, {range: true, min: 0, max: 20}, 4);
					props.minLength = number('minLength', ConfigPopup, {range: true, min: 0, max: 20}, 0);
				} else {
					props.length = number('length', ConfigPopup, {range: true, min: 1, max: 20}, 4);
				}
			}

			return (<div>
				<Input {...props} />
			</div>);
		},
		{
			info: {
				text: 'Basic usage of Input'
			}
		}
	);
