import {is} from '@enact/core/keymap';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import clamp from 'ramda/src/clamp';
import {useCallback, useEffect, useRef} from 'react';

const
	isDown = is('down'),
	isEnter = is('enter'),
	isLeft = is('left'),
	isPageUp = is('pageUp'),
	isPageDown = is('pageDown'),
	isRight = is('right'),
	isUp = is('up'),
	getNumberValue = (index) => {
		// using '+ operator' for string > number conversion based on performance: https://jsperf.com/convert-string-to-number-techniques/7
		let number = +index;
		// should return -1 if index is not a number or a negative value
		return number >= 0 ? number : -1;
	};

const useEventKey = (props, instances, context) => {
	// Mutable value

	const mutableRef = useRef({
		fn: null
	});

	// Functions

	const findSpottableItem = useCallback((indexFrom, indexTo) => {
		const {dataSize} = props;
		if (indexFrom < 0 && indexTo < 0 || indexFrom >= dataSize && indexTo >= dataSize) {
			return -1;
		} else {
			return clamp(0, dataSize - 1, indexFrom);
		}
	}, [props]);

	const getNextIndex = useCallback(({index, keyCode, repeat}) => {
		const {dataSize, rtl, wrap} = props;
		const {scrollContentHandle} = instances;
		const {isPrimaryDirectionVertical, dimensionToExtent} = scrollContentHandle.current;
		const column = index % dimensionToExtent;
		const row = (index - column) % dataSize / dimensionToExtent;
		const isDownKey = isDown(keyCode);
		const isLeftMovement = (!rtl && isLeft(keyCode)) || (rtl && isRight(keyCode));
		const isRightMovement = (!rtl && isRight(keyCode)) || (rtl && isLeft(keyCode));
		const isUpKey = isUp(keyCode);
		const isNextRow = index + dimensionToExtent < dataSize;
		const isNextAdjacent = column < dimensionToExtent - 1 && index < (dataSize - 1);
		const isBackward = (
			isPrimaryDirectionVertical && isUpKey ||
			!isPrimaryDirectionVertical && isLeftMovement ||
			null
		);
		const isForward = (
			isPrimaryDirectionVertical && isDownKey ||
			!isPrimaryDirectionVertical && isRightMovement ||
			null
		);
		let isWrapped = false;
		let nextIndex = -1;
		let targetIndex = -1;

		if (index >= 0) {
			if (isPrimaryDirectionVertical) {
				if (isUpKey && row) {
					targetIndex = index - dimensionToExtent;
				} else if (isDownKey && isNextRow) {
					targetIndex = index + dimensionToExtent;
				} else if (isLeftMovement && column) {
					targetIndex = index - 1;
				} else if (isRightMovement && isNextAdjacent) {
					targetIndex = index + 1;
				}
			} else if (isLeftMovement && row) {
				targetIndex = index - dimensionToExtent;
			} else if (isRightMovement && isNextRow) {
				targetIndex = index + dimensionToExtent;
			} else if (isUpKey && column) {
				targetIndex = index - 1;
			} else if (isDownKey && isNextAdjacent) {
				targetIndex = index + 1;
			}

			if (targetIndex >= 0) {
				nextIndex = targetIndex;
			}
		}

		if (!repeat && nextIndex === -1 && wrap) {
			if (isForward && findSpottableItem((row + 1) * dimensionToExtent, dataSize) < 0) {
				nextIndex = findSpottableItem(0, index);
				isWrapped = true;
			} else if (isBackward && findSpottableItem(-1, row * dimensionToExtent - 1) < 0) {
				nextIndex = findSpottableItem(dataSize, index);
				isWrapped = true;
			}
		}

		return {isDownKey, isUpKey, isLeftMovement, isRightMovement, isWrapped, nextIndex};
	}, [findSpottableItem, props, instances]);

	// Hooks

	useEffect(() => {
		const {scrollContentHandle} = instances;
		const {
			handle5WayKeyUp,
			handleDirectionKeyDown,
			handlePageUpDownKeyDown,
			spotlightAcceleratorProcessKey
		} = context;

		function handleKeyDown (ev) {
			const {keyCode, target} = ev;
			const direction = getDirection(keyCode);

			if (direction) {
				Spotlight.setPointerMode(false);

				if (spotlightAcceleratorProcessKey(ev)) {
					ev.stopPropagation();
				} else {
					const {spotlightId} = props;
					let targetIndex = -1;
					// To suport nested virtualList, need to get the current dataIndex.
					let targetParentNode = target.parentNode;
					while (this && targetParentNode && this !== targetParentNode) {
						targetIndex = targetParentNode.dataset.index || targetIndex;
						targetParentNode = targetParentNode.parentNode;
					}
					const isNotItem = (
						// if target has an index, it must be an item
						!targetIndex &&
						// if it lacks an index and is inside the scroller, we need to handle this
						target.matches(`[data-spotlight-id="${spotlightId}"] *`)
					);
					const index = !isNotItem ? getNumberValue(targetIndex) : -1;
					const candidate = getTargetByDirectionFromElement(direction, target);
					let candidateIndex = candidate && candidate.dataset && getNumberValue(candidate.dataset.index);
					let isLeaving = false;

					// To suport multiple virtualList, need to check the candidate is in the current VL or not.
					if (candidate && candidate.dataset.index && !this.contains(candidate)) {
						return;
					}

					// To suport nested virtualList, need to get the current dataIndex.
					let candidateParentNode = candidate.parentNode;
					while (this && candidateParentNode && this !== candidateParentNode) {
						candidateIndex = (candidateParentNode.dataset.index && getNumberValue(candidateParentNode.dataset.index)) || candidateIndex;
						candidateParentNode = candidateParentNode.parentNode;
					}

					if (isNotItem) { // if the focused node is not an item
						if (!utilDOM.containsDangerously(ev.currentTarget, candidate)) { // if the candidate is out of a list
							isLeaving = true;
						}
					} else if (index >= 0 && candidateIndex !== index) { // the focused node is an item and focus will move out of the item
						const {repeat} = ev;
						const {isDownKey, isUpKey, isLeftMovement, isRightMovement, isWrapped, nextIndex} = getNextIndex({index, keyCode, repeat});

						if (nextIndex >= 0) { // if the candidate is another item
							ev.preventDefault();
							ev.stopPropagation();
							handleDirectionKeyDown(ev, 'acceleratedKeyDown', {isWrapped, keyCode, nextIndex, repeat, target});
						} else { // if the candidate is not found
							const {dataSize, focusableScrollbar, isHorizontalScrollbarVisible, isVerticalScrollbarVisible} = props;
							const {dimensionToExtent, isPrimaryDirectionVertical} = scrollContentHandle.current;
							const column = index % dimensionToExtent;
							const row = (index - column) % dataSize / dimensionToExtent;
							const directions = {};
							let isScrollbarVisible;

							if (isPrimaryDirectionVertical) {
								directions.left = isLeftMovement;
								directions.right = isRightMovement;
								directions.up = isUpKey;
								directions.down = isDownKey;
								isScrollbarVisible = isVerticalScrollbarVisible;
							} else {
								directions.left = isUpKey;
								directions.right = isDownKey;
								directions.up = isLeftMovement;
								directions.down = isRightMovement;
								isScrollbarVisible = isHorizontalScrollbarVisible;
							}

							isLeaving =
								directions.up && row === 0 ||
								directions.down && row === Math.floor((dataSize - 1) % dataSize / dimensionToExtent) ||
								directions.left && column === 0 ||
								directions.right && (!focusableScrollbar || !isScrollbarVisible) && (column === dimensionToExtent - 1 || index === dataSize - 1 && row === 0);

							if (repeat && isLeaving) { // if focus is about to leave items by holding down an arrowy key
								ev.preventDefault();
								ev.stopPropagation();
							} else if (!isLeaving) {
								handleDirectionKeyDown(ev, 'keyDown', {direction, keyCode, repeat, target});
							}
						}
					}

					if (isLeaving) {
						handleDirectionKeyDown(ev, 'keyLeave');
					}
				}
			} else if (isPageUp(keyCode) || isPageDown(keyCode)) {
				handlePageUpDownKeyDown();
			}
		}

		function handleKeyUp ({keyCode}) {
			if (getDirection(keyCode) || isEnter(keyCode)) {
				handle5WayKeyUp();
			}
		}

		utilEvent('keydown').addEventListener(scrollContentHandle.current.contentRef, handleKeyDown);
		utilEvent('keyup').addEventListener(scrollContentHandle.current.contentRef, handleKeyUp);

		return () => {
			utilEvent('keydown').removeEventListener(scrollContentHandle.current.contentRef, handleKeyDown);
			utilEvent('keyup').removeEventListener(scrollContentHandle.current.contentRef, handleKeyUp);
		};
	}, [getNextIndex, props, instances, context]);

	// Functions

	function addGlobalKeyDownEventListener (fn) {
		mutableRef.current.fn = fn;
		utilEvent('keydown').addEventListener(document, mutableRef.current.fn, {capture: true});
	}

	function removeGlobalKeyDownEventListener () {
		utilEvent('keydown').removeEventListener(document, mutableRef.current.fn, {capture: true});
		mutableRef.current.fn = null;
	}

	// Return

	return {
		addGlobalKeyDownEventListener,
		removeGlobalKeyDownEventListener
	};
};

const useEventFocus = (props, instances) => {
	const {scrollContainerRef, scrollContentHandle} = instances;

	useEffect(() => {
		function handleFocus (ev) {
			// only for VirtualGridList
			// To make the focused item cover other near items
			// We need to find out the general solution for multiple spottable inside of one item
			if (ev.target && scrollContentHandle.current.isItemSized) {
				ev.target.parentNode.style.setProperty('z-index', 1);
			}
		}

		function handleBlur (ev) {
			// only for VirtualGridList
			// To make the blurred item normal
			if (ev.target && scrollContentHandle.current.isItemSized) {
				ev.target.parentNode.style.setProperty('z-index', null);
			}
		}

		utilEvent('focusin').addEventListener(scrollContainerRef, handleFocus);
		utilEvent('focusout').addEventListener(scrollContainerRef, handleBlur);

		return () => {
			utilEvent('focusin').removeEventListener(scrollContainerRef, handleFocus);
			utilEvent('focusout').removeEventListener(scrollContainerRef, handleBlur);
		};
	});

};

export default useEventKey;
export {
	useEventFocus,
	useEventKey
};
