import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';
import SwitchItem from '@enact/sandstone/SwitchItem';

import iconNames from './icons';

SwitchItem.displayName = 'SwitchItem';
const Config = mergeComponentMetadata('SwitchItem', ItemBase, Item, SwitchItem);

storiesOf('Sandstone', module)
	.add(
		'SwitchItem',
		() => {
			const slotAfterSelection = select('slotAfter', ['', ...iconNames], Config);
			const slotAfter = slotAfterSelection ? (<Icon slot="slotAfter">{slotAfterSelection}</Icon>) : null;

			return (
				<SwitchItem
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello SwitchItem')}
					{slotAfter}
				</SwitchItem>
			);
		},
		{
			info: {
				text: 'Basic usage of SwitchItem'
			}
		}
	);
