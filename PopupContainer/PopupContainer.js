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

import FloatingLayer from '@enact/ui/FloatingLayer';
import kind from '@enact/core/kind';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {forward, forwardCustom} from '@enact/core/handle';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';


import css from './PopupContainer.module.less';

/**
 *
 * @class PopupContainerBase
 * @memberof sandstone/PopupContainer
 * @ui
 * @public
 */
const PopupContainerBase = kind({
	name: 'PopupContainerBase',
	propTypes: /** @lends sandstone/PopupContainer.PopupContainerBase.prototype */ {
		/**
		 * Position of the PopupContainer on the screen.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.object
	},

	defaultProps: {
		position: {left: 300, top: 300},
	},

	styles: {
		css,
		className: 'container'
	},

	computed: {
		style: ({position, rtl, rtlDirection}) => ((rtl && rtlDirection) ? 
			{transform: `translate(${position.left * (-1)}px,${position.top}px`}: 
			{transform: `translate(${position.left}px,${position.top}px`}),
		directionStyle: ({rtlDirection, rtl}) => ((rtl && rtlDirection) ? {direction: 'rtl'} : {direction: 'ltr'})
	},
	render: ({children, className, directionStyle, rtlDirection, rtl, style, ...rest}) => {
		return (
			<div style={directionStyle}>
				<div className={css.PopupContainer}>
					<div className={className} style={style} {...rest}>{children}</div>
				</div>
			</div>
		);
	}
});

const I18nPopupContainer = I18nContextDecorator(
	{rtlProp: 'rtl'},
	PopupContainerBase
);

/**
 *
 * @class PopupContainer
 * @memberof sandstone/PopupContainer
 * @extends sandstone/PopupContainerBase
 * @ui
 * @public
 */
class PopupContainer extends Component {

	static propTypes = /** @lends sandstone/PopupContainer.PopupContainer.prototype */ {
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
		position: PropTypes.object,

		/**
		 * Use to rtl direction.
		 * 
		 * @type {Boolean}
		 * @public
		 */
		rtlDirection: PropTypes.bool
	};

	static defaultProps = {
		open: false,
		position: {left:300, top:300}
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
		const {className, open, position, children, rtlDirection, ...rest} = this.props;

		return (
			<FloatingLayer
				open={open}
				onOpen={this.handleOpen}
				onClose={this.handleClose}
				scrimType="none"
		>
			<I18nPopupContainer className={className} position={position} rtlDirection={rtlDirection} {...rest}>
				{children}
			</I18nPopupContainer>
		</FloatingLayer>
		);
	}
}

export default PopupContainer;
export {PopupContainer, PopupContainerBase};
