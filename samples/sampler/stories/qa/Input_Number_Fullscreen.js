import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Input, {InputBase} from '@enact/sandstone/Input';

import {buttons, propOptions, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Number/Fullscreen',
	component: 'InputField'
};

export const Length4 = (args) => (
	<Input
		title="Fullscreen Input (4)"
		subtitle={inputData.numberSubtitle}
		disabled={args['disabled']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
		type={args['type']}
		popupType="fullscreen"
		length={4}
	>
		{buttons[args['buttons']]}
	</Input>
);

boolean('disabled', Length4, Config);
boolean('invalid', Length4, Config);
text('invalidMessage', Length4, Config);
text('placeholder', Length4, Config);
select('size', Length4, propOptions.size, Config, 'large');
select('type', Length4, propOptions.numberTypes, Config, 'number');
select('buttons', Length4, propOptions.buttons, Config, propOptions.buttons[0]);

Length4.storyName = 'length 4';
Length4.parameters = {
	info: {
		text: 'Uses a short-number form of number input.'
	}
};

export const Length10 = (args) => (
	<Input
		title="Fullscreen Input (10)"
		subtitle={inputData.numberSubtitle}
		disabled={args['disabled']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
		type={args['type']}
		popupType="fullscreen"
		length={10}
	>
		{buttons[args['buttons']]}
	</Input>
);

boolean('disabled', Length10, Config);
boolean('invalid', Length10, Config);
text('invalidMessage', Length10, Config);
text('placeholder', Length10, Config);
select('size', Length10, propOptions.size, Config, 'large');
select('type', Length10, propOptions.numberTypes, Config, 'number');
select('buttons', Length10, propOptions.buttons, Config, propOptions.buttons[0]);

Length10.storyName = 'length 10';
Length10.parameters = {
	info: {
		text: 'Uses a long-number form of number input.'
	}
};

export const LongTitles = () => (
	<Input
		title={inputData.longText}
		subtitle={inputData.longText}
		popupType="fullscreen"
		type="number"
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
		type="number"
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
		subtitle={inputData.numberSubtitle}
		popupType="fullscreen"
		type="number"
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
