import { action } from '@enact/storybook-utils/addons/actions';
import { boolean } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import React from 'react';

import Switch, { SwitchBase } from '@enact/sandstone/Switch';

Switch.displayName = 'Switch';
const Config = mergeComponentMetadata('Switch', SwitchBase, Switch);

export default {
	title: 'Sandstone/Switch',
};

export const _Switch = () => {
	return <Switch disabled={boolean('disabled', Config)} onToggle={action('onToggle')} />;
};

_Switch.story = {
    name: 'Switch',

	parameters: {
		info: {
			text: 'Standalone Switch component, for simple toggles. The component used in SwitchItem.',
		},
	},
};
