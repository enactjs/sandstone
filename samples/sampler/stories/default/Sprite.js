import {action} from '@enact/storybook-utils/addons/actions';
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
					columns={6}
					rows={5}
					height={120}
					width={120}
					orientation="horizontal"
					paused={boolean('paused', Config)}
					duration={number('duration', Config, {range: true, min: 500, max: 10000, step: 250}, 1000)}
					iterations={Number(select('iterations', prop.iterations, Config))}
					onSpriteAnimation={action('onSpriteAnimation')}

				// These are design-time props, which don't make sense to be modified
				// at runtime, but would be useful to someone trying to learn what the
				// options are and how the props affect the component.More customizability
				// (at a future time) could open them up to make them useful for this sample.
				//
				// columns={number('columns', DesignTimeConfig, {range: true, min: 5, max: 10}, 6)}
				// rows={number('rows', DesignTimeConfig, {range: true, min: 3, max: 7}, 5)}
				// height={number('height', DesignTimeConfig, {min: 30, max: 300}, 120)}
				// width={number('height', DesignTimeConfig, {min: 30, max: 300}, 120)}
				// offsetTop={number('offsetTop', DesignTimeConfig, {min: 0, max: 300}, 0)}
				// offsetLeft={number('offsetLeft', DesignTimeConfig, {min: 0, max: 300}, 0)}
				// orientation={select('orientation', prop.orientation, DesignTimeConfig)}
				/>
			);
		},
		{
			info: {
				text: 'Basic usage of Sprite'
			}
		}
	);
