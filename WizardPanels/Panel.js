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
	nextButton,
	prevButton,
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
				nextButton,
				prevButton,
				subtitle,
				title
			});
		}
	}, [
		buttons,
		children,
		footer,
		nextButton,
		prevButton,
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


/**
 * Add a nextButton to the WizardPanel.Panels
 *
 * This prop accepts either a Component (e.g. `Button`} which will be instantiated with
 * the above props or a component instance (e.g. `<Button icon="closex" aria-label="quit">Exit</Button>`) which
 * will have its props merged with the above props.
 *
 *  @see {@link ui/ComponentOverride}
 *
 * @name nextButton
 * @memberof sandstone/WizardPanels.Panel.prototype
 * @type {Boolean|Function|Element}
 * @public
 */

 /**
 * Add a nextPrevButtonButton to the WizardPanel.Panels.
 *
 * This prop accepts either a Component (e.g. `Button`} which will be instantiated with
 * the above props or a component instance (e.g. `<Button icon="closex" aria-label="quit">Exit</Button>`) which
 * will have its props merged with the above props.
 *
 * @see {@link ui/ComponentOverride}
 *
 * @name PrevButton
 * @memberof sandstone/WizardPanels.Panel.prototype
 * @type {Boolean|Function|Element}
 * @public
 */

export default Panel;
export {
	Panel,
	PanelBase
};
