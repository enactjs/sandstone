/**
 * Provides Sandstone-themed scroller components and behaviors.
 * @example
 * <Scroller>
 * 	<div style={{height: '300px'}}>
 * 		<p>San Francisco</p>
 * 		<p>Seoul</p>
 * 		<p>Bangalore</p>
 * 		<p>New York</p>
 * 		<p>London</p>
 * 	</div>
 * </Scroller>
 *
 * @module sandstone/Scroller
 * @exports Scroller
 * @exports ScrollerBase
 */

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {getRect} from '@enact/spotlight/src/utils';
import {ResizeContext} from '@enact/ui/Resizable';
import ri from '@enact/ui/resolution';
import utilDOM from '@enact/ui/Scrollable/utilDOM';
import {ScrollerBase as UiScrollerBase} from '@enact/ui/Scroller';
import PropTypes from 'prop-types';
import React, {Component, useCallback, useEffect} from 'react';

import useScroll from '../Scrollable';
import Scrollbar from '../Scrollable/Scrollbar';
import Skinnable from '../Skinnable';

import {useEventKey} from './useEvent';

const dataContainerDisabledAttribute = 'data-spotlight-container-disabled';
/**
 * A Sandstone-styled base component for [Scroller]{@link sandstone/Scroller.Scroller}.
 * In most circumstances, you will want to use the
 * [SpotlightContainerDecorator]{@link spotlight/SpotlightContainerDecorator.SpotlightContainerDecorator}
 * and the Scrollable version, [Scroller]{@link sandstone/Scroller.Scroller}.
 *
 * @class ScrollerBase
 * @memberof sandstone/Scroller
 * @extends ui/Scroller.ScrollerBase
 * @ui
 * @public
 */
class ScrollerBase extends Component {
	static displayName = 'ScrollerBase'

	static propTypes = /** @lends sandstone/Scroller.ScrollerBase.prototype */ {
		/**
		 * Passes the instance of [Scroller]{@link ui/Scroller.Scroller}.
		 *
		 * @type {Object}
		 * @param {Object} ref
		 * @private
		 */
		initUiChildRef: PropTypes.func,

		/**
		 * Called when [Scroller]{@link sandstone/Scroller.Scroller} updates.
		 *
		 * @type {function}
		 * @private
		 */
		onUpdate: PropTypes.func,

		/**
		 * `true` if rtl, `false` if ltr.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The spotlight id for the component.
		 *
		 * @type {String}
		 * @private
		 */
		spotlightId: PropTypes.string
	}
}

const useSpottable = (props, instances) => {
	const {uiChildAdapter, uiChildContainerRef} = instances;

	// Hooks

	const {addGlobalKeyDownEventListener, removeGlobalKeyDownEventListener} = useEventKey();

	const setContainerDisabled = useCallback((bool) => {
		const
			{spotlightId} = props,
			containerNode = document.querySelector(`[data-spotlight-id="${spotlightId}"]`);

		if (containerNode) {
			containerNode.setAttribute(dataContainerDisabledAttribute, bool);

			if (bool) {
				addGlobalKeyDownEventListener(() => {
					setContainerDisabled(false);
				});
			} else {
				removeGlobalKeyDownEventListener();
			}
		}
	}, [addGlobalKeyDownEventListener, props, removeGlobalKeyDownEventListener]);

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
		} while ((node = node.parentNode) && node !== uiChildContainerRef.current);
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
		const scrollerBounds = uiChildContainerRef.current.getBoundingClientRect();
		let {scrollHeight, scrollTop} = uiChildContainerRef.current;
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
		const childContainerNode = uiChildContainerRef.current;
		const {
			left: itemLeft,
			width: itemWidth
		} = getFocusedItemBounds(item);

		const
			{rtl} = props,
			{clientWidth} = uiChildAdapter.current.scrollBounds,
			rtlDirection = rtl ? -1 : 1,
			{left: containerLeft} = childContainerNode.getBoundingClientRect(),
			scrollLastPosition = scrollPosition ? scrollPosition : uiChildAdapter.current.scrollPos.left,
			currentScrollLeft = rtl ? (uiChildAdapter.current.scrollBounds.maxLeft - scrollLastPosition) : scrollLastPosition,
			// calculation based on client position
			newItemLeft = childContainerNode.scrollLeft + (itemLeft - containerLeft);
		let nextScrollLeft = uiChildAdapter.current.scrollPos.left;

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
	 * @param {Object} scrollInfo position info. `calculateScrollTop` uses
	 * `scrollInfo.previousScrollHeight` and `scrollInfo.scrollTop`
	 * @param {Number} scrollPosition last target position, passed scroll animation is ongoing
	 *
	 * @returns {Object} with keys {top, left} containing calculated top and left positions for scroll.
	 * @private
	 */
	function calculatePositionOnFocus ({item, scrollPosition}) {
		const containerNode = uiChildContainerRef.current;
		const horizontal = uiChildAdapter.current.isHorizontal();
		const vertical = uiChildAdapter.current.isVertical();

		if (!vertical && !horizontal || !item || !utilDOM.containsDangerously(containerNode, item)) {
			return;
		}

		const containerRect = getRect(containerNode);
		const itemRect = getRect(item);

		if (horizontal && !(itemRect.left >= containerRect.left && itemRect.right <= containerRect.right)) {
			uiChildAdapter.current.scrollPos.left = calculateScrollLeft(item, scrollPosition);
		}

		if (vertical && !(itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom)) {
			uiChildAdapter.current.scrollPos.top = calculateScrollTop(item);
		}

		return uiChildAdapter.current.scrollPos;
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

const useSpottableScroller = (props) => {
	const {uiChildAdapter, uiChildContainerRef} = props;

	// Hooks

	const {calculatePositionOnFocus, focusOnNode, setContainerDisabled} = useSpottable(props, {uiChildAdapter, uiChildContainerRef});

	useEffect(() => {
		props.setChildAdapter({
			calculatePositionOnFocus,
			focusOnNode,
			setContainerDisabled
		});
	}, [calculatePositionOnFocus, focusOnNode, props, props.setChildAdapter, setContainerDisabled]);

	// Render

	const propsObject = Object.assign({}, props);

	delete propsObject.scrollContainerContainsDangerously;
	delete propsObject.onUpdate;
	delete propsObject.setChildAdapter;
	delete propsObject.spotlightId;
	delete propsObject.uiScrollAdapter;

	return propsObject;
};

/**
 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
 * not move focus to the scrollbar controls.
 *
 * @name focusableScrollbar
 * @memberof sandstone/Scroller.ScrollerBase.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

/**
 * Unique identifier for the component.
 *
 * When defined and when the `Scroller` is within a [Panel]{@link sandstone/Panels.Panel}, the
 * `Scroller` will store its scroll position and restore that position when returning to the
 * `Panel`.
 *
 * @name id
 * @memberof sandstone/Scroller.ScrollerBase.prototype
 * @type {String}
 * @public
 */

/**
 * A Sandstone-styled Scroller, Scrollable applied.
 *
 * Usage:
 * ```
 * <Scroller>Scroll me.</Scroller>
 * ```
 *
 * @class Scroller
 * @memberof sandstone/Scroller
 * @extends sandstone/Scroller.ScrollerBase
 * @ui
 * @public
 */
let Scroller = (props) => {
	// Hooks

	const {
		childWrapper: ChildWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		resizeContextProps,
		scrollContainerProps,
		innerScrollContainerProps,
		childWrapperProps,
		childProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll(props);

	const uiChildProps = useSpottableScroller(childProps);

	// Render

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...innerScrollContainerProps}>
					<ChildWrapper {...childWrapperProps}>
						<UiScrollerBase {...uiChildProps} />
					</ChildWrapper>
					{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				</div>
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
		</ResizeContext.Provider>
	);
};

Scroller.propTypes = /** @lends sandstone/Scroller.Scroller.prototype */ {
	direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

	/**
	 * Specifies how to show horizontal scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	horizontalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

	/**
	 * Specifies how to show vertical scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	verticalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden'])
};

Scroller.defaultProps = {
	'data-spotlight-container-disabled': false, // eslint-disable-line react/default-props-match-prop-types
	direction: 'both',
	focusableScrollbar: false, // eslint-disable-line react/default-props-match-prop-types
	horizontalScrollbar: 'auto',
	overscrollEffectOn: { // eslint-disable-line react/default-props-match-prop-types
		arrowKey: false,
		drag: false,
		pageKey: false,
		wheel: true
	},
	type: 'JS', // eslint-disable-line react/default-props-match-prop-types
	verticalScrollbar: 'auto'
};

Scroller = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			Scroller
		)
	)
);

export default Scroller;
export {
	Scroller,
	ScrollerBase
};
