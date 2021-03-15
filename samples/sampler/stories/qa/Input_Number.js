import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';

import {buttons, propOptions} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Number',
	component: 'InputField'
};

export const Basic = () => (
	<Input
		title={text('title', Config, 'Title')}
		subtitle={text('subtitle', Config, 'Subtitle')}
		popupType={select('popupType', propOptions.popupTypes, Config)}
		length={select('length', propOptions.lengths, Config)}
		type={select('type', propOptions.numberTypes, Config, 'number')}
		disabled={boolean('disabled', Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', propOptions.size, Config)}
	>
		{buttons[select('buttons', propOptions.buttons, Config)]}
	</Input>
);

Basic.storyName = 'basic';
Basic.parameters = {
	info: {
		text: 'Input with all knobs available.'
	}
};
