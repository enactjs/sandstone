import Slottable from '@enact/ui/Slottable';
import React from 'react';

import {WizardPanelsContext} from './WizardPanels';

/**
 * WizardPanelBase that sets the buttons, children, footer,
 * subtitle, and title for [WizardPanelsBase]{@link sandstone/WizardPanels.WizardPanelsBase}.
 *
 * @class WizardPanelBase
 * @memberof sandstone/WizardPanels
 * @ui
 */
function WizardPanelBase ({buttons, children, footer, subtitle, title}) {
	const set = React.useContext(WizardPanelsContext);

	React.useEffect(() => {
		if (set) {
			set({buttons, children, footer, subtitle, title});
		}
	}, [buttons, children, footer, subtitle, set, title]);

	return null;
}

/**
 * WizardPanel for [WizardPanels]{@link sandstone/WizardPanels}.
 *
 * @class WizardPanel
 * @memberof sandstone/WizardPanels
 * @ui
 * @public
 */
const WizardPanel = Slottable(
	{slots: ['buttons', 'footer', 'subtitle', 'title']},
	WizardPanelBase
);

export default WizardPanel;
export {
	WizardPanel
};
