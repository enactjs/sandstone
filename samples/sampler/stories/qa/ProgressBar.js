import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import ProgressBar, {ProgressBarBase} from '@enact/sandstone/ProgressBar';

const Config = mergeComponentMetadata('ProgressBar', ProgressBarBase, ProgressBar);

export default {
	title: 'Sandstone/ProgressBar',
	component: 'ProgressBar'
};

export const TheBasicProgressBar = () => (
	<ProgressBar
		backgroundProgress={number('backgroundProgress', Config, 0.5, {
			range: true,
			min: 0,
			max: 1,
			step: 0.01,
		})}
		tooltip={boolean('tooltip', Config, false)}
		highlighted={boolean('highlighted', Config, false)}
		progress={number('progress', Config, 0.4, {range: true, min: 0, max: 1, step: 0.01})}
		orientation={select('orientation', ['horizontal', 'vertical'], Config, 'horizontal')}
		disabled={boolean('disabled', Config, false)}
	/>
);

TheBasicProgressBar.storyName = 'The basic ProgressBar';
TheBasicProgressBar.parameters = {
	propTables: [Config]
};
