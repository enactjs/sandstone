import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';
import Switch, {SwitchBase} from '@enact/sandstone/Switch';

Switch.displayName = 'Switch';
const Config = mergeComponentMetadata('Switch', SwitchBase, Switch);

export default {
	title: 'Sandstone/Switch',
	component: 'Switch'
};

export const _Switch = (args) => {
	return <Switch disabled={args['disabled']} onToggle={action('onToggle')} />;
};

boolean('disabled', _Switch, Config);

_Switch.storyName = 'Switch';
_Switch.parameters = {
	info: {
		text: 'Standalone Switch component, for simple toggles. The component used in SwitchItem.'
	}
};
