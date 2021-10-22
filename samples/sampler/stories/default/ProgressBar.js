import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ProgressBar, {ProgressBarTooltip} from '@enact/sandstone/ProgressBar';

const ProgressBarConfig = mergeComponentMetadata('ProgressBar', ProgressBar);
const ProgressBarTooltipConfig = mergeComponentMetadata('ProgressBarTooltip', ProgressBarTooltip);
ProgressBar.displayName = 'ProgressBar';
ProgressBarTooltip.displayName = 'ProgressBarTooltip';

export default {
	title: 'Sandstone/ProgressBar',
	component: 'ProgressBar'
};

export const _ProgressBar = (args) => {
	// added here to force Storybook to put the ProgressBar tab first
	const disabled = args['disabled'];

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const tooltip = args['tooltip'];
	const position = args['position'];

	return (
		<ProgressBar
			backgroundProgress={args['backgroundProgress']}
			disabled={disabled}
			highlighted={args['highlighted']}
			orientation={args['orientation']}
			progress={args['progress']}
			progressAnchor={args['progressAnchor']}
			showAnchor={args['showAnchor']}
		>
			{tooltip ? <ProgressBarTooltip position={position} /> : null}
		</ProgressBar>
	);
};

boolean('disabled', _ProgressBar, ProgressBarConfig);
boolean('tooltip', _ProgressBar, ProgressBarTooltipConfig);
select(
	'position',
	_ProgressBar,
	[
		'',
		'above',
		'above left',
		'above center',
		'above right',
		'above before',
		'above after',
		'before',
		'left',
		'right',
		'after',
		'below',
		'below left',
		'below center',
		'below right',
		'below before',
		'below after'
	],
	ProgressBarTooltipConfig,
	''
);
number(
	'backgroundProgress',
	_ProgressBar,
	ProgressBarConfig,
	{range: true, min: 0, max: 1, step: 0.01},
	0.5
);
boolean('highlighted', _ProgressBar, ProgressBarConfig);
select(
	'orientation',
	_ProgressBar,
	['horizontal', 'vertical', 'radial'],
	ProgressBarConfig,
	'horizontal'
);
number(
	'progress',
	_ProgressBar,
	ProgressBarConfig,
	{range: true, min: 0, max: 1, step: 0.01},
	0.4
);
number(
	'progressAnchor',
	_ProgressBar,
	ProgressBarConfig,
	{range: true, min: 0, max: 1, step: 0.01},
	0
);
boolean('showAnchor', _ProgressBar, ProgressBarConfig);

_ProgressBar.storyName = 'ProgressBar';
_ProgressBar.parameters = {
	info: {
		text: 'The basic ProgressBar'
	}
};
