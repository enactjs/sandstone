import Button, {ButtonBase} from '@enact/sandstone/Button';
import Dropdown, {DropdownBase} from '@enact/sandstone/Dropdown';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, range, select, text} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

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
	component: 'Dropdown',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _Dropdown = (args) => {
	const itemCount = args['items'];
	const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
	const widthType = args['width type'];
	let width;
	switch (widthType) {
		case 'number': width = args['width (number)']; break;
		case 'preset': width = args['width']; break;
	}

	return (
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			placeholder={args['placeholder']}
			size={args['size']}
			title={args['title']}
			width={width}
		>
			{items}
		</Dropdown>
	);
};

range('items', _Dropdown, Config, {min: 0, max: 50}, 5);
select('width type', _Dropdown, ['preset', 'number'], Config, 'preset');
select('width', _Dropdown, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);
number('width (number)', _Dropdown, Config);
select('direction', _Dropdown, ['above', 'below'], Config);
boolean('disabled', _Dropdown, Config);
text('placeholder', _Dropdown, Config);
select('size', _Dropdown, ['small', 'large'], Config);
text('title', _Dropdown, Config, 'Options');

_Dropdown.storyName = 'Dropdown';
_Dropdown.parameters = {
	info: {
		text: 'A quick, inline, value-selection component'
	}
};
