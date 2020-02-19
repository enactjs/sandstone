import {boolean, number} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import KeyGuide from '@enact/sandstone/KeyGuide';
import React from 'react';
import {storiesOf} from '@storybook/react';

import logo from '../../images/icon-enact-logo.svg';

const Config = mergeComponentMetadata('KeyGuide', KeyGuide);
KeyGuide.displayName = 'KeyGuide';

storiesOf('Sandstone', module)
	.add(
		'KeyGuide',
		() => {
			const itemCount = number('items', Config, {range: true, min: 1, max: 4}, 3);
			const items = [
				{icon: logo, children: 'This is long name item', key: 1},
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
				text: 'Explain operation of key'
			}
		}
	);
