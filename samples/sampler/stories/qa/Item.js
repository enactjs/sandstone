import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {Row} from '@enact/ui/Layout';

import Button from '@enact/sandstone/Button';
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
	tallText : ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'صباح الخير'],
	disabledText : 'This text is disabled',
	normalText : 'Item with text that is spottable'
};

Item.displayName = 'Item';
Icon.displayName = 'Icon';

const KsIcon = <Icon size="small">flag</Icon>;

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
						{select('iconAfter', iconNames, Item, 'pauseforward')}
					</Icon>
				</Item>
				<Item>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>gear</Icon>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>minus</Icon>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>trash</Icon>
					<Icon size={select('size', ['small', 'large'], Item, 'large')}>flag</Icon>
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
						<Item inline alt="Selected" selected>{inputData.shortText}</Item>
						<Item inline alt="Disabled" disabled>{inputData.shortText}</Item>
						<Item inline alt="Long Normal">{inputData.longText}</Item>
						<Item inline alt="Long Selected" selected>{inputData.longText}</Item>
						<Item inline alt="Long Disabled" disabled>{inputData.longText}</Item>
					</Section>

					<Section title="Inline Items with Icons" size="50%">
						<Item inline slotBefore={KsIcon} alt="Normal">{inputData.shortText}</Item>
						<Item inline slotBefore={KsIcon} alt="Selected" selected>{inputData.shortText}</Item>
						<Item inline slotBefore={KsIcon} alt="Disabled" disabled>{inputData.shortText}</Item>
						<Item inline slotBefore={KsIcon} alt="Long Normal">{inputData.longText}</Item>
						<Item inline slotBefore={KsIcon} alt="Long Selected" selected>{inputData.longText}</Item>
						<Item inline slotBefore={KsIcon} alt="Long Disabled" disabled>{inputData.longText}</Item>
					</Section>

					<Section title="Items" size="50%">
						<Item alt="Normal">{inputData.shortText}</Item>
						<Item alt="Selected" selected>{inputData.shortText}</Item>
						<Item alt="Disabled" disabled>{inputData.shortText}</Item>
						<Item alt="Long Normal">{inputData.longText}</Item>
						<Item alt="Long Selected" selected>{inputData.longText}</Item>
						<Item alt="Long Disabled" disabled>{inputData.longText}</Item>
					</Section>

					<Section title="Items with Icons" size="50%">
						<Item slotBefore={KsIcon} alt="Normal">{inputData.shortText}</Item>
						<Item slotBefore={KsIcon} alt="Selected" selected>{inputData.shortText}</Item>
						<Item slotBefore={KsIcon} alt="Disabled" disabled>{inputData.shortText}</Item>
						<Item slotBefore={KsIcon} alt="Long Normal">{inputData.longText}</Item>
						<Item slotBefore={KsIcon} alt="Long Selected" selected>{inputData.longText}</Item>
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
				</Row>
			</Scroller>
		)
	);
