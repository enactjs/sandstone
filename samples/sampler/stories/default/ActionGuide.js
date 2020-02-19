import {text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ActionGuide from '@enact/sandstone/ActionGuide';
import React from 'react';
import {storiesOf} from '@storybook/react';

const Config = mergeComponentMetadata('ActionGuide', ActionGuide);
ActionGuide.displayName = 'ActionGuide';

storiesOf('Sandstone', module)
	.add(
		'ActionGuide',
		() => {
			return (
				<ActionGuide icon="arrowlargedown">
					{text('children', Config, 'This is Body Text')}
				</ActionGuide>
			);
		},
		{
			info: {
				text: 'Explain operation of action'
			}
		}
	);
