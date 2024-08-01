import ColorPickerGrid from '@enact/sandstone/ColorPickerPOC/ColorPickerGrid';
import {action} from '@enact/storybook-utils/addons/actions';
import {Fragment} from 'react';

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
