import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Scroller} from '@enact/sandstone/Scroller';
import WizardPanels from '@enact/sandstone/WizardPanels';

WizardPanels.displayName = 'WizardPanels';

storiesOf('Sandstone', module)
	.add(
		'WizardPanels',
		() => (
			<WizardPanels
				current={number('current', WizardPanels, 0)}
				nextButtonText={text('nextButtonText', WizardPanels, '')}
				noAnimation={boolean('noAnimation', WizardPanels, false)}
				noNextButton={boolean('noNextButton', WizardPanels)}
				noPrevButton={boolean('noPrevButton', WizardPanels)}
				noSteps={boolean('noSteps', WizardPanels)}
				onTransition={action('onTransition')}
				onWillTransition={action('onWillTransition')}
				prevButtonText={text('prevButtonText', WizardPanels, '')}
				total={number('total', WizardPanels, 0)}
			>
				<WizardPanels.Panel footer="Footer in View 1" subtitle="A subtitle for View 1" title="WizardPanel View 1" noPrevButton>
					<Scroller>
						<BodyText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue i\nterdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus.</BodyText>
					</Scroller>
					<buttons>
						<Button>OK</Button>
						<Button>Cancel</Button>
					</buttons>
				</WizardPanels.Panel>
				<WizardPanels.Panel subtitle="A subtitle for View 2 that is really, really way too long for its own good.  In fact, it's so long that it probably goes to multiple lines, unless your screen is so large that it somehow fits.  That seems unlikely, though, unless you're in the year 2030 or something." title="WizardPanel View 2">
					<BodyText>Several buttons!</BodyText>
					<Button icon="list">Button A</Button>
					<Button icon="gear">Button B</Button>
					<Button icon="search">Button C</Button>
					<Button icon="lock">Button D</Button>
					<buttons>
						<Button>OK</Button>
						<Button>Cancel</Button>
					</buttons>
					<footer>
						<CheckboxItem inline>Confirm</CheckboxItem>
					</footer>
				</WizardPanels.Panel>
				<WizardPanels.Panel footer="Footer in View 3" subtitle="A subtitle for View 3" title="WizardPanel View 3">
					<Item>
						<slotBefore>
							<Icon>resumeplay</Icon>
						</slotBefore>
						Hello Item
					</Item>
				</WizardPanels.Panel>
				<WizardPanels.Panel footer="Footer in View 4" subtitle="A subtitle for View 4" title="WizardPanel View 4" noNextButton>
					<Icon>resumeplay</Icon>
					<BodyText>A simple view</BodyText>
					<buttons>
						<Button>OK</Button>
						<Button>Cancel</Button>
					</buttons>
				</WizardPanels.Panel>
			</WizardPanels>
		),
		{
			props: {
				noPanel: true
			}
		}
	);
