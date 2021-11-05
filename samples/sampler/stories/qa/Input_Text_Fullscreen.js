import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Input, {InputBase} from '@enact/sandstone/Input';

import {propOptions, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Text/Fullscreen',
	component: 'InputField'
};

export const LongText = (args) => (
	<Input
		title="Fullscreen Input"
		subtitle={inputData.textSubtitle}
		disabled={args['disabled']}
		placeholder={args['placeholder']}
		size={args['size']}
		type={args['type']}
		popupType="fullscreen"
		defaultValue={inputData.longText}
	/>
);

boolean('disabled', LongText, Config);
text('placeholder', LongText, Config);
select('size', LongText, propOptions.size, Config);
select('type', LongText, propOptions.textTypes, Config);

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
	},
	controls: {
		hideNoControlsWarning: true
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
	},
	controls: {
		hideNoControlsWarning: true
	}
};

export const LongInvalidTooltip = (args) => (
	<Input
		title="Fullscreen Input (invalid tooltip)"
		subtitle={inputData.textSubtitle}
		popupType="fullscreen"
		invalid={args['invalid']}
		invalidMessage={inputData.longInvalidTooltip}
		defaultOpen
	/>
);

boolean('invalid', LongInvalidTooltip, Config, true);

LongInvalidTooltip.storyName = 'long invalid tooltip';
LongInvalidTooltip.parameters = {
	info: {
		text: 'Test the input popup\'s long invalid tooltip.'
	}
};
