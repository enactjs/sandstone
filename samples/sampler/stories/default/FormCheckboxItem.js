import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import FormCheckboxItem, {FormCheckboxItemBase} from '@enact/sandstone/FormCheckboxItem';
import Item, {ItemBase} from '@enact/sandstone/Item';

import iconNames from './icons';

FormCheckboxItem.displayName = 'FormCheckboxItem';
const Config = mergeComponentMetadata('FormCheckboxItem', ItemBase, Item, FormCheckboxItemBase, FormCheckboxItem);

storiesOf('Sandstone', module)
	.add(
		'FormCheckboxItem',
		() => {
			return (
				<FormCheckboxItem
					disabled={boolean('disabled', Config)}
					icon={select('icon', ['', ...iconNames], Config)}
					inline={boolean('inline', Config)}
					label={text('label', Config, '')}
					labelPosition={select('labelPosition', ['', 'above', 'after', 'before', 'below'], Config, '')}
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
