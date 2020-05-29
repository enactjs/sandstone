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
			const itemCount = number('items', Config, {range: true, min: 0, max: 4}, 4);
			const items = [
				{color: 'red', icon: logo, children: 'This is long name item', key: 1},
				{icon: 'plus', children: 'This is long name item', key: 2},
				{icon: 'info', children: 'Item 1', key: 3},
				{color: 'blue', icon: 'music', children: 'Item 2', key: 4}
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
