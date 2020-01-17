import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '../../../../Icon';
import Item, {ItemBase} from '../../../../Item';
import SelectableItem from '../../../../SelectableItem';
import ToggleItem from '../../../../ToggleItem';

import {listIcons} from './icons';

SelectableItem.displayName = 'SelectableItem';
const Config = mergeComponentMetadata('SelectableItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, SelectableItem);

storiesOf('Malachite', module)
	.add(
		'SelectableItem',
		() => {
			const iconPosition = select('iconPosition', ['before', 'after'], Config);
			const icon = select('itemIcon', ['', ...listIcons], Config);
			const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
			const itemIconPosition = select('itemIconPosition', [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
			return (
				<SelectableItem
					disabled={boolean('disabled', Config)}
					iconPosition={iconPosition}
					inline={boolean('inline', Config)}
					itemIcon={itemIcon}
					itemIconPosition={itemIconPosition}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello SelectableItem')}
				</SelectableItem>
			);
		},
		{
			info: {
				text: 'Basic usage of SelectableItem'
			}
		}
	);
