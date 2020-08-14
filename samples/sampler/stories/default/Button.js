import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button, {ButtonBase} from '@enact/sandstone/Button';

import iconNames from './icons';

// Button's prop `minWidth` defaults to true and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean knob and return `void 0` when `true`.
Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UIButtonBase, UIButton, ButtonBase, Button);

// Set up some defaults for info and knobs
const prop = {
	backgroundOpacity: {'undefined/null (automatic)': '', 'opaque (Default for text buttons)': 'opaque', 'transparent (Default for icon-only buttons)': 'transparent'},
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
		case 'true': return true;
		case 'false': return false;
		case '': return null;
		default: return value;
	}
};

storiesOf('Sandstone', module)
	.add(
		'Button',
		() => (<React.Fragment>
			<Button
				onClick={action('onClick')}
				backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
				color={select('color', prop.color, Config)}
				disabled={boolean('disabled', Config)}
				icon={select('icon', prop.icons, Config)}
				iconFlip={select('iconFlip', prop.iconFlip, Config)}
				iconPosition={select('iconPosition', prop.iconPosition, Config)}
				minWidth={threeWayBoolean(select('minWidth', prop.minWidth, Config))}
				selected={boolean('selected', Config)}
				size={select('size', prop.size, Config)}
				tooltipText={text('tooltipText', Config)}
				tooltipType={select('tooltipType', prop.tooltipType, Config)}
			>
				{text('children', Config, 'click me')}
			</Button>
		</React.Fragment>),
		{
			info: {
				text: 'The basic Button'
			}
		}
	);
