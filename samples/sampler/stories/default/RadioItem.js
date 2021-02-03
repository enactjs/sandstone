import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Icon from '@enact/sandstone/Icon';
import Item, {ItemBase} from '@enact/sandstone/Item';
import RadioItem, {RadioItemBase} from '@enact/sandstone/RadioItem';
import React from 'react';

import iconNames from '../helper/icons';

RadioItem.displayName = 'RadioItem';
const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItemBase, RadioItem);

export default {
	title: 'Sandstone/RadioItem',
	component: 'RadioItem'
};

export const _RadioItem = () => {
	const slotBeforeSelection = select('slotBefore', ['', ...iconNames], Config);
	const slotBefore = slotBeforeSelection ? (
		<Icon slot="slotBefore">{slotBeforeSelection}</Icon>
	) : null;

	return (
		<RadioItem
			disabled={boolean('disabled', Config)}
			inline={boolean('inline', Config)}
			onToggle={action('onToggle')}
			icon={select('icon', ['', ...iconNames], Config)}
		>
			{slotBefore}
			{text('children', Config, 'Hello RadioItem')}
		</RadioItem>
	);
};

_RadioItem.storyName = 'RadioItem';
_RadioItem.parameters = {
	info: {
		text: 'Basic usage of RadioItem'
	}
};
