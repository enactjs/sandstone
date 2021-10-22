import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import BodyText from '@enact/sandstone/BodyText';
import Popup from '@enact/sandstone/Popup';

const Config = mergeComponentMetadata('Popup', Popup);

export default {
	title: 'Sandstone/Popup',
	component: 'Popup'
};

export const _Popup = (args) => (
	<div>
		<Popup
			open={args['open']}
			position={args['position']}
			noAnimation={args['noAnimation']}
			noAutoDismiss={args['noAutoDismiss']}
			onClose={action('onClose')}
			onHide={action('onHide')}
			onShow={action('onShow')}
			scrimType={args['scrimType']}
			spotlightRestrict={args['spotlightRestrict']}
		>
			<div>{args['children']}</div>
		</Popup>
		<BodyText centered>Use KNOBS to interact with Popup.</BodyText>
	</div>
);

boolean('open', _Popup, Config);
select(
	'position',
	_Popup,
	['bottom', 'center', 'fullscreen', 'left', 'right', 'top'],
	Config,
	'bottom'
);
boolean('noAnimation', _Popup, Config);
boolean('noAutoDismiss', _Popup, Config);
select('scrimType', _Popup, ['none', 'translucent', 'transparent'], Config, 'translucent');
select(
	'spotlightRestrict',
	_Popup,
	['self-first', 'self-only'],
	Config,
	'self-only'
);
text('children', _Popup, Config, 'Hello Popup');

_Popup.storyName = 'Popup';
_Popup.parameters = {
	info: {
		text: 'Basic usage of Popup'
	}
};
