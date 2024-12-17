import Button, {ButtonBase} from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {Row} from '@enact/ui/Layout';
import Scroller from '@enact/sandstone/Scroller';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import iconNames from '../helper/icons';

import Section from './components/KitchenSinkSection';

import css from './Button.module.less';

// Button's prop `minWidth` defaults to true, and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean control and return `void 0` when `true`.
Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UIButtonBase, UIButton, ButtonBase, Button);

// Set up some defaults for info and controls
const prop = {
	backgroundOpacity: {
		'undefined/null (automatic)': '',
		'opaque (Default for text buttons)': 'opaque',
		'transparent (Default for icon-only buttons)': 'transparent'
	},
	color: ['', 'red', 'green', 'yellow', 'blue'],
	focusEffect: ['expand', 'static'],
	longText: {
		'A Loooooooooooooooooog Button': 'A Loooooooooooooooooog Button',
		'BUTTON   WITH   EXTRA   SPACES': 'BUTTON   WITH   EXTRA   SPACES'
	},
	tallText: {
		'ฟิ ไั ஒ து': 'ฟิ้ ไั ஒ து',
		ÁÉÍÓÚÑÜ: 'ÁÉÍÓÚÑÜ',
		'Bản văn': 'Bản văn',
		តន្ត្រី: 'តន្ត្រី'
	},
	icons: ['', ...iconNames]
};

export default {
	title: 'Sandstone/Button',
	component: 'Button'
};

export const WithLongText = (args) => (
	<Button
		onClick={action('onClick')}
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		focusEffect={args['focusEffect']}
		icon={args['icon']}
		minWidth={args['minWidth'] ? void 0 : false}
		selected={args['selected']}
		size={args['size']}
	>
		{args['value']}
	</Button>
);

select('backgroundOpacity', WithLongText, prop.backgroundOpacity, Config);
boolean('disabled', WithLongText, Config);
select('focusEffect', WithLongText, prop.focusEffect, Config);
select('icon', WithLongText, prop.icons, Config);
boolean('minWidth', WithLongText, Config, true);
boolean('selected', WithLongText, Config);
select('size', WithLongText, ['small', 'large'], Config);
select('value', WithLongText, prop.longText, Config, 'A Loooooooooooooooooog Button');

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<Button
		onClick={action('onClick')}
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		focusEffect={args['focusEffect']}
		icon={args['icon']}
		minWidth={args['minWidth'] ? void 0 : false}
		selected={args['selected']}
		size={args['size']}
	>
		{args['value']}
	</Button>
);

select('backgroundOpacity', WithTallCharacters, prop.backgroundOpacity, Config);
boolean('disabled', WithTallCharacters, Config);
select('focusEffect', WithTallCharacters, prop.focusEffect, Config);
select('icon', WithTallCharacters, prop.icons, Config);
boolean('minWidth', WithTallCharacters, Config, true);
boolean('selected', WithTallCharacters, Config);
select('size', WithTallCharacters, ['small', 'large'], Config);
select('value', WithTallCharacters, prop.tallText, Config, 'ฟิ้ ไั ஒ து');

WithTallCharacters.storyName = 'with tall characters';

export const ToValidateMinWidthWithASingleCharacter = (args) => (
	<Button
		onClick={action('onClick')}
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		focusEffect={args['focusEffect']}
		icon={args['icon']}
		minWidth={args['minWidth'] ? void 0 : false}
		selected={args['selected']}
		size={args['size']}
	>
		{args['value']}
	</Button>
);

select('backgroundOpacity', ToValidateMinWidthWithASingleCharacter, prop.backgroundOpacity, Config);
boolean('disabled', ToValidateMinWidthWithASingleCharacter, Config);
select('focusEffect', ToValidateMinWidthWithASingleCharacter, prop.focusEffect, Config);
select('icon', ToValidateMinWidthWithASingleCharacter, prop.icons, Config);
boolean('minWidth', ToValidateMinWidthWithASingleCharacter, Config, false);
boolean('selected', ToValidateMinWidthWithASingleCharacter, Config);
select('size', ToValidateMinWidthWithASingleCharacter, ['small', 'large'], Config);
text('value', ToValidateMinWidthWithASingleCharacter, Config, 'A');

ToValidateMinWidthWithASingleCharacter.storyName = 'to validate minWidth with a single character';

export const ToTestIfTheParentElementsBackgroundCausesOcclusion = (args) => (
	<div className={css.bgColor}>
		<Button
			onClick={action('onClick')}
			backgroundOpacity={args['backgroundOpacity']}
			disabled={args['disabled']}
			focusEffect={args['focusEffect']}
			icon={args['icon']}
			minWidth={args['minWidth'] ? void 0 : false}
			selected={args['selected']}
			size={args['size']}
		>
			Normal Button
		</Button>
	</div>
);

select('backgroundOpacity', ToTestIfTheParentElementsBackgroundCausesOcclusion, prop.backgroundOpacity, Config);
boolean('disabled', ToTestIfTheParentElementsBackgroundCausesOcclusion, Config);
select('focusEffect', ToTestIfTheParentElementsBackgroundCausesOcclusion, prop.focusEffect, Config);
select('icon', ToTestIfTheParentElementsBackgroundCausesOcclusion, prop.icons, Config);
boolean('minWidth', ToTestIfTheParentElementsBackgroundCausesOcclusion, Config, true);
boolean('selected', ToTestIfTheParentElementsBackgroundCausesOcclusion, Config);
select('size', ToTestIfTheParentElementsBackgroundCausesOcclusion, ['small', 'large'], Config);

ToTestIfTheParentElementsBackgroundCausesOcclusion.storyName = "to test if the parent element's background causes occlusion";

export const WithTapAreaDisplayed = (args) => (
	<div>
		<Heading>Button</Heading>
		<Button
			className={css.tapArea}
			onClick={action('onClick')}
			disabled={args['disabled']}
			size="large"
		>
			Normal Button
		</Button>
		<Button
			className={css.tapArea}
			onClick={action('onClick')}
			disabled={args['disabled']}
			size="small"
		>
			Small Button
		</Button>
		<Heading>Button with icons</Heading>
		<Button
			className={css.tapArea}
			disabled={args['disabled']}
			onClick={action('onClick')}
			size="large"
			icon="star"
		/>
		<Button
			className={css.tapArea}
			disabled={args['disabled']}
			onClick={action('onClick')}
			size="small"
			icon="star"
		/>
	</div>
);

boolean('disabled', WithTapAreaDisplayed, Config);

WithTapAreaDisplayed.storyName = 'with tap area displayed';

export const KitchenSink = () => (
	<Scroller>
		<Row wrap>
			<Section title="Small Buttons" size="50%">
				<Button size="small" alt="Normal">
					Button
				</Button>
				<Button size="small" alt="Selected" selected>
					Button
				</Button>
				<Button size="small" alt="Disabled" disabled>
					Button
				</Button>
				<Button size="small" alt="Long Text">
					Super-duper long text string inside a button
				</Button>
				<Button size="small" alt="With Icon" icon="home">
					Button
				</Button>
				<Button roundBorder size="small" alt="Round Border">
					Button
				</Button>
			</Section>

			<Section title="Large Buttons" size="50%">
				<Button size="large" alt="Normal">
					Button
				</Button>
				<Button size="large" alt="Selected" selected>
					Button
				</Button>
				<Button size="large" alt="Disabled" disabled>
					Button
				</Button>
				<Button size="large" alt="Long Text">
					Super-duper long text string inside a button
				</Button>
				<Button size="large" alt="With Icon" icon="home">
					Button
				</Button>
				<Button roundBorder size="large" alt="Round Border">
					Button
				</Button>
			</Section>

			<Section title="Small Icon Button" size="50%">
				<Button size="small" icon="play" alt="Normal" />
				<Button size="small" icon="play" alt="Selected" selected />
				<Button size="small" icon="play" alt="Disabled" disabled />
				<Button roundBorder size="small" icon="play" alt="Round Border" disabled />
			</Section>

			<Section title="Large Icon Button" size="50%">
				<Button size="large" icon="play" alt="Normal" />
				<Button size="large" icon="play" alt="Selected" selected />
				<Button size="large" icon="play" alt="Disabled" disabled />
				<Button roundBorder size="large" icon="play" alt="Round Border" disabled />
			</Section>

			<Section title="Small Transparent Buttons" size="50%">
				<Button backgroundOpacity="transparent" size="small" alt="Normal">
					Button
				</Button>
				<Button backgroundOpacity="transparent" size="small" alt="Selected" selected>
					Button
				</Button>
				<Button backgroundOpacity="transparent" size="small" alt="Disabled" disabled>
					Button
				</Button>
				<Button backgroundOpacity="transparent" size="small" alt="Long Text">
					Super-duper long text string inside a button
				</Button>
				<Button backgroundOpacity="transparent" size="small" alt="With Icon" icon="home">
					Button
				</Button>
				<Button backgroundOpacity="transparent" roundBorder size="small" alt="Round Border">
					Button
				</Button>
			</Section>

			<Section title="Large Transparent Buttons" size="50%">
				<Button backgroundOpacity="transparent" size="large" alt="Normal">
					Button
				</Button>
				<Button backgroundOpacity="transparent" size="large" alt="Selected" selected>
					Button
				</Button>
				<Button backgroundOpacity="transparent" size="large" alt="Disabled" disabled>
					Button
				</Button>
				<Button backgroundOpacity="transparent" size="large" alt="Long Text">
					Super-duper long text string inside a button
				</Button>
				<Button backgroundOpacity="transparent" size="large" alt="With Icon" icon="home">
					Button
				</Button>
				<Button backgroundOpacity="transparent" roundBorder size="large" alt="Round Border">
					Button
				</Button>
			</Section>

			<Section title="Static Focus Effect Text" size="50%">
				<Button focusEffect="static" size="small" alt="Small">
					Button
				</Button>
				<Button focusEffect="static" roundBorder size="small" alt=" Small Round Border">
					Button
				</Button>
				<Button focusEffect="static" size="large" alt="Large">
					Button
				</Button>
				<Button focusEffect="static" roundBorder size="large" alt="Large Round Border">
					Button
				</Button>
				<Button
					focusEffect="static"
					backgroundOpacity="transparent"
					size="small"
					alt="Small Transparent"
				>
					Button
				</Button>
				<Button
					focusEffect="static"
					backgroundOpacity="transparent"
					roundBorder
					size="small"
					alt="Small Transparent Round Border"
				>
					Button
				</Button>
				<Button
					focusEffect="static"
					backgroundOpacity="transparent"
					size="large"
					alt="Large Transparent"
				>
					Button
				</Button>
				<Button
					focusEffect="static"
					backgroundOpacity="transparent"
					roundBorder
					size="large"
					alt="Large Transparent Round Border"
				>
					Button
				</Button>
			</Section>

			<Section title="Static Focus Effect Icon" size="50%">
				<Button focusEffect="static" size="small" icon="play" alt="Small" />
				<Button focusEffect="static" roundBorder size="small" icon="play" alt="Small Round Border" />
				<Button focusEffect="static" size="large" icon="play" alt="Large" />
				<Button focusEffect="static" roundBorder size="large" icon="play" alt="Large Round Border" />
			</Section>
		</Row>
	</Scroller>
);

KitchenSink.storyName = 'kitchen sink';
KitchenSink.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
