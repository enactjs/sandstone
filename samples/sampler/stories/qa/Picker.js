import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/sandstone/Button';
import {Header} from '@enact/sandstone/Panels';
import Picker from '@enact/sandstone/Picker';
import PopupTabLayout, {Tab, TabPanels, TabPanel} from '@enact/sandstone/PopupTabLayout';
import Scroller from '@enact/sandstone/Scroller';
import {Row} from '@enact/ui/Layout';
import {Component} from 'react';

import iconNames from '../helper/icons';

import Section from './components/KitchenSinkSection';
import PickerAddRemove from './components/PickerAddRemove';
import PickerRTL from './components/PickerRTL';

Picker.displayName = 'Picker';

const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large']
};

const pickerList = {
	tall: ['नरेंद्र मोदी', ' ฟิ้  ไั  ஒ  து', 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ', 'តន្ត្រី'],
	long: [
		'1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius sit amet mattis vulputate enim nulla. A pellentesque sit amet porttitor eget dolor morbi non arcu. Text1',
		'2 Sit amet consectetur adipiscing elit. Ac turpis egestas integer eget aliquet nibh. Est ullamcorper eget nulla facilisi etiam dignissim. Pellentesque dignissim enim sit amet. Non blandit massa enim nec dui nunc mattis. Text2',
		'3 Platea dictumst vestibulum rhoncus est pellentesque. Massa sapien faucibus et molestie ac feugiat. Diam quis enim lobortis scelerisque fermentum dui faucibus. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Text3',
		'4 In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Urna id volutpat lacus laoreet non curabitur. Lobortis feugiat vivamus at augue. Praesent semper feugiat nibh sed. Ac tincidunt vitae semper quis lectus. Text4',
		'5 Purus sit amet volutpat consequat mauris nunc congue nisi. Sit amet cursus sit amet dictum sit amet justo. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Libero id faucibus nisl tincidunt eget. Text5'
	],
	vegetables: ['Celery', 'Carrot', 'Tomato', 'Onion', 'Broccoli', 'Spinach'],
	longVegetables: [
		'Celery contains potassium',
		'Carrot contains beta carotene',
		'Tomatoes contain folate',
		'Onion contains calcium',
		'Broccoli contains iron',
		'Spinach contains manganese'
	],
	numberList: ['0', '1', '2', '3', '4'],
	irregularNumberList: ['4', '13', '15', '20', '22'],
	oneAirport: ['San Francisco International Airport Terminal 1'],
	emptyList: [],
	orderedList: ['A', 'B', 'C', 'D', 'E', 'F'],
	airports: [
		'San Francisco International Airport Terminal 1',
		'Milan Malpensa Airport Terminal 2',
		'Paris-Charles De Gaulle Airport Terminal 3',
		'Boston Logan Airport Terminal D',
		'Tokyo Narita Airport Terminal 5',
		'Heathrow Terminal 6',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	]
};

class PickerInPopupTabLayout extends Component {
	render () {
		return (
			<>
				<PopupTabLayout open index={0}>
					<Tab title="Display">
						<TabPanels>
							<TabPanel>
								<Header title="Display 0" type="compact">
									<slotAfter>
										<Button>hello</Button>
									</slotAfter>
								</Header>
								<div>
									<Picker
										onChange={action('onChange')}
										width={select('width', prop.width, Picker, 'small')}
										orientation={select('orientation', prop.orientation, Picker, 'horizontal')}
										wrap={boolean('wrap', Picker)}
										joined={boolean('joined', Picker)}
										noAnimation={boolean('noAnimation', Picker)}
										disabled={boolean('disabled', Picker)}
										incrementIcon={select('incrementIcon', iconNames, Picker)}
										decrementIcon={select('decrementIcon', iconNames, Picker)}
									>
										{pickerList.vegetables}
									</Picker>
								</div>
							</TabPanel>
						</TabPanels>
					</Tab>
				</PopupTabLayout>
			</>
		);
	}
}

export default {
	title: 'Sandstone/Picker',
	component: 'Picker'
};

export const WithLongText = () => (
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
);

WithLongText.storyName = 'with long text';

export const WithTallCharacters = () => (
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
);

WithTallCharacters.storyName = 'with tall characters';

export const WithADefaultValue = () => (
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
		{pickerList.longVegetables}
	</Picker>
);

WithADefaultValue.storyName = 'with a default value';

export const WithNoItemsPlat30963 = () => (
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
);

WithNoItemsPlat30963.storyName = 'with no items (PLAT-30963)';

export const WithOneItem = () => (
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
);

WithOneItem.storyName = 'with one item';

export const WithItemAddRemoveEnyo2448 = () => (
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
);

WithItemAddRemoveEnyo2448.storyName = 'with item add/remove (ENYO-2448)';

export const RtlLayoutPlat28123 = () => (
	<PickerRTL
		width={select('width', prop.width, Picker, 'medium')}
		wrap={boolean('wrap', Picker)}
		joined={boolean('joined', Picker)}
		noAnimation={boolean('noAnimation', Picker)}
		disabled={boolean('disabled', Picker)}
	>
		{pickerList.orderedList}
	</PickerRTL>
);

RtlLayoutPlat28123.storyName = 'RTL Layout (PLAT-28123)';

export const KitchenSink = () => (
	<Scroller>
		<Row wrap>
			<Section title="Horizontal" size="100%">
				<Picker alt="Basic" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker alt="Disabled" width="medium" disabled>
					{pickerList.vegetables}
				</Picker>
				<Picker alt="Tall text" width="medium">
					{pickerList.tall}
				</Picker>
				<Picker alt="No Width">{pickerList.vegetables}</Picker>
				<Picker alt="Small" width="small">
					{pickerList.orderedList}
				</Picker>
				<Picker alt="Medium" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker alt="Large" width="large">
					{pickerList.airports}
				</Picker>
				<Picker alt="Width=1" width={1}>
					{pickerList.numberList}
				</Picker>
				<Picker alt="Width=5" width={5}>
					{pickerList.orderedList}
				</Picker>
				<Picker alt="Width=10" width={10}>
					{pickerList.vegetables}
				</Picker>
				<Picker alt="Width=20" width={20}>
					{pickerList.airports}
				</Picker>
			</Section>

			<Section title="Vertical" size="100%">
				<Picker orientation="vertical" alt="Basic" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker orientation="vertical" alt="Disabled" width="medium" disabled>
					{pickerList.vegetables}
				</Picker>
				<Picker orientation="vertical" alt="Tall text" width="medium">
					{pickerList.tall}
				</Picker>
				<Picker orientation="vertical" alt="No Width">
					{pickerList.vegetables}
				</Picker>
				<Picker orientation="vertical" alt="Small" width="small">
					{pickerList.orderedList}
				</Picker>
				<Picker orientation="vertical" alt="Medium" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker orientation="vertical" alt="Large" width="large">
					{pickerList.airports}
				</Picker>
				<Picker orientation="vertical" alt="Width=1" width={1}>
					{pickerList.numberList}
				</Picker>
				<Picker orientation="vertical" alt="Width=5" width={5}>
					{pickerList.orderedList}
				</Picker>
				<Picker orientation="vertical" alt="Width=10" width={10}>
					{pickerList.vegetables}
				</Picker>
				<Picker orientation="vertical" alt="Width=20" width={20}>
					{pickerList.airports}
				</Picker>
			</Section>

			<Section title="Joined Horizontal" size="100%">
				<Picker joined alt="Basic" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker joined alt="Disabled" width="medium" disabled>
					{pickerList.vegetables}
				</Picker>
				<Picker joined alt="Tall text" width="medium">
					{pickerList.tall}
				</Picker>
				<Picker joined alt="No Width">
					{pickerList.vegetables}
				</Picker>
				<Picker joined alt="Small" width="small">
					{pickerList.orderedList}
				</Picker>
				<Picker joined alt="Medium" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker joined alt="Large" width="large">
					{pickerList.airports}
				</Picker>
				<Picker joined alt="Width=1" width={1}>
					{pickerList.numberList}
				</Picker>
				<Picker joined alt="Width=5" width={5}>
					{pickerList.orderedList}
				</Picker>
				<Picker joined alt="Width=10" width={10}>
					{pickerList.vegetables}
				</Picker>
				<Picker joined alt="Width=20" width={20}>
					{pickerList.airports}
				</Picker>
			</Section>

			<Section title="Joined Vertical" size="100%">
				<Picker joined orientation="vertical" alt="Basic" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker joined orientation="vertical" alt="Disabled" width="medium" disabled>
					{pickerList.vegetables}
				</Picker>
				<Picker joined orientation="vertical" alt="Tall text" width="medium">
					{pickerList.tall}
				</Picker>
				<Picker joined orientation="vertical" alt="No Width">
					{pickerList.vegetables}
				</Picker>
				<Picker joined orientation="vertical" alt="Small" width="small">
					{pickerList.orderedList}
				</Picker>
				<Picker joined orientation="vertical" alt="Medium" width="medium">
					{pickerList.vegetables}
				</Picker>
				<Picker joined orientation="vertical" alt="Large" width="large">
					{pickerList.airports}
				</Picker>
				<Picker joined orientation="vertical" alt="Width=1" width={1}>
					{pickerList.numberList}
				</Picker>
				<Picker joined orientation="vertical" alt="Width=5" width={5}>
					{pickerList.orderedList}
				</Picker>
				<Picker joined orientation="vertical" alt="Width=10" width={10}>
					{pickerList.vegetables}
				</Picker>
				<Picker joined orientation="vertical" alt="Width=20" width={20}>
					{pickerList.airports}
				</Picker>
			</Section>
		</Row>
	</Scroller>
);


export const ForIrregularNumbers = () => (
	<Picker
		joined={boolean('joined', Picker)}
		orientation={select('orientation', prop.orientation, Picker)}
		reverse={false}
		type="number"
	>
		{pickerList.irregularNumberList}
	</Picker>
);

ForIrregularNumbers.storyName = 'for irregular numbers';

export const InPopupTabLayout = () => <PickerInPopupTabLayout />;

InPopupTabLayout.storyName = 'in PopupTabLayout';
