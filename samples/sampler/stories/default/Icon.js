import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiIcon from '@enact/ui/Icon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon, {IconBase} from '@enact/sandstone/Icon';
import Heading from '@enact/sandstone/Heading';
import Scroller from '@enact/sandstone/Scroller';

import iconNames from './icons';

// import icons
import docs from '../../images/icon-enact-docs.png';
import factory from '../../images/icon-enact-factory.svg';
import logo from '../../images/icon-enact-logo.svg';

Icon.displayName = 'Icon';
const Config = mergeComponentMetadata('Icon', UiIcon, IconBase, Icon);

storiesOf('Sandstone', module)
	.add(
		'Icon',
		() => {
			const flip = select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '');

			let size = select('size', ['tiny', 'small', 'medium', 'large', 'custom number'], Config);
			if (size === 'custom number') {
				size = number('size (number)', Config, {range: true, min: 24, max: 480, step: 6}, 60);
			}

			const iconType = select('icon type', ['glyph', 'url src', 'custom'], Config, 'glyph');
			let children;
			switch (iconType) {
				case 'glyph': children = select('icon', ['', ...iconNames], Config, 'plus'); break;
				case 'url src': children = select('src', [docs, factory, logo], Config, logo); break;
				default: children = text('custom icon', Config);
			}
			return (
				<Scroller style={{height: '100%'}}>
					<Icon flip={flip} size={size}>
						{children}
					</Icon>
					<br />
					<br />
					<Heading showLine>All Icons</Heading>
					{iconNames.map((icon, index) => <Icon key={index} flip={flip} size={size} title={icon}>{icon}</Icon>)}
				</Scroller>
			);
		},
		{
			info: {
				text: 'Basic usage of Icon'
			}
		}
	);
