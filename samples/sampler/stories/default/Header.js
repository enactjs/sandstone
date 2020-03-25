import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, HeaderBase} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import Steps from '@enact/sandstone/Steps';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

// Set up some defaults for info and knobs
const prop = {
	above: {
		none: null,
		steps: <Steps current={3} total={5} />
	},
	buttons: {
		'no buttons': null,
		'1 button': <Button icon="ellipsis" />,
		'2 buttons': <React.Fragment>
			<Button icon="search" />
			<Button icon="ellipsis" />
		</React.Fragment>
	},
	buttonsSelection: ['no buttons', '1 button', '2 buttons'],
	marqueeOn: ['', 'hover', 'render'],
	type: ['standard', 'compact', 'wizard']
};

storiesOf('Sandstone', module)
	.add(
		'Header',
		() => {
			const headerInput = boolean('headerInput', Config, true) ? <Input placeholder="placeholder text" /> : null;
			const showInput = boolean('showInput', Config);
			const slotAboveSelection = select('slotAbove', ['none', 'steps'], Config);
			const slotAbove = prop.above[slotAboveSelection];
			const slotBeforeSelection = select('slotBefore', prop.buttonsSelection, Config);
			const slotBefore = prop.buttons[slotBeforeSelection];
			const slotAfterSelection = select('slotAfter', prop.buttonsSelection, Config);
			const slotAfter = prop.buttons[slotAfterSelection];
			const childrenSelection = select('children', prop.buttonsSelection, Config);
			const children = prop.buttons[childrenSelection];

			const story = (
				<Header
					title={text('title', Config, 'The Matrix')}
					subtitle={text('subtitle', Config, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.')}
					type={select('type', prop.type, Config)}
					centered={boolean('centered', Config)}
					collapsed={boolean('collapsed', Config)}
					headerInput={headerInput}
					showInput={showInput}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotBefore={slotBefore}
					slotAfter={slotAfter}
				>
					{children}
				</Header>
			);

			return story;
		},
		{
			props: {
				noHeader: true
			},
			info: {
				text: 'A block to use as a screen\'s title and description. Supports additional buttons and up to two subtitles.'
			}
		}
	);
