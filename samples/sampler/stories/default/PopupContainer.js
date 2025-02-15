import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import BodyText from '@enact/sandstone/BodyText';
import PopupContainer from '@enact/sandstone/PopupContainer';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, object} from '@enact/storybook-utils/addons/controls';

import {svgGenerator} from '../helper/svg';
import PropTypes from 'prop-types';

const Config = mergeComponentMetadata('PopupContainer', PopupContainer);

export default {
	title: 'Sandstone/PopupContainer',
	component: 'PopupContainer'
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

const PopupContainerBaseSample = ({args}) => {
	return (
		<div>
			<PopupContainer
				open={args['open']}
				position={args['position']}
				// forceDirection={args['forceDirection']}
				onClose={action('onClose')}
				onOpen={action('onOpen')}
			>
				<PopupContents />
			</PopupContainer>
			<BodyText centered>Use CONTROLS to interact with PopupContainer.</BodyText>
		</div>
	);
};

PopupContainerBaseSample.propTypes = {
	args: PropTypes.object,
	rtl: PropTypes.bool
};

const PopupContainerSamples = I18nContextDecorator(
	{rtlProp: 'rtl'},
	PopupContainerBaseSample
);

export const _PopupContainer = (args) => <PopupContainerSamples args={args} />;

boolean('open', _PopupContainer, Config);
object('position', _PopupContainer, Config, {'left': 300, 'top': 300});
// select('forceDirection', _PopupContainer,[null, 'ltr', 'rtl'], Config, null);

_PopupContainer.storyName = 'PopupContainer';
_PopupContainer.parameters = {
	info: {
		text: 'Basic usage of PopupContainer'
	}
};
