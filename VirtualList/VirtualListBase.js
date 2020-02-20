import Spotlight, {getDirection} from '@enact/spotlight';
import Accelerator from '@enact/spotlight/Accelerator';
import Pause from '@enact/spotlight/Pause';
import {Spottable, spottableClass} from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import React, {Component, useCallback, useEffect, useRef} from 'react';

import {dataIndexAttribute} from '../Scrollable';

import {useEventKey} from './useEvent';
import usePreventScroll from './usePreventScroll';
import {useSpotlightConfig, useSpotlightRestore} from './useSpotlight';

const SpotlightAccelerator = new Accelerator();
const SpotlightPlaceholder = Spottable('div');

const nop = () => {};

class VirtualListCore extends Component {
	displayName = 'VirtualListBase'

	static propTypes = /** @lends sandstone/VirtualList.VirtualListBase.prototype */ {
		/**
		 * The `render` function called for each item in the list.
		 *
		 * > NOTE: The list does NOT always render a component whenever its render function is called
		 * due to performance optimization.
		 *
		 * Usage:
		 * ```
		 * renderItem = ({index, ...rest}) => {
		 * 	return (
		 * 		<MyComponent index={index} {...rest} />
		 * 	);
		 * }
		 * ```
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @param {Number} event.data-index It is required for Spotlight 5-way navigation. Pass to the root element in the component.
		 * @param {Number} event.index The index number of the component to render
		 * @param {Number} event.key It MUST be passed as a prop to the root element in the component for DOM recycling.
		 *
		 * @required
		 * @public
		 */
		itemRenderer: PropTypes.func.isRequired,

		/**
		 * The render function for the items.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		itemsRenderer: PropTypes.func.isRequired,

		/**
		 * Callback method of scrollTo.
		 * Normally, [Scrollable]{@link ui/Scrollable.Scrollable} should set this value.
		 *
		 * @type {Function}
		 * @private
		 */
		cbScrollTo: PropTypes.func,

		/**
		 * Size of the data.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		dataSize: PropTypes.number,

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
		 * Prop to check if horizontal Scrollbar exists or not.
		 *
		 * @type {Boolean}
		 * @private
		 */
		isHorizontalScrollbarVisible: PropTypes.bool,

		/**
		 * Prop to check if vertical Scrollbar exists or not.
		 *
		 * @type {Boolean}
		 * @private
		 */
		isVerticalScrollbarVisible: PropTypes.bool,

		/**
		 * The array for individually sized items.
		 *
		 * @type {Number[]}
		 * @private
		 */
		itemSizes: PropTypes.array,

		/**
		 * It scrolls by page when `true`, by item when `false`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		pageScroll: PropTypes.bool,

		/**
		 * The ARIA role for the list.
		 *
		 * @type {String}
		 * @default 'list'
		 * @public
		 */
		role: PropTypes.string,

		/**
		 * `true` if rtl, `false` if ltr.
		 * Normally, [Scrollable]{@link ui/Scrollable.Scrollable} should set this value.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Spacing between items.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		spacing: PropTypes.number,

		/**
		 * Spotlight Id. It would be the same with [Scrollable]{@link ui/Scrollable.Scrollable}'s.
		 *
		 * @type {String}
		 * @private
		 */
		spotlightId: PropTypes.string,

		/**
		 * TBD
		 */
		type: PropTypes.string,

		/**
		 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
		 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
		 *
		 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
		 * except that a list is scrolled without an animation.
		 *
		 * @type {Boolean|String}
		 * @default false
		 * @public
		 */
		wrap: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.oneOf(['noAnimation'])
		])
	}

	static defaultProps = {
		dataSize: 0,
		focusableScrollbar: false,
		pageScroll: false,
		spacing: 0,
		type: 'JS',
		wrap: false
	}
}

const
	dataContainerDisabledAttribute = 'data-spotlight-container-disabled',
	JS = 'JS',
	// using 'bitwise or' for string > number conversion based on performance: https://jsperf.com/convert-string-to-number-techniques/7
	getNumberValue = (index) => index | 0,
	spottableSelector = `.${spottableClass}`;

const useSpottable = (props, instances, context) => {
	const {scrollContentHandle, scrollContentRef} = instances;
	const {type} = context;

	// Mutable value

	const mutableRef = useRef({
		isScrolledBy5way: false,
		isScrolledByJump: false,
		isWrappedBy5way: false,
		lastFocusedIndex: null,
		nodeIndexToBeFocused: false,
		pause: new Pause('VirtualListBase')
	});

	const {pause} = mutableRef.current;

	// Hooks

	useSpotlightConfig(props, {spottable: mutableRef});

	const {addGlobalKeyDownEventListener, removeGlobalKeyDownEventListener} = useEventKey(props, instances, {
		handlePageUpDownKeyDown: () => {
			mutableRef.current.isScrolledBy5way = false;
		},
		handleDirectionKeyDown: (ev, eventType, param) => {
			switch (eventType) {
				case 'acceleratedKeyDown': onAcceleratedKeyDown(param);
					break;
				case 'keyDown':
					if (Spotlight.move(param.direction)) {
						const nextTargetIndex = Spotlight.getCurrent().dataset.index;

						ev.preventDefault();
						ev.stopPropagation();

						if (typeof nextTargetIndex === 'string') {
							onAcceleratedKeyDown({...param, nextIndex: getNumberValue(nextTargetIndex)});
						}
					}
					break;
				case 'keyLeave': SpotlightAccelerator.reset();
					break;
			}
		},
		handle5WayKeyUp: () => {
			SpotlightAccelerator.reset();
		},
		spotlightAcceleratorProcessKey: (ev) => {
			return SpotlightAccelerator.processKey(ev, nop);
		}
	});

	const {
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		setPreservedIndex,
		updateStatesAndBounds
	} = useSpotlightRestore(props, {...instances, spottable: mutableRef});

	const setContainerDisabled = useCallback((bool) => {
		const
			{spotlightId} = props,
			containerNode = document.querySelector(`[data-spotlight-id="${spotlightId}"]`);

		if (containerNode) {
			containerNode.setAttribute(dataContainerDisabledAttribute, bool);

			if (bool) {
				addGlobalKeyDownEventListener(handleGlobalKeyDown);
			} else {
				removeGlobalKeyDownEventListener();
			}
		}
	}, [addGlobalKeyDownEventListener, handleGlobalKeyDown, props, removeGlobalKeyDownEventListener]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function handleGlobalKeyDown () {
		setContainerDisabled(false);
	}

	useEffect(() => {
		return () => {
			// TODO: Fix eslint
			pause.resume(); // eslint-disable-line react-hooks/exhaustive
			SpotlightAccelerator.reset();

			setContainerDisabled(false);
		};
	}, [pause, setContainerDisabled]);

	// Functions

	function getNodeIndexToBeFocused () {
		return mutableRef.current.nodeIndexToBeFocused;
	}

	function setNodeIndexToBeFocused (index) {
		mutableRef.current.nodeIndexToBeFocused = index;
	}

	function onAcceleratedKeyDown ({isWrapped, keyCode, nextIndex, repeat, target}) {
		const {cbScrollTo, wrap} = props;
		const {dimensionToExtent, primary: {clientSize, itemSize}, scrollPositionTarget} = scrollContentHandle.current;
		const index = getNumberValue(target.dataset.index);

		mutableRef.current.isScrolledBy5way = false;
		mutableRef.current.isScrolledByJump = false;

		if (nextIndex >= 0) {
			const
				row = Math.floor(index / dimensionToExtent),
				nextRow = Math.floor(nextIndex / dimensionToExtent),
				start = scrollContentHandle.current.getGridPosition(nextIndex).primaryPosition,
				end = props.itemSizes ? scrollContentHandle.current.getItemBottomPosition(nextIndex) : start + itemSize;

			mutableRef.current.lastFocusedIndex = nextIndex;

			if (start >= scrollPositionTarget && end <= scrollPositionTarget + clientSize) {
				// The next item could be still out of viewport. So we need to prevent scrolling into view with `isScrolledBy5way` flag.
				mutableRef.current.isScrolledBy5way = true;
				focusByIndex(nextIndex);
				mutableRef.current.isScrolledBy5way = false;
			} else if (row === nextRow) {
				focusByIndex(nextIndex);
			} else {
				mutableRef.current.isScrolledBy5way = true;
				mutableRef.current.isWrappedBy5way = isWrapped;

				if (isWrapped && (
					scrollContentRef.current.querySelector(`[data-index='${nextIndex}']${spottableSelector}`) == null
				)) {
					if (wrap === true) {
						pause.pause();
						target.blur();
					} else {
						focusByIndex(nextIndex);
					}

					setNodeIndexToBeFocused(nextIndex);
				} else {
					focusByIndex(nextIndex);
				}

				cbScrollTo({
					index: nextIndex,
					stickTo: index < nextIndex ? 'end' : 'start',
					animate: !(isWrapped && wrap === 'noAnimation')
				});
			}
		} else if (!repeat && Spotlight.move(getDirection(keyCode))) {
			SpotlightAccelerator.reset();
		}
	}

	/**
	 * Focus on the Node of the VirtualList item
	 */
	function focusOnNode (node) {
		if (node) {
			Spotlight.focus(node);
		}
	}

	function focusByIndex (index) {
		const item = scrollContentRef.current.querySelector(`[data-index='${index}']${spottableSelector}`);

		if (!item && index >= 0 && index < props.dataSize) {
			// Item is valid but since the the dom doesn't exist yet, we set the index to focus after the ongoing update
			setPreservedIndex(index);
		} else {
			if (mutableRef.current.isWrappedBy5way) {
				SpotlightAccelerator.reset();
				mutableRef.current.isWrappedBy5way = false;
			}

			pause.resume();
			focusOnNode(item);
			setNodeIndexToBeFocused(null);
			mutableRef.current.isScrolledByJump = false;
		}
	}

	function initItemRef (ref, index) {
		if (ref) {
			if (type === JS) {
				focusByIndex(index);
			} else {
				// If focusing the item of VirtuallistNative, `onFocus` in Scrollable will be called.
				// Then VirtualListNative tries to scroll again differently from VirtualList.
				// So we would like to skip `focus` handling when focusing the item as a workaround.
				mutableRef.current.isScrolledByJump = true;
				focusByIndex(index);
			}
		}
	}

	function isNeededScrollingPlaceholder () {
		return mutableRef.current.nodeIndexToBeFocused != null && Spotlight.isPaused();
	}

	function calculatePositionOnFocus ({item, scrollPosition = scrollContentHandle.current.scrollPosition}) {
		const

			{pageScroll} = props,
			{numOfItems, primary} = scrollContentHandle.current,
			offsetToClientEnd = primary.clientSize - primary.itemSize,
			focusedIndex = getNumberValue(item.getAttribute(dataIndexAttribute));

		if (!isNaN(focusedIndex)) {
			let gridPosition = scrollContentHandle.current.getGridPosition(focusedIndex);

			if (numOfItems > 0 && focusedIndex % numOfItems !== mutableRef.current.lastFocusedIndex % numOfItems) {
				const node = scrollContentHandle.current.getItemNode(mutableRef.current.lastFocusedIndex);

				if (node) {
					node.blur();
				}
			}

			setNodeIndexToBeFocused(null);
			mutableRef.current.lastFocusedIndex = focusedIndex;

			if (primary.clientSize >= primary.itemSize) {
				if (gridPosition.primaryPosition > scrollPosition + offsetToClientEnd) { // forward over
					gridPosition.primaryPosition -= pageScroll ? 0 : offsetToClientEnd;
				} else if (gridPosition.primaryPosition >= scrollPosition) { // inside of client
					if (type === JS) {
						gridPosition.primaryPosition = scrollPosition;
					} else {
						// This code uses the trick to change the target position slightly which will not affect the actual result
						// since a browser ignore `scrollTo` method if the target position is same as the current position.
						gridPosition.primaryPosition = scrollPosition + (scrollContentHandle.current.scrollPosition === scrollPosition ? 0.1 : 0);
					}
				} else { // backward over
					gridPosition.primaryPosition -= pageScroll ? offsetToClientEnd : 0;
				}
			}

			// Since the result is used as a target position to be scrolled,
			// scrondaryPosition should be 0 here.
			gridPosition.secondaryPosition = 0;

			return scrollContentHandle.current.gridPositionToItemPosition(gridPosition);
		}
	}

	function shouldPreventScrollByFocus () {
		return ((type === JS) ? (mutableRef.current.isScrolledBy5way) : (mutableRef.current.isScrolledBy5way || mutableRef.current.isScrolledByJump));
	}

	function shouldPreventOverscrollEffect () {
		return mutableRef.current.isWrappedBy5way;
	}

	function setLastFocusedNode (node) {
		mutableRef.current.lastFocusedIndex = node.dataset && getNumberValue(node.dataset.index);
	}

	function getScrollBounds () {
		return scrollContentHandle.current.getScrollBounds();
	}

	// Return

	return {
		calculatePositionOnFocus,
		focusByIndex,
		focusOnNode,
		getNodeIndexToBeFocused,
		getScrollBounds,
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		initItemRef,
		isNeededScrollingPlaceholder,
		setContainerDisabled,
		setLastFocusedNode,
		shouldPreventOverscrollEffect,
		shouldPreventScrollByFocus,
		SpotlightPlaceholder,
		updateStatesAndBounds
	};
};

const useSpottableVirtualList = (props) => {
	const {type, scrollContentHandle, scrollContentRef} = props;

	// Hooks

	const instance = {scrollContentHandle, scrollContentRef};

	const {
		calculatePositionOnFocus,
		focusByIndex,
		focusOnNode,
		getNodeIndexToBeFocused,
		getScrollBounds,
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		initItemRef,
		isNeededScrollingPlaceholder,
		setContainerDisabled,
		setLastFocusedNode,
		shouldPreventOverscrollEffect,
		shouldPreventScrollByFocus,
		SpotlightPlaceholder, // eslint-disable-line no-shadow
		updateStatesAndBounds
	} = useSpottable(props, instance, {type});

	usePreventScroll(props, instance, {type});

	const handle = {
		calculatePositionOnFocus,
		focusByIndex,
		focusOnNode,
		getScrollBounds,
		setContainerDisabled,
		setLastFocusedNode,
		shouldPreventOverscrollEffect,
		shouldPreventScrollByFocus
	};
	useEffect(() => {
		props.setThemeScrollContentHandle(handle);
	}, [handle, props, props.setThemeScrollContentHandle]);

	// Functions

	function getComponentProps (index) {
		return (index === getNodeIndexToBeFocused()) ? {ref: (ref) => initItemRef(ref, index)} : {};
	}

	// Render

	const
		{itemRenderer, role, ...rest} = props,
		needsScrollingPlaceholder = isNeededScrollingPlaceholder();

	// not used by VirtualList
	delete rest.scrollContainerContainsDangerously;
	// not used by VirtualList
	delete rest.focusableScrollbar;
	delete rest.spotlightId;
	delete rest.scrollContainerHandle;
	delete rest.wrap;

	return {
		...rest,
		getComponentProps,
		itemRenderer: ({index, ...itemRest}) => (
			itemRenderer({
				...itemRest,
				[dataIndexAttribute]: index,
				index
			})
		),
		itemsRenderer: (itemsRendererProps) => {
			return listItemsRenderer({
				...itemsRendererProps,
				handlePlaceholderFocus: handlePlaceholderFocus,
				needsScrollingPlaceholder,
				role,
				SpotlightPlaceholder
			});
		},
		onUpdateItems: handleRestoreLastFocus,
		updateStatesAndBounds: updateStatesAndBounds
	};
};

/**
 * A Sandstone-styled base component for [VirtualList]{@link sandstone/VirtualList.VirtualList} and
 * [VirtualGridList]{@link sandstone/VirtualList.VirtualGridList}.
 *
 * @class VirtualListBase
 * @memberof sandstone/VirtualList
 * @extends ui/VirtualList.VirtualListBase
 * @ui
 * @public
 */
const VirtualListBase = VirtualListCore;

/**
 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
 * not move focus to the scrollbar controls.
 *
 * @name focusableScrollbar
 * @memberof sandstone/VirtualList.VirtualListBase.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

/**
 * Unique identifier for the component.
 *
 * When defined and when the `VirtualList` is within a [Panel]{@link sandstone/Panels.Panel},
 * the `VirtualList` will store its scroll position and restore that position when returning to
 * the `Panel`.
 *
 * @name id
 * @memberof sandstone/VirtualList.VirtualListBase.prototype
 * @type {String}
 * @public
 */

/* eslint-disable enact/prop-types */
function listItemsRenderer (props) {
	const {
		cc,
		handlePlaceholderFocus,
		itemContainerRef: initUiItemContainerRef,
		needsScrollingPlaceholder,
		primary,
		role,
		SpotlightPlaceholder // eslint-disable-line no-shadow
	} = props;

	return (
		<>
			{cc.length ? (
				<div ref={initUiItemContainerRef} role={role}>{cc}</div>
			) : null}
			{primary ? null : (
				<SpotlightPlaceholder
					data-index={0}
					data-vl-placeholder
					// a zero width/height element can't be focused by spotlight so we're giving
					// the placeholder a small size to ensure it is navigable
					onFocus={handlePlaceholderFocus}
					style={{width: 10}}
				/>
			)}
			{needsScrollingPlaceholder ? (
				<SpotlightPlaceholder />
			) : null}
		</>
	);
}
/* eslint-enable enact/prop-types */

export default useSpottableVirtualList;
export {
	useSpottableVirtualList,
	VirtualListBase
};
