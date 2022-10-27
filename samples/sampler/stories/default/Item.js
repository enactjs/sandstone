import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
import Item, {ItemBase} from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

export default {
	title: 'Sandstone/Item',
	component: 'Item',
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

export const _Item = (args) => (
	<Item
		centered={args['centered']}
		disabled={args['disabled']}
		inline={args['inline']}
		label={args['label']}
		labelPosition={args['labelPosition']}
		size={args['size']}
		slotBefore={
			args['slotBefore'] ? (
				<Icon size="small">speaker</Icon>
			) : null
		}
		slotAfter={
			args['slotAfter'] ? (
				<Icon size="small">arrowlargeright</Icon>
			) : null
		}
	>
		{args['children']}
	</Item>
);

boolean('centered', _Item, Config);
boolean('disabled', _Item, Config);
boolean('inline', _Item, Config);
text('label', _Item, Config);
select('labelPosition', _Item, ['above', 'below', 'before', 'after'], Config);
select('size', _Item, ['small', 'large'], Config);
select('slotBefore', _Item, {'': '', '<Icon />': 'icon'}, Config);
select('slotAfter', _Item, {'': '', '<Icon />': 'icon'}, Config);
text('children', _Item, Config, 'Hello Item');

_Item.storyName = 'Item';
_Item.parameters = {
	info: {
		text: 'Basic usage of Item'
	}
};
