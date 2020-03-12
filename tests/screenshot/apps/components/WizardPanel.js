import {WizardPanel, View} from '../../../../Panels/WizardPanel';
import React from 'react';

const WizardPanelTests = [
	<WizardPanel>
		<View>
			View 1
		</View>
		<View>
			View 2
		</View>
	</WizardPanel>,
	<WizardPanel index={1}>
		<View>
			View 1
		</View>
		<View>
			View 2
		</View>
	</WizardPanel>,
	// [GT-28274] - 'nextButtonText' and 'prevButtonText' to show properly
	<WizardPanel
		index={1}
		nextButtonText="nextButtonText"
		prevButtonText="prevButtonText"
		title="WizardPanel"
	>
		<View>
			View 1
		</View>
		<View>
			View 2
		</View>
		<View>
			View 3
		</View>
	</WizardPanel>
];
export default WizardPanelTests;
