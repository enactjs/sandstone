import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Panel, Header, HeaderBase} from '@enact/sandstone/Panels';
import Steps from '@enact/sandstone/Steps';
import {Fragment} from 'react';

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
		'1 button': <Button size="small" icon="ellipsis" />,
		'2 buttons': (
			<Fragment>
				<Button size="small" icon="search" />
				<Button size="small" icon="ellipsis" />
			</Fragment>
		)
	},
	buttonsSelection: ['no buttons', '1 button', '2 buttons'],
	marqueeOn: ['', 'hover', 'render'],
	type: ['standard', 'compact', 'wizard', 'mini']
};

export default {
	title: 'Sandstone/Panels/Header',
	component: 'Header'
};

export const PanelsHeader = () => {
	const slotAboveSelection = select('slotAbove', ['none', 'steps'], Config);
	const slotAbove = prop.above[slotAboveSelection];
	const slotBeforeSelection = select('slotBefore', prop.buttonsSelection, Config);
	const slotBefore = prop.buttons[slotBeforeSelection];
	const slotAfterSelection = select('slotAfter', prop.buttonsSelection, Config);
	const slotAfter = prop.buttons[slotAfterSelection];
	const childrenSelection = select('children', prop.buttonsSelection, Config);
	const children = prop.buttons[childrenSelection];

	// Panel is used here to circumvent a quirk of Storybook that inserts an unwanted DOM
	// node between the story and the "Environment", which in this case, prevents Header
	// from landing on the correct slot in Panel.
	const story = (
		<Panel>
			<Header
				title={text('title', Config, 'The Matrix')}
				subtitle={text(
					'subtitle',
					Config,
					'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
				)}
				type={select('type', prop.type, Config)}
				backButtonBackgroundOpacity={select(
					'backButtonBackgroundOpacity',
					['opaque', 'transparent'],
					Config,
					'transparent'
				)}
				centered={boolean('centered', Config)}
				closeButtonBackgroundOpacity={select(
					'closeButtonBackgroundOpacity',
					['opaque', 'transparent'],
					Config,
					'transparent'
				)}
				marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				noCloseButton={boolean('noCloseButton', Config)}
				onClose={action('onClose')}
				slotAbove={slotAbove}
				slotBefore={slotBefore}
				slotAfter={slotAfter}
			>
				{children}
			</Header>
			<BodyText>
				Example body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada
				felis egestas elit laoreet, at egestas justo ornare. Fusce vel diam porttitor, dapibus nisi
				in, lobortis ante. Sed quis gravida sapien, id convallis dui.
			</BodyText>
		</Panel>
	);

	return story;
};

PanelsHeader.storyName = 'Panels/Header';
PanelsHeader.parameters = {
	props: {
		noPanel: true
	},
	info: {
		text:
			"A block to use as a screen's title and description. Supports additional buttons and up to two subtitles."
	}
};
