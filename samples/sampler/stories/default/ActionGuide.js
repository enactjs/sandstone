import {text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ActionGuide, {ActionGuideBase} from '@enact/sandstone/ActionGuide';
import React from 'react';
import {storiesOf} from '@storybook/react';

import iconNames from './icons';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

ActionGuide.displayName = 'ActionGuide';
const Config = mergeComponentMetadata('ActionGuide', ActionGuideBase, ActionGuide);

storiesOf('Sandstone', module)
	.add(
		'ActionGuide',
		() => {
			const iconType = select('icon type', ['glyph', 'url src', 'custom'], Config, 'glyph');
			let icon;
			switch (iconType) {
				case 'glyph': icon = select('icon', ['', ...iconNames], Config, 'arrowsmalldown'); break;
				case 'url src': icon = select('src', [docs, factory, logo], Config, logo); break;
				default: icon = text('custom icon', Config);
			}

			return (
				<ActionGuide buttonAriaLabel={text('buttonAriaLabel', Config, icon)} icon={icon}>
					{text('children', Config, 'Press some key to do something')}
				</ActionGuide>
			);
		},
		{
			info: {
				text: 'Explains the operation of an action'
			}
		}
	);
