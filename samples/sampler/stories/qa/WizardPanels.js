import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Scroller} from '@enact/sandstone/Scroller';
import WizardPanels, {WizardPanelsBase} from '@enact/sandstone/WizardPanels';

import {mergeComponentMetadata} from '@enact/storybook-utils';

WizardPanels.displayName = 'WizardPanels';
const Config = mergeComponentMetadata('WizardPanels', WizardPanelsBase, WizardPanels);

const props = {
	buttonVisibility: ['auto', 'always', 'never']
};

const inputData = {
	prevString: 'Prev',
	nextString: 'Next',
	longString: 'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longerString: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit.'
};

WizardPanels.displayName = 'WizardPanels';

storiesOf('WizardPanels', module)
	.add(
		'long prev button',
		() => (
			<WizardPanels
				current={number('current', Config, 0)}
				noAnimation={boolean('noAnimation', Config)}
				noSteps={boolean('noSteps', Config)}
				nextButtonVisibility={select('nextButtonVisibility', props.buttonVisibility, Config)}
				onNextClick={action('onNextClick')}
				onPrevClick={action('onPrevClick')}
				onTransition={action('onTransition')}
				onWillTransition={action('onWillTransition')}
				prevButtonVisibility={select('prevButtonVisibility', props.buttonVisibility, Config)}
				total={number('total', Config, 0)}
			>
				<WizardPanels.Panel
					footer="Footer in View 1"
					subtitle="A subtitle for View 1"
					title="WizardPanel View 1"
					prevButton={boolean('custom first Panel prevButton', Config) ?  <Button icon="closex" aria-label="exit">Exit</Button> : void 0}
				>
					<Scroller>
						<BodyText>This is BodyText.</BodyText>
					</Scroller>
					<footer>
						<Button>OK</Button>
						<Button>Cancel</Button>
					</footer>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					subtitle="A subtitle for View 2" title={inputData.longerString} nextButton={<Button>{inputData.nextString}</Button>} prevButton={<Button>{inputData.longString}</Button>}
				>
					<Item>
						<slotBefore>
							<Icon>notification</Icon>
						</slotBefore>
            A Long title, Previous button has long text, and Next button has short text.
					</Item>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					subtitle="A subtitle for View 3" title={inputData.longerString}
					nextButton={<Button>{inputData.longString}</Button>}
					prevButton={<Button>{inputData.longString}</Button>}
				>
					<Item>
						<slotBefore>
							<Icon>notification</Icon>
						</slotBefore>
            A Long title, Previous button has long text, and Next button has long text.
					</Item>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					subtitle="A subtitle for View 4" title={inputData.longerString}
					nextButton={<Button>{inputData.longString}</Button>} prevButton={<Button>{inputData.prevString}</Button>}
				>
					<Item>
						<slotBefore>
							<Icon>notification</Icon>
						</slotBefore>
            A Long title, Previous button has short text, and Next button has long text.
					</Item>
				</WizardPanels.Panel>
				<WizardPanels.Panel
					footer="Footer in View 5"
					subtitle="A subtitle for View 5"
					title="WizardPanel View 5"
					nextButton={boolean('custom last Panel nextButton', Config) ? <Button icon="closex" aria-label="quit">Close</Button> : void 0}
				>
					<Icon>support</Icon>
					<BodyText>A simple view</BodyText>
					<footer>
						<Button>OK</Button>
						<Button>Cancel</Button>
					</footer>
				</WizardPanels.Panel>
			</WizardPanels>
		),
		{
			props: {
				noPanel: true
			}
		}
	);
