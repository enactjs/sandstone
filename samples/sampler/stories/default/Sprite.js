import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Sprite from '@enact/sandstone/Sprite';

Sprite.displayName = 'Sprite';
const Config = mergeComponentMetadata('Sprite', Sprite);

// import icons
import spriteGear2k from '../../images/sprite-gear-2k.png';
import spriteGear4k from '../../images/sprite-gear-4k.png';

const prop = {
	orientation: ['horizontal', 'vertical'],
	iterations: [1, 2, 3, 10, Infinity]
};

storiesOf('Sandstone', module)
	.add(
		'Sprite',
		() => {
			return (
				<Sprite
					src={{
						fhd: spriteGear2k,
						uhd: spriteGear4k
					}}
					paused={boolean('paused', Config)}
					duration={number('duration', Config, {range: true, min: 500, max: 10000, step: 250}, 1000)}
					iterations={Number(select('iterations', prop.iterations, Config))}
					columns={number('columns', Config, {range: true, min: 5, max: 10}, 6)}
					rows={number('rows', Config, {range: true, min: 3, max: 7}, 5)}
					height={number('height', Config, {min: 30, max: 300}, 120)}
					width={number('height', Config, {min: 30, max: 300}, 120)}
					offsetTop={number('offsetTop', Config, {min: 0, max: 300}, 0)}
					offsetLeft={number('offsetLeft', Config, {min: 0, max: 300}, 0)}
					orientation={select('orientation', prop.orientation, Config)}
				/>
			);
		},
		{
			info: {
				text: 'Basic usage of Sprite'
			}
		}
	);
