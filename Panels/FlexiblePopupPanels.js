import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {FadeAndSlideArranger} from './Arrangers';
import PopupDecorator from './PopupDecorator';
import Viewport from './Viewport';


const FlexiblePopupPanelsDecorator = compose(
	Skinnable,
	PopupDecorator({
		className: 'panels flexiblePopup',
		panelArranger: FadeAndSlideArranger,
		panelType: 'flexiblePopup'
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the left
 * or right side of the screen inside a popup. This panel flexes both horizontally and vertically,
 * with the Header positioned outside the Panel background area. This is typically used for a single
 * setting or control at a time, for maximum background area viewing.
 *
 * @class FlexiblePopupPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const FlexiblePopupPanels = FlexiblePopupPanelsDecorator(Viewport);

// Directly set the defaultProps for position to the left side so it initially draws on the correct
// side. The real default is assigned in PopupDecorator, but should still be overridable by an app.
FlexiblePopupPanels.defaultProps = {position: 'left'};

export default FlexiblePopupPanels;
export {FlexiblePopupPanels};
