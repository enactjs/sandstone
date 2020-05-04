import {WizardPanels, WizardPanel} from '../../../../WizardPanels';
import React from 'react';

import {withConfig} from './utils';

const WizardPanelTests = withConfig({
	wrapper: {
		full: true
	}
}, [
	<WizardPanels>
		<WizardPanel>View 1</WizardPanel>
		<WizardPanel>View 2</WizardPanel>
	</WizardPanels>,
	<WizardPanels index={1}>
		<WizardPanel>View 1</WizardPanel>
		<WizardPanel>View 2</WizardPanel>
	</WizardPanels>,
	// [GT-28274] - 'nextButtonText' and 'prevButtonText' to show properly
	<WizardPanels index={1} nextButtonText="nextButtonText" prevButtonText="prevButtonText" title="WizardPanel">
		<WizardPanel>View 1</WizardPanel>
		<WizardPanel>View 2</WizardPanel>
		<WizardPanel>View 3</WizardPanel>
	</WizardPanels>,
	{
		component: (
			<WizardPanels index={1} nextButtonText="nextButtonText" prevButtonText="prevButtonText" title="WizardPanel">
				<WizardPanel>View 1</WizardPanel>
				<WizardPanel>View 2</WizardPanel>
				<WizardPanel>View 3</WizardPanel>
			</WizardPanels>
		),
		locale: 'ar-SA'
	},
	// Test unbalanced next/prev button text
	<WizardPanels index={0} prevButtonText="prevButtonText" title="WizardPanel">
		<WizardPanel>View 1</WizardPanel>
		<WizardPanel>View 2</WizardPanel>
		<WizardPanel>View 3</WizardPanel>
	</WizardPanels>,
	<WizardPanels index={0} nextButtonText="nextButtonText" title="WizardPanel">
		<WizardPanel>View 1</WizardPanel>
		<WizardPanel>View 2</WizardPanel>
		<WizardPanel>View 3</WizardPanel>
	</WizardPanels>
]);

export default WizardPanelTests;
