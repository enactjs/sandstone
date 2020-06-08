/**
 * Provides Sandstone styled fixed-width, popup-styled Panels component.
 *
 * @module sandstone/FixedPopupPanels
 * @exports FixedPopupPanels
 * @exports Panel
 * @exports Header
 */

import React from 'react';
import compose from 'ramda/src/compose';

import {BasicArranger, PopupDecorator, Viewport} from '../internal/Panels';
import DefaultPanel from '../Panels/Panel';
import DefaultHeader from '../Panels/Header';

import css from './FixedPopupPanels.module.less';

const FixedPopupPanelsDecorator = compose(
	PopupDecorator({
		className: 'fixedPopupPanels',
		css,
		noAccessible: true,
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
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const FixedPopupPanels = FixedPopupPanelsDecorator(Viewport);

/**
 * Size of the popup.
 *
 * @memberof sandstone/FixedPopupPanels.FixedPopupPanels.prototype
 * @name width
 * @type {('narrow'|'half')}
 * @default 'thin'
 * @public
 */

/**
 * The standard view container used inside a
 * [FixedPopupPanels]{@link sandstone/FixedPopupPanels.FixedPopupPanels} view manager instance.
 *
 * @class Panel
 * @extends sandstone/Panels.Panel
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const Panel = (props) => (<DefaultPanel {...props} css={css} panelType="fixedPopup" />);

/**
 * A shortcut to access {@link sandstone/FixedPopupPanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/FixedPopupPanels.FixedPopupPanels
 */
FixedPopupPanels.Panel = Panel;

/**
 * A header component for a Panel with a `title` and `subtitle`, supporting several configurable
 * [`slots`]{@link ui/Slottable.Slottable} for components.
 *
 * @class Header
 * @extends sandstone/Panels.Header
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const Header = (props) => (<DefaultHeader type="compact" {...props} css={css} />);
// Relay the defaultSlot property to our version of Header
Header.defaultSlot = DefaultHeader.defaultSlot;

/**
 * A shortcut to access {@link sandstone/FixedPopupPanels.Header}
 *
 * @name Header
 * @static
 * @memberof sandstone/FixedPopupPanels.FixedPopupPanels
 */
FixedPopupPanels.Header = Header;

export default FixedPopupPanels;
export {
	FixedPopupPanels,
	Header,
	Panel
};
