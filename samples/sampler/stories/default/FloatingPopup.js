import BodyText from '@enact/sandstone/BodyText';
import FloatingPopup from '@enact/sandstone/FloatingPopup';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, object} from '@enact/storybook-utils/addons/controls';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('FloatingPopup', FloatingPopup);

export default {
	title: 'Sandstone/FloatingPopup',
	component: 'FloatingPopup'
};

const AppImageContents = () => <img src={svgGenerator(150, 150, '7ed31d', 'ffffff', 'Guide')} alt="guide" style={{borderRadius: '20px'}} />;
const AppTextContents = () => <div> This is text for popup contents </div>;

const contentStyle = {
	display: 'flex',
	alignItems: 'center',
	border: 'solid 1px',
	borderRadius: '20px'
};

const PopupContents = () => (
	<div style={contentStyle}>
		<AppImageContents />
		<AppTextContents />
	</div>
);

export const _FloatingPopup = (args) => (
	<div>
		<FloatingPopup
			open={args['open']}
			position={args['position']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
		>
			<PopupContents />
		</FloatingPopup>
		<BodyText centered>Use CONTROLS to interact with FloatingPopup.</BodyText>
	</div>
);

boolean('open', _FloatingPopup, Config);
object('position', _FloatingPopup, Config, {'left': 300, 'top': 300});

_FloatingPopup.storyName = 'FloatingPopup';
_FloatingPopup.parameters = {
	info: {
		text: 'Basic usage of FloatingPopup'
	}
};
