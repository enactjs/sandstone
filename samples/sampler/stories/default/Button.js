import Button, {ButtonBase} from '@enact/sandstone/Button';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {Fragment} from 'react';

import iconNames from '../helper/icons';

// Button's prop `minWidth` defaults to true, and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean control and return `void 0` when `true`.
Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UIButtonBase, UIButton, ButtonBase, Button);
Config.defaultProps.tooltipType = 'balloon';

// Set up some defaults for info and controls
const prop = {
	backgroundOpacity: {
		'undefined/null (automatic)': '',
		'opaque (Default for text buttons)': 'opaque',
		'transparent (Default for icon-only buttons)': 'transparent'
	},
	color: ['', 'red', 'green', 'yellow', 'blue'],
	iconFlip: ['', 'auto', 'both', 'horizontal', 'vertical'],
	iconPosition: ['', 'before', 'after'],
	icons: ['', ...iconNames],
	minWidth: {'undefined/null (automatic)': '', 'true (enforce)': 'false', 'false (ignore)': 'false'},
	size: ['', 'small', 'large'],
	tooltipType: ['', 'balloon', 'transparent']
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
	title: 'Sandstone/Button',
	component: 'Button'
};

export const _Button = (args) => (
	<Fragment>
		<Button
			onClick={action('onClick')}
			onTap={action('onTap')}
			backgroundOpacity={args['backgroundOpacity']}
			color={args['color']}
			disabled={args['disabled']}
			icon={args['icon']}
			iconFlip={args['iconFlip']}
			iconPosition={args['iconPosition']}
			minWidth={threeWayBoolean(args['minWidth'])}
			roundBorder={args['roundBorder']}
			selected={args['selected']}
			shadowed={args['shadowed']}
			size={args['size']}
			tooltipText={args['tooltipText']}
			tooltipType={args['tooltipType']}
		>
			{args['children']}
		</Button>
	</Fragment>
);

select('backgroundOpacity', _Button, prop.backgroundOpacity, Config);
select('color', _Button, prop.color, Config);
boolean('disabled', _Button, Config);
select('icon', _Button, prop.icons, Config);
select('iconFlip', _Button, prop.iconFlip, Config);
select('iconPosition', _Button, prop.iconPosition, Config);
select('minWidth', _Button, prop.minWidth, Config, '');
boolean('roundBorder', _Button, Config);
boolean('selected', _Button, Config);
boolean('shadowed', _Button, Config);
select('size', _Button, prop.size, Config);
text('tooltipText', _Button, Config);
select('tooltipType', _Button, prop.tooltipType, Config);
text('children', _Button, Config, 'click me');

_Button.storyName = 'Button';
_Button.parameters = {
	info: {
		text: 'The basic Button'
	}
};
