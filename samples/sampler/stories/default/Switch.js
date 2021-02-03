import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import Switch, {SwitchBase} from '@enact/sandstone/Switch';
import React from 'react';

Switch.displayName = 'Switch';
const Config = mergeComponentMetadata('Switch', SwitchBase, Switch);

export default {
	title: 'Sandstone/Switch',
	component: 'Switch'
};

export const _Switch = () => {
	return <Switch disabled={boolean('disabled', Config)} onToggle={action('onToggle')} />;
};

_Switch.storyName = 'Switch';
_Switch.parameters = {
	info: {
		text: 'Standalone Switch component, for simple toggles. The component used in SwitchItem.'
	}
};
