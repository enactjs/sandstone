import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';

import {propOptions, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Text/Overlay',
	component: 'InputField'
};

export const LongText = () => (
	<Input
		title="Overlay Input"
		subtitle={inputData.textSubtitle}
		disabled={boolean('disabled', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', propOptions.size, Config)}
		type={select('type', propOptions.textTypes, Config)}
		popupType="overlay"
		defaultValue={inputData.longText}
	/>
);

LongText.storyName = 'long text';

export const LongTitles = () => (
	<Input
		title={inputData.longText}
		subtitle={inputData.longText}
		popupType="overlay"
		defaultOpen
	/>
);

LongTitles.storyName = 'long titles';
LongTitles.parameters = {
	info: {
		text: 'Test the input popup\'s maximum bounds.'
	}
};

export const NoTitles = () => (
	<Input
		popupType="overlay"
		defaultOpen
	/>
);

NoTitles.storyName = 'no titles';
NoTitles.parameters = {
	info: {
		text: 'No titles, just an input field.'
	}
};

export const LongInvalidTooltip = () => (
	<Input
		title="Overlay Input (invalid tooltip)"
		subtitle={inputData.textSubtitle}
		popupType="overlay"
		invalid={boolean('invalid', Config, true)}
		invalidMessage={inputData.longInvalidTooltip}
		defaultOpen
	/>
);

LongInvalidTooltip.storyName = 'long invalid tooltip';
LongInvalidTooltip.parameters = {
	info: {
		text: 'Test the input popup\'s long invalid tooltip.'
	}
};
