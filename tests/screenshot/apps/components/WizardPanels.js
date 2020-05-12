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
	<WizardPanels index={1}>
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
	</WizardPanels>,
	// [GT-28274] - 'nextButtonText' and 'prevButtonText' to show properly
	<WizardPanels index={1} nextButtonText="nextButtonText" prevButtonText="prevButtonText" title="WizardPanel">
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	// Test unbalanced next/prev button text
	<WizardPanels index={0} prevButtonText="prevButtonText" title="WizardPanel">
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	<WizardPanels index={0} nextButtonText="nextButtonText" title="WizardPanel">
		<Panel>View 1</Panel>
		<Panel>View 2</Panel>
		<Panel>View 3</Panel>
	</WizardPanels>,
	// RTL
	{
		component: (
			<WizardPanels index={1} nextButtonText="nextButtonText" prevButtonText="prevButtonText" title="WizardPanel">
				<Panel>View 1</Panel>
				<Panel>View 2</Panel>
				<Panel>View 3</Panel>
			</WizardPanels>
		),
		locale: 'ar-SA'
	}
]);

export default WizardPanelTests;
