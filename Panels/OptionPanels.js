import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {BasicArranger} from './Arrangers';
import PopupDecorator from './PopupDecorator';
import Viewport from './Viewport';


const OptionPanelsDecorator = compose(
	Skinnable,
	PopupDecorator({
		className: 'panels option',
		panelArranger: BasicArranger,
		panelType: 'option'
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the right
 * or left side of the screen inside a popup. Typically used for overlaying panels over other
 * content.
 *
 * @class OptionPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const OptionPanels = OptionPanelsDecorator(Viewport);

export default OptionPanels;
export {OptionPanels};
