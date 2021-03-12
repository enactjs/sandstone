import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';

import {props, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Text/Fullscreen',
	component: 'InputField'
};

export const LongText = () => (
	<Input
		title="Fullscreen Input"
		subtitle={inputData.textSubtitle}
		disabled={boolean('disabled', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', props.size, Config)}
		type={select('type', props.textTypes, Config)}
		popupType="fullscreen"
		defaultValue={inputData.longText}
	/>
);

LongText.storyName = 'long text';

export const LongTitles = () => (
	<Input
		title={inputData.longText}
		subtitle={inputData.longText}
		popupType="fullscreen"
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
		popupType="fullscreen"
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
		title="Fullscreen Input (invalid tooltip)"
		subtitle={inputData.textSubtitle}
		popupType="fullscreen"
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
