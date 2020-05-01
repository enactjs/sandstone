/**
 * Provides a Sandstone styled panels component for stepping through a process.
 *
 * @module sandstone/WizardPanels
 * @exports WizardPanel
 * @exports WizardPanels
 * @exports WizardPanelsBase
 * @exports WizardPanelsDecorator
 */

import {WizardPanels, WizardPanelsBase, WizardPanelsDecorator} from './WizardPanels';
import WizardPanel from './WizardPanel';

WizardPanels.Panel = WizardPanel;

export default WizardPanels;
export {
	WizardPanel,
	WizardPanels,
	WizardPanelsBase,
	WizardPanelsDecorator
};
