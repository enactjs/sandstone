import {number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, Panels, Panel, WizardPanel, TabLayout} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import {Row} from '@enact/ui/Layout';

import Icon from '@enact/sandstone/Icon';

const KsIcon = <Icon size="small">flag</Icon>;

Header.displayName = 'Panels';


storiesOf('Sandstone', module)
	.add(
		'Panels',
		() => {
			const story = (
				<Panels index={number('index', 0)}>
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
						<Row wrap>
							<Button
								backgroundOpacity="transparent"
								icon="flag"
								minWidth={false}
							/>
							<Button size="small" alt="Normal">Button</Button>
							<Button size="small" alt="Selected" selected>Button</Button>
							<Button size="small" alt="Disabled" disabled>Button</Button>
							<Button size="small" alt="Long Text">Super-duper long text string inside a button</Button>
							<Button size="small" alt="With Icon" icon={KsIcon}>Button</Button>
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
