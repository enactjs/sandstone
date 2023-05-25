import BodyText from '../../../../BodyText';
import Button from '../../../../Button';
import WizardPanels, {Panel} from '../../../../WizardPanels';

import {LongerLoremString, withConfig} from './utils';

const customPrevButton = (<Button>Previous</Button>);
const customNextButton = (<Button>Next</Button>);

const WizardPanelTests = withConfig({
	wrapper: {
		full: true
	}
}, [
	<WizardPanels>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
	</WizardPanels>,
	<WizardPanels>
		<Panel title="My Title" subtitle={LongerLoremString}>View 1</Panel>
		<Panel>View 2</Panel>
	</WizardPanels>,
	// Wizard panel will have all the default settings
	<WizardPanels index={1}>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
	</WizardPanels>,
	// [QWTC-1908] - 'nextButton' and 'prevButton' to show on all the panels
	<WizardPanels index={1} prevButtonVisibility="always" nextButtonVisibility="always" title="WizardPanel">
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	// Test to never show next/prev button on all the panels
	<WizardPanels index={0} prevButtonVisibility="never" nextButtonVisibility="never" title="WizardPanel">
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	// Test to display Panels can override value of prevButtonVisibility and nextButtonVisibility by showing button on the first panel
	<WizardPanels index={0} prevButtonVisibility="never" nextButtonVisibility="never" title="WizardPanel">
		<Panel prevButton nextButton>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	// Test to display Panels without subtitle area
	<WizardPanels noSubtitle title="WizardPanel">
		<Panel>
			<BodyText>View 1</BodyText>
			<footer>
				<Button>OK</Button>
			</footer>
		</Panel>
		<Panel>View 2</Panel>
	</WizardPanels>,
	// Test to hide steps
	<WizardPanels noSteps>
		<Panel title="My Title" subtitle={LongerLoremString}>View 1</Panel>
		<Panel>View 2</Panel>
	</WizardPanels>,
	<WizardPanels fullScreenContent>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	<WizardPanels index={1} fullScreenContent>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	{
		locale: 'ar-SA',
		component: (
			<WizardPanels noSteps>
				<Panel title="My Title" subtitle={LongerLoremString}>View 1</Panel>
				<Panel>View 2</Panel>
			</WizardPanels>
		)
	},
	// Test custom buttons
	<WizardPanels index={1} title="WizardPanel">
		<Panel>View 1</Panel>
		<Panel prevButton={customPrevButton} nextButton={customNextButton}>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	{
		locale: 'ar-SA',
		component: (
			<WizardPanels index={1} title="WizardPanel">
				<Panel>View 1</Panel>
				<Panel prevButton={customPrevButton} nextButton={customNextButton}>View 2</Panel>
				<Panel>View 3</Panel>
			</WizardPanels>
		)
	},

	// RTL
	{
		component: (
			<WizardPanels index={1} title="WizardPanel">
				<Panel>View 1</Panel>
				<Panel>View 2</Panel>
				<Panel>View 3</Panel>
			</WizardPanels>
		),
		locale: 'ar-SA'
	}
]);

export default WizardPanelTests;
