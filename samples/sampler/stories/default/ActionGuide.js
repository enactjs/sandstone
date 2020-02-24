import {text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ActionGuide from '@enact/sandstone/ActionGuide';
import React from 'react';
import {storiesOf} from '@storybook/react';

import iconNames from './icons';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

const Config = mergeComponentMetadata('ActionGuide', ActionGuide);
ActionGuide.displayName = 'ActionGuide';

storiesOf('Sandstone', module)
	.add(
		'ActionGuide',
		() => {
			return (
				<ActionGuide icon={'arrowsmalldown'}>
					{text('children', Config, 'Press some key to do something')}
				</ActionGuide>
			);
		},
		{
			info: {
				text: 'Explain operation of action'
			}
		}
	);
