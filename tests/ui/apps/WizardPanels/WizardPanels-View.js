import BodyText from '../../../../BodyText/BodyText';
import Button from '../../../../Button/Button';
import Scroller from '../../../../Scroller/Scroller';
import WizardPanels from '../../../../WizardPanels';
import ThemeDecorator from '../../../../ThemeDecorator/ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<WizardPanels
		id="wizardpanels"
		nextButtonText="next"
		prevButtonText="previous"
		title="WizardPanels"
	>
		<WizardPanels.Panel subtitle="A subtitle for View 1" title="WizardPanels View 1">
			<Scroller>
				<div id="view1" />
				<BodyText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue i\nterdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Elit sed vulputate mi sit amet mauris commodo. Ipsum consequat nisl vel pretium lectus. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nulla facilisi morbi tempus iaculis urna id volutpat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus.</BodyText>
			</Scroller>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel subtitle="A subtitle for View 2" title="WizardPanels View 2">
			<div id="view2" />
			<BodyText>Several buttons!</BodyText>
			<Button>Button A</Button>
			<Button icon="gear">Button B</Button>
			<Button icon="search">Button C</Button>
			<Button icon="lock">Button D</Button>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel subtitle="A subtitle for View 3" title="WizardPanels View 3">
			<div id="view3" />
			<BodyText>A simple view</BodyText>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel subtitle="A subtitle for View 4" title="WizardPanels View 4">
			<div id="view4" />
			<BodyText>A simple view</BodyText>
		</WizardPanels.Panel>
	</WizardPanels>
</div>;

export default ThemeDecorator(app);
