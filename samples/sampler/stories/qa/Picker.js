import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import PickerAddRemove from './components/PickerAddRemove';
import PickerRTL from './components/PickerRTL';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Picker from '@enact/sandstone/Picker';
import Scroller from '@enact/sandstone/Scroller';
import {Row} from '@enact/ui/Layout';
import Section from '../qa/components/KitchenSinkSection';
import RangePicker from '@enact/sandstone/RangePicker';
import DatePicker from '@enact/sandstone/DatePicker';

import iconNames from '../default/icons';

Picker.displayName = 'Picker';

const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large']
};

const pickerList = {
	tall: [
		'नरेंद्र मोदी',
		' ฟิ้  ไั  ஒ  து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
	],
	long: [
		'1 Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text1',
		'2 Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text2',
		'3 Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text3',
		'4 Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text4',
		'5 Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text5'
	],
	vegetables: [
		'Celery',
		'Carrot',
		'Tomato',
		'Onion',
		'Broccoli',
		'Spinach'
	],
	numberList: [
		'0', '1', '2', '3', '4'
	],
	oneAirport: [
		'San Francisco Airport Terminal Gate 1'
	],
	emptyList: [],
	orderedList: [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F'
	],
	airports: [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'London Airport Terminal Gate 4',
		'Paris Airport Terminal Gate 6',
		'Milan Airport Terminal Gate 5',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	]
};

storiesOf('Picker', module)
	.add(
		'with long text',
		() => (
			<Picker
				onChange={action('onChange')}
				width={select('width', prop.width, Picker, 'large')}
				orientation={select('orientation', prop.orientation, Picker, 'horizontal')}
				wrap={boolean('wrap', Picker)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
				incrementIcon={select('incrementIcon', iconNames, Picker)}
				decrementIcon={select('decrementIcon', iconNames, Picker)}
			>
				{pickerList.long}
			</Picker>
		)
	)
	.add(
		'with tall characters',
		() => (
			<Picker
				onChange={action('onChange')}
				width={select('width', prop.width, Picker, 'large')}
				orientation={select('orientation', prop.orientation, Picker, 'horizontal')}
				wrap={boolean('wrap', Picker)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
				incrementIcon={select('incrementIcon', iconNames, Picker)}
				decrementIcon={select('decrementIcon', iconNames, Picker)}
			>
				{pickerList.tall}
			</Picker>
		)
	)
	.add(
		'with a default value',
		() => (
			<Picker
				onChange={action('onChange')}
				width={select('width', prop.width, Picker, 'medium')}
				orientation={select('orientation', prop.orientation, Picker, 'horizontal')}
				wrap={boolean('wrap', Picker)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
				incrementIcon={select('incrementIcon', iconNames, Picker)}
				decrementIcon={select('decrementIcon', iconNames, Picker)}
				defaultValue={2}
			>
				{pickerList.vegetables}
			</Picker>
		)
	)
	.add(
		'with no items (PLAT-30963)',
		() => (
			<Picker
				onChange={action('onChange')}
				width={select('width', prop.width, Picker, 'large')}
				orientation={select('orientation', prop.orientation, Picker)}
				wrap={boolean('wrap', Picker, true)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
				incrementIcon={select('incrementIcon', iconNames, Picker)}
				decrementIcon={select('decrementIcon', iconNames, Picker)}
			>
				{[]}
			</Picker>
		)
	)
	.add(
		'with one item',
		() => (
			<Picker
				onChange={action('onChange')}
				width={select('width', prop.width, Picker, 'large')}
				orientation={select('orientation', prop.orientation, Picker)}
				wrap={boolean('wrap', Picker, true)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
				incrementIcon={select('incrementIcon', iconNames, Picker)}
				decrementIcon={select('decrementIcon', iconNames, Picker)}
			>
				{pickerList.oneAirport}
			</Picker>
		)
	)
	.add(
		'with item add/remove (ENYO-2448)',
		() => (
			<PickerAddRemove
				width={select('width', prop.width, Picker, 'medium')}
				orientation={select('orientation', prop.orientation, Picker, 'horizontal')}
				wrap={boolean('wrap', Picker)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
			>
				{pickerList.emptyList}
			</PickerAddRemove>
		)
	)
	.add(
		'RTL Layout (PLAT-28123)',
		() => (
			<PickerRTL
				width={select('width', prop.width, Picker, 'medium')}
				wrap={boolean('wrap', Picker)}
				joined={boolean('joined', Picker)}
				noAnimation={boolean('noAnimation', Picker)}
				disabled={boolean('disabled', Picker)}
			>
				{pickerList.orderedList}
			</PickerRTL>
		)
	)
	.add(
		'Kitchen Sink',
		() => (
			<Scroller>
				<Row wrap>
					<Section title="Picker Non-Joined">
						<Picker alt="Picker Horizontal">{pickerList.vegetables}</Picker>
						<Picker alt="Tall text size">{pickerList.tall}</Picker>
						<Picker alt="Disabled" disabled>{pickerList.vegetables}</Picker>
						<Picker alt="No Animation" width="medium" noAnimation>{pickerList.airports}</Picker>
						<Picker alt="Picker Vertical Small" width="small" orientation="vertical">{pickerList.orderedList}</Picker>
						<Picker alt="Picker Vertical Medium" width="medium" orientation="vertical" noAnimation wrap>{pickerList.airports}</Picker>
						<Picker alt="Picker Vertical Large" width="large" orientation="vertical">{pickerList.tall}</Picker>
					</Section>

					<Section title="Picker Joined">
						<Picker alt="Joined" joined>{pickerList.airports}</Picker>
						<Picker alt="Joined Medium Wrap" joined width="medium" wrap>{pickerList.vegetables}</Picker>
						<Picker alt="Joined Medium noAnimation" joined width="medium" noAnimation>{pickerList.tall}</Picker>
						<Picker alt="Joined Small" joined width="small">{pickerList.numberList}</Picker>
					</Section>

					<Section title="Picker Joined Vertical">
						<Picker alt="Joined Vertical Small" joined width="small" orientation="vertical">{pickerList.numberList}</Picker>
						<Picker alt="Joined Vertical Medium" joined width="medium" orientation="vertical">{pickerList.orderedList}</Picker>
						<Picker alt="Joined Vertical large" joined width="large" orientation="vertical">{pickerList.tall}</Picker>
						<Picker alt="Joined Vertical" joined width="large" orientation="vertical" noAnimation>{pickerList.airports}</Picker>
					</Section>

					<Section title="Different Pickers">
						<RangePicker alt="Range Picker" defaultValue={70} min={0} max={100} />
						<RangePicker alt="Range Picker Joined" joined defaultValue={70} min={0} max={100} />
						<DatePicker alt="Date Picker" day={1} maxDays={31} maxMonths={12} month={1} noLabels open order={['m', 'd', 'y']} title="Date" year={2000} />
					</Section>
				</Row>
			</Scroller>
		)
	);
