import {WizardPanel, View} from '../../../../Panels';
import React from 'react';

const wizardPanelStyle = {height: '1080px', width: '1920px'};

const WizardPanelTests = [
	<WizardPanel style={wizardPanelStyle}>
		<View>
			View 1
		</View>
		<View>
			View 2
		</View>
	</WizardPanel>,
	<WizardPanel index={1} style={wizardPanelStyle}>
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
		style={wizardPanelStyle}
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
