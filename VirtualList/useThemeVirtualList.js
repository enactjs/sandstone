import Spotlight, {getDirection} from '@enact/spotlight';
import Accelerator from '@enact/spotlight/Accelerator';
import Pause from '@enact/spotlight/Pause';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import {Spottable} from '@enact/spotlight/Spottable';
import ri from '@enact/ui/resolution';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import {useCallback, useEffect, useRef} from 'react';

import {affordanceSize, dataIndexAttribute} from '../useScroll';

import {useEventKey, useEventFocus} from './useEvent';
import usePreventScroll from './usePreventScroll';
import {useSpotlightConfig, useSpotlightRestore} from './useSpotlight';

import css from './useThemeVirtualList.module.less';

const SpotlightAccelerator = new Accelerator();
const SpotlightPlaceholder = Spottable('div');

const
	nop = () => {},
	getNumberValue = (index) => {
		// using '+ operator' for string > number conversion based on performance: https://jsperf.com/convert-string-to-number-techniques/7
		let number = +index;
		// should return -1 if index is not a number or a negative value
		return number >= 0 ? number : -1;
	};

const useSpottable = (props, instances) => {
	const {noAffordance, scrollMode, snapToCenter} = props;
	const {itemRefs, scrollContainerRef, scrollContentHandle} = instances;
	const getItemNode = (index) => {
		const itemNode = itemRefs.current[index % scrollContentHandle.current.state.numOfItems];
		return (itemNode && parseInt(itemNode.dataset.index) === index) ? itemNode : null;
	};

	// Mutable value

	const mutableRef = useRef({
		dataSize: 0,
		isScrolledBy5way: false,
		isScrolledByJump: false,
		isScrollingBySnapToCenter: false,
		isWrappedBy5way: false,
		lastFocusedIndex: null,
		pause: new Pause('VirtualListBasic'),
		scaledTarget: null
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
				case 'acceleratedKeyDown':
					onAcceleratedKeyDown(param);
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
				case 'keyLeave':
					SpotlightAccelerator.reset();
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

	useEventFocus(props, instances, {removeScaleEffect: removeScaleEffect.bind(this)});

	const {
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		setPreservedIndex,
		updateStatesAndBounds
	} = useSpotlightRestore(props, {...instances, spottable: mutableRef}, {focusByIndex, getItemNode});

	function pauseSpotlight (bool) {
		if (bool) {
			pause.pause();
		} else {
			pause.resume();
		}
	}

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
	function handleGlobalKeyDown (ev) {
		// To prevent scrolling by native scroller
		if (scrollMode === 'native') {
			ev.preventDefault();
			ev.stopPropagation();
		}

		setContainerDisabled(false);
	}

	useEffect(() => {
		if (scrollContainerRef.current && scrollContainerRef.current.dataset.spotlightContainerDisabled === 'true') {
			removeGlobalKeyDownEventListener();
			addGlobalKeyDownEventListener(handleGlobalKeyDown);
		}
	}, [handleGlobalKeyDown]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		return () => {
			pause.resume();
			SpotlightAccelerator.reset();

			setContainerDisabled(false);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (props.dataSize !== mutableRef.current.dataSize) {
		const current = Spotlight.getCurrent();
		if (current && props.scrollContainerContainsDangerously(current) && current.dataset?.index > props.dataSize - 1) {
			// if a focused item is about to disappear
			setPreservedIndex(props.dataSize - 1);
		}
		mutableRef.current.dataSize = props.dataSize;
	}

	// Functions

	function onAcceleratedKeyDown ({isWrapped, keyCode, nextIndex, repeat, target}) {
		const {cbScrollTo, dataSize, wrap, direction: orientation} = props;
		const {dimensionToExtent, primary: {clientSize, itemSize}, scrollPosition, scrollPositionTarget} = scrollContentHandle.current;
		const index = getNumberValue(target.dataset.index);
		const direction = getDirection(keyCode);
		const allowAffordance = !(noAffordance || orientation === 'horizontal');
		const shouldMove = snapToCenter ? nextIndex > 0 && nextIndex < (dataSize - 1) && index > 0 : nextIndex >= 0 && index >= 0;

		mutableRef.current.isScrolledBy5way = false;
		mutableRef.current.isScrolledByJump = false;

		if (shouldMove) {
			const
				row = Math.floor(index / dimensionToExtent),
				nextRow = Math.floor(nextIndex / dimensionToExtent),
				start = scrollContentHandle.current.getGridPosition(nextIndex).primaryPosition,
				end = props.itemSizes ? scrollContentHandle.current.getItemBottomPosition(nextIndex) : start + itemSize,
				startBoundary = (scrollMode === 'native') ? scrollPosition : scrollPositionTarget,
				endBoundary = startBoundary + clientSize - (!allowAffordance ? 0 : ri.scale(affordanceSize));

			mutableRef.current.lastFocusedIndex = nextIndex;

			if (start >= startBoundary && end <= endBoundary) {
				// The next item could be still out of viewport. So we need to prevent scrolling into view with `isScrolledBy5way` flag.
				mutableRef.current.isScrolledBy5way = true;
				focusByIndex(nextIndex, direction);
				mutableRef.current.isScrolledBy5way = false;
			} else if (row === nextRow) {
				focusByIndex(nextIndex, direction);
			} else if (!snapToCenter || !mutableRef.current.isScrollingBySnapToCenter) {
				const itemNode = getItemNode(nextIndex);
				let stickTo = Math.abs(endBoundary - end) < Math.abs(startBoundary - start) ? 'end' : 'start';
				stickTo = snapToCenter ? 'center' : stickTo;

				mutableRef.current.isScrolledBy5way = true;
				mutableRef.current.isWrappedBy5way = isWrapped;
				if (snapToCenter) {
					mutableRef.current.isScrollingBySnapToCenter = true;
				}

				if (isWrapped && wrap === true && itemNode === null) {
					pause.pause();
					target.blur();
				}
				focusByIndex(nextIndex, direction, true);

				cbScrollTo({
					index: nextIndex,
					stickTo,
					offset: (allowAffordance && stickTo === 'end') ? ri.scale(affordanceSize) : 0,
					disallowNegativeOffset: true,
					animate: !(isWrapped && wrap === 'noAnimation'),
					focus: snapToCenter
				});
			}
		} else if (!repeat && Spotlight.move(direction)) {
			SpotlightAccelerator.reset();
		}
	}

	function focusOnNode (node) {
		if (node) {
			return Spotlight.focus(node);
		}

		return false;
	}

	function focusByIndex (index, direction, waiting) {
		const itemNode = getItemNode(index);
		let returnVal = false;

		if (!itemNode && index >= 0 && index < props.dataSize) {
			// Item is valid but since the dom doesn't exist yet, we set the index to focus after the ongoing update
			setPreservedIndex(index, direction);
		} else {
			const
				current = Spotlight.getCurrent(),
				candidate = current ? getTargetByDirectionFromElement(direction, current) : itemNode;

			// Remove any preservedIndex
			setPreservedIndex(-1);

			if (mutableRef.current.isWrappedBy5way) {
				SpotlightAccelerator.reset();
				mutableRef.current.isWrappedBy5way = false;
			}

			pause.resume();
			if (utilDOM.containsDangerously(itemNode, candidate)) {
				returnVal = focusOnNode(candidate);
			} else if (!mutableRef.current.isScrollingBySnapToCenter || props.scrollContainerContainsDangerously(current)) {
				returnVal = focusOnNode(itemNode);
			}
			mutableRef.current.isScrolledBy5way = false;
			mutableRef.current.isScrolledByJump = false;
			if (!waiting) {
				mutableRef.current.isScrollingBySnapToCenter = false;
			}
		}

		return returnVal;
	}

	function calculatePositionOnFocus ({item, scrollPosition = scrollContentHandle.current.scrollPosition}) {
		const {pageScroll, direction} = props;
		const {state: {numOfItems}, primary} = scrollContentHandle.current;
		const allowAffordance = !(noAffordance || direction === 'horizontal');
		const offsetToClientEnd = Math.max(0, primary.clientSize - (snapToCenter ? primary.gridSize : primary.itemSize) - (!allowAffordance ? 0 : ri.scale(affordanceSize)));
		const focusedIndex = getNumberValue(item.getAttribute(dataIndexAttribute));
		const offsetToCenter = snapToCenter ? (primary.clientSize / 2 - primary.gridSize / 2) : 0;

		if (focusedIndex >= 0) {
			let gridPosition = scrollContentHandle.current.getGridPosition(focusedIndex);

			if (numOfItems > 0 && focusedIndex % numOfItems !== mutableRef.current.lastFocusedIndex % numOfItems) {
				const itemNode = getItemNode(mutableRef.current.lastFocusedIndex);

				if (itemNode) {
					itemNode.blur();
				}
			}

			mutableRef.current.lastFocusedIndex = focusedIndex;

			if (primary.clientSize >= primary.itemSize) {
				if (gridPosition.primaryPosition > scrollPosition + offsetToClientEnd) { // forward over
					gridPosition.primaryPosition -= pageScroll ? 0 : offsetToClientEnd - offsetToCenter;
				} else if (gridPosition.primaryPosition >= scrollPosition) { // inside of client
					if (scrollMode === 'translate') {
						gridPosition.primaryPosition = scrollPosition;
					} else {
						// This code uses the trick to change the target position slightly which will not affect the actual result
						// since a browser ignore `scrollTo` method if the target position is same as the current position.
						gridPosition.primaryPosition = scrollPosition + (scrollContentHandle.current.scrollPosition === scrollPosition ? 0.1 : 0);
					}
				} else { // backward over
					gridPosition.primaryPosition -= pageScroll ? offsetToClientEnd : offsetToCenter;
				}
			}

			// Since the result is used as a target position to be scrolled,
			// secondaryPosition should be 0 here.
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

	function resetSnapToCenterStatus () {
		mutableRef.current.isScrollingBySnapToCenter = false;
	}

	function addScaleEffect (elem) {
		elem.classList.add(css.scaled);
		mutableRef.current.scaledTarget = elem;
	}

	function removeScaleEffect () {
		if (mutableRef.current.scaledTarget) {
			mutableRef.current.scaledTarget.classList.remove(css.scaled);
			mutableRef.current.scaledTarget = null;
		}
	}

	function getScrollBounds () {
		return scrollContentHandle.current.getScrollBounds();
	}

	// Return

	return {
		addScaleEffect,
		calculatePositionOnFocus,
		focusByIndex,
		focusOnNode,
		getScrollBounds,
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		pauseSpotlight,
		removeScaleEffect,
		resetSnapToCenterStatus,
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
		addScaleEffect,
		calculatePositionOnFocus,
		focusByIndex,
		focusOnNode,
		getScrollBounds,
		handlePlaceholderFocus,
		handleRestoreLastFocus,
		pauseSpotlight,
		removeScaleEffect,
		resetSnapToCenterStatus,
		setContainerDisabled,
		setLastFocusedNode,
		shouldPreventOverscrollEffect,
		shouldPreventScrollByFocus,
		updateStatesAndBounds
	} = useSpottable(props, instance);

	usePreventScroll(props, instance);

	const handle = {
		addScaleEffect,
		calculatePositionOnFocus,
		focusByIndex,
		focusOnNode,
		getScrollBounds,
		pauseSpotlight,
		removeScaleEffect,
		resetSnapToCenterStatus,
		setContainerDisabled,
		setLastFocusedNode,
		shouldPreventOverscrollEffect,
		shouldPreventScrollByFocus
	};

	props.setThemeScrollContentHandle(handle);

	function getAffordance () {
		// To add space for the last item margin bottom
		return props.noAffordance ? 0 : ri.scale(30);
	}

	// Render

	const {
		itemRenderer,
		'data-webos-voice-focused': voiceFocused,
		'data-webos-voice-group-label': voiceGroupLabel,
		'data-webos-voice-disabled': voiceDisabled,
		...rest
	} = props;

	delete rest.noAffordance;
	delete rest.scrollContainerContainsDangerously;
	delete rest.scrollContainerHandle;
	delete rest.scrollContainerRef;
	delete rest.scrollContentHandle;
	delete rest.snapToCenter;
	delete rest.spotlightId;
	delete rest.wrap;

	return {
		...rest,
		containerProps: {
			'data-webos-voice-focused': voiceFocused,
			'data-webos-voice-group-label': voiceGroupLabel,
			'data-webos-voice-disabled': voiceDisabled
		},
		getAffordance,
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
