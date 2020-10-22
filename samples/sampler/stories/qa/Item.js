import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {Row} from '@enact/ui/Layout';
import {scale} from '@enact/ui/resolution';

import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Icon from '@enact/sandstone/Icon';
import Image from '@enact/sandstone/Image';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';

import Section from './components/KitchenSinkSection';
import icons from '../default/icons';

const iconNames = ['', ...icons];

const inputData = {
	shortText: 'Short',
	longText : 'The W3C is an international community where Member organizations, a full-time staff, and the public work together to develop Web standards.',
	extraSpaceText : 'This                                                             text                                                                          has                                                                                        extra                                                                         spaces',
	tallText : ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'صباح الخير', 'តន្ត្'],
	disabledText : 'This text is disabled',
	normalText : 'Item with text that is spottable',
	longLabel : 'label starts - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. = label ends',
	longChildren : 'children starts - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. - children ends',
	shortLabel : 'Label',
	shortChildren : 'Hello LabeledItem',
	mediumChildren : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. The End.'
};

Item.displayName = 'Item';
Icon.displayName = 'Icon';

const KsIcon = <Icon size="small">notification</Icon>;

storiesOf('Item', module)
	.add(
		'with long text',
		() => (
			<Item disabled={boolean('disabled', Item)}>
				{text('Children', Item, inputData.longText)}
			</Item>
		)
	)
	.add(
		'with tall characters',
		() => (
			<Item disabled={boolean('disabled', Item)}>
				{select('value', inputData.tallText, Item, inputData.tallText[2])}
			</Item>
		)
	)
	.add(
		'with extra spaces',
		() => (
			<Item disabled={boolean('disabled', Item)}>
				{text('Children', Item, inputData.extraSpaceText)}
			</Item>
		)
	)
	.add(
		'integrated with other components',
		() => (
			<Item disabled={boolean('disabled', Item)}>
				<Button>Click here</Button>
				{text('Children', Item, 'Hello Item')}
				<Button>Click here</Button>
				<Image src="http://lorempixel.com/512/512/city/1/" sizing="fill" alt="lorempixel" />
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
			</Item>
		)
	)
	.add(
		'sample for spotability test',
		() => (
			<div>
				<Item>
					{text('Spottable Text', Item, inputData.normalText)}
				</Item>
				<Item disabled>
					{text('Disabled Text', Item, inputData.disabledText)}
				</Item>
				<Item>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>
						{select('iconBefore', iconNames, Item, 'plus')}
					</Icon>
					{text('Text with iconBefore', Item, 'Item with text that is spottable with an icon (at the start of the string)')}
				</Item>
				<Item>
					{text('Text with iconAfter', Item, 'Item with text that is spottable with an icon(at the end of the string)')}
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>
						{select('iconAfter', iconNames, Item, 'arrowhookright')}
					</Icon>
				</Item>
				<Item>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>gear</Icon>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>minus</Icon>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>trash</Icon>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>notification</Icon>
				</Item>
			</div>
		)
	)
	.add(
		'with different text length',
		() => (
			<Scroller>
				<div>
					<Heading showLine style={{marginTop: scale(90)}} >Long children and Short label</Heading>
					<Item
						disabled={boolean('disabled', Item)}
						inline={boolean('inline', Item)}
						label={text('label', Item, inputData.shortLabel)}
					>
						{text('children2', Item, inputData.longChildren)}
					</Item>

					<Heading showLine style={{marginTop: scale(90)}}>Short children and Long label</Heading>
					<Item
						disabled={boolean('disabled', Item)}
						inline={boolean('inline', Item)}
						label={text('label2', Item, inputData.longLabel)}
					>
						{text('children', Item, inputData.shortChildren)}
					</Item>

					<Heading showLine style={{marginTop: scale(90)}}>Long children and Long label</Heading>
					<Item
						disabled={boolean('disabled', Item)}
						inline={boolean('inline', Item)}
						label={text('label2', Item, inputData.longLabel)}
					>
						{text('children2', Item, inputData.longChildren)}
					</Item>
				</div>
			</Scroller>
		)
	)
	.add(
		'with spotlightDisabled',
		() => (
			<div>
				<Item
					spotlightDisabled={boolean('spotlightDisabled', Item, true)}
					marqueeOn={select('marqueeOn', ['render', 'hover'], Item, 'render')}
					label={text('label', Item, inputData.shortLabel)}
				>
					{text('children', Item, inputData.mediumChildren)}
				</Item>
			</div>
		)
	)
	.add(
		'Kitchen Sink',
		() => (
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
		)
	);
