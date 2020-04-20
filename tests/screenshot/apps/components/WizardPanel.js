import {WizardPanel, View} from '../../../../Panels';
import React from 'react';

import {withConfig} from './utils';

const WizardPanelTests = withConfig({
	wrapper: {
		full: true
	}
}, [
	<WizardPanel>
		<View>View 1</View>
		<View>View 2</View>
	</WizardPanel>,
	<WizardPanel index={1}>
		<View>View 1</View>
		<View>View 2</View>
	</WizardPanel>,
	// [GT-28274] - 'nextButtonText' and 'prevButtonText' to show properly
	<WizardPanel index={1} nextButtonText="nextButtonText" prevButtonText="prevButtonText" title="WizardPanel">
		<View>View 1</View>
		<View>View 2</View>
		<View>View 3</View>
	</WizardPanel>,
	{
		component: (
			<WizardPanel index={1} nextButtonText="nextButtonText" prevButtonText="prevButtonText" title="WizardPanel">
				<View>View 1</View>
				<View>View 2</View>
				<View>View 3</View>
			</WizardPanel>
		),
		locale: 'ar-SA'
	},
	// Test unbalanced next/prev button text
	<WizardPanel index={0} prevButtonText="prevButtonText" title="WizardPanel">
		<View>View 1</View>
		<View>View 2</View>
		<View>View 3</View>
	</WizardPanel>,
	<WizardPanel index={0} nextButtonText="nextButtonText" title="WizardPanel">
		<View>View 1</View>
		<View>View 2</View>
		<View>View 3</View>
	</WizardPanel>
]);

export default WizardPanelTests;
