import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';
import React from 'react';

import {buttons, props} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Number',
	component: 'InputField'
};

export const _Basic = () => (
	<Input
		title={text('title', Config, 'Title')}
		subtitle={text('subtitle', Config, 'Subtitle')}
		popupType={select('popupType', props.popupTypes, Config)}
		length={select('length', props.lengths, Config)}
		type={select('type', props.numberTypes, Config, 'number')}
		disabled={boolean('disabled', Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', props.size, Config)}
	>
		{buttons[select('buttons', props.buttons, Config)]}
	</Input>
);

_Basic.storyName = 'basic';
_Basic.parameters = {
	info: {
		text: 'Input with all knobs available.'
	}
};
