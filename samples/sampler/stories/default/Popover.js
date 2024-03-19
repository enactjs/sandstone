import Popover from '@enact/sandstone/Popover';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select, text} from '@enact/storybook-utils/addons/controls';

const Config = mergeComponentMetadata('Popover', Popover);

export default {
	title: 'Sandstone/Popover',
	component: 'Popover'
};

export const _Popover = (args) => (
	<Popover
		popover={args['popover']}
		popoverTarget={args['popoverTarget']}
		popoverTargetAction={args['popoverTargetAction']}
	/>
);

select('popover', _Popover, ['auto', 'manual'], Config, 'auto');
text('popoverTarget', _Popover, Config, 'my-popover');
select('popoverTargetAction', _Popover, ['hide', 'show', 'toggle'], Config, 'toggle');

_Popover.storyName = 'Popover';
_Popover.parameters = {
	info: {
		text: 'The basic Popover'
	}
};
