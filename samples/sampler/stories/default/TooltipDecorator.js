import Button from '@enact/sandstone/Button';
import TooltipDecorator, {Tooltip, TooltipBase} from '@enact/sandstone/TooltipDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';

import iconNames from '../helper/icons';

const Config = mergeComponentMetadata('TooltipDecorator', TooltipBase, Tooltip, TooltipDecorator);
Config.defaultProps.tooltipType = 'balloon';
const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

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
	tooltipType: ['balloon', 'transparent']
};

export default {
	title: 'Sandstone/TooltipDecorator',
	component: 'TooltipDecorator'
};

export const _TooltipDecorator = (args) => (
	<div style={{textAlign: 'center'}}>
		<TooltipButton
			disabled={args['disabled']}
			icon={args['icon']}
			tooltipDelay={args['tooltipDelay']}
			tooltipMarquee={args['tooltipMarquee']}
			tooltipPosition={args['tooltipPosition']}
			tooltipRelative={args['tooltipRelative']}
			tooltipText={args['tooltipText']}
			tooltipType={args['tooltipType']}
			tooltipWidth={args['tooltipWidth']}
		>
			{args['children']}
		</TooltipButton>
	</div>
);

boolean('disabled', _TooltipDecorator, Config);
select('icon', _TooltipDecorator, prop.icons, Config);
number('tooltipDelay', _TooltipDecorator, Config, 500);
boolean('tooltipMarquee', _TooltipDecorator, Config);
select('tooltipPosition', _TooltipDecorator, prop.tooltipPosition, Config, prop.tooltipPosition[0]);
boolean('tooltipRelative', _TooltipDecorator, Config);
text('tooltipText', _TooltipDecorator, Config, 'tooltip!');
select('tooltipType', _TooltipDecorator, prop.tooltipType, Config);
number('tooltipWidth', _TooltipDecorator, Config);
text('children', _TooltipDecorator, Config, 'click me');

_TooltipDecorator.storyName = 'TooltipDecorator';
_TooltipDecorator.parameters = {
	info: {
		text: 'The basic TooltipDecorator'
	}
};
