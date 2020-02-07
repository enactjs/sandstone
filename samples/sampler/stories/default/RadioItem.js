import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';
import Item, {ItemBase} from '@enact/sandstone/Item';
import RadioItem, {RadioItemBase} from '@enact/sandstone/RadioItem';

import iconNames from './icons';

RadioItem.displayName = 'RadioItem';
const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItemBase, RadioItem);

storiesOf('Sandstone', module)
	.add(
		'RadioItem',
		() => {
			return (
				<RadioItem
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					onToggle={action('onToggle')}
					icon={select('icon', ['', ...iconNames], Config)}
				>
					{text('children', Config, 'Hello RadioItem')}
				</RadioItem>
			);
		},
		{
			info: {
				text: 'Basic usage of RadioItem'
			}
		}
	);
