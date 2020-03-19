import {WizardPanel, View} from '../../../../Panels';
import React from 'react';

const WizardPanelTests = [
	{
		component: (
			<WizardPanel>
				<View>
					View 1
				</View>
				<View>
					View 2
				</View>
			</WizardPanel>
		),
		wrapper: {
			full: true
		}
	},
	{
		component: (
			<WizardPanel index={1}>
				<View>
					View 1
				</View>
				<View>
					View 2
				</View>
			</WizardPanel>
		),
		wrapper: {
			full: true
		}
	},
	// [GT-28274] - 'nextButtonText' and 'prevButtonText' to show properly
	{
		component: (
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
		),
		wrapper: {
			full: true
		}
	}
];
export default WizardPanelTests;
