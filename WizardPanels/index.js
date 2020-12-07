/**
 * Provides a Sandstone styled panels component for stepping through a process.
 *
 * @module sandstone/WizardPanels
 * @exports Panel
 * @exports WizardPanels
 */

import {WizardPanels, WizardPanelsBase, WizardPanelsDecorator} from './WizardPanels';
import Panel from './Panel';

/**
 * A shortcut to access {@link sandstone/WizardPanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/WizardPanels.WizardPanels
 */
WizardPanels.Panel = Panel;

export default WizardPanels;
export {
	Panel,
	WizardPanels,
	WizardPanelsBase,
	WizardPanelsDecorator
};
