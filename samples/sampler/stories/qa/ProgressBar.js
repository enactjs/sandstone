import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import ProgressBar, {ProgressBarBase} from '@enact/sandstone/ProgressBar';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('ProgressBar', ProgressBarBase, ProgressBar);

export default {
	title: 'Sandstone/ProgressBar',
	component: 'ProgressBar'
};

export const TheBasicProgressBar = (args) => (
	<ProgressBar
		backgroundProgress={args['backgroundProgress']}
		tooltip={args['tooltip']}
		highlighted={args['highlighted']}
		progress={args['progress']}
		orientation={args['orientation']}
		disabled={args['disabled']}
	/>
);

range('backgroundProgress', TheBasicProgressBar, Config, {min: 0, max: 1, step: 0.01}, 0.5);
boolean('tooltip', TheBasicProgressBar, Config, false);
boolean('highlighted', TheBasicProgressBar, Config, false);
range('progress', TheBasicProgressBar, Config, {min: 0, max: 1, step: 0.01}, 0.4);
select('orientation', TheBasicProgressBar, ['horizontal', 'vertical'], Config, 'horizontal');
boolean('disabled', TheBasicProgressBar, Config, false);

TheBasicProgressBar.storyName = 'The basic ProgressBar';
TheBasicProgressBar.parameters = {
	propTables: [Config]
};


export const inAlert = (args) => {
	const [open, setOpen] = useState(false);

	const handleOpenAlert = useCallback(() => {
		setOpen(true);
	}, []);

	const handleCloseAlert = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<>
			<ProgressBar
				backgroundProgress={args['backgroundProgress']}
				tooltip={args['tooltip']}
				highlighted={args['highlighted']}
				progress={args['progress']}
				orientation={args['orientation']}
				disabled={args['disabled']}
			/>
			<Button onClick={handleOpenAlert}>open</Button>
			<Alert open={open} type="overlay" onClose={handleCloseAlert}>
				<ProgressBar
					backgroundProgress={args['backgroundProgress']}
					tooltip={args['tooltip']}
					highlighted={args['highlighted']}
					progress={args['progress']}
					orientation={args['orientation']}
					disabled={args['disabled']}
				/>
			</Alert>
		</>
	);
};

range('backgroundProgress', inAlert, Config, {min: 0, max: 1, step: 0.01}, 0.5);
boolean('tooltip', inAlert, Config, false);
boolean('highlighted', inAlert, Config, false);
range('progress', inAlert, Config, {min: 0, max: 1, step: 0.01}, 0.4);
select('orientation', inAlert, ['horizontal', 'vertical'], Config, 'horizontal');
boolean('disabled', inAlert, Config, false);

inAlert.storyName = 'inAlert';
inAlert.parameters = {
	propTables: [Config]
};
