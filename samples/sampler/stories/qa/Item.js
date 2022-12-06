import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Row} from '@enact/ui/Layout';
import {scale} from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import icons from '../helper/icons';

import Section from './components/KitchenSinkSection';

import css from './Item.module.less';

const iconNames = ['', ...icons];

const inputData = {
	shortText: 'Short',
	longText:
	'The W3C is an international community where Member organizations, a full-time staff, and the public work together to develop Web standards.',
	extraSpaceText:
	'This                                                             text                                                                          has                                                                                        extra                                                                         spaces',
	tallText: ['नरेंद्र मोदी', 'ฟิ ไั ஒ து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'صباح الخير', 'តន្ត្រី'],
	disabledText: 'This text is disabled',
	normalText: 'Item with text that is spottable',
	longLabel:
	'label starts - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. = label ends',
	longChildren:
	'children starts - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. - children ends',
	shortLabel: 'Label',
	shortChildren: 'Hello LabeledItem',
	mediumChildren:
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. The End.'
};

Item.displayName = 'Item';
Icon.displayName = 'Icon';

const KsIcon = <Icon size="small">notification</Icon>;

export default {
	title: 'Sandstone/Item',
	component: 'Item'
};

export const WithLongText = (args) => (
	<Item disabled={args['disabled']}>
		{args['Children']}
	</Item>
);

boolean('disabled', WithLongText, Item);
text('Children', WithLongText, Item, inputData.longText);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = (args) => (
	<Item disabled={args['disabled']}>
		{args['value']}
	</Item>
);

boolean('disabled', WithTallCharacters, Item);
select('value', WithTallCharacters, inputData.tallText, Item, inputData.tallText[2]);

WithTallCharacters.storyName = 'with tall characters';

export const WithExtraSpaces = (args) => (
	<Item disabled={args['disabled']}>
		{args['Children']}
	</Item>
);

boolean('disabled', WithExtraSpaces, Item);
text('Children', WithExtraSpaces, Item, inputData.extraSpaceText);

WithExtraSpaces.storyName = 'with extra spaces';

export const SampleForSpotabilityTest = (args) => (
	<div>
		<Item>
			{args['Spottable Text']}
		</Item>
		<Item disabled>
			{args['Disabled Text']}
		</Item>
		<Item>
			<Icon size={args['size']}>
				{args['iconBefore']}
			</Icon>
			{args['Text with iconBefore']}
		</Item>
		<Item>
			{args['Text with iconAfter']}
			<Icon size={args['size']}>
				{args['iconAfter']}
			</Icon>
		</Item>
		<Item>
			<Icon size={args['size']}>gear</Icon>
			<Icon size={args['size']}>minus</Icon>
			<Icon size={args['size']}>trash</Icon>
			<Icon size={args['size']}>notification</Icon>
		</Item>
	</div>
);

text('Spottable Text', SampleForSpotabilityTest, Item, inputData.normalText);
text('Disabled Text', SampleForSpotabilityTest, Item, inputData.disabledText);
select('size', SampleForSpotabilityTest, ['small', 'large'], Item, 'large');
select('iconBefore', SampleForSpotabilityTest, iconNames, Item, 'plus');
text('Text with iconBefore', SampleForSpotabilityTest, Item, 'Item with text that is spottable with an icon (at the start of the string)');
text('Text with iconAfter', SampleForSpotabilityTest, Item, 'Item with text that is spottable with an icon(at the end of the string)');
select('iconAfter', SampleForSpotabilityTest, iconNames, Item, 'arrowhookright');

SampleForSpotabilityTest.storyName = 'sample for spotability test';

export const WithDifferentTextLength = (args) => (
	<Scroller>
		<div>
			<Heading showLine style={{marginTop: scale(90)}}>
				Long children and Short label
			</Heading>
			<Item
				disabled={args['disabled']}
				inline={args['inline']}
				label={args['label']}
			>
				{args['children2']}
			</Item>

			<Heading showLine style={{marginTop: scale(90)}}>
				Short children and Long label
			</Heading>
			<Item
				disabled={args['disabled']}
				inline={args['inline']}
				label={args['label2']}
			>
				{args['children']}
			</Item>

			<Heading showLine style={{marginTop: scale(90)}}>
				Long children and Long label
			</Heading>
			<Item
				disabled={args['disabled']}
				inline={args['inline']}
				label={args['label2']}
			>
				{args['children2']}
			</Item>
		</div>
	</Scroller>
);

boolean('disabled', WithDifferentTextLength, Item);
boolean('inline', WithDifferentTextLength, Item);
text('label', WithDifferentTextLength, Item, inputData.shortLabel);
text('children2', WithDifferentTextLength, Item, inputData.longChildren);
text('label2', WithDifferentTextLength, Item, inputData.longLabel);
text('children', WithDifferentTextLength, Item, inputData.shortChildren);

WithDifferentTextLength.storyName = 'with different text length';

export const WithSpotlightDisabled = (args) => (
	<div>
		<Item
			spotlightDisabled={args['spotlightDisabled']}
			marqueeOn={args['marqueeOn']}
			label={args['label']}
		>
			{args['children']}
		</Item>
	</div>
);

boolean('spotlightDisabled', WithSpotlightDisabled, Item, true);
select('marqueeOn', WithSpotlightDisabled, ['render', 'hover'], Item, 'render');
text('label', WithSpotlightDisabled, Item, inputData.shortLabel);
text('children', WithSpotlightDisabled, Item, inputData.mediumChildren);

WithSpotlightDisabled.storyName = 'with spotlightDisabled';

export const KitchenSink = () => (
	<Scroller>
		<Row wrap>
			<Section title="Inline Items" size="50%">
				<Item inline alt="Normal">{inputData.shortText}</Item>
				<Item inline alt="Disabled" disabled>{inputData.shortText}</Item>
				<Item inline alt="Long Normal">{inputData.longText}</Item>
				<Item inline alt="Long Disabled" disabled>{inputData.longText}</Item>
			</Section>

			<Section title="Inline Items with Icons" size="50%">
				<Item inline slotBefore={KsIcon} alt="Normal">{inputData.shortText}</Item>
				<Item inline slotBefore={KsIcon} alt="Disabled" disabled>{inputData.shortText}</Item>
				<Item inline slotBefore={KsIcon} alt="Long Normal">{inputData.longText}</Item>
				<Item inline slotBefore={KsIcon} alt="Long Disabled" disabled>{inputData.longText}</Item>
			</Section>

			<Section title="Items" size="50%">
				<Item alt="Normal">{inputData.shortText}</Item>
				<Item alt="Disabled" disabled>{inputData.shortText}</Item>
				<Item alt="Long Normal">{inputData.longText}</Item>
				<Item alt="Long Disabled" disabled>{inputData.longText}</Item>
			</Section>

			<Section title="Items with Icons" size="50%">
				<Item slotBefore={KsIcon} alt="Normal">{inputData.shortText}</Item>
				<Item slotBefore={KsIcon} alt="Disabled" disabled>{inputData.shortText}</Item>
				<Item slotBefore={KsIcon} alt="Long Normal">{inputData.longText}</Item>
				<Item slotBefore={KsIcon} alt="Long Disabled" disabled>{inputData.longText}</Item>
			</Section>

			<Section title="Short Text Icon Examples" size="50%">
				<Item slotBefore={KsIcon} alt="Before">{inputData.shortText}</Item>
				<Item slotAfter={KsIcon} alt="After">{inputData.shortText}</Item>
				<Item slotBefore={KsIcon} slotAfter={KsIcon} alt="Both">{inputData.shortText}</Item>
			</Section>
			<Section title="Long Text Icon Examples" size="50%">
				<Item slotBefore={KsIcon} alt="Before">{inputData.longText}</Item>
				<Item slotAfter={KsIcon} alt="After">{inputData.longText}</Item>
				<Item slotBefore={KsIcon} slotAfter={KsIcon} alt="Both">{inputData.longText}</Item>
			</Section>

			<Section title="Small Inline Items" size="50%">
				<Item inline size="small" alt="Normal">{inputData.shortText}</Item>
				<Item inline size="small" alt="Disabled" disabled>{inputData.shortText}</Item>
				<Item inline size="small" alt="Long Normal">{inputData.longText}</Item>
				<Item inline size="small" alt="Long Disabled" disabled>{inputData.longText}</Item>
			</Section>

			<Section title="Small Inline Items with Icons" size="50%">
				<Item inline size="small" slotBefore={KsIcon} alt="Normal">{inputData.shortText}</Item>
				<Item inline size="small" slotBefore={KsIcon} alt="Disabled" disabled>{inputData.shortText}</Item>
				<Item inline size="small" slotBefore={KsIcon} alt="Long Normal">{inputData.longText}</Item>
				<Item inline size="small" slotBefore={KsIcon} alt="Long Disabled" disabled>{inputData.longText}</Item>
			</Section>

		</Row>
	</Scroller>
);

KitchenSink.storyName = 'Kitchen Sink';
KitchenSink.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithCustomStyle = (args) => (
	<Item
		css={css}
		label={args['label']}
		slotBefore={KsIcon}
		slotAfter={KsIcon}
	>
		{args['children']}
	</Item>
);

text('label', WithCustomStyle, Item, inputData.shortLabel);
text('children', WithCustomStyle, Item, inputData.shortChildren);

WithCustomStyle.storyName = 'with custom style';

export const WithChangingSlots = () => {
	const [check, setCheck] = useState(false);
	const handleClick = useCallback(() => {
		setCheck(!check);
	}, [check]);

	return (
		<div className={css.itemContainer}>
			<Button onClick={handleClick}>Button</Button>
			<Item
				onClick={handleClick}
				slotBefore={<Icon>{'soccer'}</Icon>}
				slotAfter={check ? <Icon>{'check'}</Icon> : null}
			>Medium Item Title</Item>
			<Item
				onClick={handleClick}
				slotBefore={<Icon>{'soccer'}</Icon>}
				slotAfter={check ? <Icon>{'check'}</Icon> : null}
			>Medium Item Title</Item>
		</div>
	);
};

WithChangingSlots.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
