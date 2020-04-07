import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ProgressBar, {ProgressBarTooltip} from '@enact/sandstone/ProgressBar';

const ProgressBarConfig = mergeComponentMetadata('ProgressBar', ProgressBar);
const ProgressBarTooltipConfig = mergeComponentMetadata('ProgressBarTooltip', ProgressBarTooltip);

ProgressBar.displayName = 'ProgressBar';
ProgressBarTooltip.displayName = 'ProgressBarTooltip';

storiesOf('Sandstone', module)
	.add(
		'ProgressBar',
		() => {
			// added here to force Storybook to put the ProgressBar tab first
			const disabled = boolean('disabled', ProgressBarConfig);

			// tooltip is first so it appears at the top of the tab. the rest are alphabetical
			const tooltip = boolean('tooltip', ProgressBarTooltipConfig);
			const position = select('position', ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], ProgressBarTooltipConfig, '');

			const separator = boolean('separator', ProgressBarConfig);

			return (
				<ProgressBar
					backgroundProgress={number('backgroundProgress', ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.5)}
					disabled={disabled}
					highlighted={boolean('highlighted', ProgressBarConfig)}
					orientation={select('orientation', ['horizontal', 'vertical', 'radial'], ProgressBarConfig, 'horizontal')}
					progress={number('progress', ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0.4)}
					separator={separator}
					progressAnchor={number('progressAnchor', ProgressBarConfig, {range: true, min: 0, max: 1, step: 0.01}, 0)}
				>
					{tooltip ? (
						<ProgressBarTooltip
							position={position}
						/>
					) : null}
				</ProgressBar>
			);
		},
		{
			info: {
				text: 'The basic ProgressBar'
			}
		}
	);
