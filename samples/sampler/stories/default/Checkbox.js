import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Checkbox, {CheckboxBase} from '@enact/sandstone/Checkbox';

import iconNames from './icons';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', CheckboxBase, Checkbox);

storiesOf('Sandstone', module)
	.add(
		'Checkbox',
		() => {
			return (<div>
				<Checkbox
					disabled={boolean('disabled', Config)}
					icon={select('icon', ['', ...iconNames], Config)}
					onToggle={action('onToggle')}
				/>
			</div>);
		},
		{
			info: {
				text: 'Standalone Checkbox component, for simple toggles. The component used in CheckboxItem and FormCheckboxItem.'
			}
		}
	);
