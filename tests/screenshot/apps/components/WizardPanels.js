import WizardPanels, {Panel} from '../../../../WizardPanels';
import React from 'react';

import {LongerLoremString, withConfig} from './utils';

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
	// [GT-28274] - 'nextButton' and 'prevButton' to show on all the panels
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
