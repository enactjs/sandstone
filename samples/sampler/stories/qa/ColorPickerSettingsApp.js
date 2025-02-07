import ColorPickerSettingsApp, {ColorPickerSettingsAppBase} from '@enact/sandstone/ColorPickerSettingsApp';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import {Fragment, useState} from 'react';

ColorPickerSettingsApp.displayName = 'ColorPickerSettingsApp';
const Config = mergeComponentMetadata('ColorPickerSettingsApp', ColorPickerSettingsAppBase, ColorPickerSettingsApp);

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
	title: 'Sandstone/ColorPickerSettingsApp',
	component: 'ColorPickerSettingsApp'
};

export const WithPresetColors = (args) => {
	const [color, setColor] = useState('#FF00FF');

	return (
		<Fragment>
			<ColorPickerSettingsApp
				color={color}
				colorHandler={setColor}
				disabled={args.disabled}
				presetColors={presetColors}
				text={args.text}
			/>
		</Fragment>
	);
};

boolean('disabled', WithPresetColors, Config, false);
text('text', WithPresetColors, Config, 'Color Picker');

WithPresetColors.storyName = 'with preset colors';
