import Slottable from '@enact/ui/Slottable';
import React from 'react';

import {WizardPanelsContext} from './WizardPanels';

/**
 * Panel that sets the buttons, children, subtitle, and title for
 * [WizardPanels]{@link sandstone/WizardPanels.WizardPanels}.
 *
 * @class PanelBase
 * @memberof sandstone/WizardPanels
 * @ui
 * @private
 */
function PanelBase ({footer, children, subtitle, title}) {
	const set = React.useContext(WizardPanelsContext);

	React.useEffect(() => {
		if (set) {
			set({footer, children, subtitle, title});
		}
	}, [footer, children, subtitle, set, title]);

	return null;
}

/**
 * Panel that sets the buttons, children, subtitle, and title for
 * [WizardPanels]{@link sandstone/WizardPanels.WizardPanels}.
 *
 * @class Panel
 * @memberof sandstone/WizardPanels
 * @ui
 * @public
 */
const Panel = Slottable(
	{slots: ['footer', 'subtitle', 'title']},
	PanelBase
);

export default Panel;
export {
	Panel,
	PanelBase
};
