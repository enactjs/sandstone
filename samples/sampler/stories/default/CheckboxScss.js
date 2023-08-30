import CheckboxScss, {CheckboxScssBase} from '@enact/sandstone/CheckboxScss';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

import iconNames from '../helper/icons';

CheckboxScss.displayName = 'CheckboxScss';
const Config = mergeComponentMetadata('CheckboxScss', CheckboxScssBase, CheckboxScss);

export default {
	title: 'Sandstone/CheckboxScss',
	component: 'CheckboxScss'
};

export const _CheckboxScss = (args) => (
	<CheckboxScss
		disabled={args['disabled']}
		indeterminate={args['indeterminate']}
		indeterminateIcon={args['indeterminateIcon']}
		onToggle={action('onToggle')}
	>
		{args['children']}
	</CheckboxScss>
);

boolean('disabled', _CheckboxScss, Config);
boolean('indeterminate', _CheckboxScss, Config);
select('indeterminateIcon', _CheckboxScss, ['', ...iconNames], Config);
select('children', _CheckboxScss, ['', ...iconNames], Config);

_CheckboxScss.storyName = 'CheckboxScss';
_CheckboxScss.parameters = {
	info: {
		text: 'Standalone Checkbox component, for simple toggles. The component used in CheckboxItem and FormCheckboxItem.'
	}
};
