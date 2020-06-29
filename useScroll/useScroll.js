/**
 * Sandstone-themed scrollable hook and behaviors.
 *
 * @module sandstone/useScroll
 * @exports affordanceSize
 * @exports dataIndexAttribute
 * @exports useScroll
 * @private
 */

import {forward} from '@enact/core/handle';
import platform from '@enact/core/platform';
import Spotlight from '@enact/spotlight';
import {spottableClass} from '@enact/spotlight/Spottable';
import {getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {getRect, intersects} from '@enact/spotlight/src/utils';
import {assignPropertiesOf, constants, useScrollBase} from '@enact/ui/useScroll';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import {useContext, useRef} from 'react';

import $L from '../internal/$L';
import {SharedState} from '../internal/SharedStateDecorator';

import {useThemeScrollContentHandle} from './useThemeScrollContentHandle';
import {
	useEventFocus, useEventKey, useEventMonitor, useEventMouse,
	useEventTouch, useEventVoice, useEventWheel
} from './useEvent';
import useOverscrollEffect from './useOverscrollEffect';
import {useSpotlightRestore} from './useSpotlight';

import overscrollCss from './OverscrollEffect.module.less';
import css from './useScroll.module.less';

const
	arrowKeyMultiplier = 0.2,
	affordanceSize = 48,
	{paginationPageMultiplier} = constants,
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
 * @memberof sandstone/useScroll
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

const useThemeScroll = (props, instances) => {
	const {scrollMode} = props;
	const {themeScrollContentHandle, scrollContentRef, scrollContainerHandle, scrollContainerRef} = instances;
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

	useSpotlightRestore(props, instances);

	const {
		applyOverscrollEffect,
		checkAndApplyOverscrollEffectByDirection,
		clearOverscrollEffect
	} = useOverscrollEffect({}, instances);

	const {handleWheel, isWheeling} = useEventWheel(props, instances);

	const {calculateAndScrollTo, handleFocus, hasFocus} = useEventFocus(props, {...instances, spottable: mutableRef}, {isWheeling});

	const {handleKeyDown, lastPointer, scrollByPageOnPointerMode} = useEventKey(props, {...instances, spottable: mutableRef}, {checkAndApplyOverscrollEffectByDirection, hasFocus, isContent});

	useEventMonitor({}, instances, {lastPointer, scrollByPageOnPointerMode});

	const {handleFlick, handleMouseDown} = useEventMouse({}, instances);

	const {handleTouchStart} = useEventTouch();

	const {
		addVoiceEventListener,
		removeVoiceEventListener,
		stopVoice
	} = useEventVoice(props, instances);

	const scrollbarProps = {
		cbAlertScrollbarTrack: alertScrollbarTrack,
		onInteractionForScroll
	};

	// Functions

	function isContent (element) {
		return (element && utilDOM.containsDangerously(scrollContentRef, element));
	}

	function scrollTo (opt) {
		mutableRef.current.indexToFocus = (opt.focus && typeof opt.index === 'number') ? opt.index : null;
		mutableRef.current.nodeToFocus = (opt.focus && opt.node instanceof Object && opt.node.nodeType === 1) ? opt.node : null;
	}

	function start (animate) {
		if (scrollMode === 'native' && !animate) {
			focusOnItem();
		}
	}

	function stop () {
		if (!props['data-spotlight-container-disabled']) {
			themeScrollContentHandle.current.setContainerDisabled(false);
		}

		if (themeScrollContentHandle.current.pauseSpotlight) {
			themeScrollContentHandle.current.pauseSpotlight(false);
		}

		focusOnItem();
		mutableRef.current.lastScrollPositionOnFocus = null;
		mutableRef.current.isWheeling = false;
		stopVoice();
	}

	function scrollStopOnScroll () {
		stop();
	}

	function onInteractionForScroll ({inputType, isForward, isPagination, isVerticalScrollBar}) {
		const
			{wheelDirection} = scrollContainerHandle.current,
			bounds = scrollContainerHandle.current.getScrollBounds(),
			direction = isForward ? 1 : -1,
			pageSize = isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth,
			distance = pageSize * (isPagination ? paginationPageMultiplier : arrowKeyMultiplier);

		scrollContainerHandle.current.lastInputType = inputType;

		if (direction !== wheelDirection) {
			scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
			scrollContainerHandle.current.wheelDirection = direction;
		}

		scrollContainerHandle.current.scrollToAccumulatedTarget(direction * distance, isVerticalScrollBar, props.overscrollEffectOn[inputType]);
	}

	function alertScrollbarTrack () {
		const bounds = scrollContainerHandle.current.getScrollBounds();
		scrollContainerHandle.current.showScrollbarTrack(bounds);
		scrollContainerHandle.current.startHidingScrollbarTrack();
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

/**
 * A custom hook that passes Sandstone-themed scrollable behavior information as its render prop.
 *
 * @class
 * @memberof sandstone/useScroll
 * @ui
 * @private
 */
const useScroll = (props) => {
	const
		{
			className,
			'data-spotlight-container': spotlightContainer,
			'data-spotlight-container-disabled': spotlightContainerDisabled,
			'data-spotlight-id': spotlightId,
			focusableScrollbar,
			fadeOut,
			horizontalScrollThumbAriaLabel,
			noAffordance,
			scrollMode,
			style,
			verticalScrollThumbAriaLabel,
			...rest
		} = props;

	// Mutable value

	const scrollContainerRef = useRef();
	const scrollContentHandle = useRef();
	const scrollContentRef = useRef();
	const itemRefs = useRef([]);

	const horizontalScrollbarHandle = useRef();
	const verticalScrollbarHandle = useRef();

	// Handles

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
		showScrollbarTrack: null,
		start: null,
		startHidingScrollbarTrack: null,
		stop: null,
		wheelDirection: null
	});

	const setScrollContainerHandle = (handle) => {
		scrollContainerHandle.current = handle;
	};

	// Hooks

	const instance = {
		// Ref
		scrollContainerRef,
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
		scrollStopOnScroll, // scrollMode 'native'
		scrollTo,
		start, // scrollMode 'native'
		stop // scrollMode 'translate'
	} = useThemeScroll(props, instance);

	// Render

	if (scrollMode === 'translate') {
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
		horizontalScrollbarHandle,
		onFlick: handleFlick,
		onKeyDown: handleKeyDown,
		onMouseDown: handleMouseDown,
		onScroll: handleScroll,
		onWheel: handleWheel,
		removeEventListeners,
		scrollTo,
		setScrollContainerHandle,
		scrollMode,
		scrollContentHandle,
		scrollContentRef,
		scrollContainerRef,
		verticalScrollbarHandle
	});

	assignProperties('scrollContainerProps', {
		className: [
			className,
			css.scroll,
			overscrollCss.scroll,
			focusableScrollbar ? css.focusableScrollbar : null,
			isVerticalScrollbarVisible && isHorizontalScrollbarVisible ? css.bidirectional : null
		],
		style,
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		onTouchStart: handleTouchStart,
		ref: scrollContainerRef
	});

	assignProperties('scrollContentProps', {
		...(props.itemRenderer ? {itemRefs, noAffordance} : {fadeOut}),
		className: [
			(props.direction === 'both' || props.direction === 'vertical') ? overscrollCss.vertical : overscrollCss.horizontal,
			css.scrollContent
		],
		onUpdate: handleScrollerUpdate,
		scrollContainerRef,
		setThemeScrollContentHandle,
		spotlightId,
		scrollContainerHandle,
		scrollContentHandle,
		scrollContentRef
	});

	assignProperties('verticalScrollbarProps', {
		...scrollbarProps,
		'aria-label': verticalScrollThumbAriaLabel == null ? $L('scroll up or down with up down button') : verticalScrollThumbAriaLabel,
		className: [css.verticalScrollbar],
		focusableScrollbar,
		scrollbarHandle: verticalScrollbarHandle
	});

	assignProperties('horizontalScrollbarProps', {
		...scrollbarProps,
		'aria-label': horizontalScrollThumbAriaLabel == null ? $L('scroll left or right with left right button') : horizontalScrollThumbAriaLabel,
		className: [css.horizontalScrollbar],
		focusableScrollbar,
		scrollbarHandle: horizontalScrollbarHandle
	});

	return {
		...collectionOfProperties,
		scrollContentWrapper,
		scrollContentHandle,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	};
};

export default useScroll;
export {
	affordanceSize,
	dataIndexAttribute,
	useScroll
};
