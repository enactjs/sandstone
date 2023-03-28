import Button, {ButtonBase} from '@enact/sandstone/ButtonWC';
import ButtonOriginal from '@enact/sandstone/Button';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/ButtonWC';
import {Fragment} from 'react';

import iconNames from '../helper/icons';

// Button's prop `minWidth` defaults to true and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean control and return `void 0` when `true`.
Button.displayName = 'ButtonWC';
const Config = mergeComponentMetadata('ButtonWC', UIButtonBase, UIButton, ButtonBase, Button);

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
	minWidth: {'undefined/null (automatic)': '', 'true (enforce)': true, 'false (ignore)': 'false'},
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
	title: 'Sandstone/ButtonWC',
	component: 'ButtonWC'
};

export const _ButtonWC = (args) => (
	<Fragment>
		Original Button
		<ButtonOriginal
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
		</ButtonOriginal>
		Button
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

select('backgroundOpacity', _ButtonWC, prop.backgroundOpacity, Config);
select('color', _ButtonWC, prop.color, Config);
boolean('disabled', _ButtonWC, Config);
select('icon', _ButtonWC, prop.icons, Config);
select('iconFlip', _ButtonWC, prop.iconFlip, Config);
select('iconPosition', _ButtonWC, prop.iconPosition, Config);
select('minWidth', _ButtonWC, prop.minWidth, Config);
boolean('roundBorder', _ButtonWC, Config);
boolean('selected', _ButtonWC, Config);
boolean('shadowed', _ButtonWC, Config);
select('size', _ButtonWC, prop.size, Config);
text('tooltipText', _ButtonWC, Config);
select('tooltipType', _ButtonWC, prop.tooltipType, Config);
text('children', _ButtonWC, Config, 'click me');

_ButtonWC.storyName = 'ButtonWC';
_ButtonWC.parameters = {
	info: {
		text: 'The basic Button'
	}
};
