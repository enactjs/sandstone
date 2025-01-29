/* global MutationObserver ResizeObserver */

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
import {Fragment, useCallback, useEffect, useState, useRef} from 'react';

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

	const _ContextualPopupDecorator = ({
										   'data-webos-voice-exclusive': dataWebosVoiceExclusive = true,
										   direction = 'below center',
										   noAutoDismiss = false,
										   offset = 'small',
										   open = false,
										   scrimType = 'none',
										   spotlightRestrict = 'self-first',
										   ...props
									   }) => {
		const {setApiProvider, rtl, popupComponent: PopupComponent, popupClassName, popupProps, skin, ...rest} = props;

		const [state, setState] = useState({
			arrowPosition: {top: 0, left: 0},
			containerPosition: {top: 0, left: 0, right: 0},
			containerId: Spotlight.add(props.popupSpotlightId),
			activator: null
		});

		const generateId = () => {
			return Math.random().toString(36).substring(2, 10);
		};
		// constructor variables
		let resizeObserver = useRef(null);
		let mutationObserver = useRef(null);
		let overflow = useRef(null);
		let adjustedDirection = useRef(direction);
		const id = useRef(generateId());
		let clientSiblingRef = useRef(null);
		let containerNode = useRef(null);

		let MARGIN = useRef(ri.scale(noArrow ? 0 : 12));
		let ARROW_WIDTH = useRef(noArrow ? 0 : ri.scale(60)); // svg arrow width. used for arrow positioning
		let ARROW_OFFSET = useRef(noArrow ? 0 : ri.scale(36)); // actual distance of the svg arrow displayed to offset overlaps with the container. Offset is when `noArrow` is false.
		let KEEPOUT = useRef(ri.scale(24)); // keep out distance on the edge of the screen

		useEffect(() => {
			if (setApiProvider) {
				setApiProvider({
					arrowPosition: state.arrowPosition,
					containerPosition: state.containerPosition,
					containerId: state.containerId,
					activator: state.activator,
					resizeObserver: resizeObserver.current,
					overflow: overflow.current,
					adjustedDirection: adjustedDirection.current,
					id: id.current,
					clientSiblingRef: clientSiblingRef.current,
					MARGIN: MARGIN.current,
					ARROW_WIDTH: ARROW_WIDTH.current,
					ARROW_OFFSET: ARROW_OFFSET.current,
					KEEPOUT: KEEPOUT.current
				});
			}
		});

		const handleDirectionalKey = (ev) => {
			// prevent default page scrolling
			ev.preventDefault();
			// stop propagation to prevent default spotlight behavior
			ev.stopPropagation();
			// set the pointer mode to false on keydown
			Spotlight.setPointerMode(false);
		};

		const spotPopupContent = useCallback(() => {
			const {containerId} = state;
			const spottableDescendants = Spotlight.getSpottableDescendants(containerId);
			if (spotlightRestrict === 'self-only' && spottableDescendants.length && Spotlight.getCurrent()) {
				Spotlight.getCurrent().blur();
			}

			if (!Spotlight.focus(containerId)) {
				Spotlight.setActiveContainer(containerId);
			}
		}, [spotlightRestrict, state]);

		// handle key event from outside (i.e. the activator) to the popup container
		const handleKeyDown = useCallback((ev) => {
			const {activator, containerId} = state;
			const current = Spotlight.getCurrent();
			const direction = getDirection(ev.keyCode); // eslint-disable-line no-shadow

			if (!direction) return;

			const hasSpottables = Spotlight.getSpottableDescendants(containerId).length > 0;
			const spotlessSpotlightModal = spotlightRestrict === 'self-only' && !hasSpottables;
			const shouldSpotPopup = current === activator && direction === PositionToDirection[adjustedDirection.current.split(' ')[0]] && hasSpottables;

			if (shouldSpotPopup || spotlessSpotlightModal) {
				handleDirectionalKey(ev);

				// we guard against attempting a focus change by verifying the case where a
				// spotlightModal popup contains no spottable components
				if (!spotlessSpotlightModal && shouldSpotPopup) {
					spotPopupContent();
				}
			}
		}, [spotPopupContent, spotlightRestrict, state]);

		const getContainerNode = (node) => {
			containerNode.current = node;

			if (resizeObserver.current) {
				if (node) {
					// It is not easy to trigger changed position of activator,
					// so we chose to observe the `div` element's size that has the real size below the root of floatLayer.
					// This implementation is dependent on the current structure of FloatingLayer,
					// so if the structure have changed, below code needs to be changed accordingly.
					resizeObserver.current.observe(node?.parentElement?.parentElement);
				} else {
					resizeObserver.current.disconnect();
				}
			}

			if (mutationObserver.current) {
				if (node) {
					mutationObserver.current.observe(document.body, {attributes: false, childList: true, subtree: true});
				} else {
					mutationObserver.current.disconnect();
				}
			}
		};

		const handleKeyUp = handle(
			forProp('open', true),
			forKey('enter'),
			() => Spotlight.getCurrent() === state.activator,
			stop,
			forwardCustom('onClose')
		);

		const getContainerAdjustedPosition = () => {
			const position = adjustedDirection.current;
			const arr = adjustedDirection.current.split(' ');
			let direction = null; // eslint-disable-line no-shadow
			let anchor = null;

			if (arr.length === 2) {
				[direction, anchor] = arr;
			} else {
				direction = position;
			}

			return {anchor, direction};
		};

		const calcOverflow = (container, client) => {
			let containerHeight, containerWidth;
			const {anchor, direction} = getContainerAdjustedPosition(); // eslint-disable-line no-shadow

			if (direction === 'above' || direction === 'below') {
				containerHeight = container.height;
				containerWidth = (container.width - client.width) / 2;
			} else {
				containerHeight = (container.height - client.height) / 2;
				containerWidth = container.width;
			}

			overflow.current = {
				isOverTop: anchor === 'top' && (direction === 'left' || direction === 'right') ?
					!(client.top > KEEPOUT.current) :
					client.top - containerHeight - ARROW_OFFSET.current - MARGIN.current - KEEPOUT.current < 0,
				isOverBottom: anchor === 'bottom' && (direction === 'left' || direction === 'right') ?
					client.bottom + KEEPOUT.current > window.innerHeight :
					client.bottom + containerHeight + ARROW_OFFSET.current + MARGIN.current + KEEPOUT.current > window.innerHeight,
				isOverLeft: anchor === 'left' && (direction === 'above' || direction === 'below') ?
					!(client.left > KEEPOUT.current) :
					client.left - containerWidth - ARROW_OFFSET.current - MARGIN.current - KEEPOUT.current < 0,
				isOverRight: anchor === 'right' && (direction === 'above' || direction === 'below') ?
					client.right + KEEPOUT.current > window.innerWidth :
					client.right + containerWidth + ARROW_OFFSET.current + MARGIN.current + KEEPOUT.current > window.innerWidth
			};
		};

		const adjustDirection = () => {
			const {anchor, direction} = getContainerAdjustedPosition(); // eslint-disable-line no-shadow

			if (overflow.current.isOverTop && !overflow.current.isOverBottom && direction === 'above') {
				adjustedDirection.current = anchor ? `below ${anchor}` : 'below';
			} else if (overflow.current.isOverBottom && !overflow.current.isOverTop && direction === 'below') {
				adjustedDirection.current = anchor ? `above ${anchor}` : 'above';
			} else if (overflow.current.isOverLeft && !overflow.current.isOverRight && direction === 'left' && !rtl) {
				adjustedDirection.current = anchor ? `right ${anchor}` : 'right';
			} else if (overflow.current.isOverRight && !overflow.current.isOverLeft && direction === 'right' && !rtl) {
				adjustedDirection.current = anchor ? `left ${anchor}` : 'left';
			}
		};

		const adjustRTL = (position) => {
			let pos = position;
			if (rtl) {
				const tmpLeft = pos.left;
				pos.left = pos.right;
				pos.right = tmpLeft;
			}
			return pos;
		};

		const getArrowPosition = (containerNode, clientNode) => { // eslint-disable-line no-shadow
			const position = {};
			const {anchor, direction} = getContainerAdjustedPosition(); // eslint-disable-line no-shadow

			if (direction === 'above' || direction === 'below') {
				if (overflow.current.isOverRight && !overflow.current.isOverLeft) {
					position.left = window.innerWidth - ((containerNode.width + ARROW_WIDTH.current) / 2) - KEEPOUT.current;
				} else if (!overflow.current.isOverRight && overflow.current.isOverLeft) {
					position.left = ((containerNode.width - ARROW_WIDTH.current) / 2) + KEEPOUT.current;
				} else if (anchor === 'left') {
					position.left = clientNode.left + (containerNode.width - ARROW_WIDTH.current) / 2;
				} else if (anchor === 'right') {
					position.left = clientNode.right - containerNode.width + (containerNode.width - ARROW_WIDTH.current) / 2;
				} else {
					position.left = clientNode.left + (clientNode.width - ARROW_WIDTH.current) / 2;
				}
			} else if (overflow.current.isOverBottom && !overflow.current.isOverTop) {
				position.top = window.innerHeight - ((containerNode.height + ARROW_WIDTH.current) / 2) - KEEPOUT.current;
			} else if (!overflow.current.isOverBottom && overflow.current.isOverTop) {
				position.top = ((containerNode.height - ARROW_WIDTH.current) / 2) + KEEPOUT.current;
			} else if (anchor === 'top') {
				position.top = clientNode.top + (containerNode.height - ARROW_WIDTH.current) / 2;
			} else if (anchor === 'bottom') {
				position.top = clientNode.bottom - containerNode.height + (containerNode.height - ARROW_WIDTH.current) / 2;
			} else {
				position.top = clientNode.top + (clientNode.height - ARROW_WIDTH.current) / 2;
			}

			switch (direction) {
				case 'above':
					position.top = clientNode.top - ARROW_WIDTH.current - MARGIN.current;
					break;
				case 'below':
					position.top = clientNode.bottom + MARGIN.current;
					break;
				case 'left':
					position.left = rtl ? clientNode.left + clientNode.width + MARGIN.current : clientNode.left - ARROW_WIDTH.current - MARGIN.current;
					break;
				case 'right':
					position.left = rtl ? clientNode.left - ARROW_WIDTH.current - MARGIN.current : clientNode.left + clientNode.width + MARGIN.current;
					break;
				default:
					return {};
			}

			return adjustRTL(position);
		};

		const centerContainerPosition = (containerNode, clientNode) => { // eslint-disable-line no-shadow
			const pos = {};
			const {anchor, direction} = getContainerAdjustedPosition(); // eslint-disable-line no-shadow

			if (direction === 'above' || direction === 'below') {
				if (overflow.current.isOverLeft) {
					// anchor to the left of the screen
					pos.left = KEEPOUT.current;
				} else if (overflow.current.isOverRight) {
					// anchor to the right of the screen
					pos.left = window.innerWidth - containerNode.width - KEEPOUT.current;
				} else if (anchor) {
					if (anchor === 'center') {
						// center horizontally
						pos.left = clientNode.left + (clientNode.width - containerNode.width) / 2;
					} else if (anchor === 'left') {
						// anchor to the left side of the activator
						pos.left = clientNode.left;
					} else {
						// anchor to the right side of the activator
						pos.left = clientNode.right - containerNode.width;
					}
				} else {
					// anchor to the left side of the activator, matching its width
					pos.left = clientNode.left;
					pos.width = clientNode.width;
				}

			} else if (direction === 'left' || direction === 'right') {
				if (overflow.current.isOverTop) {
					// anchor to the top of the screen
					pos.top = KEEPOUT.current;
				} else if (overflow.current.isOverBottom) {
					// anchor to the bottom of the screen
					pos.top = window.innerHeight - containerNode.height - KEEPOUT.current;
				} else if (anchor === 'middle') {
					// center vertically
					pos.top = clientNode.top - (containerNode.height - clientNode.height) / 2;
				} else if (anchor === 'top') {
					// anchor to the top of the activator
					pos.top = clientNode.top;
				} else {
					// anchor to the bottom of the activator
					pos.top = clientNode.bottom - containerNode.height;
				}
			}

			return pos;
		};

		const getContainerPosition = (containerNode, clientNode) => { // eslint-disable-line no-shadow
			const position = centerContainerPosition(containerNode, clientNode);
			const {direction} = getContainerAdjustedPosition(); // eslint-disable-line no-shadow

			switch (direction) {
				case 'above':
					position.top = clientNode.top - ARROW_OFFSET.current - containerNode.height - MARGIN.current;
					break;
				case 'below':
					position.top = clientNode.bottom + ARROW_OFFSET.current + MARGIN.current;
					break;
				case 'right':
					position.left = rtl ? clientNode.left - containerNode.width - ARROW_OFFSET.current - MARGIN.current : clientNode.right + ARROW_OFFSET.current + MARGIN.current;
					break;
				case 'left':
					position.left = rtl ? clientNode.right + ARROW_OFFSET.current + MARGIN.current : clientNode.left - containerNode.width - ARROW_OFFSET.current - MARGIN.current;
					break;
			}

			return adjustRTL(position);
		};

		/**
		 * Position the popup in relation to the activator.
		 *
		 * Position is based on the dimensions of the popup and its activator. If the popup does not
		 * fit in the specified direction, it will automatically flip to the opposite direction.
		 *
		 * @method
		 * @memberof sandstone/ContextualPopupDecorator.ContextualPopupDecorator.prototype
		 * @public
		 * @returns {undefined}
		 */
		const positionContextualPopup = useCallback(() => {
			if (containerNode.current && clientSiblingRef?.current) {
				const containerNodeRect = containerNode.current.getBoundingClientRect();
				const {top, left, bottom, right, width, height} = clientSiblingRef.current.getBoundingClientRect();
				const clientNode = {top, left, bottom, right, width, height};

				clientNode.left = rtl ? window.innerWidth - right : left;
				clientNode.right = rtl ? window.innerWidth - left : right;

				calcOverflow(containerNodeRect, clientNode);
				adjustDirection();

				const arrowPosition = getArrowPosition(containerNodeRect, clientNode),
					containerPosition = getContainerPosition(containerNodeRect, clientNode);

				if ((state.direction !== adjustedDirection.current) ||
					(state.arrowPosition.left !== arrowPosition.left) ||
					(state.arrowPosition.top !== arrowPosition.top) ||
					(state.containerPosition.left !== containerPosition.left) ||
					(state.containerPosition.right !== containerPosition.right) ||
					(state.containerPosition.top !== containerPosition.top)
				) {
					setState({
						direction: adjustedDirection.current,
						arrowPosition,
						containerPosition
					});
				}
			}
		}, [rtl, state]); // eslint-disable-line react-hooks/exhaustive-deps

		// LIFECYCLE METHODS
		// componentDidMount() and componentWillUnmount()
		useEffect(() => {
			if (open) {
				on('keydown', handleKeyDown);
				on('keyup', handleKeyUp);
			}

			if (typeof ResizeObserver === 'function') {
				resizeObserver.current = new ResizeObserver(() => {
					positionContextualPopup();
				});
			}

			if (typeof MutationObserver === 'function') {
				mutationObserver.current = new MutationObserver(() => {
					positionContextualPopup();
				});
			}

			return () => {
				if (open) {
					off('keydown', handleKeyDown);
					off('keyup', handleKeyUp);
				}
				Spotlight.remove(state.containerId);

				if (resizeObserver) {
					resizeObserver.current.disconnect();
					resizeObserver.current = null;
				}

				if (mutationObserver) {
					mutationObserver.current.disconnect();
					mutationObserver.current = null;
				}
			};
		}, []); // eslint-disable-line react-hooks/exhaustive-deps

		const getContainerNodeWidth = () => {
			return containerNode.current && containerNode.current.getBoundingClientRect().width || 0;
		};

		const spotActivator = (activator) => {
			if (!Spotlight.getPointerMode() && activator && activator === Spotlight.getCurrent()) {
				activator.blur();
			}
			if (!Spotlight.focus(activator)) {
				Spotlight.focus();
			}
		};

		// getSnapshotBeforeUpdate and componentDidUpdate
		const prevPropsRef = useRef({direction, open});
		const prevStateRef = useRef(state);
		useEffect(() => {
			const snapshot = {
				containerWidth: getContainerNodeWidth()
			};

			const prevProps = prevPropsRef.current;
			const prevState = prevStateRef.current;
			if (prevProps.open && !open) {
				const current = Spotlight.getCurrent();
				snapshot.shouldSpotActivator = (
					// isn't set
					!current ||
					// is on the activator, and we want to re-spot it so a11y read out can occur
					current === prevState.activator ||
					// is within the popup
					containerNode?.current.contains(current)
				);
			}

			if (prevProps.direction !== direction ||
				snapshot.containerWidth !== getContainerNodeWidth() ||
				(prevProps.open && open)) {
				adjustedDirection.current = direction;
				// NOTE: `setState` is called and will cause re-render
				positionContextualPopup();
			}

			if (open && !prevProps.open) {
				on('keydown', handleKeyDown);
				on('keyup', handleKeyUp);
			} else if (!open && prevProps.open) {
				off('keydown', handleKeyDown);
				off('keyup', handleKeyUp);
				if (snapshot && snapshot.shouldSpotActivator) {
					spotActivator(prevState.activator);
				}
			}
		}, [direction, handleKeyDown, handleKeyUp, open, positionContextualPopup]);

		const updateLeaveFor = useCallback((activator) => {
			Spotlight.set(state.containerId, {
				leaveFor: {
					up: activator,
					down: activator,
					left: activator,
					right: activator
				}
			});
		}, [state]);

		const handleClose = useCallback(() => {
			updateLeaveFor(null);
			setState({
				activator: null
			});
		}, [updateLeaveFor]);

		const handleDismiss = useCallback(() => {
			forwardCustom('onClose')(null, props);
		}, [props]);

		const handleOpen = useCallback((ev) => {
			forward('onOpen', ev, props);
			positionContextualPopup();
			const current = Spotlight.getCurrent();
			updateLeaveFor(current);
			setState({
				activator: current
			});
			spotPopupContent();
		}, [positionContextualPopup, props, spotPopupContent, updateLeaveFor]);

		// handle key event from contextual popup and closes the popup
		const handleContainerKeyDown = useCallback((ev) => {
			// Note: Container will be only rendered if `open`ed, therefore no need to check for `open`
			const direction = getDirection(ev.keyCode); // eslint-disable-line no-shadow

			if (!direction) return;

			handleDirectionalKey(ev);

			// if focus moves outside the popup's container, issue the `onClose` event
			if (Spotlight.move(direction) && !containerNode?.current.contains(Spotlight.getCurrent())) {
				forwardCustom('onClose')(null, props);
			}
		}, [props]);

		// render method
		const idFloatLayer = `${id}_floatLayer`;

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
							containerRef={getContainerNode} // eslint-disable-line react/jsx-no-bind
							data-webos-voice-exclusive={dataWebosVoiceExclusive}
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
		);
	};

	_ContextualPopupDecorator.displayName = 'ContextualPopupDecorator';

	_ContextualPopupDecorator.propTypes = /** @lends sandstone/ContextualPopupDecorator.ContextualPopupDecorator.prototype */ {
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

	return _ContextualPopupDecorator;
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
