import { boolean, select, text } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import UiItem, { ItemBase as UiItemBase } from '@enact/ui/Item';
import React from 'react';

import Item, { ItemBase } from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

export default {
	title: 'Sandstone',
};

export const _Item = () => (
	<Item
		centered={boolean('centered', Config)}
		disabled={boolean('disabled', Config)}
		inline={boolean('inline', Config)}
		label={text('label', Config)}
		labelPosition={select('labelPosition', ['above', 'below', 'before', 'after'], Config)}
		size={select('size', ['small', 'large'], Config)}
		slotBefore={
			select('slotBefore', { '': '', '<Icon />': 'icon' }, Config) ? (
				<Icon size="small">speaker</Icon>
			) : null
		}
		slotAfter={
			select('slotAfter', { '': '', '<Icon />': 'icon' }, Config) ? (
				<Icon size="small">arrowlargeright</Icon>
			) : null
		}
	>
		{text('children', Config, 'Hello Item')}
	</Item>
);

_Item.story = {
	parameters: {
		info: {
			text: 'Basic usage of Item',
		},
	},
};
