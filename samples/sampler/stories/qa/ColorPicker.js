import BodyText from '@enact/sandstone/BodyText';
import ColorPicker from '@enact/sandstone/ColorPicker';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';

ColorPicker.displayName = 'ColorPicker';
const Config = mergeComponentMetadata('ColorPicker', ColorPicker);

const colors = ['#eb4034', '#32a852', '#3455eb'];

export default {
	title: 'Sandstone/ColorPicker',
	component: 'ColorPicker'
};

export const WithDefaultColors = (args) => (
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

boolean('open', WithDefaultColors, Config);
boolean('disabled', WithDefaultColors, Config);
select('type', WithDefaultColors, ['grid', 'spectrum', 'sliders'], Config);

WithDefaultColors.storyName = 'with default colors';
