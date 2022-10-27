import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
import {InputField, InputFieldBase} from '@enact/sandstone/Input';

import icons from '../helper/icons';

const iconNames = ['', ...icons];

InputField.displayName = 'InputField';
const Config = mergeComponentMetadata('InputField', InputFieldBase, InputField);

// Set up some defaults for info and controls
const prop = {
	type: ['text', 'number', 'password', 'url', 'tel', 'passwordtel']
};

export default {
	title: 'Sandstone/Input.InputField',
	component: 'InputField',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _InputField = (args) => (
	<InputField
		autoFocus={args['autoFocus']}
		onBeforeChange={action('onBeforeChange')}
		onChange={action('onChange')}
		disabled={args['disabled']}
		dismissOnEnter={args['dismissOnEnter']}
		iconAfter={args['iconAfter']}
		iconBefore={args['iconBefore']}
		invalid={args['invalid']}
		invalidMessage={args['invalidMessage']}
		placeholder={args['placeholder']}
		size={args['size']}
		type={args['type']}
	/>
);

boolean('autoFocus', _InputField, Config);
boolean('disabled', _InputField, Config);
boolean('dismissOnEnter', _InputField, Config);
select('iconAfter', _InputField, iconNames, Config);
select('iconBefore', _InputField, iconNames, Config);
boolean('invalid', _InputField, Config);
text('invalidMessage', _InputField, Config);
text('placeholder', _InputField, Config);
select('size', _InputField, ['small', 'large'], Config);
select('type', _InputField, prop.type, Config, prop.type[0]);

_InputField.storyName = 'Input.InputField';
_InputField.parameters = {
	info: {
		text: 'The basic InputField'
	}
};
