import Slottable from '@enact/ui/Slottable';
import {useContext, useEffect} from 'react';

import {WizardPanelsContext} from './WizardPanels';

/**
 * Panel that sets the children, footer, subtitle, and title for
 * [WizardPanels]{@link sandstone/WizardPanels.WizardPanels}.
 *
 * @class PanelBase
 * @memberof sandstone/WizardPanels
 * @ui
 * @private
 */
function PanelBase ({
	'aria-label': ariaLabel,
	children,
	footer,
	nextButton,
	prevButton,
	subtitle,
	title
}) {
	const set = useContext(WizardPanelsContext);

	useEffect(() => {
		if (set) {
			set({
				'aria-label': ariaLabel,
				children,
				footer,
				nextButton,
				prevButton,
				subtitle,
				title
			});
		}
	}, [
		ariaLabel,
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
 * Panel that sets the children, footer, subtitle, and title for
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


/**
 * The button to use in place of the standard next button.
 *
 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
 *
 * If `false`, the button will not show. If set to a component, or `true`, the button will
 * show. This will override the setting of
 * [`nextButtonVisibility`]{@link sandstone/WizardPanels.WizardPanels#nextButtonVisibility}.
 *
 * Example:
 * ```
 * nextButton={<Button icon="closex" aria-label="Quit">Close</Button>}
 * ```
 *
 * @name nextButton
 * @memberof sandstone/WizardPanels.Panel.prototype
 * @type {Boolean|Component}
 * @public
 */

/**
 * The button to use in place of the standard prev button.
 *
 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
 *
 * If `false`, the button will not show. If set to a component, or `true`, the button will
 * show. This will override the setting of
 * [`prevButtonVisibility`]{@link sandstone/WizardPanels.WizardPanels#prevButtonVisibility}.
 *
 * Example:
 * ```
 * prevButton={<Button icon="closex" aria-label="Back">Back</Button>}
 * ```
 *
 * @name PrevButton
 * @memberof sandstone/WizardPanels.Panel.prototype
 * @type {Boolean|Component}
 * @public
 */

export default Panel;
export {
	Panel,
	PanelBase
};
