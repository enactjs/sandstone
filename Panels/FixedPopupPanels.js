import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {BasicArranger} from './Arrangers';
import PopupDecorator from './PopupDecorator';
import Viewport from './Viewport';


const FixedPopupPanelsDecorator = compose(
	Skinnable,
	PopupDecorator({
		className: 'panels fixedPopup',
		panelArranger: BasicArranger,
		panelType: 'fixedPopup'
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the right
 * or left side of the screen inside a popup. Typically used for overlaying panels over other
 * content.
 *
 * @class FixedPopupPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const FixedPopupPanels = FixedPopupPanelsDecorator(Viewport);

export default FixedPopupPanels;
export {FixedPopupPanels};
