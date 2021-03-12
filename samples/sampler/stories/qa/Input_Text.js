import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Input, {InputBase} from '@enact/sandstone/Input';

import {iconNames, buttons, props, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Text',
	component: 'InputField'
};

export const Basic = () => (
	<Input
		title={text('title', Config, 'Title')}
		subtitle={text('subtitle', Config, 'Subtitle')}
		popupType={select('popupType', props.popupTypes, Config)}
		type={select('type', props.textTypes, Config)}
		disabled={boolean('disabled', Config)}
		iconAfter={select('iconAfter', iconNames, Config)}
		iconBefore={select('iconBefore', iconNames, Config)}
		invalid={boolean('invalid', Config)}
		invalidMessage={text('invalidMessage', Config)}
		placeholder={text('placeholder', Config)}
		size={select('size', props.size, Config)}
		defaultValue={inputData.shortText}
	>
		{buttons[select('buttons', props.buttons, Config)]}
	</Input>
);

Basic.storyName = 'basic';
Basic.parameters = {
	info: {
		text: 'Input with all knobs available.'
	}
};
