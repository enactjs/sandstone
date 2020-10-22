import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button, {ButtonBase} from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Scroller from '@enact/sandstone/Scroller';
import {Row} from '@enact/ui/Layout';

import Section from './components/KitchenSinkSection';
import iconNames from '../default/icons';

import css from './Button.module.less';

// Button's prop `minWidth` defaults to true and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean knob and return `void 0` when `true`.
Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UIButtonBase, UIButton, ButtonBase, Button);

// Set up some defaults for info and knobs
const prop = {
	backgroundOpacity: ['', 'translucent', 'lightTranslucent', 'transparent'],
	color: ['', 'red', 'green', 'yellow', 'blue'],
	focusEffect: ['expand', 'static'],
	longText: {'A Loooooooooooooooooog Button': 'A Loooooooooooooooooog Button', 'BUTTON   WITH   EXTRA   SPACES': 'BUTTON   WITH   EXTRA   SPACES'},
	tallText: {' ฟิ้ ไั  ஒ  து': ' ฟิ้ ไั  ஒ  து', 'ÁÉÍÓÚÑÜ': 'ÁÉÍÓÚÑÜ', 'Bản văn': 'Bản văn', 'តន្ត្': 'តន្ត្'},
	icons: ['', ...iconNames]
};

storiesOf('Button', module)
	.add(
		'with long text',
		() => (
			<Button
				onClick={action('onClick')}
				backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
				disabled={boolean('disabled', Config)}
				focusEffect={select('focusEffect', prop.focusEffect, Config)}
				icon={select('icon', prop.icons, Config)}
				minWidth={boolean('minWidth', Config, true) ? void 0 : false}
				selected={boolean('selected', Config)}
				size={select('size', ['small', 'large'], Config)}
			>
				{select('value', prop.longText, Config, 'A Loooooooooooooooooog Button')}
			</Button>
		)
	)
	.add(
		'with tall characters',
		() => (
			<Button
				onClick={action('onClick')}
				backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
				disabled={boolean('disabled', Config)}
				focusEffect={select('focusEffect', prop.focusEffect, Config)}
				icon={select('icon', prop.icons, Config)}
				minWidth={boolean('minWidth', Config, true) ? void 0 : false}
				selected={boolean('selected', Config)}
				size={select('size', ['small', 'large'], Config)}
			>
				{select('value', prop.tallText, Config, 'ฟิ้  ไั  ஒ  து')}
			</Button>
		)
	)
	.add(
		'to validate minWidth with a single character',
		() => (
			<Button
				onClick={action('onClick')}
				backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
				disabled={boolean('disabled', Config)}
				focusEffect={select('focusEffect', prop.focusEffect, Config)}
				icon={select('icon', prop.icons, Config)}
				minWidth={boolean('minWidth', Config, false) ? void 0 : false}
				selected={boolean('selected', Config)}
				size={select('size', ['small', 'large'], Config)}
			>
				{text('value', Config, 'A')}
			</Button>
		)
	)
	.add(
		'to test if the parent element\'s background causes occlusion',
		() => (
			<div className={css.bgColor}>
				<Button
					onClick={action('onClick')}
					backgroundOpacity={select('backgroundOpacity', prop.backgroundOpacity, Config)}
					disabled={boolean('disabled', Config)}
					focusEffect={select('focusEffect', prop.focusEffect, Config)}
					icon={select('icon', prop.icons, Config)}
					minWidth={boolean('minWidth', Config, true) ? void 0 : false}
					selected={boolean('selected', Config)}
					size={select('size', ['small', 'large'], Config)}
				>
					Normal Button
				</Button>
			</div>
		)
	)
	.add(
		'with tap area displayed',
		() => (
			<div>
				<Heading>Button</Heading>
				<Button
					className={css.tapArea}
					onClick={action('onClick')}
					disabled={boolean('disabled', Config)}
					size="large"
				>
					Normal Button
				</Button>
				<Button
					className={css.tapArea}
					onClick={action('onClick')}
					disabled={boolean('disabled', Config)}
					size="small"
				>
					Small Button
				</Button>
				<Heading>Button with icons</Heading>
				<Button
					className={css.tapArea}
					disabled={boolean('disabled', Config)}
					onClick={action('onClick')}
					size="large"
					icon="star"
				/>
				<Button
					className={css.tapArea}
					disabled={boolean('disabled', Config)}
					onClick={action('onClick')}
					size="small"
					icon="star"
				/>
			</div>
		)
	)
	.add(
		'Kitchen Sink',
		() => (
			<Scroller>
				<Row wrap>
					<Section title="Small Buttons" size="50%">
						<Button size="small" alt="Normal">Button</Button>
						<Button size="small" alt="Selected" selected>Button</Button>
						<Button size="small" alt="Disabled" disabled>Button</Button>
						<Button size="small" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button size="small" alt="With Icon" icon="home">Button</Button>
					</Section>

					<Section title="Large Buttons" size="50%">
						<Button size="large" alt="Normal">Button</Button>
						<Button size="large" alt="Selected" selected>Button</Button>
						<Button size="large" alt="Disabled" disabled>Button</Button>
						<Button size="large" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button size="large" alt="With Icon" icon="home">Button</Button>
					</Section>

					<Section title="Small Icon Button" size="50%">
						<Button size="small" icon="play" alt="Normal" />
						<Button size="small" icon="play" alt="Selected" selected />
						<Button size="small" icon="play" alt="Disabled" disabled />
					</Section>

					<Section title="Large Icon Button" size="50%">
						<Button size="large" icon="play" alt="Normal" />
						<Button size="large" icon="play" alt="Selected" selected />
						<Button size="large" icon="play" alt="Disabled" disabled />
					</Section>

					<Section title="Small Transparent Buttons" size="50%">
						<Button backgroundOpacity="transparent" size="small" alt="Normal">Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="Selected" selected>Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="Disabled" disabled>Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="With Icon" icon="home">Button</Button>
					</Section>

					<Section title="Large Transparent Buttons" size="50%">
						<Button backgroundOpacity="transparent" size="large" alt="Normal">Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="Selected" selected>Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="Disabled" disabled>Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="With Icon" icon="home">Button</Button>
					</Section>

					<Section title="Static Focus Effect Text" size="50%">
						<Button focusEffect="static" size="small" alt="Small">Button</Button>
						<Button focusEffect="static" size="large" alt="Large">Button</Button>
						<Button focusEffect="static" backgroundOpacity="transparent" size="small" alt="Small Transparent">Button</Button>
						<Button focusEffect="static" backgroundOpacity="transparent" size="large" alt="Large Transparent">Button</Button>
					</Section>

					<Section title="Static Focus Effect Icon" size="50%">
						<Button focusEffect="static" size="small" icon="play" alt="Small" />
						<Button focusEffect="static" size="large" icon="play" alt="Large" />
					</Section>
				</Row>
			</Scroller>
		)
	);
