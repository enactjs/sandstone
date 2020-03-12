import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';

import {listIcons} from './icons';

SwitchItem.displayName = 'SwitchItem';
const Config = mergeComponentMetadata('SwitchItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, SwitchItem);

storiesOf('Sandstone', module)
	.add(
		'SwitchItem',
		() => {
			const icon = select('itemIcon', ['', ...listIcons], Config);
			const itemIcon = nullify(icon ? <Icon>{icon}</Icon> : null);
			const itemIconPosition = select('itemIconPosition', ['', 'before', 'beforeChildren', 'afterChildren', 'after'], Config);
			return (<div>
				<SwitchItem
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					itemIcon={itemIcon}
					itemIconPosition={itemIconPosition}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello SwitchItem')}
				</SwitchItem>
				<Switch
					disabled={boolean('disabled', Config)}
					onToggle={action('onToggle')}
				/>
			</div>);
		},
		{
			info: {
				text: 'Basic usage of SwitchItem'
			}
		}
	);
