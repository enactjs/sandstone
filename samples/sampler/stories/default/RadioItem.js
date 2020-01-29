
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import RadioItem from '@enact/sandstone/RadioItem';

import iconNames from './icons';

const Config = mergeComponentMetadata('RadioItem', RadioItem);
RadioItem.displayName = 'RadioItem';

storiesOf('Sandstone', module)
	.add(
		'RadioItem',
		() => {
			return (
				<RadioItem
					disabled={boolean('disabled', Config)}
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
