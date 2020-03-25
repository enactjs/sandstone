import {ScrollPositionDecorator} from '../useScroll/useScrollPosition';

import {Panel} from './Panel';

/**
 * Sandstone specific behaviors to apply to [Item]{@link sandstone/Panels.CollapsingHeaderPanel}.
 *
 * @class CollapsingHeaderPanelDecorator
 * @hoc
 * @memberof sandstone/CollapsingHeaderPanel
 * @public
 */
const CollapsingHeaderPanelDecorator = ScrollPositionDecorator;

/**
 * A [Panel]{@link sandstone/Panels.Panel} that collapses its header in response to scrolling within
 * its children.
 *
 * @class Panel
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const CollapsingHeaderPanel = CollapsingHeaderPanelDecorator(Panel);

export default CollapsingHeaderPanel;
export {CollapsingHeaderPanel, CollapsingHeaderPanelDecorator};
