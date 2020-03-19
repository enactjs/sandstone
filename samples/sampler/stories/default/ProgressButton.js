import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import ProgressButton from '@enact/sandstone/ProgressButton';
import React from 'react';

import iconNames from './icons';

const Config = mergeComponentMetadata('ProgressBar', ProgressButton);

ProgressButton.displayName = 'ProgressButton';

storiesOf('Sandstone', module)
	.add(
		'ProgressButton',
		() => {
			// added here to force Storybook to put the ProgressButton tab first
			const disabled = boolean('disabled', Config);

			return (
				<ProgressButton
					disabled={disabled}
					icon={select('icon', ['', ...iconNames], Config, 'stop')}
					progress={number('progress', Config, {range: true, min: 0, max: 1, step: 0.01}, 0.4)}
					showProgress={boolean('showProgress', Config)}
				>
					{text('children', Config, 'Update')}
				</ProgressButton>
			);
		},
		{
			info: {
				text: 'The basic ProgressButton'
			}
		}
	);
