/**
 * Provides Sandstone-themed scrollable components and behaviors.
 *
 * @module sandstone/Scrollable
 * @exports Scrollable
 * @private
 */

import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import platform from '@enact/core/platform';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import {spottableClass} from '@enact/spotlight/Spottable';
import {getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {getRect, intersects} from '@enact/spotlight/src/utils';
import {ScrollContext as uiScrollContext, useScrollBase, utilDecorateChildProps} from '@enact/ui/Scrollable';
import utilDOM from '@enact/ui/Scrollable/utilDOM';
import utilEvent from '@enact/ui/Scrollable/utilEvent';
import PropTypes from 'prop-types';
import React, {Component, useContext, useRef} from 'react';

import {SharedState} from '../internal/SharedStateDecorator';

import {
	useEventFocus, useEventKey, useEventMonitor, useEventMouse,
	useEventTouch, useEventVoice, useEventWheel
} from './useEvent';
import useOverscrollEffect from './useOverscrollEffect';
import useScrollbar from './useScrollbar';
import {useSpotlightRestore} from './useSpotlight';

import overscrollCss from './OverscrollEffect.module.less';

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

const ScrollContext = React.createContext();

/**
 * Default config for {@link sandstone/ScrollContextDecorator.ScrollContextDecorator}.
 *
 * @memberof sandstone/ScrollContextDecorator.ScrollContextDecorator
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * Configures ...
	 *
	 * @type {String}
	 * @default 'children'
	 * @memberof sandstone/A11yDecorator.A11yDecorator.defaultConfig
	 */
};

const ScrollContextDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const Wrapper = (props) => {
		const overscrollRefs = {
			horizontal: React.useRef(),
			vertical: React.useRef()
		};

		const isContent = (container, element) => {
			return (element && utilDOM.containsDangerously(container, element));
		};

		const scrollMutableRef = useRef({
			animateOnFocus: false,
			indexToFocus: null,
			lastScrollPositionOnFocus: null,
			nodeToFocus: null,
			pointToFocus: null,

			isContent,
			isWheeling: false,

			// For VirtualList
			...(props.itemRenderer ?
				{
					isScrolledBy5way: false,
					isScrolledByJump: false,
					isWrappedBy5way: false,
					lastFocusedIndex: null,
					nodeIndexToBeFocused: false,
					pause: new Pause('VirtualListBase')
				} :
				{}
			)
		});

		return (
			<ScrollContext.Provider
				value={{
					scrollMutableRef,
					overscrollRefs
				}}
			>
				<Wrapped {...props} />;
			</ScrollContext.Provider>
		);
	};

	Wrapper.propTypes = {
		itemRenderer: PropTypes.func
	};

	return Wrapper;
});

const useSpottableScroll = (props) => {
	const {scrollMutableRef} = useContext(ScrollContext);
	const {scrollMutableRef: uiScrollMutableRef, uiScrollContainerRef} = useContext(uiScrollContext);
	const {type} = props;
	const contextSharedState = useContext(SharedState);

	// Hooks

	const {
		alertThumb,
		scrollbarProps
	} = useScrollbar(props);

	useSpotlightRestore(props);

	const {
		applyOverscrollEffect,
		checkAndApplyOverscrollEffectByDirection,
		clearOverscrollEffect
	} = useOverscrollEffect({});

	const {handleWheel} = useEventWheel(props);

	const {calculateAndScrollTo, handleFocus, hasFocus} = useEventFocus(props, {alertThumb});

	const {handleKeyDown, lastPointer, scrollByPageOnPointerMode} = useEventKey(props, {checkAndApplyOverscrollEffectByDirection, hasFocus});

	useEventMonitor({}, {lastPointer, scrollByPageOnPointerMode});

	const {handleFlick, handleMouseDown} = useEventMouse(props);

	const {handleTouchStart} = useEventTouch();

	const {
		addVoiceEventListener,
		removeVoiceEventListener,
		stopVoice
	} = useEventVoice(props);

	// Functions

	function scrollTo (opt) {
		scrollMutableRef.current.indexToFocus = (opt.focus && typeof opt.index === 'number') ? opt.index : null;
		scrollMutableRef.current.nodeToFocus = (opt.focus && opt.node instanceof Object && opt.node.nodeType === 1) ? opt.node : null;
	}

	function start (animate) {
		if (type === 'Native' && !animate) {
			focusOnItem();
		}
	}

	function stop () {
		if (!props['data-spotlight-container-disabled']) {
			scrollMutableRef.current.setContainerDisabled(false);
		}

		focusOnItem();
		scrollMutableRef.current.lastScrollPositionOnFocus = null;
		scrollMutableRef.current.isWheeling = false;
		stopVoice();
	}

	function scrollStopOnScroll () {
		stop();
	}

	function focusOnItem () {
		if (scrollMutableRef.current.indexToFocus !== null && typeof scrollMutableRef.current.focusByIndex === 'function') {
			scrollMutableRef.current.focusByIndex(scrollMutableRef.current.indexToFocus);
			scrollMutableRef.current.indexToFocus = null;
		}

		if (scrollMutableRef.current.nodeToFocus !== null && typeof scrollMutableRef.current.focusOnNode === 'function') {
			scrollMutableRef.current.focusOnNode(scrollMutableRef.current.nodeToFocus);
			scrollMutableRef.current.nodeToFocus = null;
		}

		if (scrollMutableRef.current.pointToFocus !== null) {
			// no need to focus on pointer mode
			if (!Spotlight.getPointerMode()) {
				const
					{direction, x, y} = scrollMutableRef.current.pointToFocus,
					position = {x, y},
					elemFromPoint = document.elementFromPoint(x, y),
					target =
						elemFromPoint && elemFromPoint.closest && getIntersectingElement(elemFromPoint.closest(`.${spottableClass}`), uiScrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(direction, position, uiScrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(reverseDirections[direction], position, uiScrollContainerRef.current);

				if (target) {
					Spotlight.focus(target);
				}
			}

			scrollMutableRef.current.pointToFocus = null;
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
		if (uiScrollMutableRef.current.scrollToInfo === null) {
			const scrollHeight = uiScrollMutableRef.current.getScrollBounds().scrollHeight;

			if (scrollHeight !== uiScrollMutableRef.current.bounds.scrollHeight) {
				calculateAndScrollTo();
			}
		}

		// oddly, Scroller manages uiScrollMutableRef.current.bounds so if we don't update it here (it is also
		// updated in calculateAndScrollTo but we might not have made it to that point), it will be
		// out of date when we land back in this method next time.
		uiScrollMutableRef.current.bounds.scrollHeight = uiScrollMutableRef.current.getScrollBounds().scrollHeight;
	}

	function handleResizeWindow () {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function addEventListeners (ref) { // `ref` is always `uiChildContainerRef`.
		utilEvent('focusin').addEventListener(ref, handleFocus);

		if (ref.current) {
			addVoiceEventListener(ref);
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function removeEventListeners (ref) { // `ref` is always `uiChildContainerRef`.
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

	// Hooks

	const {overscrollRefs} = useContext(ScrollContext);

	const {
		uiScrollContainerRef,
		uiChildContainerRef,
		horizontalScrollbarRef,
		verticalScrollbarRef,
		isHorizontalScrollbarVisible
	} = useContext(uiScrollContext);

	const
		decoratedChildProps = {},
		decorateChildProps = utilDecorateChildProps(decoratedChildProps),
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
	} = useSpottableScroll(props);

	// Render

	if (type === 'JS') {
		scrollProps.stop = stop;
	} else {
		scrollProps.scrollStopOnScroll = scrollStopOnScroll;
		scrollProps.start = start;
	}

	decorateChildProps('scrollContainerProps', {
		className: [overscrollCss.scroll],
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		onTouchStart: handleTouchStart
	});

	decorateChildProps('innerScrollContainerProps', {
		className: [overscrollCss.overscrollFrame, overscrollCss.vertical]
	});

	decorateChildProps('childWrapperProps', {
		className: [overscrollCss.overscrollFrame, overscrollCss.horizontal]
	});

	decorateChildProps('childProps', {
		onUpdate: handleScrollerUpdate,
		spotlightId
	});

	decorateChildProps('verticalScrollbarProps', {
		...scrollbarProps,
		focusableScrollbar
	});

	decorateChildProps('horizontalScrollbarProps', {
		...scrollbarProps,
		focusableScrollbar
	});

	useScrollBase({
		...rest,
		...scrollProps,
		decorateChildProps,
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
		type,
		uiChildContainerRef,
		uiScrollContainerRef,
		verticalScrollbarRef
	});

	decorateChildProps('innerScrollContainerProps', {
		className: [...(isHorizontalScrollbarVisible ? overscrollCss.horizontalScrollbarVisible : [])]
	});

	decorateChildProps('scrollContainerProps', {ref: uiScrollContainerRef});
	decorateChildProps('innerScrollContainerProps', {ref: overscrollRefs.vertical});
	decorateChildProps('childWrapperProps', {ref: overscrollRefs.horizontal});
	decorateChildProps('childProps', {uiChildContainerRef});
	decorateChildProps('verticalScrollbarProps', {ref: verticalScrollbarRef});
	decorateChildProps('horizontalScrollbarProps', {ref: horizontalScrollbarRef});

	return decoratedChildProps;
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
	ScrollContext,
	ScrollContextDecorator,
	useScroll
};
