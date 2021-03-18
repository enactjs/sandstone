import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import ri from '@enact/ui/resolution';

const ContextualButton = ContextualMenuDecorator(Button);

ContextualButton.displayName = 'ContextualButton';
const Config = mergeComponentMetadata(
	'ContextualMenuDecorator',
	Button,
	ContextualButton,
	ContextualMenuDecorator
);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	direction: 'below right',
	offset: 'overlap'
};

export default {
	title: 'Sandstone/ContextualMenuDecorator',
	component: 'ContextualMenuDecorator'
};

export const _ContextualMenuDecorator = () => {
	const itemCount = number('items', Config, {range: true, min: 0, max: 10}, 2);
	const items = new Array(itemCount).fill().map((i, index) => `Option ${index + 1}`);

	return (
		<div style={{textAlign: 'center', marginTop: ri.scaleToRem(198)}}>
			<ContextualButton
				direction={select(
					'direction',
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
				)}
				menuItems={items}
				offset={select('offset', ['none', 'overlap', 'small'], Config)}
				onClose={action('onClose')}
				popupWidth={select('popupWidth', ['auto', 'small', 'large'], Config)}
				style={{width: ri.scaleToRem(1020)}}
			>
				{text('button string', Config, 'Contextual Button')}
			</ContextualButton>
		</div>
	);
};

_ContextualMenuDecorator.storyName = 'ContextualMenuDecorator';
_ContextualMenuDecorator.parameters = {
	info: {
		text: 'Basic usage of ContextualMenuDecorator'
	}
};
