import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import IncrementSlider, {IncrementSliderBase, IncrementSliderTooltip} from '@enact/sandstone/IncrementSlider';

import {decrementIcons, incrementIcons} from './icons';

const IncrementSliderConfig = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);
const IncrementSliderTooltipConfig = mergeComponentMetadata('IncrementSliderTooltip', IncrementSliderTooltip);

IncrementSlider.displayName = 'IncrementSlider';

storiesOf('Sandstone', module)
	.add(
		'IncrementSlider',
		() => {
			const tooltip = boolean('tooltip', IncrementSliderTooltipConfig);
			const percent = boolean('percent', IncrementSliderTooltipConfig);
			const position = select('position', ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], IncrementSliderTooltipConfig, '');

			return (
				<IncrementSlider
					backgroundProgress={number('backgroundProgress', IncrementSliderConfig, {range: true, min: 0, max: 1, step: 0.01})}
					decrementIcon={select('decrementIcon', ['', ...decrementIcons], IncrementSliderConfig)}
					disabled={boolean('disabled', IncrementSliderConfig)}
					incrementIcon={select('incrementIcon', ['', ...incrementIcons], IncrementSliderConfig)}
					knobStep={number('knobStep', IncrementSliderConfig)}
					max={number('max', IncrementSliderConfig)}
					min={number('min', IncrementSliderConfig)}
					noFill={boolean('noFill', IncrementSliderConfig)}
					onChange={action('onChange')}
					orientation={select('orientation', ['horizontal', 'vertical'], IncrementSliderConfig)}
					step={number('step', IncrementSliderConfig)} // def: 1
				>
					{tooltip ? (
						<IncrementSliderTooltip
							percent={percent}
							position={position}
						/>
					) : null}
				</IncrementSlider>
			);
		},
		{
			info: {
				text: 'Basic usage of IncrementSlider'
			}
		}
	);
