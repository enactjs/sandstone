import {adaptEvent, forward, handle} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import Spotlight from '@enact/spotlight';
import {getRect} from '@enact/spotlight/src/utils';
import ri from '@enact/ui/resolution';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import classNames from 'classnames';
import {useCallback, useEffect} from 'react';

import {affordanceSize} from '../useScroll';

import {useEventKey} from './useEvent';

import css from './Scroller.module.less';
import scrollbarTrackCss from '../useScroll/ScrollbarTrack.module.less';

const
	isCancel = is('cancel'),
	isEnter = is('enter'),
	isBody = (elem) => (elem.classList.contains(css.focusableBody));

const getFocusableBodyProps = (scrollContainerRef) => {
	const spotlightId = scrollContainerRef.current && scrollContainerRef.current.dataset.spotlightId;

	const setNavigableFilter = ({filterTarget}) => {
		if (spotlightId && filterTarget) {
			const targetClassName = (filterTarget === 'body') ? css.focusableBody : scrollbarTrackCss.thumb;
			Spotlight.set(spotlightId, {
				navigableFilter: (elem) => (typeof elem === 'string' || !elem.classList.contains(targetClassName))
			});
			return true;
		}
	};

	const getNavigableFilterTarget = (ev) => {
		const {keyCode, target, type} = ev;
		let filterTarget = null;

		if (type === 'focus') {
			filterTarget = isBody(target) ? 'thumb' : 'body';
		} else if (type === 'blur') {
			filterTarget = 'thumb';
		} else if (type === 'keydown') {
			filterTarget =
				!Spotlight.getPointerMode() && isEnter(keyCode) && isBody(target) && 'body' ||
				isEnter(keyCode) && !isBody(target) && 'thumb' ||
				isCancel(keyCode) && !isBody(target) && 'thumb' ||
				null;
		}

		return {
			filterTarget
		};
	};

	const consumeEventWithFocus = (ev) => {
		const {target} = ev;
		let nextTarget;

		if (isBody(target)) {
			// Enter key on scroll Body.
			// Scroll thumb get focus.
			const spottableDescendants = Spotlight.getSpottableDescendants(spotlightId);
			if (spottableDescendants.length > 0) {
				// Last spottable descendant(thumb) get focus.
				nextTarget = spottableDescendants.pop();

				// If there are both thumbs, vertical thumb is the next target
				const verticalThumb = spottableDescendants.pop();
				nextTarget = (verticalThumb && verticalThumb.classList.contains(scrollbarTrackCss.thumb)) ? verticalThumb : nextTarget;
			}
		} else {
			// Enter or Cancel key on scroll thumb.
			// Scroll body get focus.
			nextTarget = target.closest(`.${css.focusableBody}`);
		}

		if (nextTarget) {
			Spotlight.focus(nextTarget);
			ev.preventDefault();
			ev.nativeEvent.stopImmediatePropagation();
		}
	};
	return {
		className: css.focusableBody,
		onFocus: handle(
			forward('onFocus'),
			adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		),
		onBlur: handle(
			// Focus out to external element.
			forward('onBlur'),
			adaptEvent(getNavigableFilterTarget, setNavigableFilter),
		),
		onKeyDown: handle(
			forward('onKeyDown'),
			adaptEvent(getNavigableFilterTarget, setNavigableFilter),
			consumeEventWithFocus
		)
	};
};

const useSpottable = (props, instances) => {
	const {scrollContainerRef, scrollContentHandle, scrollContentRef} = instances;

	// Hooks

	const {addGlobalKeyDownEventListener, removeGlobalKeyDownEventListener} = useEventKey();

	const setContainerDisabled = useCallback((bool) => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.dataset.spotlightContainerDisabled = bool;

			if (bool) {
				addGlobalKeyDownEventListener(() => {
					setContainerDisabled(false);
				});
			} else {
				removeGlobalKeyDownEventListener();
			}
		}
	}, [addGlobalKeyDownEventListener, removeGlobalKeyDownEventListener, scrollContainerRef]);

	useEffect(() => {
		return () => setContainerDisabled(false);
	}, [setContainerDisabled]);

	useEffect(() => {
		const {onUpdate} = props;

		if (onUpdate) {
			onUpdate();
		}
	});

	// Functions

	/**
	 * Returns the first spotlight container between `node` and the scroller
	 *
	 * @param {Node} node A DOM node
	 *
	 * @returns {Node|Null} Spotlight container for `node`
	 * @private
	 */
	function getSpotlightContainerForNode (node) {
		do {
			if (node.dataset.spotlightId && node.dataset.spotlightContainer && !node.dataset.expandableContainer) {
				return node;
			}
		} while ((node = node.parentNode) && node !== scrollContentRef.current);
	}

	/**
	 * Calculates the "focus bounds" of a node. If the node is within a spotlight container, that
	 * container is scrolled into view rather than just the element.
	 *
	 * @param {Node} node Focused node
	 *
	 * @returns {Object} Bounds as returned by `getBoundingClientRect`
	 * @private
	 */
	function getFocusedItemBounds (node) {
		node = getSpotlightContainerForNode(node) || node;
		return node.getBoundingClientRect();
	}

	/**
	 * Calculates the new `scrollTop`.
	 *
	 * @param {Node} item Focused item node
	 *
	 * @returns {Number} Calculated `scrollTop`
	 * @private
	 */
	function calculateScrollTop (item) {
		const threshold = ri.scale(48);
		const roundToStart = (sb, st) => {
			// round to start
			if (st < threshold) return 0;

			return st;
		};
		const roundToEnd = (sb, st, sh) => {
			// round to end
			if (sh - (st + sb.height) < threshold) return sh - sb.height;

			return st + ri.scale(affordanceSize);
		};
		// adding threshold into these determinations ensures that items that are within that are
		// near the bounds of the scroller cause the edge to be scrolled into view even when the
		// item itself is in view (e.g. due to margins)
		const isItemBeforeView = (ib, sb, d) => ib.top + d - threshold < sb.top;
		const isItemAfterView = (ib, sb, d) => ib.top + d + ib.height + threshold > sb.top + sb.height;
		const canItemFit = (ib, sb) => ib.height <= sb.height;
		const calcItemAtStart = (ib, sb, st, d) => ib.top + st + d - sb.top;
		const calcItemAtEnd = (ib, sb, st, d) => ib.top + ib.height + st + d - (sb.top + sb.height);
		const calcItemInView = (ib, sb, st, sh, d) => {
			if (isItemBeforeView(ib, sb, d)) {
				return roundToStart(sb, calcItemAtStart(ib, sb, st, d));
			} else if (isItemAfterView(ib, sb, d)) {
				return roundToEnd(sb, calcItemAtEnd(ib, sb, st, d), sh);
			}
			return st;
		};

		const container = getSpotlightContainerForNode(item);
		const scrollerBounds = scrollContentRef.current.getBoundingClientRect();
		let {scrollHeight, scrollTop} = scrollContentRef.current;
		let scrollTopDelta = 0;

		const adjustScrollTop = (v) => {
			scrollTopDelta = scrollTop - v;
			scrollTop = v;
		};

		if (container) {
			const containerBounds = container.getBoundingClientRect();

			// if the entire container fits in the scroller, scroll it into view
			if (canItemFit(containerBounds, scrollerBounds)) {
				return calcItemInView(containerBounds, scrollerBounds, scrollTop, scrollHeight, scrollTopDelta);
			}

			// if the container doesn't fit, adjust the scroll top ...
			if (containerBounds.top > scrollerBounds.top) {
				// ... to the top of the container if the top is below the top of the scroller
				adjustScrollTop(calcItemAtStart(containerBounds, scrollerBounds, scrollTop, scrollTopDelta));
			}
			// removing support for "snap to bottom" for 2.2.8
			// } else if (containerBounds.top + containerBounds.height < scrollerBounds.top + scrollerBounds.height) {
			// 	// ... to the bottom of the container if the bottom is above the bottom of the
			// 	// scroller
			// 	adjustScrollTop(calcItemAtEnd(containerBounds, scrollerBounds, scrollTop, scrollTopDelta));
			// }

			// N.B. if the container covers the scrollable area (its top is above the top of the
			// scroller and its bottom is below the bottom of the scroller), we need not adjust the
			// scroller to ensure the container is wholly in view.
		}

		const itemBounds = item.getBoundingClientRect();

		return calcItemInView(itemBounds, scrollerBounds, scrollTop, scrollHeight, scrollTopDelta);
	}

	/**
	 * Calculates the new `scrollLeft`.
	 *
	 * @param {Node} focusedItem node
	 * @param {Number} scrollPosition last target position, passed when scroll animation is ongoing
	 *
	 * @returns {Number} Calculated `scrollLeft`
	 * @private
	 */
	function calculateScrollLeft (item, scrollPosition) {
		const scrollContentNode = scrollContentRef.current;
		const {
			left: itemLeft,
			width: itemWidth
		} = getFocusedItemBounds(item);

		const
			{rtl} = props,
			{clientWidth} = scrollContentHandle.current.scrollBounds,
			rtlDirection = rtl ? -1 : 1,
			{left: containerLeft} = scrollContentNode.getBoundingClientRect(),
			scrollLastPosition = scrollPosition ? scrollPosition : scrollContentHandle.current.scrollPos.left,
			currentScrollLeft = rtl ? (scrollContentHandle.current.scrollBounds.maxLeft - scrollLastPosition) : scrollLastPosition,
			// calculation based on client position
			newItemLeft = scrollContentNode.scrollLeft + (itemLeft - containerLeft);
		let nextScrollLeft = scrollContentHandle.current.scrollPos.left;

		if (newItemLeft + itemWidth > (clientWidth + currentScrollLeft) && itemWidth < clientWidth) {
			// If focus is moved to an element outside of view area (to the right), scroller will move
			// to the right just enough to show the current `focusedItem`. This does not apply to
			// `focusedItem` that has a width that is bigger than `scrollBounds.clientWidth`.
			nextScrollLeft += rtlDirection * ((newItemLeft + itemWidth) - (clientWidth + currentScrollLeft));
		} else if (newItemLeft < currentScrollLeft) {
			// If focus is outside of the view area to the left, move scroller to the left accordingly.
			nextScrollLeft += rtlDirection * (newItemLeft - currentScrollLeft);
		}

		return nextScrollLeft;
	}

	/**
	 * Calculates the new top and left position for scroller based on focusedItem.
	 *
	 * @param {Node} item node
	 * @param {Number} scrollPosition last target position, passed scroll animation is ongoing
	 *
	 * @returns {Object} with keys {top, left} containing calculated top and left positions for scroll.
	 * @private
	 */
	function calculatePositionOnFocus ({item, scrollPosition}) {
		const containerNode = scrollContentRef.current;
		const horizontal = scrollContentHandle.current.isHorizontal();
		const vertical = scrollContentHandle.current.isVertical();

		if (!vertical && !horizontal || !item || !utilDOM.containsDangerously(containerNode, item)) {
			return;
		}

		const containerRect = getRect(containerNode);
		const itemRect = getRect(item);

		if (horizontal && !(itemRect.left >= (containerRect.left + ri.scale(affordanceSize)) && itemRect.right <= (containerRect.right - ri.scale(affordanceSize)))) {
			scrollContentHandle.current.scrollPos.left = calculateScrollLeft(item, scrollPosition);
		}

		if (vertical && !(itemRect.top >= containerRect.top && itemRect.bottom <= (containerRect.bottom - ri.scale(affordanceSize)))) {
			scrollContentHandle.current.scrollPos.top = calculateScrollTop(item);
		}

		return scrollContentHandle.current.scrollPos;
	}

	function focusOnNode (node) {
		if (node) {
			Spotlight.focus(node);
		}
	}

	// Return

	return {
		calculatePositionOnFocus,
		focusOnNode,
		setContainerDisabled
	};
};

const useThemeScroller = (props, scrollContentProps, isHorizontalScrollbarVisible, isVerticalScrollbarVisible) => {
	const {className, fadeOut, scrollContainerRef, ...rest} = scrollContentProps;
	const {scrollContentHandle, scrollContentRef} = rest;

	delete rest.onUpdate;
	delete rest.scrollContainerContainsDangerously;
	delete rest.scrollContainerHandle;
	delete rest.scrollContentHandle;
	delete rest.setThemeScrollContentHandle;
	delete rest.spotlightId;

	// Hooks

	const {calculatePositionOnFocus, focusOnNode, setContainerDisabled} = useSpottable(scrollContentProps, {scrollContainerRef, scrollContentHandle, scrollContentRef});
	const focusableBodyProps = (props.focusableScrollbar === 'byEnter') ? getFocusableBodyProps(scrollContainerRef) : {};

	useEffect(() => {
		scrollContentProps.setThemeScrollContentHandle({
			calculatePositionOnFocus,
			focusOnNode,
			setContainerDisabled
		});
	}, [calculatePositionOnFocus, focusOnNode, scrollContentProps, setContainerDisabled]);

	// Render

	rest.className = classNames(
		className,
		!isHorizontalScrollbarVisible && isVerticalScrollbarVisible && fadeOut ? css.verticalFadeout : null,
		isHorizontalScrollbarVisible && !isVerticalScrollbarVisible && fadeOut ? css.horizontalFadeout : null,
	);

	return {focusableBodyProps, themeScrollContentProps: rest};
};

export default useThemeScroller;
export {
	useThemeScroller
};
