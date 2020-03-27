import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Item, {ItemBase} from '@enact/sandstone/Item';
import SwitchItem from '@enact/sandstone/SwitchItem';

SwitchItem.displayName = 'SwitchItem';
const Config = mergeComponentMetadata('SwitchItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, SwitchItem);

storiesOf('Sandstone', module)
	.add(
		'SwitchItem',
		() => {
			return (<div>
				<SwitchItem
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello SwitchItem')}
				</SwitchItem>
			</div>);
		},
		{
			info: {
				text: 'Basic usage of SwitchItem'
			}
		}
	);
