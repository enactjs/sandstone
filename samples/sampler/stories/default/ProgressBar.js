import ProgressBar, {ProgressBarBase, ProgressBarTooltip} from '@enact/sandstone/ProgressBar';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';

import css from './ProgressBar.module.less';

const ProgressBarConfig = mergeComponentMetadata('ProgressBar', ProgressBarBase);
const ProgressBarTooltipConfig = mergeComponentMetadata('ProgressBarTooltip', ProgressBarTooltip);
ProgressBar.displayName = 'ProgressBar';
ProgressBarTooltip.displayName = 'ProgressBarTooltip';

export default {
	title: 'Sandstone/ProgressBar',
	component: 'ProgressBar'
};

export const _ProgressBar = (args) => (
	<ProgressBar
		backgroundProgress={args['backgroundProgress']}
		disabled={args['disabled']}
		highlighted={args['highlighted']}
		orientation={args['orientation']}
		progress={args['progress']}
		progressAnchor={args['progressAnchor']}
		showAnchor={args['showAnchor']}
		className={args['orientation'] === 'vertical' || args['orientation'] === 'radial' ? css.margin : null}
	>
		{args['tooltip'] ? <ProgressBarTooltip position={args['position']} /> : null}
	</ProgressBar>
);

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
range(
	'backgroundProgress',
	_ProgressBar,
	ProgressBarConfig,
	{min: 0, max: 1, step: 0.01},
	0.5
);
boolean('highlighted', _ProgressBar, ProgressBarConfig);
select(
	'orientation',
	_ProgressBar,
	['horizontal', 'vertical', 'radial'],
	ProgressBarConfig
);
range(
	'progress',
	_ProgressBar,
	ProgressBarConfig,
	{min: 0, max: 1, step: 0.01},
	0.4
);
range(
	'progressAnchor',
	_ProgressBar,
	ProgressBarConfig,
	{min: 0, max: 1, step: 0.01},
	0
);
boolean('showAnchor', _ProgressBar, ProgressBarConfig);

_ProgressBar.storyName = 'ProgressBar';
_ProgressBar.parameters = {
	info: {
		text: 'The basic ProgressBar'
	}
};
