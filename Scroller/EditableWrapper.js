import {forwardCustom} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {is} from '@enact/core/keymap';
import {usePublicClassNames} from '@enact/core/usePublicClassNames';
import Spotlight, {getDirection} from '@enact/spotlight';
import {getContainersForNode} from '@enact/spotlight/src/container';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import Accelerator from '@enact/spotlight/Accelerator';
import {getLastPointerPosition, setPointerMode} from '@enact/spotlight/src/pointer';
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
 * `focusItem` function need to be called with an item node when an item is focused.
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
	const initialSelected = editable?.initialSelected;
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

		// Last move direction
		lastMoveDirection: null,

		// Last mouse position
		lastMouseClientX: null,

		// Last InputType which moves Items
		lastInputType: null,

		lastKeyEventTargetElement: null,

		// Timer for holding key input
		keyHoldTimerId: null,

		// Flag for prevent event propagation
		needToPreventEvent: null,

		lastInputDirection: null
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
		mutableRef.current.lastMoveDirection = null;
		mutableRef.current.prevToIndex = null;
		wrapperRef.current.style.setProperty('--selected-item-offset', '0px');

		Spotlight.set(spotlightId, {restrict: 'self-first'});
	}, [customCss.focused, customCss.selected]);

	// Finalize the order
	const finalizeOrders = useCallback(() => {
		const {fromIndex, lastMoveDirection, prevToIndex, rearrangedItems, selectedItem} = mutableRef.current;
		let orders = Array.from({length: dataSize}, (_, i) => i + 1);

		if (rearrangedItems.length > 0) {
			let selectedOrder = selectedItem.style.order;
			const changedOrder = [];

			rearrangedItems.forEach((item) => {
				const order = Number(item.style.order);
				selectedOrder = order;
				item.style.order = order - lastMoveDirection;
				item.classList.remove(componentCss.rearrangedTransform, componentCss.rearranged);

				if (lastMoveDirection > 0) {
					changedOrder.push(order);
				} else {
					changedOrder.unshift(order);
				}
			});

			if (lastMoveDirection > 0) {
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

			announceRef.current.announce(
				mutableRef.current.selectedItemLabel + $L('Press left or right button to move or press up button for other actions')
			);
		}
	}, [customCss.focused, customCss.selected, updateArrowIcon]);

	const finalizeEditing = useCallback((orders) => {
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

	const focusItem = useCallback((target, announceDisabled = false) => {
		const itemNode = findItemNode(target);
		if (itemNode && !mutableRef.current.selectedItem) {
			mutableRef.current.focusedItem?.classList.remove(customCss.focused);
			mutableRef.current.focusedItem = itemNode;
			mutableRef.current.focusedItem?.classList.add(customCss.focused);
			mutableRef.current.prevToIndex = Number(itemNode.style.order) - 1;
			const focusedItemLabel = (itemNode.ariaLabel || itemNode.textContent) + ' ';
			if (!announceDisabled && (!itemNode.hasAttribute('disabled') || itemNode.className.includes('hidden'))) {
				setTimeout(() => {
					announceRef.current.announce(
						focusedItemLabel + $L('Press OK button to move or press up button for other actions')
					);
				}, completeAnnounceDelay);
			}
		}
	}, [customCss.focused, findItemNode]);

	const handleClickCapture = useCallback((ev) => {
		if (ev.target.className.includes('Button')) {
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
		if (ev.target.className.includes('Button')) {
			return;
		}
		if (mutableRef.current.selectedItem) {
			// Finalize orders and forward `onComplete` event
			const orders = finalizeOrders();
			finalizeEditing(orders);
			if (selectItemBy === 'press') {
				focusItem(ev.target, true);
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
	const addRearrangedItems = useCallback(({moveDirection, toIndex}) => {
		// Set the moveDirection to css variable
		const {rtl} = scrollContainerHandle.current;
		wrapperRef.current.style.setProperty('--move-direction', moveDirection * (rtl ? -1 : 1));

		const {fromIndex, rearrangedItems, selectedItem} = mutableRef.current;
		const getNextElement = (item) => moveDirection > 0 ? item.nextElementSibling : item.previousElementSibling;
		let sibling = getNextElement(selectedItem);
		let lastRearrangedItem;
		let start = moveDirection > 0 ? toIndex : fromIndex;
		let end = moveDirection > 0 ? fromIndex : toIndex;

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

		mutableRef.current.lastMoveDirection = moveDirection;

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
				const {fromIndex, itemWidth, lastMoveDirection, prevToIndex, rearrangedItems} = mutableRef.current;

				// Set the selected item's offset to css variable
				const offset = (toIndex - fromIndex) * itemWidth;
				wrapperRef.current.style.setProperty('--selected-item-offset', offset * (rtl ? -1 : 1) + 'px');

				// If the current toIndex is new,
				if (toIndex !== prevToIndex) {
					// Determine the direction of move from the latest from index
					const moveDirection = Math.sign(toIndex - prevToIndex);
					// If the direction is changed and there are rearranged items, we remove them first.
					if (lastMoveDirection && moveDirection !== lastMoveDirection && rearrangedItems.length > 0) {
						const numToRemove = moveDirection > 0 ? toIndex - prevToIndex : prevToIndex - toIndex;
						removeRearrangedItems(numToRemove);

						// When there's jump, meaning, numToRemove is bigger than 0, we need to add an item
						if (numToRemove > rearrangedItems.length) {
							addRearrangedItems({moveDirection, toIndex});
						}
					} else {
						addRearrangedItems({moveDirection, toIndex});
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
		const moveDirection = (itemWidth * (prevToIndex + 0.5) < clientXFromContent) ? 1 : -1; // 1: To next index , -1: To prev index
		const moveTolerance = itemWidth * tolerance * moveDirection;

		return Math.floor((clientXFromContent - moveTolerance) / itemWidth);
	}, [scrollContainerHandle, scrollContentRef]);

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

	const handleKeyDownCapture = useCallback((ev) => {
		const {keyCode, repeat, target} = ev;
		const {focusedItem, selectedItem, selectedItemLabel} = mutableRef.current;
		const targetItemNode = findItemNode(target);

		if (is('enter', keyCode) && target.getAttribute('role') !== 'button') {
			if (!repeat) {
				if (selectedItem) {
					const orders = finalizeOrders();
					finalizeEditing(orders);
					if (selectItemBy === 'press') {
						focusItem(target, true);
					}
					mutableRef.current.needToPreventEvent = true;

					setTimeout(() => {
						announceRef.current.announce(
							selectedItemLabel + $L('move complete'),
							true
						);
					}, completeAnnounceDelay);
				} else if (selectItemBy === 'press') {
					startEditing(targetItemNode);
					mutableRef.current.needToPreventEvent = true;
				}
			} else if (repeat && targetItemNode && !mutableRef.current.timer && selectItemBy === 'longPress') {
				mutableRef.current.timer = setTimeout(() => {
					startEditing(targetItemNode);
				}, holdDuration - 300);
			}
		} else if (is('left', keyCode) || is('right', keyCode)) {
			if (selectedItem) {
				if (mutableRef.current.lastKeyEventTargetElement?.getAttribute('role') !== 'button') {
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
					Spotlight.move(getDirection(keyCode));

					const orders = finalizeOrders();
					finalizeEditing(orders);

					ev.preventDefault();
					ev.stopPropagation();
				}
			}
		}
	}, [finalizeEditing, finalizeOrders, findItemNode, focusItem, moveItemsByKeyDown, reset, selectItemBy, startEditing]);

	const handleKeyUpCapture = useCallback((ev) => {
		const {keyCode, target} = ev;
		const {selectedItem, selectedItemLabel} = mutableRef.current;

		if (is('cancel', keyCode)) {
			if (selectedItem) {
				const orders = finalizeOrders();
				finalizeEditing(orders);
				if (selectItemBy === 'press') {
					focusItem(target, true);
				}

				setTimeout(() => {
					announceRef?.current?.announce(
						selectedItemLabel + $L('move complete'),
						true
					);
				}, completeAnnounceDelay);

				ev.stopPropagation(); // To prevent onCancel by CancelDecorator
			}
		} else {
			mutableRef.current.lastKeyEventTargetElement = ev.target;
			if (ev.target.getAttribute('role') === 'button') {
				return;
			}
		}

		clearTimeout(mutableRef.current.timer);
		mutableRef.current.timer = null;
		if (mutableRef.current.needToPreventEvent || mutableRef.current.selectedItem) {
			ev.preventDefault();
			mutableRef.current.needToPreventEvent = false;
		}
	}, [finalizeEditing, finalizeOrders, focusItem, selectItemBy]);

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
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, [handleMouseLeave, scrollContainerRef]);

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
		if (initialSelected?.itemIndex) {
			scrollContainerHandle.current?.scrollTo({animate:false, position: {x: initialSelected.scrollLeft}});
		}
	}, [initialSelected?.itemIndex, initialSelected?.scrollLeft, scrollContainerHandle]);

	useLayoutEffect(() => {
		if (initialSelected?.itemIndex) {
			const initialSelectedItem = wrapperRef.current.children[initialSelected.itemIndex - 1];
			if (initialSelectedItem?.dataset.index) {
				mutableRef.current.focusedItem = initialSelectedItem;
				mutableRef.current.lastMouseClientX = getLastPointerPosition().x;
				startEditing(initialSelectedItem);
				setPointerMode(false);
				Spotlight.focus(initialSelectedItem.children[1]);
			}
		}
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
