import {select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UiIcon from '@enact/ui/Icon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon, {IconBase} from '../../../../Icon';
import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';

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
			const size = select('size', ['small', 'large'], Config, 'large');
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
