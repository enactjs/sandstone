import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import Button, {ButtonBase} from '@enact/sandstone/Button';
import ProgressButton, {ProgressButtonBase} from '@enact/sandstone/ProgressButton';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import iconNames from '../helper/icons';

ProgressButton.displayName = 'ProgressButton';
const Config = mergeComponentMetadata(
	'ProgressButton',
	UIButtonBase,
	UIButton,
	ButtonBase,
	Button,
	ProgressButtonBase,
	ProgressButton
);

// Set up some defaults for info and knobs
const prop = {
	backgroundOpacity: {
		'undefined/null (automatic)': '',
		'opaque (Default for text buttons)': 'opaque',
		'transparent (Default for icon-only buttons)': 'transparent'
	},
	color: ['', 'red', 'green', 'yellow', 'blue'],
	icons: ['', ...iconNames],
	minWidth: {'undefined/null (automatic)': '', 'true (enforce)': true, 'false (ignore)': 'false'},
	size: ['', 'small', 'large']
};

// The following is needed to allow us to disambiguate between minWidth=false and minWidth=undefined
const threeWayBoolean = (value) => {
	switch (value) {
		case 'true':
			return true;
		case 'false':
			return false;
		case '':
			return null;
		default:
			return value;
	}
};

export default {
	title: 'Sandstone/ProgressButton',
	component: 'ProgressButton'
};

export const _ProgressButton = () => {
	// added here to force Storybook to put the ProgressButton tab first
	const disabled = boolean('disabled', Config);

	return (
		<ProgressButton
			showProgress={boolean('showProgress', Config)}
			backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
			color={select('color', prop.color, Config)}
			disabled={disabled}
			icon={select('icon', prop.icons, Config)}
			minWidth={threeWayBoolean(select('minWidth', prop.minWidth, Config))}
			onClick={action('onClick')}
			progress={number('progress', Config, {range: true, min: 0, max: 1, step: 0.01}, 0.4)}
			size={select('size', prop.size, Config)}
		>
			{text('children', Config, 'Update')}
		</ProgressButton>
	);
};

_ProgressButton.storyName = 'ProgressButton';
_ProgressButton.parameters = {
	info: {
		text: 'The basic ProgressButton'
	}
};
