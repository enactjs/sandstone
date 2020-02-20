/**
 * Provides Sandstone-themed scrollable components and behaviors.
 *
 * @module sandstone/Scrollable
 * @exports Scrollable
 * @private
 */

import {forward} from '@enact/core/handle';
import platform from '@enact/core/platform';
import Spotlight from '@enact/spotlight';
import {spottableClass} from '@enact/spotlight/Spottable';
import {getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {getRect, intersects} from '@enact/spotlight/src/utils';
import {useScrollBase} from '@enact/ui/Scrollable';
import {useScrollContentHandle} from '@enact/ui/Scrollable/useScrollContentHandle';
import {assignPropertiesOf} from '@enact/ui/Scrollable';
import utilDOM from '@enact/ui/Scrollable/utilDOM';
import utilEvent from '@enact/ui/Scrollable/utilEvent';
import PropTypes from 'prop-types';
import React, {Component, useContext, useRef} from 'react';

import {SharedState} from '../internal/SharedStateDecorator';

import {useThemeScrollContentHandle} from './useThemeScrollContentHandle';
import {
	useEventFocus, useEventKey, useEventMonitor, useEventMouse,
	useEventTouch, useEventVoice, useEventWheel
} from './useEvent';
import useOverscrollEffect from './useOverscrollEffect';
import useScrollbar from './useScrollbar';
import {useSpotlightRestore} from './useSpotlight';

import overscrollCss from './OverscrollEffect.module.less';
import css from './Scrollable.module.less';

const
	reverseDirections = {
		down: 'up',
		up: 'down'
	};

/**
 * The name of a custom attribute which indicates the index of an item in
 * [VirtualList]{@link sandstone/VirtualList.VirtualList} or
 * [VirtualGridList]{@link sandstone/VirtualList.VirtualGridList}.
 *
 * @constant dataIndexAttribute
 * @memberof sandstone/Scrollable
 * @type {String}
 * @private
 */
const dataIndexAttribute = 'data-index';

const isIntersecting = (elem, container) => elem && intersects(getRect(container), getRect(elem));
const getIntersectingElement = (elem, container) => isIntersecting(elem, container) && elem;
const getTargetInViewByDirectionFromPosition = (direction, position, container) => {
	const target = getTargetByDirectionFromPosition(direction, position, Spotlight.getActiveContainer());
	return getIntersectingElement(target, container);
};

/**
 * A Sandstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class ScrollableBase
 * @memberof sandstone/Scrollable
 * @extends ui/Scrollable.ScrollableBase
 * @ui
 * @public
 */
class ScrollableBase extends Component { // ScrollableBase is now only used in storybook.
	static displayName = 'Scrollable'

	static propTypes = /** @lends sandstone/Scrollable.Scrollable.prototype */ {
		/**
		 * Render function.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		childRenderer: PropTypes.func.isRequired,

		/**
		 * This is set to `true` by SpotlightContainerDecorator
		 *
		 * @type {Boolean}
		 * @private
		 */
		'data-spotlight-container': PropTypes.bool,

		/**
		 * `false` if the content of the list or the scroller could get focus
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		'data-spotlight-container-disabled': PropTypes.bool,

		/**
		 * This is passed onto the wrapped component to allow
		 * it to customize the spotlight container for its use case.
		 *
		 * @type {String}
		 * @private
		 */
		'data-spotlight-id': PropTypes.string,

		/**
		 * Direction of the list or the scroller.
		 * `'both'` could be only used for[Scroller]{@link sandstone/Scroller.Scroller}.
		 *
		 * Valid values are:
		 * * `'both'`,
		 * * `'horizontal'`, and
		 * * `'vertical'`.
		 *
		 * @type {String}
		 * @private
		 */
		direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

		/**
		 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
		 * not move focus to the scrollbar controls.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		focusableScrollbar: PropTypes.bool,

		/**
		 * A unique identifier for the scrollable component.
		 *
		 * When specified and when the scrollable is within a SharedStateDecorator, the scroll
		 * position will be shared and restored on mount if the component is destroyed and
		 * recreated.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Specifies overscroll effects shows on which type of inputs.
		 *
		 * @type {Object}
		 * @default {
		 *	arrowKey: false,
		 *	drag: false,
		 *	pageKey: false,
		 *	wheel: true
		 * }
		 * @private
		 */
		overscrollEffectOn: PropTypes.shape({
			arrowKey: PropTypes.bool,
			drag: PropTypes.bool,
			pageKey: PropTypes.bool,
			wheel: PropTypes.bool
		}),

		/*
		 * TBD
		 */
		type: PropTypes.string
	}

	static defaultProps = {
		'data-spotlight-container-disabled': false,
		focusableScrollbar: false,
		overscrollEffectOn: {
			arrowKey: false,
			drag: false,
			pageKey: false,
			wheel: true
		},
		type: 'JS'
	}
}

const useThemeScroll = (props, instances, context) => {
	const {themeScrollContentHandle, scrollContentRef, scrollContainerHandle, scrollContainerRef} = instances;
	const {type} = context;
	const contextSharedState = useContext(SharedState);

	// Mutable value

	const mutableRef = useRef({
		animateOnFocus: false,
		indexToFocus: null,
		lastScrollPositionOnFocus: null,
		nodeToFocus: null,
		pointToFocus: null
	});

	// Hooks

	const {
		alertThumb,
		scrollbarProps
	} = useScrollbar(props, instances, {isContent});

	useSpotlightRestore(props, instances);

	const {
		applyOverscrollEffect,
		checkAndApplyOverscrollEffectByDirection,
		clearOverscrollEffect
	} = useOverscrollEffect({}, instances);

	const {handleWheel, isWheeling} = useEventWheel(props, instances, {type});

	const {calculateAndScrollTo, handleFocus, hasFocus} = useEventFocus(props, {...instances, spottable: mutableRef}, {alertThumb, isWheeling, type});

	const {handleKeyDown, lastPointer, scrollByPageOnPointerMode} = useEventKey(props, {...instances, spottable: mutableRef}, {checkAndApplyOverscrollEffectByDirection, hasFocus, isContent, type});

	useEventMonitor({}, instances, {lastPointer, scrollByPageOnPointerMode});

	const {handleFlick, handleMouseDown} = useEventMouse({}, instances, {type});

	const {handleTouchStart} = useEventTouch();

	const {
		addVoiceEventListener,
		removeVoiceEventListener,
		stopVoice
	} = useEventVoice(props, instances);

	// Functions

	function isContent (element) {
		return (element && utilDOM.containsDangerously(scrollContentRef, element));
	}

	function scrollTo (opt) {
		mutableRef.current.indexToFocus = (opt.focus && typeof opt.index === 'number') ? opt.index : null;
		mutableRef.current.nodeToFocus = (opt.focus && opt.node instanceof Object && opt.node.nodeType === 1) ? opt.node : null;
	}

	function start (animate) {
		if (type === 'Native' && !animate) {
			focusOnItem();
		}
	}

	function stop () {
		if (!props['data-spotlight-container-disabled']) {
			themeScrollContentHandle.current.setContainerDisabled(false);
		}

		focusOnItem();
		mutableRef.current.lastScrollPositionOnFocus = null;
		mutableRef.current.isWheeling = false;
		stopVoice();
	}

	function scrollStopOnScroll () {
		stop();
	}

	function focusOnItem () {
		if (mutableRef.current.indexToFocus !== null && typeof themeScrollContentHandle.current.focusByIndex === 'function') {
			themeScrollContentHandle.current.focusByIndex(mutableRef.current.indexToFocus);
			mutableRef.current.indexToFocus = null;
		}

		if (mutableRef.current.nodeToFocus !== null && typeof themeScrollContentHandle.current.focusOnNode === 'function') {
			themeScrollContentHandle.current.focusOnNode(mutableRef.current.nodeToFocus);
			mutableRef.current.nodeToFocus = null;
		}

		if (mutableRef.current.pointToFocus !== null) {
			// no need to focus on pointer mode
			if (!Spotlight.getPointerMode()) {
				const
					{direction, x, y} = mutableRef.current.pointToFocus,
					position = {x, y},
					elemFromPoint = document.elementFromPoint(x, y),
					target =
						elemFromPoint && elemFromPoint.closest && getIntersectingElement(elemFromPoint.closest(`.${spottableClass}`), scrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(direction, position, scrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(reverseDirections[direction], position, scrollContainerRef.current);

				if (target) {
					Spotlight.focus(target);
				}
			}

			mutableRef.current.pointToFocus = null;
		}
	}

	function handleScroll (ev) {
		const
			{scrollLeft: x, scrollTop: y} = ev,
			{id} = props;

		forward('onScroll', ev, props);

		if (id && contextSharedState && contextSharedState.set) {
			contextSharedState.set(ev, props);
			contextSharedState.set(`${id}.scrollPosition`, {x, y});
		}
	}

	// Callback for scroller updates; calculate and, if needed, scroll to new position based on focused item.
	function handleScrollerUpdate () {
		if (scrollContainerHandle.current.scrollToInfo === null) {
			const scrollHeight = scrollContainerHandle.current.getScrollBounds().scrollHeight;

			if (scrollHeight !== scrollContainerHandle.current.bounds.scrollHeight) {
				calculateAndScrollTo();
			}
		}

		// oddly, Scroller manages scrollContainerHandle.current.bounds so if we don't update it here (it is also
		// updated in calculateAndScrollTo but we might not have made it to that point), it will be
		// out of date when we land back in this method next time.
		scrollContainerHandle.current.bounds.scrollHeight = scrollContainerHandle.current.getScrollBounds().scrollHeight;
	}

	function handleResizeWindow () {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function addEventListeners (ref) { // `ref` is always `scrollContentRef`.
		utilEvent('focusin').addEventListener(ref, handleFocus);

		if (ref.current) {
			addVoiceEventListener(ref);
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function removeEventListeners (ref) { // `ref` is always `scrollContentRef`.
		utilEvent('focusin').removeEventListener(ref, handleFocus);

		if (ref.current) {
			removeVoiceEventListener(ref);
		}
	}

	// Return

	return {
		addEventListeners,
		applyOverscrollEffect,
		clearOverscrollEffect,
		handleFlick,
		handleKeyDown,
		handleMouseDown,
		handleResizeWindow,
		handleScroll,
		handleScrollerUpdate,
		handleTouchStart,
		handleWheel,
		removeEventListeners,
		scrollbarProps,
		scrollStopOnScroll,
		scrollTo,
		start,
		stop
	};
};

const useScroll = (props) => {
	const
		{
			'data-spotlight-container': spotlightContainer,
			'data-spotlight-container-disabled': spotlightContainerDisabled,
			'data-spotlight-id': spotlightId,
			focusableScrollbar,
			type,
			...rest
		} = props;

	// Mutable value

	const scrollContainerRef = useRef();
	const scrollContentRef = useRef();

	const overscrollRefs = {
		horizontal: React.useRef(),
		vertical: React.useRef()
	};

	const horizontalScrollbarRef = useRef();
	const verticalScrollbarRef = useRef();

	// Adapters

	const [themeScrollContentHandle, setThemeScrollContentHandle] = useThemeScrollContentHandle();

	const scrollContainerHandle = useRef({
		animator: null,
		applyOverscrollEffect: null,
		bounds: null,
		calculateDistanceByWheel: null,
		canScrollHorizontally: null,
		canScrollVertically: null,
		checkAndApplyOverscrollEffect: null,
		getScrollBounds: null,
		isDragging: null,
		isScrollAnimationTargetAccumulated: null,
		isUpdatedScrollThumb: null,
		lastInputType: null,
		rtl: null,
		scrollBounds: null,
		scrollHeight: null,
		scrolling: null,
		scrollLeft: null,
		scrollPos: null,
		scrollTo: null,
		scrollToAccumulatedTarget: null,
		scrollToInfo: null,
		scrollTop: null,
		setOverscrollStatus: null,
		showThumb: null,
		start: null,
		startHidingThumb: null,
		stop: null,
		wheelDirection: null
	});

	const setScrollContainerHandle = (handle) => {
		scrollContainerHandle.current = handle;
	};

	const [scrollContentHandle, setScrollContentHandle] = useScrollContentHandle();

	// Hooks

	const instance = {
		// Ref
		scrollContainerRef,
		overscrollRefs,
		scrollContentRef,

		// Adapter
		themeScrollContentHandle,
		scrollContainerHandle,
		scrollContentHandle
	};

	const
		collectionOfProperties = {},
		assignProperties = assignPropertiesOf(collectionOfProperties),
		scrollProps = {};

	const {
		addEventListeners,
		applyOverscrollEffect,
		clearOverscrollEffect,
		handleFlick,
		handleKeyDown,
		handleMouseDown,
		handleResizeWindow,
		handleScroll,
		handleScrollerUpdate,
		handleTouchStart,
		handleWheel,
		removeEventListeners,
		scrollbarProps,
		scrollStopOnScroll, // Native
		scrollTo,
		start, // Native
		stop // JS
	} = useThemeScroll(props, instance, {type});

	// Render

	if (type === 'JS') {
		scrollProps.stop = stop;
	} else {
		scrollProps.scrollStopOnScroll = scrollStopOnScroll;
		scrollProps.start = start;
	}

	const {
		scrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	} = useScrollBase({
		...rest,
		...scrollProps,
		assignProperties,
		noScrollByDrag: !platform.touchscreen,
		addEventListeners,
		applyOverscrollEffect,
		clearOverscrollEffect,
		handleResizeWindow,
		horizontalScrollbarRef,
		onFlick: handleFlick,
		onKeyDown: handleKeyDown,
		onMouseDown: handleMouseDown,
		onScroll: handleScroll,
		onWheel: handleWheel,
		removeEventListeners,
		scrollTo,
		setScrollContentHandle,
		setScrollContainerHandle,
		type,
		scrollContentHandle,
		scrollContentRef,
		scrollContainerRef,
		verticalScrollbarRef
	});

	assignProperties('scrollContainerProps', {
		className: [
			css.scroll,
			scrollContainerHandle.current.rtl ? css.rtl : null,
			overscrollCss.scroll
		],
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		onTouchStart: handleTouchStart,
		ref: scrollContainerRef
	});

	assignProperties('scrollInnerContainerProps', {
		className: [
			overscrollCss.overscrollFrame,
			overscrollCss.vertical,
			...(isHorizontalScrollbarVisible ? overscrollCss.horizontalScrollbarVisible : [])
		],
		ref: overscrollRefs.vertical
	});

	assignProperties('scrollContentWrapperProps', {
		className: [overscrollCss.overscrollFrame, overscrollCss.horizontal],
		ref: overscrollRefs.horizontal
	});

	assignProperties('scrollContentProps', {
		className: [
			!isHorizontalScrollbarVisible && isVerticalScrollbarVisible ? css.verticalFadeout : null,
			isHorizontalScrollbarVisible && !isVerticalScrollbarVisible ? css.horizontalFadeout : null,
			css.scrollContent
		],
		onUpdate: handleScrollerUpdate,
		setThemeScrollContentHandle,
		spotlightId,
		scrollContentHandle,
		scrollContentRef,
		scrollContainerHandle
	});

	assignProperties('verticalScrollbarProps', {
		...scrollbarProps,
		className: [css.verticalScrollbar],
		focusableScrollbar,
		ref: verticalScrollbarRef
	});

	assignProperties('horizontalScrollbarProps', {
		...scrollbarProps,
		className: [css.horizontalScrollbar],
		focusableScrollbar,
		ref: horizontalScrollbarRef
	});

	return {
		...collectionOfProperties,
		scrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	};
};

/**
 * A Sandstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class Scrollable
 * @memberof sandstone/Scrollable
 * @mixes spotlight/SpotlightContainerDecorator
 * @extends sandstone/Scrollable.ScrollableBase
 * @ui
 * @public
 */

export default useScroll;
export {
	dataIndexAttribute,
	ScrollableBase as Scrollable,
	ScrollableBase,
	useScroll
};
