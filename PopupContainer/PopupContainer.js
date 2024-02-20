/**
 * Modal component available with free positioning.
 *
 * @example
 * <PopupContainer open position={left: 50, top:50}>
 *   <Container>
 *     {* App Contents *}
 *   <Container/>
 * </PopupContainer>
 *
 * @module sandstone/PopupContainer
 * @exports PopupContainer
 * @exports PopupContainerBase
 */

import {forward, forwardCustom} from '@enact/core/handle';
import kind from '@enact/core/kind';
// import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import FloatingLayer from '@enact/ui/FloatingLayer';
import PropTypes from 'prop-types';
import {Component} from 'react';

import css from './PopupContainer.module.less';

/**
 *
 * @class PopupContainerBase
 * @memberof sandstone/PopupContainer
 * @ui
 * @private
 */
const PopupContainerBase = kind({
	name: 'PopupContainerBase',

	propTypes: /** @lends sandstone/PopupContainer.PopupContainerBase.prototype */ {
		/**
		 * Force direction like ltr, rtl.
		 *
		 * @type {String}
		 * @public
		 */
		forceDirection: PropTypes.string,

		/**
		 * Position of the PopupContainer on the screen.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.object,

		/**
		 * Whether rtl locale.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool
	},

	defaultProps: {
		position: {left: 0, top: 0}
	},

	styles: {
		css,
		className: 'container'
	},

	computed: {
		style: ({position, rtl, forceDirection}) => {
			if (forceDirection === 'rtl') {
				return {transform: `translate(${position.left * (-1)}px,${position.top}px`};
			}
			if (forceDirection === 'ltr') {
				return {transform: `translate(${position.left}px,${position.top}px`};
			}
			if (rtl) {
				return {transform: `translate(${position.left * (-1)}px,${position.top}px`};
			}
			if (!rtl) {
				return {transform: `translate(${position.left}px,${position.top}px`};
			}
		},
		directionStyle: ({forceDirection, rtl}) => {
			if (forceDirection) return {direction : forceDirection};
			if (!forceDirection && rtl) return {direction: 'rtl'};
			if (!forceDirection && !rtl) return {direction: 'ltr'};
		}
	},

	render: ({children, directionStyle, ...rest}) => {
		delete rest.forceDirection;
		delete rest.position;
		delete rest.rtl;

		return (
			<div style={directionStyle}>
				<div className={css.PopupContainer}>
					<div {...rest}>{children}</div>
				</div>
			</div>
		);
	}
});

// const I18nPopupContainer = I18nContextDecorator(
//	 {rtlProp: 'rtl'},
//	 PopupContainerBase
// );

/**
 *
 * @class PopupContainer
 * @memberof sandstone/PopupContainer
 * @extends sandstone/PopupContainerBase
 * @ui
 * @private
 */
class PopupContainer extends Component {

	static propTypes = /** @lends sandstone/PopupContainer.PopupContainer.prototype */ {
		/**
		 * Force direction like rtl, ltr.
		 *
		 * @type {String}
		 * @public
		 */
		forceDirection: PropTypes.string,

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
		 * Controls the visibility of the PopupContainer.
		 *
		 * By default, the PopupContainer and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Position of the PopupContainer on the screen.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.object
	};

	static defaultProps = {
		open: false,
		position: {left: 0, top: 0}
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
		const {open, children, ...rest} = this.props;
		delete rest.onClose;
		delete rest.onOpen;

		return (
			<FloatingLayer
				open={open}
				onOpen={this.handleOpen}
				onClose={this.handleClose}
				scrimType="none"
			>
				<PopupContainerBase {...rest}>
					{children}
				</PopupContainerBase>
			</FloatingLayer>
		);
	}
}

export default PopupContainer;
export {PopupContainer, PopupContainerBase};
