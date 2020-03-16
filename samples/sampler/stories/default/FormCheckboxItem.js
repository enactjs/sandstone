import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiToggleItem, {ToggleItemBase as UiToggleItemBase} from '@enact/ui/ToggleItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import ToggleItem from '@enact/sandstone/ToggleItem';
import Item, {ItemBase} from '@enact/sandstone/Item';


FormCheckboxItem.displayName = 'FormCheckboxItem';
const Config = mergeComponentMetadata('FormCheckboxItem', ItemBase, Item, UiToggleItemBase, UiToggleItem, ToggleItem, FormCheckboxItem);

storiesOf('Sandstone', module)
	.add(
		'FormCheckboxItem',
		() => {
			const iconPosition = select('iconPosition', ['before', 'after'], Config);
			return (
				<FormCheckboxItem
					disabled={boolean('disabled', Config)}
					iconPosition={iconPosition}
					inline={boolean('inline', Config)}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'A Checkbox for a form')}
				</FormCheckboxItem>
			);
		},
		{
			info: {
				text: 'Basic usage of FormCheckboxItem'
			}
		}
	);
