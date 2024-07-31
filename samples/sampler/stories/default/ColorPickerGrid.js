import ColorPickerGrid from '@enact/sandstone/ColorPickerGrid';
import {action} from '@enact/storybook-utils/addons/actions';
import {Fragment} from 'react';
import {_Button} from "./Button";

ColorPickerGrid.displayName = 'ColorPicker';

export default {
	title: 'Sandstone/ColorPickerGrid',
	component: 'ColorPickerGrid'
};

export const _ColorPickerGrid = () => {
	return (
		<Fragment>
			<ColorPickerGrid
				onChange={action('onChange')}
			/>
		</Fragment>
	);
};

_ColorPickerGrid.storyName = 'ColorPickerGrid';
_ColorPickerGrid.parameters = {
	info: {
		text: 'The basic Color Picker Grid'
	}
};
