import {number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, Panels, Panel} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Picker from '@enact/sandstone/Picker';
import {Row} from '@enact/ui/Layout';

const pickerList = {
	vegetables: [
		'Celery',
		'Carrot',
		'Tomato',
		'Onion',
		'Broccoli',
		'Spinach'
	],
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


Header.displayName = 'Panels';


storiesOf('Sandstone', module)
	.add(
		'Panels',
		() => {
			const story = (
				<Panels index={number('index', {}, {range: true, min: 0, max: 2, step: 1}, 0)}>
					<Panel>
						<Header title="Panel with Item view" />
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
						<Item>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Item>
					</Panel>
					<Panel>
						<Header type="compact" title="Button Panel" />
						<Row>
							<Button
								backgroundOpacity="transparent"
								icon="flag"
								minWidth={false}
							/>
							<Button size="small" alt="Normal">Button</Button>
							<Button size="small" alt="Disabled" disabled>Button</Button>
							<Button size="small" alt="Long Text">Super-duper long text string inside a button</Button>
							<Button size="small" alt="With Icon" icon="flag">Button</Button>
						</Row>
					</Panel>
					<Panel>
						<Header type="compact" title="Picker Panel" />
						<Row wrap>
							<Picker alt="Basic" width="medium">{pickerList.airports}</Picker>
							<Picker orientation="vertical" alt="Basic" width="medium">{pickerList.vegetables}</Picker>
							<Picker joined alt="Basic" width="medium">{pickerList.vegetables}</Picker>
							<Picker joined orientation="vertical" alt="Basic" width="medium">{pickerList.vegetables}</Picker>
						</Row>
					</Panel>
				</Panels>
			);
			return story;
		},
		{
			props: {
				noPanels: true
			}
		}
	);
