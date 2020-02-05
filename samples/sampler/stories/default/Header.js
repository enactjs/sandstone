import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, HeaderBase} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

// Set up some defaults for info and knobs
const prop = {
	children: {
		'no buttons': null,
		'1 button': <Button icon="gear" />,
		'2 buttons': <React.Fragment>
			<Button>A Button</Button>
			<Button icon="gear" />
		</React.Fragment>
	},
	controls: {
		'no buttons': null,
		'1 button': <Button icon="gear" />,
		'2 buttons': <React.Fragment>
			<Button icon="star" />
			<Button icon="gear" />
		</React.Fragment>
	},
	marqueeOn: ['', 'hover', 'render'],
	type: ['compact', 'dense', 'standard']
};

storiesOf('Sandstone', module)
	.add(
		'Header',
		context => {
			context.noHeader = true;

			const headerInput = boolean('headerInput', Config) ? <Input placeholder="placeholder text" /> : null;
			const childrenSelection = select('children', ['no buttons', '1 button', '2 buttons'], Config);
			const children = prop.children[childrenSelection];

			const story = (
				<Header
					title={text('title', Config, 'The Matrix')}
					titleBelow={text('titleBelow', Config, 'Free your mind')}
					subTitleBelow={text('subTitleBelow', Config, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.')}
					type={select('type', prop.type, Config)}
					centered={boolean('centered', Config)}
					fullBleed={boolean('fullBleed', Config)}
					headerInput={headerInput}
					hideLine={boolean('hideLine', Config)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{children}
				</Header>
			);

			context.panelsProps = {
				controls: prop.controls[select('controls', ['no buttons', '1 button', '2 buttons'], {displayName: 'Panels'})],
				noCloseButton: boolean('noCloseButton', {displayName: 'Panels'}) || false
			};

			return story;
		},
		{
			info: {
				text: 'A block to use as a screen\'s title and description. Supports additional buttons and up to two subtitles.'
			}
		}
	);
