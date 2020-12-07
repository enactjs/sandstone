import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Item, {ItemBase} from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

storiesOf('Sandstone', module)
	.add(
		'Item',
		() => (
			<Item
				centered={boolean('centered', Config)}
				disabled={boolean('disabled', Config)}
				inline={boolean('inline', Config)}
				label={text('label', Config)}
				labelPosition={select('labelPosition', ['above', 'below', 'before', 'after'], Config)}
				size={select('size', ['small', 'large'], Config)}
				slotBefore={select('slotBefore', {'': '', '<Icon />' : 'icon'}, Config) ? <Icon size="small">speaker</Icon> : null}
				slotAfter={select('slotAfter', {'': '', '<Icon />' : 'icon'}, Config) ? <Icon size="small">arrowlargeright</Icon> : null}
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
