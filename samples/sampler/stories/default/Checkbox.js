import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import Checkbox, {CheckboxBase} from '@enact/sandstone/Checkbox';
import React from 'react';

import iconNames from '../helper/icons';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', CheckboxBase, Checkbox);

export default {
    title: 'Sandstone/Checkbox',
    component: 'Checkbox'
};

export const _Checkbox = () => {
	return (
		<Checkbox
			disabled={boolean('disabled', Config)}
			indeterminate={boolean('indeterminate', Config)}
			indeterminateIcon={select('indeterminateIcon', ['', ...iconNames], Config)}
			onToggle={action('onToggle')}
		>
			{select('children', ['', ...iconNames], Config)}
		</Checkbox>
	);
};

_Checkbox.storyName = 'Checkbox';
_Checkbox.parameters = {
    info: {
        text: 'Standalone Checkbox component, for simple toggles. The component used in CheckboxItem and FormCheckboxItem.'
    }
};
