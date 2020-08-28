/**
 * Provides a Sandstone styled flexible-width, popup-styled Panels component.
 *
 * @module sandstone/FlexiblePopupPanels
 * @exports FlexiblePopupPanels
 * @exports Header
 * @exports Panel
 */

import {FlexiblePopupPanels, FlexiblePopupPanelsBase} from './FlexiblePopupPanels';
import Header from './Header';
import Panel, {PanelBase} from './Panel';

/**
 * A shortcut to access {@link sandstone/FlexiblePopupPanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/FlexiblePopupPanels.FlexiblePopupPanels
 */
FlexiblePopupPanels.Panel = Panel;

/**
 * A shortcut to access {@link sandstone/FlexiblePopupPanels.Header}
 *
 * @name Header
 * @static
 * @memberof sandstone/FlexiblePopupPanels.FlexiblePopupPanels
 */
FlexiblePopupPanels.Header = Header;

export default FlexiblePopupPanels;
export {
	FlexiblePopupPanels,
	FlexiblePopupPanelsBase,
	Header,
	Panel,
	PanelBase
};
