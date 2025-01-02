import {forwardCustom} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {is} from '@enact/core/keymap';
import {usePublicClassNames} from '@enact/core/usePublicClassNames';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getContainersForNode} from '@enact/spotlight/src/container';
import {getTargetByDirectionFromElement, getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import Accelerator from '@enact/spotlight/Accelerator';
import {getLastPointerPosition, getPointerMode, setPointerMode} from '@enact/spotlight/src/pointer';
import {Announce} from '@enact/ui/AnnounceDecorator';
import Touchable from '@enact/ui/Touchable';
import classNames from 'classnames';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';

import $L from '../internal/$L';

import componentCss from './EditableWrapper.module.less';

const completeAnnounceDelay = 300; // An arbitrary delay at a level that is not ignored by the new focus element
const TouchableDiv = Touchable('div');

/**
 * The shape for editable of {@link sandstone/Scroller|Scroller}.
 *
 * @typedef {Object} EditableShape
 * @memberof sandstone/Scroller
 * @property {Function} onComplete The callback function called when editing is finished.
 *  It has an event object contains `orders` array which app can use for repopulate items.
 * @property {Function|Object} [blurItemFuncRef] Obtains a reference to `blurItem` function.
 *  If you would like to remove `focused` CSS class to an item, you can get the reference to `blurItem` function via `useRef`.
 * `blurItem` function needs to be called with an item node when an item is blurred.
 * @property {Boolean} [centered] Centers the contents of the scroller.
 * @property {Object} [css] Customizes the component by mapping the supplied collection of CSS class names to the
 *  corresponding internal elements and states of this component.
 *  The following classes are supported:
 *
 * * `wrapper` - The content wrapper component class
 * * `selected` - The selected item class
 * * `focused` - The focused item class
 * @property {Function|Object} [focusItemFuncRef] Obtains a reference to `focusItem` function.
 *  If you would like to use `focused` CSS class to an item, you can get the reference to `focusItem` function via `useRef`.
 * `focusItem` function needs to be called with an item node when an item is focused.
 * @property {Function|Object} [hideItemFuncRef] Obtains a reference to `hideItem` function.
 *  If you would like to hide an item, you can get the reference to `hideItem` function via `useRef`.
 * @property {Function|Object} [removeItemFuncRef] Obtains a reference to `removeItem` function.
 *  If you would like to remove an item, you can get the reference to `removeItem` function via `useRef`.
 * @property {string} [selectItemBy] Decides how to start editing items.
 *  It can be either `'press'` or `'longPress'`. If unset, it defaults to `'longPress'`.
 * @property {Function|Object} [showItemFuncRef] Obtains a reference to `showItem` function.
 *  If you would like to show an item, you can get the reference to `showItem` function via `useRef`.
 * @public
 */
const EditableShape = PropTypes.shape({
	onComplete: PropTypes.func.isRequired,
	blurItemFuncRef: EnactPropTypes.ref,
	centered: PropTypes.bool,
	css: PropTypes.object,
	focusItemFuncRef: EnactPropTypes.ref,
	hideItemFuncRef: EnactPropTypes.ref,
	removeItemFuncRef: EnactPropTypes.ref,
	selectItemBy: PropTypes.string,
	showItemFuncRef: EnactPropTypes.ref
});

const SpotlightAccelerator = new Accelerator([5, 4]);

const holdDuration = 500;

const holdConfig = {
	events: [
		{name: 'hold', time: holdDuration}
	]
};

/**
 * A Sandstone-styled EditableWrapper.
 *
 * @class EditableWrapper
 * @memberof sandstone/Scroller
 * @ui
 * @public
 */
const EditableWrapper = (props) => {
	const {children, editable, scrollContainerHandle, scrollContainerRef, scrollContentRef} = props;
	const centered = editable?.centered != null ? editable.centered : true;
	const selectItemBy = editable?.selectItemBy || 'longPress';
	const customCss = editable?.css || {};
	const removeItemFuncRef = editable?.removeItemFuncRef;
	const hideItemFuncRef = editable?.hideItemFuncRef;
	const showItemFuncRef = editable?.showItemFuncRef;
	const focusItemFuncRef = editable?.focusItemFuncRef;
	const blurItemFuncRef = editable?.blurItemFuncRef;
	const mergedCss = usePublicClassNames({componentCss, customCss, publicClassNames: true});

	const dataSize = children?.length;

	// Mutable value
	const wrapperRef = useRef();
	const mutableRef = useRef({
		// Constants
		itemWidth: null,
		centeredOffset: 0,
		spotlightId: null,

		// DOM elements
		focusedItem: null,
		selectedItem: null,
		selectedItemLabel: '',
		rearrangedItems: [],

		// Indices
		fromIndex: null,
		prevToIndex: null,
		hideIndex: null,

		// Position for restoring focus after removing item
		nextSpotlightRect: null,

		// Move direction from the starting position to the current position
		moveDirection: null,

		// Last mouse position
		lastMouseClientX: null,

		// Last InputType which moves Items
		lastInputType: null,

		// Timer for holding key input
		keyHoldTimerId: null,

		// Flag for prevent event propagation
		needToPreventEvent: null,

		lastInputDirection: null,

		isDraggingItem: false,
		isDragging: false,

		// initialSelected
		initialSelected: editable?.initialSelected
	});
	const announceRef = useRef({});

	mutableRef.current.hideIndex = editable?.hideIndex ?? dataSize;

	// Functions

	// Reset values
	const reset = useCallback(() => {
		const {focusedItem, selectedItem, spotlightId} = mutableRef.current;

		focusedItem?.classList.remove(customCss.focused);
		selectedItem?.classList.remove(componentCss.selected, customCss.selected, componentCss.rearranged);

		mutableRef.current.focusedItem = null;
		mutableRef.current.selectedItem = null;
		mutableRef.current.selectedItemLabel = '';
		mutableRef.current.moveDirection = null;
		mutableRef.current.prevToIndex = null;
		mutableRef.current.initialSelected = null;
		wrapperRef.current.style.setProperty('--selected-item-offset', '0px');

		Spotlight.set(spotlightId, {restrict: 'self-first'});
	}, [customCss.focused, customCss.selected]);

	// Finalize the order
	const finalizeOrders = useCallback(() => {
		const {fromIndex, moveDirection, prevToIndex, rearrangedItems, selectedItem} = mutableRef.current;
		let orders = Array.from({length: dataSize}, (_, i) => i + 1);

		if (rearrangedItems.length > 0) {
			let selectedOrder = selectedItem.style.order;
			const changedOrder = [];

			rearrangedItems.forEach((item) => {
				const order = Number(item.style.order);
				selectedOrder = order;
				item.style.order = order - moveDirection;
				item.classList.remove(componentCss.rearrangedTransform, componentCss.rearranged);

				if (moveDirection > 0) {
					changedOrder.push(order);
				} else {
					changedOrder.unshift(order);
				}
			});

			if (moveDirection > 0) {
				changedOrder.push(Number(selectedItem.style.order));
			} else {
				changedOrder.unshift(Number(selectedItem.style.order));
			}

			mutableRef.current.rearrangedItems = [];
			selectedItem.style.order = selectedOrder;

			// Create reordered array
			orders.splice(Math.min(fromIndex, prevToIndex), changedOrder.length, ...changedOrder);
		}

		return orders;

	}, [dataSize]);

	const updateArrowIcon = useCallback((index) => {
		mutableRef.current.selectedItem?.classList.toggle(customCss.noBefore, index === 0);
		mutableRef.current.selectedItem?.classList.toggle(customCss.noAfter, index === mutableRef.current.hideIndex - 1);
	}, [customCss.noBefore, customCss.noAfter]);

	const startEditing = useCallback((item) => {
		if (item?.dataset?.index && (!item.hasAttribute('disabled') || item.className.includes('hidden'))) {
			item.classList.add(componentCss.selected, customCss.selected);
			mutableRef.current.selectedItem = item;
			mutableRef.current.focusedItem?.classList.remove(customCss.focused);
			mutableRef.current.focusedItem = null;
			mutableRef.current.selectedItemLabel = (item.ariaLabel || item.textContent) + ' ';

			mutableRef.current.fromIndex = Number(item.style.order) - 1;
			mutableRef.current.prevToIndex = mutableRef.current.fromIndex;

			updateArrowIcon(mutableRef.current.fromIndex);
			if (!mutableRef.current.initialSelected) {
				setTimeout(() => {
					announceRef.current.announce(
						mutableRef.current.selectedItemLabel + $L('Press the left/right button to move or press the up button to select other options.')
					);
				}, completeAnnounceDelay);
			}
		}
	}, [customCss.focused, customCss.selected, updateArrowIcon]);

	const finalizeEditing = useCallback((orders) => {
		if (mutableRef.current.initialSelected) {
			mutableRef.current.selectedItem.children[1].ariaLabel = `${mutableRef.current.selectedItem.ariaLabel} ${$L('Press the OK button to move or press the up button to select other options.')}`;
		}
		forwardCustom('onComplete', () => ({orders, hideIndex: mutableRef.current.hideIndex}))(null, editable);
		reset();
	}, [editable, reset]);

	const findItemNode = useCallback((node) => {
		for (let current = node; current !== scrollContentRef.current && current !== document; current = current.parentNode) {
			if (current.dataset.index) {
				return current;
			}
		}
		return null;
	}, [scrollContentRef]);

	const focusItem = useCallback((target) => {
		const itemNode = findItemNode(target);
		if (itemNode && !mutableRef.current.selectedItem) {
			mutableRef.current.focusedItem?.classList.remove(customCss.focused);
			mutableRef.current.focusedItem = itemNode;
			mutableRef.current.focusedItem?.classList.add(customCss.focused);
			mutableRef.current.prevToIndex = Number(itemNode.style.order) - 1;
		}
	}, [customCss.focused, findItemNode]);

	const blurItem = useCallback((target) => {
		const itemNode = findItemNode(target);
		if (itemNode && !mutableRef.current.selectedItem) {
			mutableRef.current.focusedItem?.classList.remove(customCss.focused);
			mutableRef.current.focusedItem = null;
			mutableRef.current.prevToIndex = null;
		}
	}, [customCss.focused, findItemNode]);

	const handleClickCapture = useCallback((ev) => {
		if (ev.target?.parentNode?.parentNode.getAttribute('role') === 'button') {
			return;
		}
		// Consume the event to prevent Item behavior
		if (mutableRef.current.selectedItem || mutableRef.current.needToPreventEvent) {
			ev.preventDefault();
			ev.stopPropagation();
			mutableRef.current.needToPreventEvent = false;
		}
	}, []);

	const handleMouseDown = useCallback((ev) => {
		if (ev.target?.parentNode?.parentNode.getAttribute('role') === 'button') {
			return;
		}
		if (mutableRef.current.selectedItem) {
			// Finalize orders and forward `onComplete` event
			const orders = finalizeOrders();
			finalizeEditing(orders);
			if (selectItemBy === 'press') {
				focusItem(ev.target);
			}
			mutableRef.current.needToPreventEvent = true;
		} else {
			const targetItemNode = findItemNode(ev.target);
			if (selectItemBy === 'press') {
				if (targetItemNode && targetItemNode.dataset.index) {
					// Start editing by adding selected transition to selected item
					mutableRef.current.targetItemNode = targetItemNode;
					startEditing(targetItemNode);
				}
				mutableRef.current.needToPreventEvent = true;
			} else {
				mutableRef.current.targetItemNode = targetItemNode;
				mutableRef.current.needToPreventEvent = false;
			}
		}
	}, [finalizeEditing, finalizeOrders, findItemNode, focusItem, selectItemBy, startEditing]);

	const handleHoldStart = useCallback(() => {
		const {targetItemNode} = mutableRef.current;

		if (targetItemNode && targetItemNode.dataset.index && selectItemBy === 'longPress') {
			// Start editing by adding selected transition to selected item
			startEditing(targetItemNode);
		}
	}, [selectItemBy, startEditing]);

	const readOutCurrentPosition = useCallback((neighborItem) => {
		const {lastInputDirection, lastInputType, selectedItemLabel} = mutableRef.current;
		if (lastInputType === 'key') {
			if (lastInputDirection === 'left') {
				announceRef.current.announce(
					new IString($L('{selectedItem} moved to the left of {neighborItem}')).format({selectedItem: selectedItemLabel, neighborItem}),
					true
				);
			} else {
				announceRef.current.announce(
					new IString($L('{selectedItem} moved to the right of {neighborItem}')).format({selectedItem: selectedItemLabel, neighborItem}),
					true
				);
			}
		}
	}, []);

	// Add rearranged items
	const addRearrangedItems = useCallback(({currentMoveDirection, toIndex}) => {
		// Set the currentMoveDirection to css variable
		const {rtl} = scrollContainerHandle.current;
		wrapperRef.current.style.setProperty('--move-direction', currentMoveDirection * (rtl ? -1 : 1));

		const {fromIndex, rearrangedItems, selectedItem} = mutableRef.current;
		const getNextElement = (item) => currentMoveDirection > 0 ? item.nextElementSibling : item.previousElementSibling;
		let sibling = getNextElement(selectedItem);
		let lastRearrangedItem;
		let start = currentMoveDirection > 0 ? toIndex : fromIndex;
		let end = currentMoveDirection > 0 ? fromIndex : toIndex;

		while (start > end && sibling) {
			sibling?.classList.add(componentCss.rearranged, componentCss.rearrangedTransform);

			if (!rearrangedItems.includes(sibling)) {
				rearrangedItems.push(sibling);
			}

			lastRearrangedItem = sibling;
			sibling = getNextElement(sibling);
			start--;
		}

		if (lastRearrangedItem) {
			readOutCurrentPosition(lastRearrangedItem.ariaLabel || lastRearrangedItem.textContent);
		}

		mutableRef.current.moveDirection = currentMoveDirection;

	}, [readOutCurrentPosition, scrollContainerHandle]);

	const removeRearrangedItems = useCallback((numToRemove) => {
		const {rearrangedItems} = mutableRef.current;
		let toItem = null;
		if (rearrangedItems.length > 0) {
			for (let i = 0; i < numToRemove; i++) {
				toItem = rearrangedItems.pop();
				toItem?.classList.remove(componentCss.rearrangedTransform);
			}
		}

		if (toItem) {
			readOutCurrentPosition(toItem.ariaLabel || toItem.textContent);
		}
	}, [readOutCurrentPosition]);

	// Move items
	const moveItems = useCallback((toIndex) => {
		const {selectedItem} = mutableRef.current;
		const {rtl} = scrollContainerHandle.current;

		if (selectedItem) {
			// Bail out when index is out of scope
			if (toIndex < mutableRef.current.hideIndex && toIndex >= 0) {
				const {fromIndex, itemWidth, moveDirection, prevToIndex, rearrangedItems} = mutableRef.current;

				// Set the selected item's offset to css variable
				const offset = (toIndex - fromIndex) * itemWidth;
				wrapperRef.current.style.setProperty('--selected-item-offset', offset * (rtl ? -1 : 1) + 'px');

				// If the current toIndex is new,
				if (toIndex !== prevToIndex) {
					// Determine the direction of move from the latest from index
					const currentMoveDirection = Math.sign(toIndex - prevToIndex);
					// If the direction is changed and there are rearranged items, we remove them first.
					if (moveDirection && currentMoveDirection !== moveDirection && rearrangedItems.length > 0) {
						const numToRemove = currentMoveDirection > 0 ? toIndex - prevToIndex : prevToIndex - toIndex;
						const needToAddItems = numToRemove > rearrangedItems.length;
						removeRearrangedItems(numToRemove);

						// When there's jump, meaning, numToRemove is bigger than 0, we need to add an item
						if (needToAddItems) {
							addRearrangedItems({currentMoveDirection, toIndex});
						}
					} else {
						addRearrangedItems({currentMoveDirection, toIndex});
					}

					mutableRef.current.prevToIndex = toIndex;
				}

				updateArrowIcon(toIndex);
			}
		}
	}, [addRearrangedItems, removeRearrangedItems, scrollContainerHandle, updateArrowIcon]);

	const moveItemsByKeyDown = useCallback((ev) => {
		const {keyCode} = ev;
		const container = scrollContentRef.current;
		const {itemWidth, prevToIndex} = mutableRef.current;
		const {rtl} = scrollContainerHandle.current;

		const toIndex = (!rtl ^ !is('left', keyCode)) ? prevToIndex - 1 : prevToIndex + 1;
		const scrollLeft = container.scrollLeft * (rtl ? -1 : 1);
		const itemLeft = toIndex * itemWidth - scrollLeft;
		let left;

		if (itemLeft > container.offsetLeft + container.clientWidth - itemWidth) {
			left = itemLeft - (container.clientWidth - itemWidth) + scrollLeft;
		} else if (itemLeft < 0) {
			left = scrollLeft + itemLeft;
		}

		if (left != null) { /* avoid null or undefined */
			scrollContainerHandle.current.start({
				targetX: left,
				targetY: 0
			});
		}

		mutableRef.current.lastInputType = 'key';
		mutableRef.current.lastInputDirection = is('left', keyCode) ? 'left' : 'right';
		moveItems(toIndex);

		if (toIndex <= 0) {
			announceRef.current.announce(
				(is('left', keyCode) && !rtl && $L('LEFTMOST')) ||
				(is('right', keyCode) && rtl && $L('RIGHTMOST'))
			);
		} else if (toIndex >= dataSize - 1) {
			announceRef.current.announce(
				(is('right', keyCode) && !rtl &&  $L('RIGHTMOST')) ||
				(is('left', keyCode) && rtl && $L('LEFTMOST'))
			);
		}
	}, [dataSize, moveItems, scrollContainerHandle, scrollContentRef]);

	// Remove an item
	const removeItem = useCallback(() => {
		const {focusedItem, prevToIndex, selectedItem} = mutableRef.current;
		const targetItem = selectedItem || focusedItem;

		if (targetItem) {
			// rearrangedItems need for the case when removing item while moving selected item
			const rearrangedItems = mutableRef.current.rearrangedItems;
			const targetItemRect = targetItem && targetItem.getBoundingClientRect();
			mutableRef.current.nextSpotlightRect = {x: targetItemRect.right, y: targetItemRect.top};
			mutableRef.current.hideIndex -= 1;

			const orders = finalizeOrders();
			orders.splice(prevToIndex, 1);
			rearrangedItems.forEach(item => {
				item.style.order -= 1;
			});

			finalizeEditing(orders);
		}
	}, [finalizeEditing, finalizeOrders]);

	const hideItem = useCallback(() => {
		const {focusedItem, selectedItem} = mutableRef.current;
		const targetItem = selectedItem || focusedItem;

		if (targetItem) {
			// rearrangedItems need for the case when hiding item while moving selected item
			const rearrangedItems = mutableRef.current.rearrangedItems;
			const targetItemOrder = Number(targetItem.style.order);
			const targetItemRect = targetItem && targetItem.getBoundingClientRect();
			mutableRef.current.nextSpotlightRect = {x: targetItemRect.right, y: targetItemRect.top};
			mutableRef.current.hideIndex -= 1;

			const orders = finalizeOrders();
			orders.splice(orders.indexOf(targetItemOrder), 1);
			orders.push(targetItemOrder);
			rearrangedItems.forEach(item => {
				item.style.order -= 1;
			});
			targetItem.style.order = orders.length;

			finalizeEditing(orders);
		}
	}, [finalizeEditing, finalizeOrders]);

	const showItem = useCallback(() => {
		const {focusedItem, selectedItem} = mutableRef.current;
		const targetItem = selectedItem || focusedItem;

		if (targetItem) {
			const targetItemOrder = Number(targetItem.style.order);
			const targetItemRect = targetItem && targetItem.getBoundingClientRect();
			mutableRef.current.nextSpotlightRect = {x: targetItemRect.right, y: targetItemRect.top};

			const orders = Array.from({length: dataSize}, (_, i) => i + 1);
			orders.splice(targetItemOrder - 1, 1);
			orders.splice(mutableRef.current.hideIndex, 0, targetItemOrder);

			mutableRef.current.hideIndex += 1;

			finalizeEditing(orders);
		}
	}, [dataSize, finalizeEditing]);

	const getNextIndexFromPosition = useCallback((x, tolerance) => {
		const {centeredOffset, itemWidth, prevToIndex} = mutableRef.current;
		const {rtl} = scrollContainerHandle.current;
		const bodyWidth = document.body.getBoundingClientRect().width;

		// Determine toIndex with mouse client x position
		// Coordinate calculation in RTL locales is not supported in chrome below 85
		const scrollContentOffset = scrollContentRef.current.scrollLeft * (rtl ? -1 : 1) - centeredOffset;
		const clientXFromContent = (rtl ? bodyWidth - x : x) + scrollContentOffset;
		const direction = (itemWidth * (prevToIndex + 0.5) < clientXFromContent) ? 1 : -1; // 1: To next index , -1: To prev index
		const moveTolerance = itemWidth * tolerance * direction;

		return Math.floor((clientXFromContent - moveTolerance) / itemWidth);
	}, [scrollContainerHandle, scrollContentRef]);

	const handlePointerDown = useCallback((ev) => {
		const {selectedItem} = mutableRef.current;

		if (selectedItem) {
			if (ev.target.hasPointerCapture(ev.pointerId)) {
				ev.target.releasePointerCapture(ev.pointerId);
			}
		}
	}, []);

	const handleMouseMove = useCallback((ev) => {
		const {clientX} = ev;
		mutableRef.current.lastMouseClientX = clientX;

		if (mutableRef.current.selectedItem && Number(mutableRef.current.selectedItem.style.order) - 1 < mutableRef.current.hideIndex) {
			const toIndex = getNextIndexFromPosition(clientX, 0.33);

			mutableRef.current.lastInputType = 'mouse';
			moveItems(toIndex);
		}
	}, [getNextIndexFromPosition, moveItems]);

	const handleMouseLeave = useCallback(() => {
		const {focusedItem, itemWidth, lastInputType, lastMouseClientX, selectedItem} = mutableRef.current;
		const {rtl} = scrollContainerHandle.current;
		const scrollContentNode = scrollContentRef.current;
		const scrollContentCenter = scrollContentNode.getBoundingClientRect().width / 2;

		if (selectedItem || focusedItem) {
			const orders = finalizeOrders();
			finalizeEditing(orders);

			if (lastInputType === 'scroll') {
				const offset = itemWidth * (!rtl ^ !(lastMouseClientX > scrollContentCenter) ? 1 : -1);
				scrollContainerHandle.current.start({
					targetX: scrollContentNode.scrollLeft + offset,
					targetY: 0
				});
			}
		}
	}, [finalizeEditing, finalizeOrders, scrollContainerHandle, scrollContentRef]);

	const completeEditingByKeyDown = useCallback(() => {
		const {selectedItem, selectedItemLabel} = mutableRef.current;
		const focusTarget = selectedItem.children[1];
		const orders = finalizeOrders();

		selectedItem.children[1].ariaLabel = '';
		finalizeEditing(orders);
		if (selectItemBy === 'press') {
			if (getPointerMode()) {
				Spotlight.setPointerMode(false);
				Spotlight.focus(focusTarget);
			}

			focusItem(focusTarget);
		}
		setTimeout(() => {
			announceRef.current.announce(
				selectedItemLabel + $L('Movement completed'),
				true
			);
			setTimeout(() => {
				selectedItem.children[1].ariaLabel = `${selectedItem.ariaLabel} ${$L('Press the OK button to move or press the up button to select other options.')}`;
			}, completeAnnounceDelay);
		}, completeAnnounceDelay);
	}, [finalizeEditing, finalizeOrders, focusItem, selectItemBy]);

	const handleKeyDownCapture = useCallback((ev) => {
		const {keyCode, repeat, target} = ev;
		const {focusedItem, selectedItem} = mutableRef.current;
		const targetItemNode = findItemNode(target);

		if (is('enter', keyCode) && target.getAttribute('role') !== 'button') {
			if (!repeat) {
				if (selectedItem) {
					completeEditingByKeyDown();
					mutableRef.current.needToPreventEvent = true;
				} else if (selectItemBy === 'press') {
					startEditing(targetItemNode);
					mutableRef.current.needToPreventEvent = true;
				}
			} else if (repeat && targetItemNode && !mutableRef.current.timer && selectItemBy === 'longPress') {
				mutableRef.current.timer = setTimeout(() => {
					startEditing(targetItemNode);
				}, holdDuration - 300);
			}
		} else if (is('down', keyCode) && target.getAttribute('role') !== 'button' && !repeat && selectedItem) {
			completeEditingByKeyDown();
			mutableRef.current.needToPreventEvent = true;
		} else if (is('left', keyCode) || is('right', keyCode)) {
			if (selectedItem) {
				if (target.getAttribute('role') !== 'button') {
					if (Number(selectedItem.style.order) - 1 < mutableRef.current.hideIndex) {
						if (repeat) {
							SpotlightAccelerator.processKey(ev, moveItemsByKeyDown);
						} else {
							SpotlightAccelerator.reset();
							moveItemsByKeyDown(ev);
						}
					}
					ev.preventDefault();
					ev.stopPropagation();
				}
			} else {
				const nextTarget = getTargetByDirectionFromElement(getDirection(keyCode), target);

				// Check if focus leaves scroll container.
				if (nextTarget && !getContainersForNode(nextTarget).includes(mutableRef.current.spotlightId) && !repeat) {
					reset();
				}
			}
		} else if (is('up', keyCode) || is('down', keyCode)) {
			if (selectedItem || focusedItem) {
				const nextTarget = getTargetByDirectionFromElement(getDirection(keyCode), target);

				// Check if focus leaves scroll container.
				if (nextTarget && !getContainersForNode(nextTarget).includes(mutableRef.current.spotlightId)) {
					setPointerMode(false);
					Spotlight.move(getDirection(keyCode));

					const orders = finalizeOrders();
					finalizeEditing(orders);

					ev.preventDefault();
					ev.stopPropagation();
				}
			}
		}
	}, [finalizeEditing, finalizeOrders, findItemNode, moveItemsByKeyDown, reset, selectItemBy, startEditing, completeEditingByKeyDown]);

	const handleKeyUpCapture = useCallback((ev) => {
		const {keyCode, target} = ev;
		const {selectedItem} = mutableRef.current;

		if (is('cancel', keyCode)) {
			if (selectedItem) {
				completeEditingByKeyDown();
				ev.stopPropagation(); // To prevent onCancel by CancelDecorator
			}
		} else if (target.getAttribute('role') === 'button') {
			return;
		}

		clearTimeout(mutableRef.current.timer);
		mutableRef.current.timer = null;
		if (mutableRef.current.needToPreventEvent || mutableRef.current.selectedItem) {
			ev.preventDefault();
			mutableRef.current.needToPreventEvent = false;
		}
	}, [completeEditingByKeyDown]);

	const handleGlobalKeyDownCapture = useCallback((ev) => {
		const {focusedItem, selectedItem} = mutableRef.current;

		// If the pointer mode is `true` and the focused component is not contained in scrollContainerRef,
		// only `handleGlobalKeyDownCapture` is called instead of `handleKeyDownCapture`
		// Below is mainly for handling key pressed while pointer mode is `true`.
		if (getPointerMode() && !scrollContainerRef.current.contains(Spotlight.getCurrent()) && (selectedItem || focusedItem)) {
			const {keyCode} = ev;
			const position = getLastPointerPosition();
			const direction = getDirection(keyCode);
			if (direction) {
				const nextTarget = getTargetByDirectionFromPosition(direction, position, mutableRef.current.spotlightId);

				if (!scrollContainerRef.current.contains(nextTarget)) {
					// If the nextTarget is not contained in scrollContainerRef, complete editing
					const orders = finalizeOrders();
					finalizeEditing(orders);
				} else if ((is('left', keyCode) || is('right', keyCode)) && selectedItem) {
					// When an item is selected and press the `left` or `right` key, move the selectedItem in that direction
					moveItemsByKeyDown(ev);
					ev.preventDefault();
					ev.stopPropagation();
				} else if (is('down', keyCode) && selectedItem) {
					// When an item is selected and press the `down` key, complete editing and focus the selectedItem
					completeEditingByKeyDown();
				} else if (is('up', keyCode) && nextTarget.getAttribute('role') !== 'button') {
					// When the nextTarget is the item and press the `up` key, focus the nextTarget to move focus successfully to the button above the item
					setPointerMode(false);
					Spotlight.focus(nextTarget);
				}
			} else if (is('enter', keyCode)) {
				if (selectedItem) {
					// When an item is selected and press the `enter` key, complete editing and focus the selectedItem
					completeEditingByKeyDown();
				} else {
					// When an item is focused and press the `enter` key, start editing
					startEditing(focusedItem);
				}
			}
		}
	}, [completeEditingByKeyDown, finalizeEditing, finalizeOrders, moveItemsByKeyDown, scrollContainerRef, startEditing]);

	const handleTouchMove = useCallback((ev) => {
		if (mutableRef.current.selectedItem) {
			// Prevent scrolling by dragging when item is selected
			ev.preventDefault();
		}

		if (mutableRef.current.isDraggingItem && ev.target?.parentNode?.parentNode.getAttribute('role') !== 'button') {
			const {clientX} = ev.targetTouches[0];
			mutableRef.current.lastMouseClientX = clientX;
			scrollContainerRef.current.style.setProperty('--scroller-hover-to-scroll-by-touch', 'auto');

			const toIndex = getNextIndexFromPosition(clientX, 0.33);

			if (toIndex !== mutableRef.current.prevToIndex) {
				mutableRef.current.lastInputType = 'touch';
				moveItems(toIndex);
			}
		}
	}, [getNextIndexFromPosition, moveItems, scrollContainerRef]);

	const handleTouchEnd = useCallback((ev) => {
		const {itemWidth, lastInputType, lastMouseClientX, selectedItem} = mutableRef.current;
		const {rtl} = scrollContainerHandle.current;
		const scrollContentNode = scrollContentRef.current;
		const scrollContentCenter = scrollContentNode.getBoundingClientRect().width / 2;

		const {clientX} = ev.changedTouches[0];
		const targetItemIndex = getNextIndexFromPosition(clientX, 0);

		if (ev.target?.parentNode?.parentNode.getAttribute('role') === 'button' && Number(selectedItem?.style.order) - 1 === targetItemIndex) {
			return;
		}

		if (selectedItem) {
			// Cancel mouse event to deselect a selected item when it is tapped
			ev.preventDefault();

			// Finalize orders and forward `onComplete` event
			const orders = finalizeOrders();
			finalizeEditing(orders);

			if (lastInputType === 'scroll' && mutableRef.current.isDragging) {
				const offset = itemWidth * (!rtl ^ !(lastMouseClientX > scrollContentCenter) ? 1 : -1);
				scrollContainerHandle.current.start({
					targetX: scrollContentNode.scrollLeft + offset,
					targetY: 0
				});
			}
		} else if (!mutableRef.current.isDragging) {
			// Cancel mouse event to select a item when it is tapped
			ev.preventDefault();

			const targetItemNode = findItemNode(ev.target);
			if (selectItemBy === 'press') {
				if (targetItemNode && targetItemNode.dataset.index) {
					mutableRef.current.targetItemNode = targetItemNode;
					startEditing(targetItemNode);
				}
			}
		}
		mutableRef.current.isDraggingItem = false;
		mutableRef.current.isDragging = false;
		scrollContainerRef.current.style.setProperty('--scroller-hover-to-scroll-by-touch', 'none');
	}, [getNextIndexFromPosition, finalizeEditing, finalizeOrders, findItemNode, scrollContainerHandle, scrollContainerRef, scrollContentRef, selectItemBy, startEditing]);

	const handleDragStart = useCallback((ev) => {
		const {selectedItem} = mutableRef.current;
		// Index of dragged item
		const dragTagetItemIndex = getNextIndexFromPosition(ev.x, 0);

		mutableRef.current.isDragging = true;
		if (selectedItem && Number(selectedItem.style.order) - 1 === dragTagetItemIndex) {
			mutableRef.current.isDraggingItem = true;
		}
	}, [getNextIndexFromPosition]);

	useLayoutEffect(() => {
		const available = typeof document === 'object';

		if (available) {
			document.addEventListener('keydown', handleGlobalKeyDownCapture, {capture: true});
		}

		return () => {
			if (available) {
				document.removeEventListener('keydown', handleGlobalKeyDownCapture, {capture: true});
			}
		};
	}, [handleGlobalKeyDownCapture]);

	useEffect(() => {
		if (mutableRef.current.nextSpotlightRect !== null) {
			Spotlight.focusNextFromPoint('down', mutableRef.current.nextSpotlightRect);
			mutableRef.current.nextSpotlightRect = null;
		}
	});

	useEffect(() => {
		// Calculate the item width once
		const {rtl} = scrollContainerHandle.current;
		const container = scrollContentRef.current;
		const item = wrapperRef.current?.children[0];
		if (item && typeof window !== 'undefined') {
			const bodyWidth = document.body.getBoundingClientRect().width;
			const neighbor = item.nextElementSibling || item.previousElementSibling;
			mutableRef.current.itemWidth = Math.abs(item.offsetLeft - neighbor?.offsetLeft);
			mutableRef.current.centeredOffset = rtl ? bodyWidth - (item.getBoundingClientRect().right + container.scrollLeft) : item.getBoundingClientRect().left + container.scrollLeft;
			wrapperRef.current?.style.setProperty('--item-width', mutableRef.current.itemWidth + 'px');
		}
	}, [centered, dataSize, scrollContainerHandle, scrollContentRef]);

	useEffect(() => {
		mutableRef.current.spotlightId = scrollContainerRef.current && scrollContainerRef.current.dataset.spotlightId;
	}, [scrollContainerRef]);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener('mouseleave', handleMouseLeave);
			scrollContainer.addEventListener('touchmove', handleTouchMove);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
				scrollContainer.removeEventListener('touchmove', handleTouchMove);
			}
		};
	}, [handleMouseLeave, handleTouchMove, scrollContainerRef]);

	useLayoutEffect(() => {
		if (removeItemFuncRef) {
			removeItemFuncRef.current = removeItem;
		}
	}, [removeItem, removeItemFuncRef]);

	useLayoutEffect(() => {
		if (hideItemFuncRef) {
			hideItemFuncRef.current = hideItem;
		}
	}, [hideItem, hideItemFuncRef]);

	useLayoutEffect(() => {
		if (showItemFuncRef) {
			showItemFuncRef.current = showItem;
		}
	}, [showItem, showItemFuncRef]);

	useLayoutEffect(() => {
		if (focusItemFuncRef) {
			focusItemFuncRef.current = focusItem;
		}
	}, [focusItem, focusItemFuncRef]);

	useLayoutEffect(() => {
		if (blurItemFuncRef) {
			blurItemFuncRef.current = blurItem;
		}
	}, [blurItem, blurItemFuncRef]);

	useEffect(() => {
		// addEventListener to moveItems while scrolled
		const scrollContentNode = scrollContentRef.current;

		const handleMoveItemsByScroll = () => {
			const bodyWidth = document.body.getBoundingClientRect().width;
			const {lastMouseClientX, selectedItem} = mutableRef.current;
			const {isHoveringToScroll, rtl} = scrollContainerHandle.current;
			if (selectedItem && mutableRef.current.lastInputType !== 'key' && Number(selectedItem.style.order) - 1 < mutableRef.current.hideIndex) {
				mutableRef.current.lastInputType = 'scroll';
				if (isHoveringToScroll) {
					const toIndex = getNextIndexFromPosition(lastMouseClientX, 0);
					moveItems(!rtl ^ !(lastMouseClientX > bodyWidth / 2) ? toIndex + 1 : toIndex - 1);
				} else {
					moveItems(getNextIndexFromPosition(lastMouseClientX, 0.33));
				}
			}
		};

		setTimeout(() => {
			scrollContentNode.addEventListener('scroll', handleMoveItemsByScroll);
		}, 400); // Wait for finishing scroll animation when initial selected item is given.

		return () => {
			scrollContentNode.removeEventListener('scroll', handleMoveItemsByScroll);
		};

	}, [getNextIndexFromPosition, moveItems, scrollContainerHandle, scrollContentRef]);

	useEffect(() => {
		if (mutableRef.current.initialSelected) {
			scrollContainerHandle.current?.scrollTo({animate:false, position: {x: mutableRef.current.initialSelected.scrollLeft}});
		}
	}, [scrollContainerHandle]);

	useLayoutEffect(() => {
		const iconItemList = Array.from(wrapperRef.current.children);
		let initialSelected = mutableRef.current.initialSelected;

		if (initialSelected && !(initialSelected?.itemIndex > 0)) { // filter nullish values
			initialSelected = mutableRef.current.initialSelected = null;
		}

		if (initialSelected?.itemIndex) {
			const initialSelectedItem = wrapperRef.current.children[initialSelected?.itemIndex - 1];
			if (initialSelectedItem?.dataset.index) {
				mutableRef.current.focusedItem = initialSelectedItem;
				mutableRef.current.lastMouseClientX = getLastPointerPosition().x;
				startEditing(initialSelectedItem);
				setPointerMode(false);
				Spotlight.focus(initialSelectedItem.children[1]);
			}
		}

		iconItemList.forEach((iconItemWrapper, index) => {
			if (iconItemWrapper?.children[1]) {
				if (initialSelected && (initialSelected.itemIndex - 1 === index)) {
					iconItemWrapper.children[1].ariaLabel += ` ${$L('Press the left/right button to move or press the up button to select other options.')}`;
				} else {
					iconItemWrapper.children[1].ariaLabel += ` ${$L('Press the OK button to move or press the up button to select other options.')}`;
				}
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<TouchableDiv
			holdConfig={holdConfig}
			className={classNames(mergedCss.wrapper, {[mergedCss.centered]: centered})}
			onClickCapture={handleClickCapture}
			onHoldStart={handleHoldStart}
			onKeyDownCapture={handleKeyDownCapture}
			onKeyUpCapture={handleKeyUpCapture}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onPointerDown={handlePointerDown}
			onDragStart={handleDragStart}
			onTouchEnd={handleTouchEnd}
			ref={wrapperRef}
		>
			{children}
			<Announce key="editable-wrapper-announce" ref={announceRef} />
		</TouchableDiv>
	);
};

EditableWrapper.displayName = 'EditableWrapper';

EditableWrapper.propTypes = /** @lends sandstone/Scroller.EditableWrapper.prototype */ {
	/**
	 * Enables editing items in the scroller.
	 * You can specify props for editable scroller as an object.
	 * See the datails in {@link sandstone/Scroller.EditableShape|EditableShape}
	 *
	 * @type {sandstone/Scroller.EditableShape}
	 * @public
	 */
	editable: EditableShape,

	/**
	 * Obtains a reference to the scroll container handle.
	 *
	 * @type {Function|Object}
	 * @public
	 */
	scrollContainerHandle: EnactPropTypes.ref,

	/**
	 * Obtains a reference to the scroll container node.
	 *
	 * @type {Function|Object}
	 * @public
	 */
	scrollContainerRef: EnactPropTypes.ref,

	/**
	 * Obtains a reference to the scroll content node.
	 *
	 * @type {Function|Object}
	 * @public
	 */
	scrollContentRef: EnactPropTypes.ref
};

export default EditableWrapper;
export {
	EditableShape,
	EditableWrapper
};
