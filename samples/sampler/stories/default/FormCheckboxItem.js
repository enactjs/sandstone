import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Checkbox, {CheckboxBase} from '@enact/sandstone/Checkbox';
import FormCheckboxItem, {FormCheckboxItemBase} from '@enact/sandstone/FormCheckboxItem';
import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';

import iconNames from './icons';

FormCheckboxItem.displayName = 'FormCheckboxItem';
const Config = mergeComponentMetadata('FormCheckboxItem', ItemBase, Item, CheckboxBase, Checkbox, FormCheckboxItemBase, FormCheckboxItem);
Config.defaultProps.icon = CheckboxBase.defaultProps.children;

storiesOf('Sandstone', module)
	.add(
		'FormCheckboxItem',
		() => {
			const slotBeforeSelection = select('slotBefore', ['', ...iconNames], Config);
			const slotBefore = slotBeforeSelection ? (<Icon slot="slotBefore">{slotBeforeSelection}</Icon>) : null;

			return (
				<FormCheckboxItem
					disabled={boolean('disabled', Config)}
					icon={select('icon', iconNames, Config)}
					indeterminate={boolean('indeterminate', Config)}
					indeterminateIcon={select('indeterminateIcon', iconNames, Config)}
					inline={boolean('inline', Config)}
					label={text('label', Config)}
					labelPosition={select('labelPosition', ['above', 'after', 'before', 'below'], Config)}
					onToggle={action('onToggle')}
				>
					{slotBefore}
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
