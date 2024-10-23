/**
 * Modal component that appears at the bottom of the screen and takes up the full screen width.
 *
 * @example
 * <Popup open>Hello!</Popup>
 *
 * @module sandstone/Popup
 * @exports Popup
 * @exports PopupBase
 */

import {is} from '@enact/core/keymap';
import {on, off} from '@enact/core/dispatcher';
import {setDefaultProps} from '@enact/core/util';
import FloatingLayer from '@enact/ui/FloatingLayer';
import kind from '@enact/core/kind';
import {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Spotlight, {getDirection} from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {getLastContainer} from '@enact/spotlight/src/container';
import Transition from '@enact/ui/Transition';
import {forward, forwardCustom} from '@enact/core/handle';
import warning from 'warning';

import Skinnable from '../Skinnable';

import componentCss from './Popup.module.less';

const isDown = is('down');
const isLeft = is('left');
const isRight = is('right');
const isUp = is('up');
const TransitionContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	Transition
);

const getContainerNode = (containerId) => {
	return document.querySelector(`[data-spotlight-id='${containerId}']`);
};

const forwardHide = forward('onHide');
const forwardShow = forward('onShow');

const transitionDirection = {
	bottom: 'down',
	center: 'down',
	fullscreen: 'down',
	left: 'left',
	right: 'right',
	top: 'up'
};

/**
 * The base popup component.
 *
 * @class PopupBase
 * @memberof sandstone/Popup
 * @ui
 * @public
 */
const PopupBase = kind({
	name: 'PopupBase',

	propTypes: /** @lends sandstone/Popup.PopupBase.prototype */ {
		/**
		 * The contents to be displayed in the body of the popup.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Set the priority with which screen reader should treat updates to live regions for the Popup.
		 *
		 * @type {String|Object}
		 * @public
		 */
		'aria-live': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `popup` - The root class name
		 * * `body` - Applied to the body content container
		 * * `popupTransitionContainer` - Applied to the Popup's outermost container. Sizing can be
		 *                                applied here for percentage-of-screen values.
		 * * `top` - Applied when the `position` is 'top'
		 * * `right` - Applied when the `position` is 'right'
		 * * `bottom` - Applied when the `position` is 'bottom'
		 * * `left` - Applied when the `position` is 'left'
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Support accessibility options.
		 *
		 * If true, the aria-live and role in Popup are `null`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		noAlertRole: PropTypes.bool,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Disables the outline in high contrast mode.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		noOutline: PropTypes.bool,

		/**
		 * Called after the popup's "hide" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Called after the popup's "show" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onShow: PropTypes.func,

		/**
		 * Controls the visibility of the Popup.
		 *
		 * By default, the Popup and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Position of the Popup on the screen.
		 *
		 * @type {('bottom'|'center'|'fullscreen'|'left'|'right'|'top')}
		 * @default 'bottom'
		 * @public
		 */
		position: PropTypes.oneOf(['bottom', 'center', 'fullscreen', 'left', 'right', 'top']),

		/**
		 * The ARIA role for the Popup.
		 *
		 * @type {String|Object}
		 * @public
		 */
		role: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),

		/**
		 * The container id for {@link spotlight/SpotlightContainerDecorator/#SpotlightContainerDecorator.spotlightId|Spotlight container}.
		 *
		 * @type {String}
		 * @default null
		 * @public
		 */
		spotlightId: PropTypes.string,

		/**
		 * Restricts or prioritizes navigation when focus attempts to leave the popup.
		 *
		 * It can be either `'none'`, `'self-first'`, or `'self-only'`.
		 *
		 * Note: The ready-to-use {@link sandstone/Popup.Popup|Popup} component only supports
		 * `'self-first'` and `'self-only'`.
		 *
		 * @type {('none'|'self-first'|'self-only')}
		 * @default 'self-only'
		 * @public
		 */
		spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
	},

	defaultProps: {
		noAlertRole: false,
		noAnimation: false,
		open: false,
		position: 'bottom',
		spotlightRestrict: 'self-only'
	},

	styles: {
		css: componentCss,
		className: 'popup',
		publicClassNames: ['popup', 'body', 'popupTransitionContainer', 'top', 'right', 'bottom', 'left']
	},

	computed: {
		// When passing `aria-live` prop to the Popup, the prop should work first.
		// If `noAlertRole` is true, alert role and aria-live will be removed. Contents of the popup won't be read automatically when opened.
		// Otherwise, `aria-live` will be usually `off`.
		'aria-live': ({'aria-live': live, noAlertRole}) => ((typeof live !== 'undefined') ? live : (!noAlertRole && 'off' || null)),
		className: ({noOutline, position, styler}) => styler.append(position, position === 'fullscreen' || noOutline ? null : componentCss.outline),
		direction: ({position}) => transitionDirection[position],
		// When passing `role` prop to the Popup, the prop should work first.
		// If `noAlertRole` is true, alert role and aria-live will be removed. Contents of the popup won't be read automatically when opened.
		// Otherwise, `role` will be usually `alert`.
		role: ({noAlertRole, role}) => ((typeof role !== 'undefined') ? role : (!noAlertRole && 'alert' || null)),
		transitionContainerClassName: ({css, position, styler}) => styler.join(css.popupTransitionContainer, position)
	},

	render: ({children, css, direction, noAnimation, onHide, onShow, open, position, spotlightId, spotlightRestrict, transitionContainerClassName, ...rest}) => {
		delete rest.noAlertRole;
		delete rest.noOutline;

		return (
			<TransitionContainer
				className={transitionContainerClassName}
				css={css}
				direction={direction}
				duration="short"
				noAnimation={position === 'fullscreen' ? true : noAnimation}
				onHide={onHide}
				onShow={onShow}
				spotlightDisabled={!open}
				spotlightId={spotlightId}
				spotlightRestrict={spotlightRestrict}
				type="slide"
				visible={open}
			>
				<div {...rest}>
					<div className={css.body}>
						{children}
					</div>
				</div>
			</TransitionContainer>
		);
	}
});

const SkinnedPopupBase = Skinnable(
	PopupBase
);

// Deprecate using scrimType 'none' with spotlightRestrict of 'self-only'
const checkScrimNone = (props) => {
	const validScrim = !(props.scrimType === 'none' && props.spotlightRestrict === 'self-only');
	warning(validScrim, "Using 'spotlightRestrict' of 'self-only' without a scrim " +
		'is not supported. Use a transparent scrim to prevent spotlight focus outside of the popup');
};

const OpenState = {
	CLOSED: 0,
	OPENING: 1,
	OPEN: 2
};

const popupDefaultProps = {
	noAnimation: false,
	noAutoDismiss: false,
	open: false,
	position: 'bottom',
	scrimType: 'translucent',
	spotlightRestrict: 'self-only'
};

/**
 * A stateful component that renders a popup in a
 * {@link ui/FloatingLayer.FloatingLayer|FloatingLayer}.
 *
 * @class Popup
 * @memberof sandstone/Popup
 * @extends sandstone/Popup.PopupBase
 * @ui
 * @public
 */
const Popup = (props) => {
	const allComponentProps = setDefaultProps(props, popupDefaultProps);
	const {noAnimation, open, position, spotlightRestrict} = allComponentProps;
	const {noAutoDismiss, no5WayClose, onClose, scrimType, ...rest} = allComponentProps;

	const [activator, setActivator] = useState(null);
	const [containerId, setContainerId] = useState(Spotlight.add());
	const [floatLayerOpen, setFloatLayerOpen] = useState(open);
	const [paused, setPaused] = useState(new Pause('Popup'));
	const [popupOpen, setPopupOpen] = useState(open ? OpenState.OPEN : OpenState.CLOSED);
	const [prevOpen, setPrevOpen] = useState(open);

	const componentMounted = useRef(false);

	const handleKeyDown = (ev) => {
		if (no5WayClose) return;

		const keyCode = ev.keyCode;
		const direction = getDirection(keyCode);
		const spottables = Spotlight.getSpottableDescendants(containerId).length;
		const current = Spotlight.getCurrent();

		if (direction && (!spottables || current && getContainerNode(containerId).contains(current))) {
			// explicitly restrict navigation in order to manage focus state when attempting to leave the popup
			Spotlight.set(containerId, {restrict: 'self-only'});

			if (onClose) {
				let focusChanged;

				if (spottables && current && spotlightRestrict !== 'self-only') {
					focusChanged = Spotlight.move(direction);

					if (focusChanged) {
						// stop propagation to prevent default spotlight behavior
						ev.stopPropagation();
					}
				}

				if (!spottables || (focusChanged === false && (
					position === 'center' ||
					isUp(keyCode) && position === 'bottom' ||
					isDown(keyCode) && position === 'top' ||
					isRight(keyCode) && position === 'left' ||
					isLeft(keyCode) && position === 'right'
				))) {
					// prevent default page scrolling
					ev.preventDefault();
					// stop propagation to prevent default spotlight behavior
					ev.stopPropagation();
					// set the pointer mode to false on keydown
					Spotlight.setPointerMode(false);
					forwardCustom('onClose')(null, allComponentProps);
				}
			}
		}
	};

	const handleKeyDownRef = useRef(handleKeyDown);

	const spotActivator = useCallback(() => {
		paused.resume();

		// only spot the activator if the popup is closed
		if (open) return;

		const current = Spotlight.getCurrent();
		const containerNode = getContainerNode(containerId);
		const lastContainerId = getLastContainer();

		off('keydown', handleKeyDownRef.current);

		// if there is no currently-spotted control or it is wrapped by the popup's container, we
		// know it's safe to change focus
		if (!current || (containerNode && containerNode.contains(current))) {
			// attempt to set focus to the activator, if available
			if (!Spotlight.isPaused()) {
				if (activator) {
					if (!Spotlight.focus(activator)) {
						Spotlight.focus();
					}
				} else {
					Spotlight.disableSelector(lastContainerId);
					Spotlight.focus();
					Spotlight.enableSelector(lastContainerId);
				}
			}
		}
	}, [activator, containerId, open, paused]);

	const spotPopupContent = useCallback(() => {
		paused.resume();

		// only spot the activator if the popup is open
		if (!open) return;

		on('keydown', handleKeyDownRef.current);

		console.log(getContainerNode(containerId));

		if (!Spotlight.isPaused() && !Spotlight.focus(containerId)) {
			const current = Spotlight.getCurrent();

			// In cases where the container contains no spottable controls or we're in pointer-mode, focus
			// cannot inherently set the active container or blur the active control, so we must do that
			// here.
			if (current) {
				current.blur();
			}
			Spotlight.setActiveContainer(containerId);
		}
	}, [containerId, open, paused]);

	const getDerivedStateFromProps = useCallback(() => {
		if (open !== prevOpen) {
			if (open) {
				setPopupOpen(noAnimation || floatLayerOpen ? OpenState.OPEN : OpenState.CLOSED);
				setFloatLayerOpen(true);
				setActivator(Spotlight.getCurrent());
				setPrevOpen(open);
			} else {
				// Disables the spotlight conatiner of popup when `noAnimation` set
				if (noAnimation) {
					const node = getContainerNode(containerId);
					if (node) {
						node.dataset['spotlightContainerDisabled'] = true;
					}
				}

				setPopupOpen(OpenState.CLOSED);
				setFloatLayerOpen(popupOpen === OpenState.OPEN ? !noAnimation : false);
				setActivator(noAnimation ? null : activator);
				setPrevOpen(open);
			}
		}
	}, [activator, containerId, floatLayerOpen, noAnimation, open, popupOpen, prevOpen]);

	const handleComponentUpdate = useCallback(() => {
		if (open !== prevOpen) {
			if (!noAnimation) {
				if (!open && popupOpen === OpenState.OPENING || !open && popupOpen === OpenState.OPEN) {
					// If the popup is supposed to be closed (!this.props.open) and is actually
					// fully closed (OpenState.CLOSED), we must resume spotlight navigation. This
					// can occur when quickly toggling a Popup open and closed.
					paused.resume();
				} else {
					// Otherwise, we pause spotlight so it is locked until the popup is ready
					paused.pause();
				}
			} else if (open) {
				forwardShow(null, allComponentProps);
				spotPopupContent();
			} else if (prevOpen) {
				forwardHide(null, allComponentProps);
				spotActivator();
			}
		}

		checkScrimNone(allComponentProps);
	}, [allComponentProps, noAnimation, open, paused, popupOpen, prevOpen, spotActivator, spotPopupContent]);

	const handleDismiss = useCallback((ev) => {
		forwardCustom('onClose', () => ({detail: ev?.detail}))(null, allComponentProps);
	}, [allComponentProps]);

	const handleFloatingLayerOpen = useCallback(() => {
		if (!noAnimation && popupOpen !== OpenState.OPEN) {
			setPopupOpen(OpenState.OPENING);
		} else if (popupOpen === OpenState.OPEN && open) {
			spotPopupContent();
		}
	}, [noAnimation, open, popupOpen, spotPopupContent]);

	const handlePopupHide = useCallback((ev) => {
		forwardHide(ev, allComponentProps);

		setFloatLayerOpen(false);
		setActivator(null);

		if (!ev.currentTarget || ev.currentTarget.getAttribute('data-spotlight-id') === containerId) {
			spotActivator();
		}
	}, [allComponentProps, containerId, spotActivator]);

	const handlePopupShow = useCallback((ev) => {
		forwardShow(ev, allComponentProps);

		setPopupOpen(OpenState.OPEN);

		if (!ev.currentTarget || ev.currentTarget.getAttribute('data-spotlight-id') === containerId) {
			spotPopupContent();
		}
	}, [allComponentProps, containerId, spotPopupContent]);

	useEffect(() => {
		componentMounted.current = true;
		setContainerId(Spotlight.add());
		setPaused(new Pause('Popup'));

		return () => {
			componentMounted.current = false;
		};
	}, []);

	// Spot the content after it's mounted.
	useEffect(() => {
		if (open && prevOpen) {
			// If the popup is open on mount, we need to pause spotlight so nothing steals focus
			// while the popup is rendering.
			paused.pause();
			if (getContainerNode(containerId)) {
				spotPopupContent();
			}
		}
	}, [containerId, open, paused, prevOpen, spotPopupContent]);

	useEffect(() => {
		getDerivedStateFromProps();
		handleComponentUpdate();
	}, [getDerivedStateFromProps, handleComponentUpdate]);

	useEffect(() => {
		checkScrimNone(allComponentProps);
	}, [allComponentProps]);

	useEffect(() => {
		const keyDownRef = handleKeyDownRef.current;

		return () => {
			if (componentMounted.current === false) {
				if (open) {
					off('keydown', keyDownRef);
				}
				Spotlight.remove(containerId);
			}
		};
	}, [open, containerId]);

	return (
		<FloatingLayer
			noAutoDismiss={noAutoDismiss}
			open={floatLayerOpen}
			onOpen={handleFloatingLayerOpen}
			onDismiss={handleDismiss}
			scrimType={scrimType}
		>
			<SkinnedPopupBase
				{...rest}
				data-webos-voice-exclusive
				onHide={handlePopupHide}
				onShow={handlePopupShow}
				open={popupOpen >= OpenState.OPENING}
				spotlightId={containerId}
			/>
		</FloatingLayer>
	);
};

Popup.displayName = "Popup";
Popup.propTypes = /** @lends sandstone/Popup.Popup.prototype */ {
	/**
	 * Prevents closing the popup via 5-way navigation out of the content.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	no5WayClose: PropTypes.bool,

	/**
	 * Disables transition animation.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noAnimation: PropTypes.bool,

	/**
	 * Indicates that the popup will not trigger `onClose` when the user presses the cancel/back (e.g. `ESC`) key or
	 * taps outside of the popup.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noAutoDismiss: PropTypes.bool,

	/**
	 * Called on:
	 *
	 * * pressing `ESC` key,
	 * * clicking on outside the boundary of the popup, or
	 * * moving spotlight focus outside the boundary of the popup when `spotlightRestrict` is
	 *   `'self-first'`.
	 *
	 * Event payload:
	 *
	 * * pressing `ESC` key, carries `detail` property containing `inputType` value of `'key'`.
	 * * clicking outside the boundary of the popup, carries `detail` property containing
	 *   `inputType` value of `'click'`.
	 *
	 * It is the responsibility of the callback to set the `open` property to `false`.
	 *
	 * @type {Function}
	 * @public
	 */
	onClose: PropTypes.func,

	/**
	 * Called after hide transition has completed, and immediately with no transition.
	 *
	 * @type {Function}
	 * @public
	 */
	onHide: PropTypes.func,

	/**
	 * Called when a key is pressed.
	 *
	 * @type {Function}
	 * @public
	 */
	onKeyDown: PropTypes.func,

	/**
	 * Called after show transition has completed, and immediately with no transition.
	 *
	 * Note: The function does not run if Popup is initially opened and
	 * {@link sandstone/Popup.PopupBase.noAnimation|noAnimation} is `true`.
	 *
	 * @type {Function}
	 * @public
	 */
	onShow: PropTypes.func,

	/**
	 * Controls the visibility of the Popup.
	 *
	 * By default, the Popup and its contents are not rendered until `open`.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	open: PropTypes.bool,

	/**
	 * Position of the Popup on the screen.
	 *
	 * @type {('bottom'|'center'|'fullscreen'|'left'|'right'|'top')}
	 * @default 'bottom'
	 * @public
	 */
	position: PropTypes.oneOf(['bottom', 'center', 'fullscreen', 'left', 'right', 'top']),

	/**
	 * Scrim type.
	 *
	 * * Values: `'transparent'`, `'translucent'`, or `'none'`.
	 *
	 * `'none'` is not compatible with `spotlightRestrict` of `'self-only'`, use a transparent scrim
	 * to prevent mouse focus when using popup.
	 *
	 * @type {('transparent'|'translucent'|'none')}
	 * @default 'translucent'
	 * @public
	 */
	scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),

	/**
	 * Restricts or prioritizes navigation when focus attempts to leave the popup.
	 *
	 * * Values: `'self-first'`, or `'self-only'`.
	 *
	 * When using `self-first`, attempts to leave the popup via 5-way will fire `onClose` based
	 * on the following values of `position`:
	 *
	 * * `'bottom'` - When leaving via 5-way up
	 * * `'top'` - When leaving via 5-way down
	 * * `'left'` - When leaving via 5-way right
	 * * `'right'` - When leaving via 5-way left
	 * * `'center'` - When leaving via any 5-way direction
	 *
	 * Note: If `onClose` is not set, then this has no effect on 5-way navigation. If the popup
	 * has no spottable children, 5-way navigation will cause the Popup to fire `onClose`.
	 *
	 * @type {('self-first'|'self-only')}
	 * @default 'self-only'
	 * @public
	 */
	spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only'])
};
Popup.defaultPropValues = popupDefaultProps;

export default Popup;
export {Popup, PopupBase};
