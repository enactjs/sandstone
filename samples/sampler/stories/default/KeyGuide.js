import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import KeyGuide from '@enact/sandstone/KeyGuide';
import React from 'react';
import {storiesOf} from '@storybook/react';

const prop = {
	icon: ['red', 'green', 'yellow', 'blue', 'playlist', 'trash', 'search']
};

const Config = mergeComponentMetadata('KeyGuide', KeyGuide);
KeyGuide.displayName = 'KeyGuide';

storiesOf('Sandstone', module)
	.add(
		'KeyGuide',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 4}, 4);
			const icon = select('first item icon', prop.icon, Config, prop.icon[0]);
			const items = [
				{icon, children: 'This is long name item', key: 1},
				{icon: 'plus', children: 'Item 1', key: 2},
				{icon: 'minus', children: 'Item 2', key: 3},
				{icon: 'music', children: 'Item 3', key: 4}
			];
			const children = items.slice(0, itemCount);

			return (
				<KeyGuide
					open={boolean('open', Config, true)}
				>
					{children}
				</KeyGuide>
			);
		},
		{
			info: {
				text: 'Explains the operation of remote keys'
			}
		}
	);
