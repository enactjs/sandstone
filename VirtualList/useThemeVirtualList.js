import Spotlight, {getDirection} from '@enact/spotlight';
import Accelerator from '@enact/spotlight/Accelerator';
import Pause from '@enact/spotlight/Pause';
import {Spottable} from '@enact/spotlight/Spottable';
import ri from '@enact/ui/resolution';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import React, {useCallback, useEffect, useRef} from 'react';

import {affordanceSize, dataIndexAttribute} from '../useScroll';

import {useEventKey, useEventFocus} from './useEvent';
import usePreventScroll from './usePreventScroll';
import {useSpotlightConfig, useSpotlightRestore} from './useSpotlight';

const SpotlightAccelerator = new Accelerator();
const SpotlightPlaceholder = Spottable('div');

const
	nop = () => {},
	// using 'bitwise or' for string > number conversion based on performance: https://jsperf.com/convert-string-to-number-techniques/7
	getNumberValue = (index) => index | 0;

const useSpottable = (props, instances) => {
	const {noAffordance, scrollMode} = props;
	const {itemRefs, scrollContainerRef, scrollContentHandle} = instances;
	const getItemNode = (index) => {
		const itemNode = itemRefs.current[index % scrollContentHandle.current.state.numOfItems];
		return (itemNode && parseInt(itemNode.dataset.index) === index) ? itemNode : null;
	};

	// Mutable value

	const mutableRef = useRef({
		isScrolledBy5way: false,
		isScrolledByJump: false,
		isWrappedBy5way: false,
		lastFocusedIndex: null,
		nodeIndexToBeFocused: false,
		pause: new Pause('VirtualListBasic')
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

	useEventFocus(props, instances);

	const {
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		setPreservedIndex,
		updateStatesAndBounds
	} = useSpotlightRestore(props, {...instances, spottable: mutableRef}, {getItemNode});

	const setContainerDisabled = useCallback((bool) => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.dataset.spotlightContainerDisabled = bool;

			if (bool) {
				addGlobalKeyDownEventListener(handleGlobalKeyDown);
			} else {
				removeGlobalKeyDownEventListener();
			}
		}
	}, [addGlobalKeyDownEventListener, handleGlobalKeyDown, removeGlobalKeyDownEventListener, scrollContainerRef]);

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
		const {dimensionToExtent, primary: {clientSize, itemSize}, scrollPosition, scrollPositionTarget} = scrollContentHandle.current;
		const index = getNumberValue(target.dataset.index);

		mutableRef.current.isScrolledBy5way = false;
		mutableRef.current.isScrolledByJump = false;

		if (nextIndex >= 0) {
			const
				row = Math.floor(index / dimensionToExtent),
				nextRow = Math.floor(nextIndex / dimensionToExtent),
				start = scrollContentHandle.current.getGridPosition(nextIndex).primaryPosition,
				end = props.itemSizes ? scrollContentHandle.current.getItemBottomPosition(nextIndex) : start + itemSize,
				startBoundary = (scrollMode === 'native') ? scrollPosition : scrollPositionTarget,
				endBoundary = startBoundary + clientSize - (noAffordance ? 0 : ri.scale(affordanceSize));

			mutableRef.current.lastFocusedIndex = nextIndex;

			if (start >= startBoundary && end <= endBoundary) {
				// The next item could be still out of viewport. So we need to prevent scrolling into view with `isScrolledBy5way` flag.
				mutableRef.current.isScrolledBy5way = true;
				focusByIndex(nextIndex);
				mutableRef.current.isScrolledBy5way = false;
			} else if (row === nextRow) {
				focusByIndex(nextIndex);
			} else {
				const itemNode = getItemNode(nextIndex);

				mutableRef.current.isScrolledBy5way = true;
				mutableRef.current.isWrappedBy5way = isWrapped;

				if (isWrapped && itemNode === null) {
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
					offset: (!noAffordance && index < nextIndex) ? ri.scale(affordanceSize) : 0,
					animate: !(isWrapped && wrap === 'noAnimation')
				});
			}
		} else if (!repeat && Spotlight.move(getDirection(keyCode))) {
			SpotlightAccelerator.reset();
		}
	}

	function focusOnNode (node) {
		if (node) {
			Spotlight.focus(node);
		}
	}

	function focusByIndex (index) {
		const itemNode = getItemNode(index);

		if (!itemNode && index >= 0 && index < props.dataSize) {
			// Item is valid but since the the dom doesn't exist yet, we set the index to focus after the ongoing update
			setPreservedIndex(index);
		} else {
			if (mutableRef.current.isWrappedBy5way) {
				SpotlightAccelerator.reset();
				mutableRef.current.isWrappedBy5way = false;
			}

			pause.resume();
			focusOnNode(itemNode);
			setNodeIndexToBeFocused(null);
			mutableRef.current.isScrolledByJump = false;
		}
	}

	function initItemRef (ref, index) {
		if (ref) {
			if (scrollMode === 'translate') {
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
			{state: {numOfItems}, primary} = scrollContentHandle.current,
			offsetToClientEnd = primary.clientSize - primary.itemSize - (noAffordance ? 0 : ri.scale(affordanceSize)),
			focusedIndex = getNumberValue(item.getAttribute(dataIndexAttribute));

		if (!isNaN(focusedIndex)) {
			let gridPosition = scrollContentHandle.current.getGridPosition(focusedIndex);

			if (numOfItems > 0 && focusedIndex % numOfItems !== mutableRef.current.lastFocusedIndex % numOfItems) {
				const itemNode = getItemNode(mutableRef.current.lastFocusedIndex);

				if (itemNode) {
					itemNode.blur();
				}
			}

			setNodeIndexToBeFocused(null);
			mutableRef.current.lastFocusedIndex = focusedIndex;

			if (primary.clientSize >= primary.itemSize) {
				if (gridPosition.primaryPosition > scrollPosition + offsetToClientEnd) { // forward over
					gridPosition.primaryPosition -= pageScroll ? 0 : offsetToClientEnd;
				} else if (gridPosition.primaryPosition >= scrollPosition) { // inside of client
					if (scrollMode === 'translate') {
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
		return ((scrollMode === 'translate') ? (mutableRef.current.isScrolledBy5way) : (mutableRef.current.isScrolledBy5way || mutableRef.current.isScrolledByJump));
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
		updateStatesAndBounds
	};
};

const useThemeVirtualList = (props) => {
	const {itemRefs, scrollContainerRef, scrollContentHandle, scrollContentRef} = props;

	// Hooks

	const instance = {itemRefs, scrollContainerRef, scrollContentHandle, scrollContentRef};

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
		updateStatesAndBounds
	} = useSpottable(props, instance);

	usePreventScroll(props, instance);

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
	}, [handle, props]);

	// Functions

	function getComponentProps (index) {
		return (index === getNodeIndexToBeFocused()) ? {ref: (ref) => initItemRef(ref, index)} : {};
	}

	// Render

	const {itemRenderer, ...rest} = props;

	// not used by VirtualList
	delete rest.focusableScrollbar;
	delete rest.noAffordance;
	// not used by VirtualList
	delete rest.scrollContainerContainsDangerously;
	delete rest.scrollContainerHandle;
	delete rest.scrollContainerRef;
	delete rest.scrollContentHandle;
	delete rest.spotlightId;
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
		placeholderRenderer: (primary) => {
			return placeholderRenderer({
				handlePlaceholderFocus,
				primary
			});
		},
		onUpdateItems: handleRestoreLastFocus,
		updateStatesAndBounds: updateStatesAndBounds
	};
};

/* eslint-disable enact/prop-types */
function placeholderRenderer ({
	handlePlaceholderFocus,
	primary
}) {
	return (primary ? null : (
		<SpotlightPlaceholder
			data-index={0}
			data-vl-placeholder
			key="placeholder"
			// a zero width/height element can't be focused by spotlight so we're giving
			// the placeholder a small size to ensure it is navigable
			onFocus={handlePlaceholderFocus}
			style={{width: 10}}
		/>
	));
}
/* eslint-enable enact/prop-types */

export default useThemeVirtualList;
export {
	useThemeVirtualList
};
