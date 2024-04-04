/**
 * Provides a Sandstone styled panels component for full screen size content panel with steps.
 *
 * Usage:
 * ```
 * <QuickGuidePanels>
 *		<QuickGuidePanels.Panel aria-label="This is a description for panel">
 *			QuickGuidePanelsContent
 *		</QuickGuidePanels.Panel>
 * </QuickGuidePanels>
 * ```
 * @module sandstone/QuickGuidePanels
 * @exports QuickGuidePanel
 * @exports QuickGuidePanels
 */

import {QuickGuidePanels} from './QuickGuidePanels';
import QuickGuidePanel from './QuickGuidePanel';

/**
 * A shortcut to access {@link sandstone/QuickGuidePanels.QuickGuidePanel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/QuickGuidePanels.QuickGuidePanels
 */
QuickGuidePanels.Panel = QuickGuidePanel;

export default QuickGuidePanels;
export {
	QuickGuidePanel,
	QuickGuidePanels
};
