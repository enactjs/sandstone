import WizardPanels from '../../../../WizardPanels';
import React from 'react';

const WizardPanelsTests = [
	{
		component: (
			<WizardPanels>
				<WizardPanels.Panel>
					View 1
				</WizardPanels.Panel>
				<WizardPanels.Panel>
					View 2
				</WizardPanels.Panel>
			</WizardPanels>
		),
		wrapper: {
			full: true
		}
	},
	{
		component: (
			<WizardPanels index={1}>
				<WizardPanels.Panel>
					View 1
				</WizardPanels.Panel>
				<WizardPanels.Panel>
					View 2
				</WizardPanels.Panel>
			</WizardPanels>
		),
		wrapper: {
			full: true
		}
	},
	// [GT-28274] - 'nextButtonText' and 'prevButtonText' to show properly
	{
		component: (
			<WizardPanels
				index={1}
				nextButtonText="nextButtonText"
				prevButtonText="prevButtonText"
				title="WizardPanels"
			>
				<WizardPanels.Panel>
					View 1
				</WizardPanels.Panel>
				<WizardPanels.Panel>
					View 2
				</WizardPanels.Panel>
				<WizardPanels.Panel>
					View 3
				</WizardPanels.Panel>
			</WizardPanels>
		),
		wrapper: {
			full: true
		}
	}
];
export default WizardPanelsTests;
