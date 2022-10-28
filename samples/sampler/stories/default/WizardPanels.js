import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Scroller} from '@enact/sandstone/Scroller';
import WizardPanels, {WizardPanelsBase} from '@enact/sandstone/WizardPanels';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';

WizardPanels.displayName = 'WizardPanels';
const Config = mergeComponentMetadata('WizardPanels', WizardPanelsBase, WizardPanels);

const propOptions = {
	buttonVisibility: ['auto', 'always', 'never']
};

export default {
	title: 'Sandstone/WizardPanels',
	component: 'WizardPanels'
};

export const _WizardPanels = (args) => (
	<WizardPanels
		current={args['current']}
		noAnimation={args['noAnimation']}
		noSteps={args['noSteps']}
		noSubtitle={args['noSubtitle']}
		nextButtonVisibility={args['nextButtonVisibility']}
		onBack={action('onBack')}
		onChange={action('onChange')}
		onNextClick={action('onNextClick')}
		onPrevClick={action('onPrevClick')}
		onTransition={action('onTransition')}
		onWillTransition={action('onWillTransition')}
		prevButtonVisibility={args['prevButtonVisibility']}
		total={args['total']}
	>
		<WizardPanels.Panel
			footer="Footer in View 1"
			subtitle="A subtitle for View 1"
			title="WizardPanel View 1"
			prevButton={
				args['custom first Panel prevButton'] ? (
					<Button icon="closex" aria-label="exit">
						Exit
					</Button>
				) : (
					void 0
				)
			}
		>
			<Scroller>
				<BodyText>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum
					sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis
					commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque
					ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu
					consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci.
					Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu
					consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing
					commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo.
					Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget
					egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam
					tempor orci eu lobortis elementum nibh tellus. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
					faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at
					quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque
					pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc
					sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis
					imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed
					augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed
					vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed
					vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed
					ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis
					urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh
					tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi.
					Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio
					morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
					Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue
					eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci.
					Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu
					consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing
					commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo.
					Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget
					egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam
					tempor orci eu lobortis elementum nibh tellus. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
					faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at
					quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque
					pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc
					sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis
					imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed
					augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed
					vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed
					vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed
					ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis
					urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus.
				</BodyText>
			</Scroller>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			subtitle="A subtitle for View 2 that is really, really way too long for its own good.    In fact, it's so long that it probably goes to multiple lines, unless your screen is so large that it somehow fits.    That seems unlikely, though, unless you're in the year 2030 or something."
			title="WizardPanel View 2"
		>
			<BodyText>Several buttons!</BodyText>
			<Button icon="list">Button A</Button>
			<Button icon="gear">Button B</Button>
			<Button icon="search">Button C</Button>
			<Button icon="lock">Button D</Button>
			<footer>
				<Button>OK</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel subtitle="A subtitle for View 3" title="WizardPanel View 3">
			<Item>
				<slotBefore>
					<Icon>notification</Icon>
				</slotBefore>
				Hello Item
			</Item>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			footer="Footer in View 4"
			subtitle="A subtitle for View 4"
			title="WizardPanel View 4"
			nextButton={
				args['custom last Panel nextButton'] ? (
					<Button icon="closex" aria-label="quit">
						Close
					</Button>
				) : (
					void 0
				)
			}
		>
			<Icon>support</Icon>
			<BodyText>A simple view</BodyText>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
	</WizardPanels>
);

number('current', _WizardPanels, Config, 0);
boolean('noAnimation', _WizardPanels, Config);
boolean('noSteps', _WizardPanels, Config);
boolean('noSubtitle', _WizardPanels, Config);
select('nextButtonVisibility', _WizardPanels, propOptions.buttonVisibility, Config);
select('prevButtonVisibility', _WizardPanels, propOptions.buttonVisibility, Config);
number('total', _WizardPanels, Config, 0);
boolean('custom first Panel prevButton', _WizardPanels, Config);
boolean('custom last Panel nextButton', _WizardPanels, Config);

_WizardPanels.storyName = 'WizardPanels';
_WizardPanels.parameters = {
	props: {
		noPanel: true
	}
};
