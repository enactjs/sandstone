import ColorPickerGrid from '@enact/sandstone/ColorPickerGrid';
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

_ColorPickerGrid.storyName = 'Color Picker Grid';
