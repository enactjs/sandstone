import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import DaySelector, {DaySelectorBase} from '@enact/sandstone/DaySelector';

DaySelector.displayName = 'DaySelector';
const Config = mergeComponentMetadata('DaySelector', DaySelectorBase, DaySelector);

// NOTE: Something about the HOC is inhibiting accessing its defaultProps, so we're adding them here
// manually. This can (should) be revisited later to find out why and a solution.
Config.defaultProps = {
	dayNameLength: 'long',
	disabled: false
};

storiesOf('Sandstone', module)
	.add(
		'DaySelector',
		() => (
			<DaySelector
				disabled={boolean('disabled', Config)}
				dayNameLength={select('dayNameLength', ['short', 'medium', 'long', 'full'], Config)}
				onSelect={action('onSelect')}
			/>
		),
		{
			info: {
				text: 'Basic usage of DaySelector'
			}
		}
	);
