import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {BasicArranger} from './Arrangers';
import PopupDecorator from './PopupDecorator';
import Viewport from './Viewport';


const OptionPanelsDecorator = compose(
	Skinnable,
	PopupDecorator({
		className: 'panels option',
		panelArranger: BasicArranger
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the right
 * half of the screen with the left half used for breadcrumbs that allow navigating to previous
 * panels. Typically used for overlaying panels over a screen.
 *
 * @class OpitonPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const OpitonPanels = OptionPanelsDecorator(Viewport);

export default OpitonPanels;
export {OpitonPanels};
