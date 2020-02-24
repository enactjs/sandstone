import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import ContextualPopupDecorator from '../ContextualPopupDecorator';
import Skinnable from '../Skinnable';

import css from './ContextualMenuDecorator.module.less';

/**
 * A popup component used by
 * [ContextualMenuDecorator]{@link sandstone/ContextualMenuDecorator.ContextualMenuDecorator} to
 * wrap its
 * [popupComponent]{@link sandstone/ContextualMenuDecorator.ContextualMenuDecorator.popupComponent}.
 *
 * `ContextualMenuPopup` is usually not used directly but is made available for unique application use
 * cases.
 *
 * @class ContextualMenuPopup
 * @memberof sandstone/ContextualMenuPopupDecorator
 * @ui
 * @private
 */
const ContextualMenuPopup = hoc((config, Wrapped) => {
	return kind({
		name: 'ContextualMenuPopup',

		styles: {
			css,
			className: 'contextualMenu'
		},

		computed: {
			popupClassName: ({popupClassName, styler}) => styler.append('popup', popupClassName)
		},

		render: (props) => {
			return <Wrapped {...props} />;
		}
	});
});

const ContextualMenuPopupDecorator = compose(
	Skinnable,
	ContextualMenuPopup
);

/**
 * Default config for {@link sandstone/ContextualMenuDecorator.ContextualMenuDecorator}
 *
 * @type {Object}
 * @hocconfig
 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator
 */
const defaultConfig = {
	/**
	 * Disables passing the `skin` prop to the wrapped component.
	 *
	 * @see {@link sandstone/Skinnable.Skinnable.skin}
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.defaultConfig
	 * @public
	 */
	noSkin: false,

	/**
	 * The prop in which to pass the value of `open` state of ContextualMenuDecorator to the
	 * wrapped component.
	 *
	 * @type {String}
	 * @default 'selected'
	 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.defaultConfig
	 * @public
	 */
	openProp: 'selected'
};

const ContextualMenuDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const Component = ContextualMenuPopupDecorator(
		ContextualPopupDecorator({...config, noArrow: true}, Wrapped)
	);

	return class extends React.Component {
		static displayName = 'ContextualMenuDecorator';

		static propTypes = /** @lends sandstone/ContextualMenuDecorator.ContextualMenuDecorator.prototype */ {
			/**
			 * The component rendered within the
			 * [ContextualMenuPopup]{@link sandstone/ContextualMenuDecorator.ContextualMenuPopup}.
			 *
			 * @type {Component}
			 * @required
			 * @public
			 */
			popupComponent: EnactPropTypes.component.isRequired,

			/**
			 * Limits the range of voice control to the popup.
			 *
			 * @memberof sandstone/ContextualMenuDecorator.ContextualMenuDecorator.prototype
			 * @type {Boolean}
			 * @default true
			 * @public
			 */
			'data-webos-voice-exclusive': PropTypes.bool,

			/**
			 * Direction of popup with respect to the wrapped component.
			 *
			 * @type {String}
			 * @default 'below left'
			 * @public
			 */
			direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

			/**
			 * Disables closing the popup when the user presses the cancel key or taps outside the
			 * popup.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			noAutoDismiss: PropTypes.bool,

			/**
			 * Called when the user has attempted to close the popup.
			 *
			 * This may occur either when the close button is clicked or when spotlight focus
			 * moves outside the boundary of the popup. Setting `spotlightRestrict` to `'self-only'`
			 * will prevent Spotlight focus from leaving the popup.
			 *
			 * @type {Function}
			 * @public
			 */
			onClose: PropTypes.func,

			/**
			 * Called when the popup is opened.
			 *
			 * @type {Function}
			 * @public
			 */
			onOpen: PropTypes.func,

			/**
			 * Displays the contextual menu popup.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			open: PropTypes.bool,

			/**
			 * CSS class name to pass to the
			 * [ContextualMenuPopup]{@link sandstone/ContextualMenuDecorator.ContextualMenuPopup}.
			 *
			 * This is commonly used to set width and height of the popup.
			 *
			 * @type {String}
			 * @public
			 */
			popupClassName: PropTypes.string,

			/**
			 * An object containing properties to be passed to popup component.
			 *
			 * @type {Object}
			 * @public
			 */
			popupProps: PropTypes.object,

			/**
			 * The container ID to use with Spotlight.
			 *
			 * The spotlight container for the popup isn't created until it is open. To configure
			 * the container using `Spotlight.set()`, handle the `onOpen` event which is fired after
			 * the popup has been created and opened.
			 *
			 * @type {String}
			 * @public
			 */
			popupSpotlightId: PropTypes.string,

			/**
			 * Indicates the content's text direction is right-to-left.
			 *
			 * @type {Boolean}
			 * @private
			 */
			rtl: PropTypes.bool,

			/**
			 * Registers the ContextualMenuDecorator component with an [ApiDecorator]
			 * {@link core/internal/ApiDecorator.ApiDecorator}.
			 *
			 * @type {Function}
			 * @private
			 */
			setApiProvider: PropTypes.func,

			/**
			 * Shows the close button.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			showCloseButton: PropTypes.bool,

			/**
			 * The current skin for this component.
			 *
			 * When `noSkin` is set on the config object, `skin` will only be applied to the
			 * [ContextualMenuPopup]{@link sandstone/ContextualMenuDecorator.ContextualMenuPopup} and not
			 * to the popup's activator component.
			 *
			 * @see {@link sandstone/Skinnable.Skinnable.skin}
			 * @type {String}
			 * @public
			 */
			skin: PropTypes.string,

			/**
			 * Restricts or prioritizes spotlight navigation.
			 *
			 * Allowed values are:
			 * * `'none'` - Spotlight can move freely within and beyond the popup
			 * * `'self-first'` - Spotlight should prefer components within the popup over
			 *   components beyond the popup, or
			 * * `'self-only'` - Spotlight can only be set within the popup
			 *
			 * @type {String}
			 * @default 'self-first'
			 * @public
			 */
			spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
		}

		static defaultProps = {
			'data-webos-voice-exclusive': true,
			direction: 'below',
			noAutoDismiss: false,
			open: false,
			showCloseButton: false,
			spotlightRestrict: 'self-first'
		}

		render () {
			return <Component {...this.props} />;
		}
	};
});

export default ContextualMenuDecorator;
export {
	ContextualMenuDecorator,
	ContextualMenuPopup,
	ContextualMenuPopupDecorator
};
