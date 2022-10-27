import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
import Checkbox, {CheckboxBase} from '@enact/sandstone/Checkbox';
import CheckboxItem, {CheckboxItemBase} from '@enact/sandstone/CheckboxItem';
import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';

import iconNames from '../helper/icons';

CheckboxItem.displayName = 'CheckboxItem';
const Config = mergeComponentMetadata(
	'CheckboxItem',
	ItemBase,
	Item,
	CheckboxBase,
	Checkbox,
	CheckboxItemBase,
	CheckboxItem
);
Config.defaultProps.icon = CheckboxBase.defaultProps.children;

export default {
	title: 'Sandstone/CheckboxItem',
	component: 'CheckboxItem',
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

export const _CheckboxItem = (args) => {
	const slotBeforeSelection = args['slotBefore'];
	const slotBefore = slotBeforeSelection ? (
		<Icon slot="slotBefore">{slotBeforeSelection}</Icon>
	) : null;

	return (
		<CheckboxItem
			// disabled and inline have problems when set to `null` from the internal nullify...
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
		</CheckboxItem>
	);
};

select('slotBefore', _CheckboxItem, ['', ...iconNames], Config);
boolean('disabled', _CheckboxItem, Config);
select('icon', _CheckboxItem, iconNames, Config);
boolean('indeterminate', _CheckboxItem, Config);
select('indeterminateIcon', _CheckboxItem, iconNames, Config);
boolean('inline', _CheckboxItem, Config);
text('label', _CheckboxItem, Config);
select('labelPosition', _CheckboxItem, ['above', 'after', 'before', 'below'], Config);
text('children', _CheckboxItem, Config, 'Hello CheckboxItem');

_CheckboxItem.storyName = 'CheckboxItem';
_CheckboxItem.parameters = {
	info: {
		text: 'Basic usage of CheckboxItem'
	}
};
