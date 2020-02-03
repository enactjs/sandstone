import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Item, {ItemBase} from '@enact/sandstone/Item';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

storiesOf('Sandstone', module)
	.add(
		'Item',
		() => (
			<Item
				label={text('label', Config, '')}
				labelPosition={select('labelPosition', ['above', 'below', 'before', 'after'], Config, 'below')}
				disabled={boolean('disabled', Config)}
				inline={boolean('inline', Config)}
			>
				{text('children', Config, 'Hello Item')}
			</Item>
		),
		{
			info: {
				text: 'Basic usage of Item'
			}
		}
	);
