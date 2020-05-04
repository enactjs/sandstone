/**
 * Provides a Sandstone styled panels component for stepping through a process.
 *
 * @module sandstone/WizardPanels
 * @exports Panel
 * @exports WizardPanels
 * @exports WizardPanelsBase
 * @exports WizardPanelsDecorator
 */

import {WizardPanels, WizardPanelsBase, WizardPanelsDecorator} from './WizardPanels';
import Panel from './Panel';

WizardPanels.Panel = Panel;

export default WizardPanels;
export {
	Panel,
	WizardPanels,
	WizardPanelsBase,
	WizardPanelsDecorator
};
