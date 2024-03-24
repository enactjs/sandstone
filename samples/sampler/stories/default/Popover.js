import Popover from '@enact/sandstone/Popover';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('Popover', Popover);

export default {
	title: 'Sandstone/Popover',
	component: 'Popover'
};

export const _Popover = (args) => (
	<Popover
		noAnimation={args['noAnimation']}
		popover={args['popover']}
		popoverTarget={args['popoverTarget']}
		popoverTargetAction={args['popoverTargetAction']}
		position={args['position']}
		scrimType={args['scrimType']}
	>
		<div>{args['children']}</div>
	</Popover>
);

boolean('noAnimation', _Popover, Config);
select('popover', _Popover, ['auto', 'manual'], Config, 'auto');
text('popoverTarget', _Popover, Config, 'my-popover');
select('popoverTargetAction', _Popover, ['hide', 'show', 'toggle'], Config, 'toggle');
select(
	'position',
	_Popover,
	['bottom', 'center', 'fullscreen', 'left', 'right', 'top'],
	Config,
	'center'
);
select('scrimType', _Popover, ['translucent', 'transparent'], Config, 'translucent');
text('children', _Popover, Config, 'Hello Popup');

_Popover.storyName = 'Popover';
_Popover.parameters = {
	info: {
		text: 'The basic Popover'
	}
};
