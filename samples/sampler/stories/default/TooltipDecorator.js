import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import iconNames from './icons';
import TooltipDecorator, {Tooltip, TooltipBase} from '@enact/sandstone/TooltipDecorator';


const Config = mergeComponentMetadata('TooltipDecorator', TooltipDecorator, Tooltip, TooltipBase);
const TooltipButton = TooltipDecorator(
	{tooltipDestinationProp: 'decoration'},
	Button
);

const prop = {
	icons: ['', ...iconNames],
	tooltipPosition: [
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left bottom',
		'left middle',
		'left top',
		'right bottom',
		'right middle',
		'right top'
	],
	tooltipType: [
		'balloon',
		'transparent'
	]
};

storiesOf('Sandstone', module)
	.add(
		'TooltipDecorator',
		() => (
			<div style={{textAlign: 'center'}}>
				<TooltipButton
					disabled={boolean('disabled', Config)}
					icon={select('icon', prop.icons, Config)}
					tooltipDelay={number('tooltipDelay', Config, 500)}
					tooltipMarquee={boolean('tooltipMarquee', Config)}
					tooltipPosition={select('tooltipPosition', prop.tooltipPosition, Config)}
					tooltipRelative={boolean('tooltipRelative', Config)}
					tooltipText={text('tooltipText', Config, 'tooltip!')}
					tooltipType={select('tooltipType', prop.tooltipType, Config)}
					tooltipWidth={number('tooltipWidth', Config)}
				>
					{text('children', Config, 'click me')}
				</TooltipButton>
			</div>
		),
		{
			info: {
				text: 'The basic TooltipDecorator'
			}
		}
	);
