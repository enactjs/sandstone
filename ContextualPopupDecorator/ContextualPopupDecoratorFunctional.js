/* global ResizeObserver */

/**
 * A higher-order component to add a Sandstone styled popup to a component.
 *
 * @module sandstone/ContextualPopupDecorator
 * @exports	ContextualPopup
 * @exports	ContextualPopupDecorator
 */

import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {on, off} from '@enact/core/dispatcher';
import {handle, forProp, forKey, forward, forwardCustom, stop} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {WithRef} from '@enact/core/internal/WithRef';
import {extractAriaProps} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight, {getDirection} from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import FloatingLayer from '@enact/ui/FloatingLayer';
import ri from '@enact/ui/resolution';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import {Fragment, createRef, useEffect, useRef, useState} from 'react';

import {ContextualPopup} from './ContextualPopup';
import HolePunchScrim from './HolePunchScrim';

import css from './ContextualPopupDecorator.module.less';

const PositionToDirection = {
	above: 'up',
	below: 'down',
	left: 'left',
	right: 'right'
};

/**
 * Default config for {@link sandstone/ContextualPopupDecorator.ContextualPopupDecorator}
 *
 * @type {Object}
 * @hocconfig
 * @memberof sandstone/ContextualPopupDecorator.ContextualPopupDecorator
 */
const defaultConfig = {
	/**
	 * `ContextualPopup` without the arrow.
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/ContextualPopupDecorator.ContextualPopupDecorator.defaultConfig
	 * @public
	 */
	noArrow: false,

	/**
	 * Disables passing the `skin` prop to the wrapped component.
	 *
	 * @see {@link sandstone/Skinnable.Skinnable.skin}
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/ContextualPopupDecorator.ContextualPopupDecorator.defaultConfig
	 * @public
	 */
	noSkin: false,

	/**
	 * The prop in which to pass the value of `open` state of ContextualPopupDecorator to the
	 * wrapped component.
	 *
	 * @type {String}
	 * @default 'selected'
	 * @memberof sandstone/ContextualPopupDecorator.ContextualPopupDecorator.defaultConfig
	 * @public
	 */
	openProp: 'selected'
};

const ContextualPopupContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	ContextualPopup
);

const Decorator = hoc(defaultConfig, (config, Wrapped) => {
	const {noArrow, noSkin, openProp} = config;
	const WrappedWithRef = WithRef(Wrapped);

	const ContextualPopupDecorator = ({
		'data-webos-voice-exclusive': dataWebosVoiceExclusive = true,
		direction = 'below center',
		noAutoDismiss = false,
		offset = 'small',
		open = false,
		scrimType = 'none',
		spotlightRestrict = 'self-first',
		...props
	}) => {
		const [state, setState] = useState({
			arrowPosition: {top: 0, left: 0},
			containerPosition: {top: 0, left: 0, right: 0},
			containerId: Spotlight.add(props.popupSpotlightId),
			activator: null
		});

		// constructor variables
		let resizeObserver = false;
		const overflow = {};
		const adjustDirection = props.direction;
		const clientSiblingRef = useRef(null);
		const generateId = () => {
			return Math.random().toString(36).substr(2, 8);
		};
		const id = generateId();
		let containerNode = useRef(null);

		const MARGIN = ri.scale(noArrow ? 0 : 12);
		const ARROW_WIDTH = noArrow ? 0 : ri.scale(60); // svg arrow width. used for arrow positioning
		const ARROW_OFFSET = noArrow ? 0 : ri.scale(36); // actual distance of the svg arrow displayed to offset overlaps with the container. Offset is when `noArrow` is false.
		const KEEPOUT = ri.scale(24); // keep out distance on the edge of the screen

		if (props.setApiProvider) {
			props.setApiProvider({
				...state,
				resizeObserver,
				overflow,
				adjustDirection,
				clientSiblingRef,
				id,
				MARGIN,
				ARROW_WIDTH,
				ARROW_OFFSET,
				KEEPOUT
			})
		}

		const prevProps = useRef({open});
		const prevState = useRef({state})
		// END constructor variable

		// Lifecycle methods
		useEffect(() => {

		}, []);
		// END Lifecycle methods

		//////////// - HANDLERS
		const updateLeaveFor = (activator) => {
			Spotlight.set(state.containerId, {
				leaveFor: {
					up: activator,
					down: activator,
					left: activator,
					right: activator
				}
			});
		}

		const handleClose = () => {
			updateLeaveFor(null);
			setState(prevState => ({
				...prevState,
				activator: null
			}));
		};

		const handleDismiss = () => {
			forwardCustom('onClose')(null, props);
		};

		// const positionContextualPopup = () => {
		// 	if (this.containerNode && this.clientSiblingRef?.current) {
		// 		const containerNode = this.containerNode.getBoundingClientRect();
		// 		const {top, left, bottom, right, width, height} = this.clientSiblingRef.current.getBoundingClientRect();
		// 		const clientNode = {top, left, bottom, right, width, height};
		//
		// 		clientNode.left = this.props.rtl ? window.innerWidth - right : left;
		// 		clientNode.right = this.props.rtl ? window.innerWidth - left : right;
		//
		// 		this.calcOverflow(containerNode, clientNode);
		// 		this.adjustDirection();
		//
		// 		const arrowPosition = this.getArrowPosition(containerNode, clientNode),
		// 			containerPosition = this.getContainerPosition(containerNode, clientNode);
		//
		// 		if ((this.state.direction !== this.adjustedDirection) ||
		// 			(this.state.arrowPosition.left !== arrowPosition.left) ||
		// 			(this.state.arrowPosition.top !== arrowPosition.top) ||
		// 			(this.state.containerPosition.left !== containerPosition.left) ||
		// 			(this.state.containerPosition.right !== containerPosition.right) ||
		// 			(this.state.containerPosition.top !== containerPosition.top)
		// 		) {
		// 			this.setState({
		// 				direction: this.adjustedDirection,
		// 				arrowPosition,
		// 				containerPosition
		// 			});
		// 		}
		// 	}
		// };

		// TODO: uncomment below lines and take a look
		const handleOpen = (ev) => {
			forward('onOpen', ev, props);
			// this.positionContextualPopup();
			const current = Spotlight.getCurrent();
			updateLeaveFor(current);
			setState(prevState => ({
				activator: current
			}));
			// this.spotPopupContent();
		};

		// TODO: uncomment below lines and take a look
		// handle key event from contextual popup and closes the popup
		const handleContainerKeyDown = (ev) => {
			// Note: Container will be only rendered if `open`ed, therefore no need to check for `open`
			const direction = getDirection(ev.keyCode);

			if (!direction) return;

			// this.handleDirectionalKey(ev);
			//
			// // if focus moves outside the popup's container, issue the `onClose` event
			// if (Spotlight.move(direction) && !this.containerNode.contains(Spotlight.getCurrent())) {
			// 	forwardCustom('onClose')(null, this.props);
			// }
		};

		// TODO: uncomment below lines and take a look
		const getContainerNode = (node) => {
			containerNode = node;

			if (resizeObserver) {
				if (node) {
					// It is not easy to trigger changed position of activator,
					// so we chose to observe the `div` element's size that has the real size below the root of floatLayer.
					// This implementation is dependent on the current structure of FloatingLayer,
					// so if the structure have changed, below code needs to be changed accordingly.
					resizeObserver.observe(node?.parentElement?.parentElement);
				} else {
					resizeObserver.disconnect();
				}
			}
		};

		/////////// - this is from render method
		const {'data-webos-voice-exclusive': voiceExclusive, popupComponent: PopupComponent, popupClassName, popupProps, skin, ...rest} = props;
		const idFloatLayer = `${id}_floatLayer`;
		scrimType = rest.scrimType;
		delete rest.scrimType;

		// 'holepunch' scrimType is specific to this component, not supported by floating layer
		// so it must be swapped-out for one that FloatingLayer does support.
		const holepunchScrim = (scrimType === 'holepunch');
		if ((spotlightRestrict === 'self-only' && scrimType === 'none') || holepunchScrim) {
			scrimType = 'transparent';
		}

		const popupPropsRef = Object.assign({}, popupProps);
		const ariaProps = extractAriaProps(popupPropsRef);

		if (!noSkin) {
			rest.skin = skin;
		}

		let holeBounds;
		if (clientSiblingRef?.current && holepunchScrim) {
			holeBounds = clientSiblingRef.current.getBoundingClientRect();
		}

		delete rest.direction;
		delete rest.onClose;
		delete rest.onOpen;
		delete rest.popupSpotlightId;
		delete rest.rtl;
		delete rest.setApiProvider;

		if (openProp) rest[openProp] = open;

		return (
			<div aria-owns={idFloatLayer} className={css.contextualPopupDecorator}>
				<FloatingLayer
					id={idFloatLayer}
					noAutoDismiss={noAutoDismiss}
					onClose={handleClose}
					onDismiss={handleDismiss}
					onOpen={handleOpen}
					open={open}
					scrimType={scrimType}
				>
					<Fragment>
						{holepunchScrim ? <HolePunchScrim holeBounds={holeBounds} /> : null}
						<ContextualPopupContainer
							{...ariaProps}
							className={popupClassName}
							onKeyDown={handleContainerKeyDown}
							direction={state.direction}
							arrowPosition={state.arrowPosition}
							containerPosition={state.containerPosition}
							containerRef={getContainerNode}
							data-webos-voice-exclusive={voiceExclusive}
							offset={noArrow ? offset : 'none'}
							showArrow={!noArrow}
							skin={skin}
							spotlightId={state.containerId}
							spotlightRestrict={spotlightRestrict}
						>
							<PopupComponent {...popupPropsRef} />
						</ContextualPopupContainer>
					</Fragment>
				</FloatingLayer>
				<WrappedWithRef {...rest} outermostRef={clientSiblingRef} referrerName="ContextualPopup" />
			</div>
		)
	};

	ContextualPopupDecorator.displayName = 'ContextualPopupDecorator';

	ContextualPopupDecorator.propTypes = /** @lends sandstone/ContextualPopupDecorator.ContextualPopupDecorator.prototype */ {
		/**
		 * The component rendered within the
		 * {@link sandstone/ContextualPopupDecorator.ContextualPopup|ContextualPopup}.
		 *
		 * @type {Component}
		 * @required
		 * @public
		 */
		popupComponent: EnactPropTypes.component.isRequired,

		/**
		 * Limits the range of voice control to the popup.
		 *
		 * @memberof sandstone/ContextualPopupDecorator.ContextualPopupDecorator.prototype
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		'data-webos-voice-exclusive': PropTypes.bool,

		/**
		 * Direction of popup with respect to the wrapped component.
		 *
		 * @type {('above'|'above center'|'above left'|'above right'|'below'|'below center'|'below left'|'below right'|'left middle'|'left top'|'left bottom'|'right middle'|'right top'|'right bottom')}
		 * @default 'below center'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

		/**
		 * Disables closing the popup when the user presses the cancel/back (e.g. `ESC`) key or taps outside the
		 * popup.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAutoDismiss: PropTypes.bool,

		/**
		 * Offset from the activator to apply to the position of the popup.
		 *
		 * Only applies when `noArrow` is `true`.
		 *
		 * @type {('none'|'overlap'|'small')}
		 * @default 'small'
		 * @public
		 */
		offset: PropTypes.oneOf(['none', 'overlap', 'small']),

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
		 * Displays the contextual popup.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * CSS class name to pass to the
		 * {@link sandstone/ContextualPopupDecorator.ContextualPopup|ContextualPopup}.
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
		 * Set the type of scrim to use
		 *
		 * @type {('holepunch'|'translucent'|'transparent'|'none')}
		 * @default 'none'
		 * @private
		 */
		scrimType: PropTypes.oneOf(['holepunch', 'translucent', 'transparent', 'none']),

		/**
		 * Registers the ContextualPopupDecorator component with an
		 * {@link core/internal/ApiDecorator.ApiDecorator|ApiDecorator}.
		 *
		 * @type {Function}
		 * @private
		 */
		setApiProvider: PropTypes.func,

		/**
		 * The current skin for this component.
		 *
		 * When `noSkin` is set on the config object, `skin` will only be applied to the
		 * {@link sandstone/ContextualPopupDecorator.ContextualPopup|ContextualPopup} and not
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
		 * @type {('none'|'self-first'|'self-only')}
		 * @default 'self-first'
		 * @public
		 */
		spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
	};

	return ContextualPopupDecorator;
});

/**
 * Adds support for positioning a
 * {@link sandstone/ContextualPopupDecorator.ContextualPopup|ContextualPopup} relative to the
 * wrapped component.
 *
 * `ContextualPopupDecorator` may be used to show additional settings or actions rendered within a
 * small floating popup.
 *
 * Usage:
 * ```
 * const ButtonWithPopup = ContextualPopupDecorator(Button);
 * <ButtonWithPopup
 *   direction="above center"
 *   open={this.state.open}
 *   popupComponent={CustomPopupComponent}
 * >
 *   Open Popup
 * </ButtonWithPopup>
 * ```
 *
 * @hoc
 * @memberof sandstone/ContextualPopupDecorator
 * @public
 */
const ContextualPopupDecorator = compose(
	ApiDecorator({api: ['positionContextualPopup']}),
	I18nContextDecorator({rtlProp: 'rtl'}),
	Decorator
);

export default ContextualPopupDecorator;
export {
	ContextualPopupDecorator,
	ContextualPopup
};
