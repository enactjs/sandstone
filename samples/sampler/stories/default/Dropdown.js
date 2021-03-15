import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {storiesOf} from '@storybook/react';

import Dropdown, {DropdownBase} from '@enact/sandstone/Dropdown';
import Button, {ButtonBase} from '@enact/sandstone/Button';

Dropdown.displayName = 'Dropdown';
const Config = mergeComponentMetadata('Dropdown', UIButtonBase, UIButton, ButtonBase, Button, DropdownBase, Dropdown);

storiesOf('Sandstone', module)
	.add(
		'Dropdown',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
			const widthType = select('width type', ['preset', 'number'], Config, 'preset');
			let width;
			switch (widthType) {
				case 'number': width = number('width', Config); break;
				case 'preset': width = select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config); break;
			}

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
					width={width}
				>
					{items}
				</Dropdown>
			);
		},
		{
			info: {
				text: 'A quick, inline, value-selection component'
			}
		}
	);
