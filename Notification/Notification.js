/**
 * Sandstone-styled Notification components.
 *
 * @module sandstone/Notification
 * @exports Notification
 * @exports NotificationBase
 * @deprecated Will be removed in 1.0.0-beta.1. Use {@link sandstone/Alert} instead.
 */

import deprecate from '@enact/core/internal/deprecate';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Slottable from '@enact/ui/Slottable';

import Popup from '../Popup';

import componentCss from './Notification.module.less';

// ENYO-5691: Workaround to fix a text rendering issue by aligning the content to the pixel grid
const fixTransform = (node) => {
	if (!node) return;

	const parent = node.parentNode;
	const {left, top} = parent.getBoundingClientRect();
	const deltaY = Math.round(top) - top;
	const deltaX = Math.round(left) - left;
	if (deltaY !== 0 || deltaX !== 0) {
		// on webOS, the layer promotion is necessary to resolve the text rendering issue
		parent.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
		parent.style.willChange = 'transform';
	}
};

/**
 * A Sandstone styled notification component.
 *
 * It provides a notification modal which can be opened and closed, overlaying an app. Apps will
 * want to use {@link sandstone/Notification.Notification}.
 *
 * @class NotificationBase
 * @memberof sandstone/Notification
 * @ui
 * @public
 */
const NotificationBase = kind({
	name: 'Notification',

	propTypes: /** @lends sandstone/Notification.NotificationBase.prototype */ {
		/**
		 * Buttons for the Notification.
		 *
		 * These typically close or take action in the Notification. Buttons must have their
		 * `size` property set to `'small'` and will be coerced to `'small'` if not specified.
		 *
		 * @type {Element|Element[]}
		 * @public
		 */
		buttons: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]),

		/**
		 * The contents for the body of the Notification.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `notification` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Indicates that the notification will not trigger `onClose` on the *ESC* key press.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAutoDismiss: PropTypes.bool,

		/**
		 * Called when a closing action is invoked by the user.
		 *
		 * These actions include pressing *ESC* key or clicking on the close button. It is the
		 * responsibility of the callback to set the `open` state to `false`.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Controls the visibility of the Notification.
		 *
		 * By default, the Notification and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Determines the technique used to cover the screen when the notification is present.
		 *
		 * * Values: `'transparent'`, `'translucent'`, or `'none'`.
		 *
		 * @type {String}
		 * @default 'transparent'
		 * @public
		 */
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none'])
	},

	defaultProps: {
		open: false,
		scrimType: 'transparent'
	},

	styles: {
		css: componentCss,
		className: 'notification',
		publicClassNames: ['notification']
	},

	computed: {
		className: ({buttons, styler}) => styler.append({
			wide: (buttons && React.Children.toArray(buttons).filter(Boolean).length > 2)
		}),
		buttons: ({buttons}) => React.Children.map(buttons, (button) => {
			if (button && button.props && !button.props.small) {
				return React.cloneElement(button, {size: 'small'});
			} else {
				return button;
			}
		})
	},

	render: deprecate(({buttons, children, css, ...rest}) => {
		return (
			<Popup noAnimation {...rest} css={css}>
				<div className={css.notificationBody} ref={fixTransform}>
					{children}
				</div>
				{buttons ? <div className={css.buttons}>
					{buttons}
				</div> : null}
			</Popup>
		);
	}, {
		name: 'sandstone/Notification',
		replacedBy: 'sandstone/Alert',
		until: '1.0.0-beta.1'
	})
});


/**
 * A Sandstone styled modal component with a message, and an area for additional controls.
 *
 * @class Notification
 * @memberof sandstone/Notification
 * @mixes ui/Slottable.Slottable
 * @ui
 * @public
 */
const Notification = Slottable({slots: ['buttons']}, NotificationBase);

export default Notification;
export {Notification, NotificationBase};
