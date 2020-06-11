import {forward} from '@enact/core/handle';
import platform from '@enact/core/platform';
import {onWindowReady} from '@enact/core/snapshot';
import {clamp} from '@enact/core/util';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getRect} from '@enact/spotlight/src/utils';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import {constants} from '@enact/ui/useScroll';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import {useEffect, useRef} from 'react';

const {animationDuration, epsilon, isPageDown, isPageUp, overscrollTypeOnce, paginationPageMultiplier, scrollWheelPageMultiplierForMaxPixel} = constants;
let lastPointer = {x: 0, y: 0};

const useEventFocus = (props, instances, context) => {
	const {scrollMode} = props;
	const {scrollContainerHandle, scrollContainerRef, scrollContentRef, spottable, themeScrollContentHandle} = instances;
	const {alertScrollbarTrack, isWheeling} = context;

	// Functions

	const startScrollOnFocus = (pos) => {
		if (pos) {
			const
				{top, left} = pos,
				bounds = scrollContainerHandle.current.getScrollBounds();

			if (scrollMode === 'translate') {
				const
					scrollHorizontally = bounds.maxLeft > 0 && left !== scrollContainerHandle.current.scrollLeft,
					scrollVertically = bounds.maxTop > 0 && top !== scrollContainerHandle.current.scrollTop;

				if (scrollHorizontally || scrollVertically) {
					scrollContainerHandle.current.start({
						targetX: left,
						targetY: top,
						animate: (animationDuration > 0) && spottable.current.animateOnFocus,
						overscrollEffect: props.overscrollEffectOn[scrollContainerHandle.current.lastInputType] &&
							(!themeScrollContentHandle.current.shouldPreventOverscrollEffect || !themeScrollContentHandle.current.shouldPreventOverscrollEffect())
					});
					spottable.current.lastScrollPositionOnFocus = pos;
				}
			} else {
				const
					scrollHorizontally = bounds.maxLeft > 0 && Math.abs(left - scrollContainerHandle.current.scrollLeft) > epsilon,
					scrollVertically = bounds.maxTop > 0 && Math.abs(top - scrollContainerHandle.current.scrollTop) > epsilon;

				if (scrollHorizontally || scrollVertically) {
					scrollContainerHandle.current.start({
						targetX: left,
						targetY: top,
						animate: spottable.current.animateOnFocus,
						overscrollEffect: props.overscrollEffectOn[scrollContainerHandle.current.lastInputType] &&
							(!themeScrollContentHandle.current.shouldPreventOverscrollEffect || !themeScrollContentHandle.current.shouldPreventOverscrollEffect())
					});
					spottable.current.lastScrollPositionOnFocus = pos;
				}
			}
		}
	};

	function calculateAndScrollTo () {
		const
			positionFn = themeScrollContentHandle.current.calculatePositionOnFocus,
			scrollContentNode = scrollContentRef.current,
			spotItem = Spotlight.getCurrent();

		if (spotItem && positionFn && utilDOM.containsDangerously(scrollContentNode, spotItem)) {
			const lastPos = spottable.current.lastScrollPositionOnFocus;
			let pos;

			// If scroll animation is ongoing, we need to pass last target position to
			// determine correct scroll position.
			if (lastPos & (
				scrollMode === 'translate' && scrollContainerHandle.current.animator.isAnimating() ||
				scrollMode === 'native' && scrollContainerHandle.current.scrolling
			)) {
				const
					contentRect = getRect(scrollContentNode),
					itemRect = getRect(spotItem);
				let scrollPosition;

				if (props.direction === 'horizontal' || props.direction === 'both' && !(itemRect.left >= contentRect.left && itemRect.right <= contentRect.right)) {
					scrollPosition = lastPos.left;
				} else if (props.direction === 'vertical' || props.direction === 'both' && !(itemRect.top >= contentRect.top && itemRect.bottom <= contentRect.bottom)) {
					scrollPosition = lastPos.top;
				}

				pos = positionFn({item: spotItem, scrollPosition});
			} else {
				pos = positionFn({item: spotItem});
			}

			if (pos && (pos.left !== scrollContainerHandle.current.scrollLeft || pos.top !== scrollContainerHandle.current.scrollTop)) {
				startScrollOnFocus(pos);
			}

			// update `scrollHeight`
			scrollContainerHandle.current.bounds.scrollHeight = scrollContainerHandle.current.getScrollBounds().scrollHeight;
		}
	}

	function handleFocus (ev) {
		const shouldPreventScrollByFocus = themeScrollContentHandle.current.shouldPreventScrollByFocus ?
			themeScrollContentHandle.current.shouldPreventScrollByFocus() :
			false;

		if (scrollMode === 'translate' && isWheeling) {
			scrollContainerHandle.current.stop();
			spottable.current.animateOnFocus = false;
		}

		if (!Spotlight.getPointerMode()) {
			alertScrollbarTrack();
		}

		if (!(shouldPreventScrollByFocus || Spotlight.getPointerMode() || scrollContainerHandle.current.isDragging || spottable.current.indexToFocus)) {
			const
				item = ev.target,
				spotItem = Spotlight.getCurrent();

			if (item && item === spotItem) {
				calculateAndScrollTo();
			}
		} else if (themeScrollContentHandle.current.setLastFocusedNode) {
			themeScrollContentHandle.current.setLastFocusedNode(ev.target);
		}
	}

	function hasFocus () {
		const current = Spotlight.getCurrent();

		if (current && scrollContainerRef.current) {
			return utilDOM.containsDangerously(scrollContainerRef, current);
		}
	}

	// Return

	return {
		calculateAndScrollTo,
		handleFocus,
		hasFocus
	};
};

const useEventKey = (props, instances, context) => {
	const {scrollMode} = props;
	const {themeScrollContentHandle, spottable, scrollContentRef, scrollContainerHandle} = instances;
	const {checkAndApplyOverscrollEffectByDirection, hasFocus, isContent} = context;

	// Functions

	function handleKeyDown (ev) {
		const {keyCode, repeat, target} = ev;

		forward('onKeyDown', ev, props);

		if (isPageUp(keyCode) || isPageDown(keyCode)) {
			ev.preventDefault();
		}

		spottable.current.animateOnFocus = true;

		if (!repeat && hasFocus()) {
			let direction = null;

			if (isPageUp(keyCode) || isPageDown(keyCode)) {
				if (props.direction === 'vertical' || props.direction === 'both') {
					direction = isPageUp(keyCode) ? 'up' : 'down';

					if (isContent(target)) {
						ev.stopPropagation();
						scrollByPage(direction);
					}
					if (props.overscrollEffectOn.pageKey) {
						checkAndApplyOverscrollEffectByDirection(direction);
					}
				}
			} else if (getDirection(keyCode) && (scrollMode === 'translate' || scrollMode === 'native' && !Spotlight.getPointerMode())) {
				const element = Spotlight.getCurrent();

				scrollContainerHandle.current.lastInputType = 'arrowKey';
				direction = getDirection(keyCode);

				if (props.overscrollEffectOn.arrowKey && !(element ? getTargetByDirectionFromElement(direction, element) : null)) {
					checkAndApplyOverscrollEffectByDirection(direction);
				}
			}
		}
	}

	function scrollByPage (direction) {
		const
			{scrollTop} = scrollContainerHandle.current,
			focusedItem = Spotlight.getCurrent(),
			bounds = scrollContainerHandle.current.getScrollBounds(),
			isUp = direction === 'up',
			directionFactor = isUp ? -1 : 1,
			pageDistance = directionFactor * bounds.clientHeight * paginationPageMultiplier;
		let scrollPossible = false;

		if (scrollMode === 'translate') {
			scrollPossible = isUp ? scrollTop > 0 : bounds.maxTop > scrollTop;
		} else {
			scrollPossible = isUp ? scrollTop > 0 : bounds.maxTop - scrollTop > epsilon;
		}

		scrollContainerHandle.current.lastInputType = 'pageKey';

		if (directionFactor !== scrollContainerHandle.current.wheelDirection) {
			scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
			scrollContainerHandle.current.wheelDirection = directionFactor;
		}

		if (scrollPossible) {
			if (focusedItem) {
				const contentNode = scrollContentRef.current;

				// Should do nothing when focusedItem is paging control button of Scrollbar
				if (utilDOM.containsDangerously(contentNode, focusedItem)) {
					const
						contentRect = contentNode.getBoundingClientRect(),
						clientRect = focusedItem.getBoundingClientRect(),
						yAdjust = isUp ? 1 : -1,
						x = clamp(contentRect.left, contentRect.right, (clientRect.right + clientRect.left) / 2);
					let y = 0;

					if (scrollMode === 'translate') {
						y = bounds.maxTop <= scrollTop + pageDistance || 0 >= scrollTop + pageDistance ?
							contentRect[isUp ? 'top' : 'bottom'] + yAdjust :
							clamp(contentRect.top, contentRect.bottom, (clientRect.bottom + clientRect.top) / 2);
					} else {
						y = bounds.maxTop - epsilon < scrollTop + pageDistance || epsilon > scrollTop + pageDistance ?
							contentNode.getBoundingClientRect()[isUp ? 'top' : 'bottom'] + yAdjust :
							clamp(contentRect.top, contentRect.bottom, (clientRect.bottom + clientRect.top) / 2);
					}

					focusedItem.blur();

					if (themeScrollContentHandle.current.pauseSpotlight) {
						themeScrollContentHandle.current.pauseSpotlight(true);
					} else if (!props['data-spotlight-container-disabled']) {
						themeScrollContentHandle.current.setContainerDisabled(true);
					}

					spottable.current.pointToFocus = {direction, x, y};
				}
			} else {
				spottable.current.pointToFocus = {direction, x: lastPointer.x, y: lastPointer.y};
			}

			scrollContainerHandle.current.scrollToAccumulatedTarget(pageDistance, true, props.overscrollEffectOn.pageKey);
		}
	}

	function scrollByPageOnPointerMode (ev) {
		const {keyCode, repeat} = ev;

		forward('onKeyDown', ev, props);
		ev.preventDefault();

		spottable.current.animateOnFocus = true;

		if (!repeat && (props.direction === 'vertical' || props.direction === 'both')) {
			const direction = isPageUp(keyCode) ? 'up' : 'down';

			scrollByPage(direction);

			if (props.overscrollEffectOn.pageKey) { /* if the spotlight focus will not move */
				checkAndApplyOverscrollEffectByDirection(direction);
			}

			return true; // means consumed
		}

		return false; // means to be propagated
	}

	// Return

	return {
		handleKeyDown,
		lastPointer,
		scrollByPageOnPointerMode
	};
};

/*
 * Track the last position of the pointer to check if a list should scroll by
 * page up/down keys when the pointer is on a list without any focused node.
 * `keydown` event does not occur if there is no focus on the node and
 * its descendants, we add `keydown` handler to `document` also.
 */
const scrollers = new Map();

// An app could have lists and/or scrollers more than one,
// so we should test all of them when page up/down key is pressed.
const pointerTracker = (ev) => {
	lastPointer.x = ev.clientX;
	lastPointer.y = ev.clientY;
};

const pageKeyHandler = (ev) => {
	const {keyCode} = ev;

	if (Spotlight.getPointerMode() && !Spotlight.getCurrent() && (isPageUp(keyCode) || isPageDown(keyCode))) {
		const
			{x, y} = lastPointer,
			elem = document.elementFromPoint(x, y);

		if (elem) {
			for (const [key, value] of scrollers) {
				if (utilDOM.containsDangerously(value, elem)) {
					/* To handle page keys in nested scrollable components,
					 * break the loop only when `scrollByPageOnPointerMode` returns `true`.
					 * This approach assumes that an inner scrollable component is
					 * mounted earlier than an outer scrollable component.
					 */
					if (key.scrollByPageOnPointerMode(ev)) {
						break;
					}
				}
			}
		}
	}
};

const useEventMonitor = (props, instances, context) => {
	const {scrollContainerRef} = instances;
	const {lastPointer: lastPointerProp, scrollByPageOnPointerMode} = context;

	// Mutable value

	const mutableRef = useRef({pageKeyHandlerObj: {scrollByPageOnPointerMode}});

	lastPointer = lastPointerProp;

	// Hooks

	useEffect(() => {
		const setMonitorEventTarget = (target) => {
			scrollers.set(mutableRef.current.pageKeyHandlerObj, target);
		};

		const deleteMonitorEventTarget = () => {
			scrollers.delete(mutableRef.current.pageKeyHandlerObj);
		};

		setMonitorEventTarget(scrollContainerRef.current);

		return () => {
			// TODO: Replace `this` to something.
			deleteMonitorEventTarget();
		};
	}, [scrollContainerRef]);
};

onWindowReady(() => {
	utilEvent('mousemove').addEventListener(document, pointerTracker);
	utilEvent('keydown').addEventListener(document, pageKeyHandler);
});

const useEventMouse = (props, instances) => {
	const {scrollMode} = props;
	const {themeScrollContentHandle, scrollContainerHandle} = instances;

	// Functions

	function handleFlick ({direction}) {
		const
			{canScrollHorizontally, canScrollVertically} = scrollContainerHandle.current,
			bounds = scrollContainerHandle.current.getScrollBounds(),
			focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}

		if ((
			direction === 'vertical' && canScrollVertically(bounds) ||
			direction === 'horizontal' && canScrollHorizontally(bounds)
		) && !props['data-spotlight-container-disabled']) {
			themeScrollContentHandle.current.setContainerDisabled(true);
		}
	}

	function handleMouseDown (ev) {
		if (props['data-spotlight-container-disabled']) {
			ev.preventDefault();
		} else if (scrollMode === 'native') {
			themeScrollContentHandle.current.setContainerDisabled(false);
		}
	}

	// Return

	return {
		handleFlick,
		handleMouseDown
	};
};

const useEventTouch = () => {
	// Functions

	function handleTouchStart () {
		const focusedItem = Spotlight.getCurrent();

		if (!Spotlight.isPaused() && focusedItem) {
			focusedItem.blur();
		}
	}

	// Return

	return {
		handleTouchStart
	};
};

const useEventVoice = (props, instances) => {
	const {scrollContainerRef, scrollContainerHandle} = instances;

	// Mutable value

	const mutableRef = useRef({
		isVoiceControl: false,
		voiceControlDirection: 'vertical'
	});

	// Functions

	const updateFocusAfterVoiceControl = () => {
		const
			spotItem = Spotlight.getCurrent(),
			scrollContainerNode = scrollContainerRef.current;

		if (utilDOM.containsDangerously(scrollContainerNode, spotItem)) {
			const
				viewportBounds = scrollContainerNode.getBoundingClientRect(),
				spotItemBounds = spotItem.getBoundingClientRect(),
				nodes = Spotlight.getSpottableDescendants(scrollContainerNode.dataset.spotlightId),
				first = mutableRef.current.voiceControlDirection === 'vertical' ? 'top' : 'left',
				last = mutableRef.current.voiceControlDirection === 'vertical' ? 'bottom' : 'right';

			if (spotItemBounds[last] < viewportBounds[first] || spotItemBounds[first] > viewportBounds[last]) {
				for (let i = 0; i < nodes.length; i++) {
					const nodeBounds = nodes[i].getBoundingClientRect();

					if (nodeBounds[first] > viewportBounds[first] && nodeBounds[last] < viewportBounds[last]) {
						Spotlight.focus(nodes[i]);
						break;
					}
				}
			}
		}
	};

	function stopVoice () {
		if (mutableRef.current.isVoiceControl) {
			mutableRef.current.isVoiceControl = false;
			updateFocusAfterVoiceControl();
		}
	}

	const isReachedEdge = (scrollPos, ltrBound, rtlBound, isRtl = false) => {
		const bound = isRtl ? rtlBound : ltrBound;
		return (bound === 0 && scrollPos === 0) || (bound > 0 && scrollPos >= bound - 1);
	};

	const handleVoice = (e) => {
		const
			isHorizontal = (props.direction === 'horizontal'),
			isRtl = scrollContainerHandle.current.rtl,
			{scrollTop, scrollLeft} = scrollContainerHandle.current,
			{maxLeft, maxTop} = scrollContainerHandle.current.getScrollBounds(),
			verticalDirection = ['up', 'down', 'top', 'bottom'],
			horizontalDirection = isRtl ? ['right', 'left', 'rightmost', 'leftmost'] : ['left', 'right', 'leftmost', 'rightmost'],
			movement = ['previous', 'next', 'first', 'last'];
		let
			scroll = e && e.detail && e.detail.scroll,
			index = movement.indexOf(scroll);

		if (index > -1) {
			scroll = isHorizontal ? horizontalDirection[index] : verticalDirection[index];
		}

		mutableRef.current.voiceControlDirection = verticalDirection.includes(scroll) && 'vertical' || horizontalDirection.includes(scroll) && 'horizontal' || null;

		// Case 1. Invalid direction
		if (mutableRef.current.voiceControlDirection === null) {
			mutableRef.current.isVoiceControl = false;
		// Case 2. Cannot scroll
		} else if (
			(['up', 'top'].includes(scroll) && isReachedEdge(scrollTop, 0)) ||
			(['down', 'bottom'].includes(scroll) && isReachedEdge(scrollTop, maxTop)) ||
			(['left', 'leftmost'].includes(scroll) && isReachedEdge(scrollLeft, 0, maxLeft, isRtl)) ||
			(['right', 'rightmost'].includes(scroll) && isReachedEdge(scrollLeft, maxLeft, 0, isRtl))
		) {
			if (window.webOSVoiceReportActionResult) {
				window.webOSVoiceReportActionResult({voiceUi: {exception: 'alreadyCompleted'}});
				e.preventDefault();
			}
		// Case 3. Can scroll
		} else {
			mutableRef.current.isVoiceControl = true;

			if (['up', 'down', 'left', 'right'].includes(scroll)) {
				const
					bounds = scrollContainerHandle.current.getScrollBounds(),
					directionFactor = (scroll === 'up') || (scroll === 'left' && !isRtl) || (scroll === 'right' && isRtl),
					scrollVertically = verticalDirection.includes(scroll),
					direction = directionFactor ? -1 : 1,
					pageDistance = direction * (scrollVertically ? bounds.clientHeight : bounds.clientWidth) * paginationPageMultiplier;

				scrollContainerHandle.current.lastInputType = 'pageKey';

				if (direction !== scrollContainerHandle.current.wheelDirection) {
					scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
					scrollContainerHandle.current.wheelDirection = direction;
				}

				scrollContainerHandle.current.scrollToAccumulatedTarget(pageDistance, scrollVertically, props.overscrollEffectOn.pageKey);
			} else { // ['top', 'bottom', 'leftmost', 'rightmost'].includes(scroll)
				scrollContainerHandle.current.scrollTo({align: verticalDirection.includes(scroll) && scroll || (scroll === 'leftmost' && isRtl || scroll === 'rightmost' && !isRtl) && 'right' || 'left'});
			}

			e.preventDefault();
		}
	};

	function addVoiceEventListener (scrollContentRef) {
		if (platform.webos) {
			utilEvent('webOSVoice').addEventListener(scrollContentRef, handleVoice);
			scrollContentRef.current.setAttribute('data-webos-voice-intent', 'Scroll');
		}
	}

	function removeVoiceEventListener (scrollContentRef) {
		if (platform.webos) {
			utilEvent('webOSVoice').removeEventListener(scrollContentRef, handleVoice);
			scrollContentRef.current.removeAttribute('data-webos-voice-intent');
		}
	}

	// Return

	return {
		addVoiceEventListener,
		removeVoiceEventListener,
		stopVoice
	};
};

const useEventWheel = (props, instances) => {
	const {scrollMode} = props;
	const {themeScrollContentHandle, scrollContainerHandle, scrollContentRef} = instances;

	// Mutable value

	const mutableRef = useRef({isWheeling: false});

	// Functions
	function initializeWheeling () {
		if (!props['data-spotlight-container-disabled']) {
			themeScrollContentHandle.current.setContainerDisabled(true);
		}
		mutableRef.current.isWheeling = true;
	}

	function handleWheel ({delta}) {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}

		if (delta !== 0) {
			initializeWheeling();
		}
	}

	/*
	 * wheel event handler;
	 * - for horizontal scroll, supports wheel action on any children nodes since web engine cannot support this
	 * - for vertical scroll, supports wheel action on scrollbars only
	 */
	function handleWheelNative (ev) {
		const
			overscrollEffectRequired = props.overscrollEffectOn.wheel,
			bounds = scrollContainerHandle.current.getScrollBounds(),
			canScrollHorizontally = scrollContainerHandle.current.canScrollHorizontally(bounds),
			canScrollVertically = scrollContainerHandle.current.canScrollVertically(bounds),
			eventDeltaMode = ev.deltaMode,
			eventDelta = (-ev.wheelDeltaY || ev.deltaY),
			positiveDelta = eventDelta > 0,
			negativeDelta = eventDelta < 0,
			{scrollTop, scrollLeft} = scrollContainerHandle.current;
		let
			delta = 0,
			needToHideScrollbarTrack = false;

		if (typeof window !== 'undefined') {
			window.document.activeElement.blur();
		}

		scrollContainerHandle.current.showScrollbarTrack(bounds);

		// FIXME This routine is a temporary support for horizontal wheel scroll.
		// FIXME If web engine supports horizontal wheel, this routine should be refined or removed.
		if (canScrollVertically) { // This routine handles wheel events on scrollbars for vertical scroll.
			if (negativeDelta && scrollTop > 0 || positiveDelta && scrollTop < bounds.maxTop) {
				if (!mutableRef.current.isWheeling) {
					initializeWheeling();
				}

				// If ev.target is a descendant of scrollContent, the event will be handled on scroll event handler.
				if (!utilDOM.containsDangerously(scrollContentRef.current, ev.target)) {
					delta = scrollContainerHandle.current.calculateDistanceByWheel(eventDeltaMode, eventDelta, bounds.clientHeight * scrollWheelPageMultiplierForMaxPixel);
					needToHideScrollbarTrack = !delta;

					ev.preventDefault();
				} else if (overscrollEffectRequired) {
					scrollContainerHandle.current.checkAndApplyOverscrollEffect('vertical', positiveDelta ? 'after' : 'before', overscrollTypeOnce);
				}

				ev.stopPropagation();
			} else {
				if (overscrollEffectRequired && (negativeDelta && scrollTop <= 0 || positiveDelta && scrollTop >= bounds.maxTop)) {
					scrollContainerHandle.current.applyOverscrollEffect('vertical', positiveDelta ? 'after' : 'before', overscrollTypeOnce, 1);
				}

				needToHideScrollbarTrack = true;
			}
		} else if (canScrollHorizontally) { // this routine handles wheel events on any children for horizontal scroll.
			if (negativeDelta && scrollLeft > 0 || positiveDelta && scrollLeft < bounds.maxLeft) {
				if (!mutableRef.current.isWheeling) {
					initializeWheeling();
				}

				delta = scrollContainerHandle.current.calculateDistanceByWheel(eventDeltaMode, eventDelta, bounds.clientWidth * scrollWheelPageMultiplierForMaxPixel);
				needToHideScrollbarTrack = !delta;

				ev.preventDefault();
				ev.stopPropagation();
			} else {
				if (overscrollEffectRequired && (negativeDelta && scrollLeft <= 0 || positiveDelta && scrollLeft >= bounds.maxLeft)) {
					scrollContainerHandle.current.applyOverscrollEffect('horizontal', positiveDelta ? 'after' : 'before', overscrollTypeOnce, 1);
				}

				needToHideScrollbarTrack = true;
			}
		}

		if (delta !== 0) {
			/* prevent native scrolling feature for vertical direction */
			ev.preventDefault();

			const direction = Math.sign(delta);

			// Not to accumulate scroll position if wheel direction is different from hold direction
			if (direction !== scrollContainerHandle.current.wheelDirection) {
				scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
				scrollContainerHandle.current.wheelDirection = direction;
			}

			scrollContainerHandle.current.scrollToAccumulatedTarget(delta, canScrollVertically, overscrollEffectRequired);
		}

		if (needToHideScrollbarTrack) {
			scrollContainerHandle.current.startHidingScrollbarTrack();
		}
	}

	// Return

	return {
		handleWheel: scrollMode === 'translate' ? handleWheel : handleWheelNative,
		isWheeling: mutableRef.current.isWheeling
	};
};

export {
	useEventFocus,
	useEventKey,
	useEventMonitor,
	useEventMouse,
	useEventTouch,
	useEventVoice,
	useEventWheel
};
