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
 * @exports Panel
 * @exports QuickGuidePanels
 */

import {QuickGuidePanels} from './QuickGuidePanels';
import {Panel} from './Panel';

/**
 * A shortcut to access {@link sandstone/QuickGuidePanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/QuickGuidePanels.QuickGuidePanels
 */
QuickGuidePanels.Panel = Panel;

export default QuickGuidePanels;
export {
	Panel,
	QuickGuidePanels
};
