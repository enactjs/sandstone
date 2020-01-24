import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import UiItem from '@enact/ui/Item';
import {listIcons} from './icons';
import React from 'react';
import {storiesOf} from '@storybook/react';

import CheckboxItem from '../../../../CheckboxItem';
import ToggleItem from '../../../../ToggleItem';
import Item, {ItemBase} from '../../../../Item';
import Icon from '../../../../Icon';

CheckboxItem.displayName = 'CheckboxItem';
const Config = mergeComponentMetadata('CheckboxItem', UiItem, ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, CheckboxItem);

storiesOf('Sandstone', module)
	.add(
		'CheckboxItem',
		() => {
			const iconPosition = select('iconPosition', ['before', 'after'], Config);
			const icon = select('itemIcon', ['', ...listIcons], Config);
			const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
			const itemIconPosition = select('itemIconPosition', [null, 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
			return (
				<CheckboxItem
					// disabled and inline have problems when set to `null` from the internal nullify...
					disabled={boolean('disabled', Config)}
					iconPosition={iconPosition}
					inline={boolean('inline', Config)}
					itemIcon={itemIcon}
					itemIconPosition={itemIconPosition}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello CheckboxItem')}
				</CheckboxItem>
			);
		},
		{
			info: {
				text: 'Basic usage of CheckboxItem'
			}
		}
	);
