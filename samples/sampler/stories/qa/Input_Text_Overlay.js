import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';
import React from 'react';

import {props, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Text/Overlay',
	component: 'InputField'
};

export const _LongText = () => (
	<Input
		title="Overlay Input"
		subtitle={inputData.textSubtitle}
		disabled={boolean('disabled', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', props.size, Config)}
		type={select('type', props.textTypes, Config)}
		popupType="overlay"
		defaultValue={inputData.longText}
	/>
);

_LongText.storyName = 'long text';

export const _LongTitles = () => (
	<Input
		title={inputData.longText}
		subtitle={inputData.longText}
		popupType="overlay"
		defaultOpen
	/>
);

_LongTitles.storyName = 'long titles';
_LongTitles.parameters = {
	info: {
		text: 'Test the input popup\'s maximum bounds.'
	}
};

export const _NoTitles = () => (
	<Input
		popupType="overlay"
		defaultOpen
	/>
);

_NoTitles.storyName = 'no titles';
_NoTitles.parameters = {
	info: {
		text: 'No titles, just an input field.'
	}
};
