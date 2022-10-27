import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Stories, Title} from '@enact/storybook-utils/addons/docs';
import Input, {InputBase, InputPopupBase} from '@enact/sandstone/Input';

import {buttons, propOptions} from './common/Input_Common';

Input.displayName = 'Input';
const Config = mergeComponentMetadata('Input', InputPopupBase, InputBase, Input);

export default {
	title: 'Sandstone/Input/Number',
	component: 'InputField',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
					<Stories />
				</>
			)
		}
	}
};

export const Basic = (args) => (
	<Input
		title={args['title']}
		subtitle={args['subtitle']}
		popupType={args['popupType']}
		length={args['length']}
		type={args['type']}
		disabled={args['disabled']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
	>
		{buttons[args['buttons']]}
	</Input>
);

text('title', Basic, Config, 'Title');
text('subtitle', Basic, Config, 'Subtitle');
select('popupType', Basic, propOptions.popupTypes, Config);
select('length', Basic, propOptions.lengths, Config, 4);
select('type', Basic, propOptions.numberTypes, Config, 'number');
boolean('disabled', Basic, Config);
boolean('invalid', Basic, Config);
text('invalidMessage', Basic, Config);
text('placeholder', Basic, Config);
select('size', Basic, propOptions.size, Config, 'large');
select('buttons', Basic, propOptions.buttons, Config, propOptions.buttons[0]);

Basic.storyName = 'basic';
Basic.parameters = {
	info: {
		text: 'Input with all controls available.'
	}
};
