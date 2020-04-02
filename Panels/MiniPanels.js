import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {FadeAndSlideArranger} from './Arrangers';
import PopupDecorator from './PopupDecorator';
import Viewport from './Viewport';


const MiniPanelsDecorator = compose(
	Skinnable,
	PopupDecorator({
		className: 'panels mini',
		panelArranger: FadeAndSlideArranger,
		panelType: 'mini'
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the left
 * or right side of the screen inside a popup. This panel flexes both horizontally and vertically,
 * with the Header positioned outside the Panel background area. This is typically used for a single
 * setting or control at a time, for maximum background area viewing.
 *
 * @class MiniPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const MiniPanels = MiniPanelsDecorator(Viewport);

// Directly set the defaultProps for position to the left side so it initially draws on the correct
// side. The real default is assigned in PopupDecorator, but should still be overridable by an app.
MiniPanels.defaultProps = {position: 'left'};

export default MiniPanels;
export {MiniPanels};
