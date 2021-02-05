import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';
import React from 'react';

import {buttons, props, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Number/Fullscreen',
	component: 'InputField'
};

export const Length4 = () => (
	<Input
		title="Fullscreen Input (4)"
		subtitle={inputData.numberSubtitle}
		disabled={boolean('disabled', Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', props.size, Config)}
		type={select('type', props.numberTypes, Config, 'number')}
		popupType="fullscreen"
		length={4}
	>
		{buttons[select('buttons', props.buttons, Config)]}
	</Input>
);

Length4.storyName = 'length 4';
Length4.parameters = {
	info: {
		text: 'Uses a short-number form of number input.'
	}
};

export const Length10 = () => (
	<Input
		title="Fullscreen Input (10)"
		subtitle={inputData.numberSubtitle}
		disabled={boolean('disabled', Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', props.size, Config)}
		type={select('type', props.numberTypes, Config, 'number')}
		popupType="fullscreen"
		length={10}
	>
		{buttons[select('buttons', props.buttons, Config)]}
	</Input>
);

Length10.storyName = 'length 10';
Length10.parameters = {
	info: {
		text: 'Uses a long-number form of number input.'
	}
};

export const __LongTitles = () => (
	<Input
		title={inputData.longText}
		subtitle={inputData.longText}
		popupType="fullscreen"
		type="number"
		defaultOpen
	/>
);

__LongTitles.storyName = 'long titles';
__LongTitles.parameters = {
	info: {
		text: 'Test the input popup\'s maximum bounds.'
	}
};

export const __NoTitles = () => (
	<Input
		popupType="fullscreen"
		type="number"
		defaultOpen
	/>
);

__NoTitles.storyName = 'no titles';
__NoTitles.parameters = {
	info: {
		text: 'No titles, just an input field.'
	}
};
