import {action} from '@enact/storybook-utils/addons/actions';

import ColorPicker from '@enact/sandstone/ColorPickerPOC/ColorPickerPOC';

ColorPicker.displayName = 'ColorPicker';

const colors = ['#eb4034', '#32a852', '#3455eb'];

export default {
	title: 'Sandstone/ColorPicker',
	component: 'ColorPicker'
};

export const _ColorPicker = () => (
	<ColorPicker
		colors={colors}
		onChangeColor={action('onChangeColor')}
		open
	/>
);

_ColorPicker.displayName = 'ColorPicker';
