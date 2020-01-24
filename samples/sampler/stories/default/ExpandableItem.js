import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ExpandableItem, {Expandable, ExpandableItemBase} from '@enact/malachite/ExpandableItem';
import Icon from '@enact/malachite/Icon';
import Item from '@enact/malachite/Item';

const Config = mergeComponentMetadata('ExpandableItem', Expandable, ExpandableItem, ExpandableItemBase);
ExpandableItem.displayName = 'ExpandableItem';
Icon.displayName = 'Icon';
Item.displayName = 'Item';

storiesOf('Malachite', module)
	.add(
		'ExpandableItem',
		() => (
			<ExpandableItem
				autoClose={boolean('autoClose', Config)}
				disabled={boolean('disabled', Config)}
				label={text('label', Config, 'label')}
				lockBottom={boolean('lockBottom', Config)}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
				showLabel={select('showLabel', ['always', 'never', 'auto'], Config)}
				title={text('title', Config, 'title')}
			>
				<Item>
					This can be any type of content you might want to
					render inside a labeled expandable container
				</Item>
				<Item>
					<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
				</Item>
			</ExpandableItem>
		),
		{
			info: {
				text: 'Basic usage of ExpandableItem'
			}
		}
	);
