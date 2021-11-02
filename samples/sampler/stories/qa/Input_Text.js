import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Input, {InputBase} from '@enact/sandstone/Input';

import {iconNames, buttons, propOptions, inputData} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputBase, Input);

export default {
	title: 'Sandstone/Input/Text',
	component: 'InputField'
};

export const Basic = (args) => (
	<Input
		title={args['title']}
		subtitle={args['subtitle']}
		popupType={args['popupType']}
		type={args['type']}
		disabled={args['disabled']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
		defaultValue={inputData.shortText}
	>
		{buttons[args['buttons']]}
	</Input>
);

text('title', Basic, Config, 'Title');
text('subtitle', Basic, Config, 'Subtitle');
select('popupType', Basic, propOptions.popupTypes, Config);
select('type', Basic, propOptions.textTypes, Config);
boolean('disabled', Basic, Config);
select('iconAfter', Basic, iconNames, Config);
select('iconBefore', Basic, iconNames, Config);
boolean('invalid', Basic, Config);
text('invalidMessage', Basic, Config);
text('placeholder', Basic, Config);
select('size', Basic, propOptions.size, Config);
select('buttons', Basic, propOptions.buttons, Config);

Basic.storyName = 'basic';
Basic.parameters = {
	info: {
		text: 'Input with all knobs available.'
	}
};
