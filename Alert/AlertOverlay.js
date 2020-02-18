/**
 * Sandstone-styled AlertOverlay components.
 *
 * @module sandstone/AlertOverlay
 * @exports AlertOverlay
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Slottable from '@enact/ui/Slottable';
import {Row, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

import Popup from '../Popup';
import componentCss from './AlertOverlay.module.less';

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
 * A Sandstone styled alert component.
 *
 * It provides a alert modal which can be opened and closed, overlaying an app. Apps will
 * want to use {@link sandstone/Alert.AlertOverlay}.
 *
 * @class AlertOverlayBase
 * @memberof sandstone/Alert
 * @ui
 * @public
 */
const AlertOverlayBase = kind({
	name: 'AlertOverlay',

	propTypes: /** @lends sandstone/Alert.AlertOverlayBase.prototype */ {
		/**
		 * Buttons for the AlertOverlay component.
		 *
		 * These typically close or take action in the AlertOverlay. Buttons must have their
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
		 * The contents for the body of the AlertOverlay component.
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
		 * * `alertOverlay` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Image to be included in the Alert component.
		 * It recommends to use `AlertImage` component.
		 *
		 * Will not display if `image` is not set.
		 *
		 * @type {Element}
		 * @public
		 */
		image: PropTypes.element,

		/**
		 * Indicates that the alertOverlay will not trigger `onClose` on the *ESC* key press.
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
		 * Controls the visibility of the AlertOverlay.
		 *
		 * By default, the AlertOverlay and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Determines the technique used to cover the screen when the AlertOverlay is present.
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
		className: 'alertOverlay',
		publicClassNames: ['alertOverlay']
	},

	computed: {
		buttons: ({buttons}) => React.Children.map(buttons, (button) => {
			if (button && button.props && !button.props.small) {
				return React.cloneElement(button, {size: 'small'});
			} else {
				return button;
			}
		})
	},

	render: ({buttons, children, css, image, ...rest}) => {
		return (
			<Popup noAnimation {...rest} css={css} shrinkBody>
				<Row align="center">
					<Row className={css.alertOverlayBody} ref={fixTransform}>
						{image ? <div className={css.image}>{image}</div> : null}
						<div className={css.content}>
							{children}
						</div>
					</Row>
					{buttons ? <Cell className={css.buttons} size={ri.scale(450)} align="end">
						{buttons}
					</Cell> : null}
				</Row>
			</Popup>
		);
	}
});


/**
 * A Sandstone styled modal component with a message, and an area for additional controls.
 *
 * @class AlertOverlay
 * @memberof sandstone/Alert
 * @mixes ui/Slottable.Slottable
 * @ui
 * @public
 */
const AlertOverlay = Slottable({slots: ['buttons', 'image']}, AlertOverlayBase);

export {AlertOverlay};
export default AlertOverlay;
