import BodyText from '@enact/sandstone/BodyText';
import ContextualPopover from '@enact/sandstone/ContextualPopover';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

const Config = mergeComponentMetadata('ContextualPopover', ContextualPopover);

export default {
	title: 'Sandstone/ContextualPopover',
	component: 'ContextualPopover'
};

export const _ContextualPopover = (args) => (
	<div style={{textAlign: 'center', marginTop: ri.scaleToRem(198)}}>
		<ContextualPopover
			direction={args['direction']}
			noAutoDismiss={args['noAutoDismiss']}
			offset={args['offset']}
		>
			{args['children']}
		</ContextualPopover>
		<BodyText centered>Use CONTROLS to interact with the ContextualPopover.</BodyText>
	</div>
);

select(
	'direction',
	_ContextualPopover,
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
boolean('noAutoDismiss', _ContextualPopover, Config);
select('offset', _ContextualPopover, ['none', 'overlap', 'small'], Config);
text('children', _ContextualPopover, Config, 'Hello Contextual Popover');

_ContextualPopover.storyName = 'ContextualPopover';
_ContextualPopover.parameters = {
	info: {
		text: 'Basic usage of ContextualPopover'
	}
};
