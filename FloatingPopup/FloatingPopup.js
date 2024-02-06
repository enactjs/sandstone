/**
 * Modal component available with free positioning.
 *
 * @example
 * <FloatingPopup open position={left: 50, top:50}>
 *   <FloatingPopupContainer>
 *     {* App Contents *}
 *   <FloatingPopupContainer/>
 * </FloatingPopup>
 *
 * @module sandstone/FloatingPopup
 * @exports FloatingPopup
 * @exports FloatingPopupBase
 */

import FloatingLayer from '@enact/ui/FloatingLayer';
import kind from '@enact/core/kind';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {forward, forwardCustom} from '@enact/core/handle';

import css from './FloatingPopup.module.less';

/**
 * The Floating Popup base for app contents.
 *
 * @class FloatingPopupBase
 * @memberof sandstone/FloatingPopup
 * @ui
 * @public
 */
const FloatingPopupBase = (props) => {
	return (
		<>{props.children}</>
	);
};

/**
 * An item for FloatingPopup.
 *
 * @class FloatingPopupContainer
 * @memberof sandstone/FloatingPopup
 * @ui
 * @public
 */
const FloatingPopupContainer = kind({
	name: 'FloatingPopupContainer',
	propTypes: /** @lends sandstone/FloatingPopup.FloatingPopupContainer.prototype */ {
		/**
		 * Position of the FloatingPopup on the screen.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.object
	},

	defaultProps: {
		position: {left: 300, top: 300}
	},

	styles: {
		css,
		className: 'container'
	},

	render: ({children, className, position, ...rest}) => {
		return (
			<div className={css.FloatingPopup}>
				<div className={className} style={position} {...rest}>{children}</div>
			</div>
		);
	}
});

/**
 * A stateful component that renders a popup in a
 * {@link ui/FloatingLayer.FloatingLayer|FloatingLayer}.
 *
 * @class FloatingPopup
 * @memberof sandstone/FloatingPopup
 * @extends sandstone/FloatingPopup.FloatingPopupContainer
 * @ui
 * @public
 */
class FloatingPopup extends Component {

	static propTypes = /** @lends sandstone/FloatingPopup.FloatingPopup.prototype */ {
		/**
		 * Called when the user has attempted to close the popup.
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
		 * Controls the visibility of the FloatingPopup.
		 *
		 * By default, the FloatingPopup and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Position of the FloatingPopup on the screen.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.object
	};

	static defaultProps = {
		open: false
	};

	constructor (props) {
		super(props);
	}

	handleClose = (ev) => {
		forwardCustom('onClose')(ev, this.props);
	};

	handleOpen = (ev) => {
		forward('onOpen', ev, this.props);
	};

	render () {
		const {className, open, position, children, ...rest} = this.props;

		return (
			<FloatingLayer
				open={open}
				onOpen={this.handleOpen}
				onClose={this.handleClose}
				scrimType="none"
			>
				<FloatingPopupContainer position={position} className={className} {...rest}>
					<FloatingPopupBase>
						{children}
					</FloatingPopupBase>
				</FloatingPopupContainer>
			</FloatingLayer>
		);
	}
}

export default FloatingPopup;
export {FloatingPopupContainer, FloatingPopupBase, FloatingPopup};
