import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import {PanelsStateContext} from '../internal/Panels';
import {ContextAsDefaults} from '../internal/Panels/util';
import DefaultHeader from '../Panels/Header';

import componentCss from './FlexiblePopupPanels.module.less';

/**
 * A header component for `FlexiblePopupPanels.Panel` with a `title` and `subtitle`, supporting several configurable
 * [`slots`]{@link ui/Slottable.Slottable} for components.
 *
 * @class Header
 * @extends sandstone/Panels.Header
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */
const HeaderBase = kind({
	name: 'Header',

	contextType: PanelsStateContext,

	propTypes: /** @lends sandstone/FlexiblePopupPanels.Header.prototype */ {
		/**
		 * Hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Background opacity of the application close button.
		 *
		 * @type {('opaque'|'transparent')}
		 * @default 'transparent'
		 * @public
		 */
		closeButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Omits the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func
	},

	styles: {
		css: componentCss,
		className: 'header'
	},

	computed: {
		backButtonAriaLabel: ({closeButtonAriaLabel}) => closeButtonAriaLabel == null ? $L('Exit app') : closeButtonAriaLabel,
		backButtonBackgroundOpacity: ({closeButtonBackgroundOpacity}) => closeButtonBackgroundOpacity,
		className: ({noCloseButton, styler}, {count}) => styler.append({'showBack': (count > 1 && noCloseButton)}),
		noBackButton: ({noCloseButton}) => noCloseButton,
		onBack: ({onClose}) => onClose
	},

	render: ({css, ...rest}) => (
		<DefaultHeader
			css={css}
			type="mini"
			{...rest}
			noCloseButton
		/>
	)
});

const Header = ContextAsDefaults({
	props: ['closeButtonAriaLabel', 'closeButtonBackgroundOpacity', 'noCloseButton', 'onClose']
}, HeaderBase);

// Relay the defaultSlot property to our version of Header
Header.defaultSlot = DefaultHeader.defaultSlot;

export default Header;
export {
	Header,
	HeaderBase
};
