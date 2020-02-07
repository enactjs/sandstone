import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Icon from '@enact/sandstone/Icon';
import Image from '@enact/sandstone/Image';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';

import icons from '../default/icons';

const iconNames = ['', ...icons];

const inputData = {
	longText : 'Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text',
	extraSpaceText : 'This                                                             text                                                                          has                                                                                        extra                                                                         spaces',
	tallText : ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'صباح الخير'],
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

	).add(
		'with different text length',
		() => (
			<Scroller style={{height: '100%'}}>
				<div>
					<Heading showLine style={{paddingTop: '60px'}} >Long children and Short label</Heading>
					<Item
						disabled={boolean('disabled', Item)}
						label={text('label', Item, inputData.shortLabel)}
					>
						{text('children2', Item, inputData.longChildren)}
					</Item>

					<Heading showLine style={{paddingTop: '60px'}}>Short children and Long label</Heading>
					<Item
						disabled={boolean('disabled', Item)}
						label={text('label2', Item, inputData.longLabel)}
					>
						{text('children', Item, inputData.shortChildren)}
					</Item>

					<Heading showLine style={{paddingTop: '60px'}}>Long children and Long label</Heading>
					<Item
						disabled={boolean('disabled', Item)}
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
	);
