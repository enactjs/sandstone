import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';
import SwitchItem from '@enact/sandstone/SwitchItem';

import iconNames from '../helper/icons';

SwitchItem.displayName = 'SwitchItem';
const Config = mergeComponentMetadata('SwitchItem', ItemBase, Item, SwitchItem);

export default {
	title: 'Sandstone/SwitchItem',
	component: 'SwitchItem'
};

export const _SwitchItem = (args) => {
	const slotAfterSelection = args['slotAfter'];
	const slotAfter = slotAfterSelection ? <Icon slot="slotAfter">{slotAfterSelection}</Icon> : null;

	return (
		<SwitchItem
			disabled={args['disabled']}
			inline={args['inline']}
			onToggle={action('onToggle')}
		>
			{args['children']}
			{slotAfter}
		</SwitchItem>
	);
};

select('slotAfter', _SwitchItem, ['', ...iconNames], Config);
boolean('disabled', _SwitchItem, Config);
boolean('inline', _SwitchItem, Config);
text('children', _SwitchItem, Config, 'Hello SwitchItem');

_SwitchItem.storyName = 'SwitchItem';
_SwitchItem.parameters = {
	info: {
		text: 'Basic usage of SwitchItem'
	}
};
