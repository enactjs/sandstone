import Checkbox, {CheckboxBase} from '@enact/sandstone/Checkbox';
import FormCheckboxItem, {FormCheckboxItemBase} from '@enact/sandstone/FormCheckboxItem';
import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

import iconNames from '../helper/icons';

FormCheckboxItem.displayName = 'FormCheckboxItem';
const Config = mergeComponentMetadata(
	'FormCheckboxItem',
	ItemBase,
	Item,
	CheckboxBase,
	Checkbox,
	FormCheckboxItemBase,
	FormCheckboxItem
);
Config.defaultProps.icon = CheckboxBase.defaultProps.children;

export default {
	title: 'Sandstone/FormCheckboxItem',
	component: 'FormCheckboxItem'
};

export const _FormCheckboxItem = (args) => {
	const slotBeforeSelection = args['slotBefore'];
	const slotBefore = slotBeforeSelection ? (
		<Icon slot="slotBefore">{slotBeforeSelection}</Icon>
	) : null;

	return (
		<FormCheckboxItem
			disabled={args['disabled']}
			icon={args['icon']}
			indeterminate={args['indeterminate']}
			indeterminateIcon={args['indeterminateIcon']}
			inline={args['inline']}
			label={args['label']}
			labelPosition={args['labelPosition']}
			onToggle={action('onToggle')}
		>
			{slotBefore}
			{args['children']}
		</FormCheckboxItem>
	);
};

select('slotBefore', _FormCheckboxItem, ['', ...iconNames], Config);
boolean('disabled', _FormCheckboxItem, Config);
select('icon', _FormCheckboxItem, iconNames, Config);
boolean('indeterminate', _FormCheckboxItem, Config);
select('indeterminateIcon', _FormCheckboxItem, iconNames, Config);
boolean('inline', _FormCheckboxItem, Config);
text('label', _FormCheckboxItem, Config);
select('labelPosition', _FormCheckboxItem, ['above', 'after', 'before', 'below'], Config);
text('children', _FormCheckboxItem, Config, 'A Checkbox for a form');

_FormCheckboxItem.storyName = 'FormCheckboxItem';
_FormCheckboxItem.parameters = {
	info: {
		text: 'Basic usage of FormCheckboxItem'
	}
};
