import Button, {ButtonBase} from '@enact/sandstone/Button';
import ProgressButton, {ProgressButtonBase} from '@enact/sandstone/ProgressButton';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select, text} from '@enact/storybook-utils/addons/controls';
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

// Set up some defaults for info and controls
const prop = {
	backgroundOpacity: {
		'undefined/null (automatic)': '',
		'opaque (Default for text buttons)': 'opaque',
		'transparent (Default for icon-only buttons)': 'transparent'
	},
	color: ['', 'red', 'green', 'yellow', 'blue'],
	icons: ['', ...iconNames],
	minWidth: {'undefined/null (automatic)': '', 'true (enforce)': 'false', 'false (ignore)': 'false'},
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

export const _ProgressButton = (args) => (
	<ProgressButton
		showProgress={args['showProgress']}
		backgroundOpacity={args['backgroundOpacity']}
		color={args['color']}
		disabled={args['disabled']}
		icon={args['icon']}
		minWidth={threeWayBoolean(args['minWidth'])}
		onClick={action('onClick')}
		progress={args['progress']}
		size={args['size']}
	>
		{args['children']}
	</ProgressButton>
);

boolean('disabled', _ProgressButton, Config);
boolean('showProgress', _ProgressButton, Config);
select('backgroundOpacity', _ProgressButton, prop.backgroundOpacity, Config);
select('color', _ProgressButton, prop.color, Config);
select('icon', _ProgressButton, prop.icons, Config);
select('minWidth', _ProgressButton, prop.minWidth, Config, '');
range('progress', _ProgressButton, Config, {min: 0, max: 1, step: 0.01}, 0.4);
select('size', _ProgressButton, prop.size, Config);
text('children', _ProgressButton, Config, 'Update');

_ProgressButton.storyName = 'ProgressButton';
_ProgressButton.parameters = {
	info: {
		text: 'The basic ProgressButton'
	}
};
