import BodyText from '@enact/sandstone/BodyText';
import ColorPicker from '@enact/sandstone/ColorPicker';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('ColorPicker', ColorPicker);

const colors = ['#eb4034', '#32a852', '#3455eb'];

export default {
	title: 'Sandstone/ColorPicker',
	component: 'ColorPicker'
};

export const _ColorPicker = (args) => (
	<>
		<ColorPicker
			color={colors[0]}
			colors={colors}
			disabled={args['disabled']}
			onChangeColor={action('onChangeColor')}
			open={args['open']}
			type={args['type']}
		/>
		<BodyText centered>Use CONTROLS to interact with ColorPicker.</BodyText>
	</>
);

boolean('open', _ColorPicker, Config);
boolean('disabled', _ColorPicker, Config);
select('type', _ColorPicker, ['grid', 'spectrum', 'sliders'], Config);

_ColorPicker.displayName = 'ColorPicker';
_ColorPicker.parameters = {
	info: {
		text: 'Basic usage of ColorPicker'
	}
};
