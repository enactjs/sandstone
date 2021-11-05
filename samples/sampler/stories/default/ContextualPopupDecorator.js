import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {ContextualPopupDecorator} from '@enact/sandstone/ContextualPopupDecorator';
import ri from '@enact/ui/resolution';

const ContextualButton = ContextualPopupDecorator(Button);

ContextualButton.displayName = 'ContextualButton';
const Config = mergeComponentMetadata('ContextualPopupDecorator', Button, ContextualButton);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'below center',
	offset: 'small',
	open: false,
	spotlightRestrict: 'self-first'
};

export default {
	title: 'Sandstone/ContextualPopupDecorator',
	component: 'ContextualPopupDecorator'
};

export const _ContextualPopupDecorator = (args) => {
	function renderPopup () {
		return (
			<div>{args['popup string']}</div>
		)
	}

	return (
		<div style={{textAlign: 'center', marginTop: ri.scaleToRem(198)}}>
			<ContextualButton
				direction={args['direction']}
				noAutoDismiss={args['noAutoDismiss']}
				offset={args['offset']}
				onClose={action('onClose')}
				open={args['open']}
				popupComponent={renderPopup}
				spotlightRestrict={args['spotlightRestrict']}
			>
				{args['button string']}
			</ContextualButton>
			<BodyText centered>Use KNOBS to interact with the ContextualPopup.</BodyText>
		</div>
	);
};

text('popup string', _ContextualPopupDecorator, {groupId: 'Popup'}, 'Hello Contextual Popup');
select(
	'direction',
	_ContextualPopupDecorator,
	[
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left middle',
		'left top',
		'left bottom',
		'right middle',
		'right top',
		'right bottom'
	],
	Config
);
boolean('noAutoDismiss', _ContextualPopupDecorator, Config);
select('offset', _ContextualPopupDecorator, ['none', 'overlap', 'small'], Config);
boolean('open', _ContextualPopupDecorator, Config);
select('spotlightRestrict', _ContextualPopupDecorator, ['none', 'self-first', 'self-only'], Config);
text('button string', _ContextualPopupDecorator, Config, 'Hello Contextual Button');

_ContextualPopupDecorator.storyName = 'ContextualPopupDecorator';
_ContextualPopupDecorator.parameters = {
	info: {
		text: 'Basic usage of ContextualPopupDecorator'
	}
};
