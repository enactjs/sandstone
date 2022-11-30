import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';
import RadioItem, {RadioItemBase} from '@enact/sandstone/RadioItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

import iconNames from '../helper/icons';

RadioItem.displayName = 'RadioItem';
const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItemBase, RadioItem);

export default {
	title: 'Sandstone/RadioItem',
	component: 'RadioItem'
};

export const _RadioItem = (args) => {
	const slotBeforeSelection = args['slotBefore'];
	const slotBefore = slotBeforeSelection ? (
		<Icon slot="slotBefore">{slotBeforeSelection}</Icon>
	) : null;

	return (
		<RadioItem
			disabled={args['disabled']}
			inline={args['inline']}
			onToggle={action('onToggle')}
			icon={args['icon']}
		>
			{slotBefore}
			{args['children']}
		</RadioItem>
	);
};

select('slotBefore', _RadioItem, ['', ...iconNames], Config);
boolean('disabled', _RadioItem, Config);
boolean('inline', _RadioItem, Config);
select('icon', _RadioItem, ['', ...iconNames], Config);
text('children', _RadioItem, Config, 'Hello RadioItem');

_RadioItem.storyName = 'RadioItem';
_RadioItem.parameters = {
	info: {
		text: 'Basic usage of RadioItem'
	}
};
