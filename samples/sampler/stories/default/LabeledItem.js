import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import LabeledItem from '../../../../LabeledItem';

LabeledItem.displayName = 'LabeledItem';

storiesOf('Sandstone', module)
	.add(
		'LabeledItem',
		() => (
			<LabeledItem
				label={text('label', LabeledItem, 'Label')}
				disabled={boolean('disabled', LabeledItem)}
				marqueeOn={select('marqueeOn', ['focus', 'hover', 'render'], LabeledItem, 'focus')}
			>
				{text('children', LabeledItem, 'Hello LabeledItem')}
			</LabeledItem>
		),
		{
			info: {
				text: 'Basic usage of LabeledItem'
			}
		}
	);
