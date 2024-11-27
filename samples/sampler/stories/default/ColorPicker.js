import ColorPicker from '@enact/sandstone/ColorPicker';
import {action} from '@enact/storybook-utils/addons/actions';

ColorPicker.displayName = 'ColorPicker';

const colors = ['#eb4034', '#32a852', '#3455eb'];

export default {
	title: 'Sandstone/ColorPicker',
	component: 'ColorPicker'
};

export const _ColorPicker = () => (
	<ColorPicker
		color={colors[0]}
		colors={colors}
		onChangeColor={action('onChangeColor')}
		open
	/>
);

_ColorPicker.displayName = 'ColorPicker';
