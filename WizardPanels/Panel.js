import Slottable from '@enact/ui/Slottable';
import React from 'react';

import {WizardPanelsContext} from './WizardPanels';

/**
 * Panel that sets the buttons, children, footer, subtitle, and title for
 * [WizardPanels]{@link sandstone/WizardPanels.WizardPanels}.
 *
 * @class PanelBase
 * @memberof sandstone/WizardPanels
 * @ui
 * @private
 */
function PanelBase ({
	buttons,
	children,
	footer,
	nextButtonAriaLabel,
	nextButtonText,
	nextButtonIcon,
	noNextButton,
	noPrevButton,
	prevButtonAriaLabel,
	prevButtonText,
	prevButtonIcon,
	subtitle,
	title
}) {
	const set = React.useContext(WizardPanelsContext);

	React.useEffect(() => {
		if (set) {
			set({
				buttons,
				children,
				footer,
				nextButtonAriaLabel,
				nextButtonIcon,
				nextButtonText,
			    noNextButton,
			    noPrevButton,
				prevButtonAriaLabel,
				prevButtonIcon,
				prevButtonText,
				subtitle,
				title
			});
		}
	}, [
		buttons,
		children,
		footer,
		nextButtonAriaLabel,
		nextButtonIcon,
		nextButtonText,
		noNextButton,
		noPrevButton,
		prevButtonIcon,
		prevButtonAriaLabel,
		prevButtonText,
		subtitle,
		set,
		title
	]);
	return null;
}

/**
 * Panel that sets the buttons, children, footer, subtitle, and title for
 * [WizardPanels]{@link sandstone/WizardPanels.WizardPanels}.
 *
 * @class Panel
 * @memberof sandstone/WizardPanels
 * @ui
 * @public
 */
const Panel = Slottable(
	{slots: ['buttons', 'footer', 'subtitle', 'title']},
	PanelBase
);

export default Panel;
export {
	Panel,
	PanelBase
};
