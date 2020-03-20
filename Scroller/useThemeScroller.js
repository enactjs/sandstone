import Spotlight from '@enact/spotlight';
import {getRect} from '@enact/spotlight/src/utils';
import ri from '@enact/ui/resolution';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import React, {useCallback, useEffect} from 'react';

import {useEventKey} from './useEvent';

import css from './Scroller.module.less';

const fadeoutSize = 48;

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

	function getContentSize ({clientWidth, clientHeight}) {
		return {
			contentWidth: Math.max(clientWidth - 2 * ri.scale(fadeoutSize), 0),
			contentHeight: Math.max(clientHeight - 2 * ri.scale(fadeoutSize), 0)
		};
	}

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
	 * @param {Node} focusedItem node
	 * @param {Number} itemTop of the focusedItem / focusedContainer
	 * @param {Number} itemHeight of focusedItem / focusedContainer
	 * @param {Object} scrollInfo position info. Uses `scrollInfo.previousScrollHeight`
	 * and `scrollInfo.scrollTop`
	 * @param {Number} scrollPosition last target position, passed scroll animation is ongoing
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

			return st;
		};
		// adding threshold into these determinations ensures that items that are within that are
		// near the bounds of the scroller cause the edge to be scrolled into view even when the
		// itme itself is in view (e.g. due to margins)
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

		const scrollerContentBounds = {
			top: scrollerBounds.top + ri.scale(fadeoutSize),
			height: Math.max(scrollerBounds.height - 2 * ri.scale(fadeoutSize), 0)
		};

		let scrollTopDelta = 0;

		const adjustScrollTop = (v) => {
			scrollTopDelta = scrollTop - v;
			scrollTop = v;
		};

		if (container) {
			const containerBounds = container.getBoundingClientRect();

			// if the entire container fits in the scroller, scroll it into view
			if (canItemFit(containerBounds, scrollerContentBounds)) {
				return calcItemInView(containerBounds, scrollerContentBounds, scrollTop, scrollHeight, scrollTopDelta);
			}

			// if the container doesn't fit, adjust the scroll top ...
			if (containerBounds.top > scrollerContentBounds.top) {
				// ... to the top of the container if the top is below the top of the scroller
				adjustScrollTop(calcItemAtStart(containerBounds, scrollerContentBounds, scrollTop, scrollTopDelta));
			}
			// removing support for "snap to bottom" for 2.2.8
			// } else if (containerBounds.top + containerBounds.height < scrollerContentBounds.top + scrollerContentBounds.height) {
			// 	// ... to the bottom of the container if the bottom is above the bottom of the
			// 	// scroller
			// 	adjustScrollTop(calcItemAtEnd(containerBounds, scrollerContentBounds, scrollTop, scrollTopDelta));
			// }

			// N.B. if the container covers the scrollable area (its top is above the top of the
			// scroller and its bottom is below the bottom of the scroller), we need not adjust the
			// scroller to ensure the container is wholly in view.
		}

		const itemBounds = item.getBoundingClientRect();

		return calcItemInView(itemBounds, scrollerContentBounds, scrollTop, scrollHeight, scrollTopDelta);
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
			{contentWidth} = scrollContentHandle.current.scrollBounds,
			rtlDirection = rtl ? -1 : 1,
			{left: containerLeft} = scrollContentNode.getBoundingClientRect(),
			scrollLastPosition = scrollPosition ? scrollPosition : scrollContentHandle.current.scrollPos.left,
			currentScrollLeft = rtl ? (scrollContentHandle.current.scrollBounds.maxLeft - scrollLastPosition) : scrollLastPosition,
			// calculation based on client position
			newItemLeft = scrollContentNode.scrollLeft + (itemLeft - containerLeft - ri.scale(fadeoutSize));
		let nextScrollLeft = scrollContentHandle.current.scrollPos.left;

		if (newItemLeft + itemWidth > (contentWidth + currentScrollLeft) && itemWidth < contentWidth) {
			// If focus is moved to an element outside of view area (to the right), scroller will move
			// to the right just enough to show the current `focusedItem`. This does not apply to
			// `focusedItem` that has a width that is bigger than `scrollBounds.contentWidth`.
			nextScrollLeft += rtlDirection * ((newItemLeft + itemWidth) - (contentWidth + currentScrollLeft));
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
	 * @param {Object} scrollInfo position info. `calculateScrollTop` uses
	 * `scrollInfo.previousScrollHeight` and `scrollInfo.scrollTop`
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

		if (horizontal && !(itemRect.left >= containerRect.left && itemRect.right <= containerRect.right)) {
			scrollContentHandle.current.scrollPos.left = calculateScrollLeft(item, scrollPosition);
		}

		if (vertical && !(itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom)) {
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
		getContentSize,
		setContainerDisabled
	};
};

const useThemeScroller = (props) => {
	const {scrollContainerRef, ...rest} = props;
	const {scrollContentHandle, scrollContentRef} = rest;

	delete rest.children;
	delete rest.onUpdate;
	delete rest.scrollContainerContainsDangerously;
	delete rest.scrollContainerHandle;
	delete rest.scrollContainerRef;
	delete rest.scrollContentHandle;
	delete rest.setThemeScrollContentHandle;
	delete rest.spotlightId;

	// Hooks

	const {calculatePositionOnFocus, focusOnNode, getContentSize, setContainerDisabled} = useSpottable(props, {scrollContainerRef, scrollContentHandle, scrollContentRef});

	useEffect(() => {
		props.setThemeScrollContentHandle({
			calculatePositionOnFocus,
			focusOnNode,
			setContainerDisabled
		});
	}, [calculatePositionOnFocus, focusOnNode, props, props.setThemeScrollContentHandle, setContainerDisabled]);

	// Render

	rest.children = (
		<div className={css.contentWrapper}>
			{props.children}
		</div>
	);
	rest.getContentSize = getContentSize;

	return rest;
};

export default useThemeScroller;
export {
	useThemeScroller
};
