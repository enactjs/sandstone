import {action} from '@enact/storybook-utils/addons/actions';

import ColorPicker from '../../../../ColorPickerPOC/ColorPickerPOC';

ColorPicker.displayName = 'ColorPicker';

const colors = ['#eb4034', '#32a852', '#3455eb'];

export default {
	title: 'Sandstone/ColorPicker',
	component: 'ColorPicker',
}

export const _ColorPicker = (args) => (
	<ColorPicker
		colors={colors}
		onChangeColor={action('onChangeColor')}
		open={true}
	/>
);

_ColorPicker.displayName = 'ColorPicker';