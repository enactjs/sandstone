import ColorPicker, {ColorPickerBase} from '@enact/sandstone/ColorPicker';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import {Fragment, useState} from 'react';

ColorPicker.displayName = 'ColorPicker';
const Config = mergeComponentMetadata('ColorPicker', ColorPickerBase, ColorPicker);
const presetColors = [
	'#FF0000',
	'#00FF00',
	'#0000FF',
	'#FFFF00',
	'#00FFFF',
	'#FFFFFF',
	'#000000'
];
export default {
	title: 'Sandstone/ColorPicker',
	component: 'ColorPicker'
};

export const _ColorPicker = (args) => {
	const [color, setColor] = useState('#FF00FF');

	return (
		<Fragment>
			<ColorPicker
				color={color}
				colorHandler={setColor}
				disabled={args.disabled}
				presetColors={presetColors}
				text={args.text}
			/>
		</Fragment>
	);
};

boolean('disabled', _ColorPicker, Config, false);
text('text', _ColorPicker, Config, 'Color Picker');

_ColorPicker.storyName = 'ColorPicker';
_ColorPicker.parameters = {
	info: {
		text: 'The basic ColorPicker'
	}
};
