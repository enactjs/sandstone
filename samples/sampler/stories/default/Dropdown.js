import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import Button, {ButtonBase} from '@enact/sandstone/Button';
import Dropdown, {DropdownBase} from '@enact/sandstone/Dropdown';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import React from 'react';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata(
	'Dropdown',
	UIButtonBase,
	UIButton,
	ButtonBase,
	Button,
	DropdownBase,
	Dropdown
);

export default {
    title: 'Sandstone/Dropdown',
    component: 'Dropdown'
};

export const _Dropdown = () => {
	const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
	const items = new Array(itemCount).fill().map((i, index) => `Option ${index + 1}`);

	return (
		<Dropdown
			direction={select('direction', ['above', 'below'], Config)}
			disabled={boolean('disabled', Config)}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			placeholder={text('placeholder', Config)}
			size={select('size', ['small', 'large'], Config)}
			title={text('title', Config, 'Options')}
			width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
		>
			{items}
		</Dropdown>
	);
};

_Dropdown.storyName = 'Dropdown';
_Dropdown.parameters = {
    info: {
        text: 'A quick, inline, value-selection component'
    }
};
