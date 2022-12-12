import Checkbox, {CheckboxBase} from '@enact/sandstone/Checkbox';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

import iconNames from '../helper/icons';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', CheckboxBase, Checkbox);

export default {
	title: 'Sandstone/Checkbox',
	component: 'Checkbox'
};

export const _Checkbox = (args) => (
	<Checkbox
		disabled={args['disabled']}
		indeterminate={args['indeterminate']}
		indeterminateIcon={args['indeterminateIcon']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</Checkbox>
);

boolean('disabled', _Checkbox, Config);
boolean('indeterminate', _Checkbox, Config);
select('indeterminateIcon', _Checkbox, ['', ...iconNames], Config);
select('children', _Checkbox, ['', ...iconNames], Config);

_Checkbox.storyName = 'Checkbox';
_Checkbox.parameters = {
	info: {
		text: 'Standalone Checkbox component, for simple toggles. The component used in CheckboxItem and FormCheckboxItem.'
	}
};
