/**
 * Sandstone styled EditableWrapper components
 *
 *
 * @module sandstone/EditableWrapper
 * @memberof sandstone/Scroller
 * @exports EditableWrapper
 */

import {forwardCustom} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import classNames from 'classnames';
import {useCallback, useEffect, useRef} from 'react';

import css from './EditableWrapper.module.less';

const EditableWrapper = (props) => {
	const {children, editable, scrollContainerHandle, scrollContentRef} = props;

	if (editable == null) {
		return children;
	}

	const {centered} = editable;
	const dataSize = children?.length;

	// Mutable value

	const wrapperRef = useRef();
	const mutableRef = useRef({
		// Constants
		itemWidth: null,
		centeredOffset: 0,

		// DOM elements
		selectedItem: null,
		rearrangedItems: [],

		// Indices
		fromIndex: null,
		prevToIndex: null,

		// Flags
		addable: true,
		lastMoveDirection: null
	});

	console.log("dataSize: ", dataSize);

	// Functions

	// Reset values
	const reset = useCallback(() => {
		const {selectedItem} = mutableRef.current;

		selectedItem?.classList.remove(css.selected);
		selectedItem?.classList.remove(css.rearranged);
		selectedItem?.classList.remove(css.selectedTransform);

		mutableRef.current.selectedItem = null;
		mutableRef.current.lastMoveDirection = null;
		mutableRef.current.prevToIndex = null;
		wrapperRef.current.style.setProperty('--selected-item-offset', '0px');
	}, []);

	// Finalize the order
	const finalizeOrders = useCallback(() => {
		const {fromIndex, lastMoveDirection, prevToIndex, rearrangedItems, selectedItem} = mutableRef.current;
		let orders = Array.from({length: dataSize}, (_, i) => i + 1);

		if (rearrangedItems.length > 0) {
			let selectedOrder = selectedItem.style.order;
			const changedOrder = [];

			console.log("lastMoveDirection: " , lastMoveDirection);

			rearrangedItems.forEach((item) => {
				const order = Number(item.style.order);
				console.log("forEach ", order);
				selectedOrder = order;
				item.style.order = order - lastMoveDirection;
				item.classList.remove(css.rearrangedTransform);
				item.classList.remove(css.rearranged);
				if (lastMoveDirection > 0) {
					changedOrder.push(order);
				} else {
					changedOrder.unshift(order);
				}
			});
			console.log(changedOrder);

			if (lastMoveDirection > 0) {
				changedOrder.push(Number(selectedItem.style.order));
			} else {
				changedOrder.unshift(Number(selectedItem.style.order));
			}

			mutableRef.current.rearrangedItems = [];
			selectedItem.style.order = selectedOrder;

			//create order array
			console.log(orders);
			console.log("changed Orders:", changedOrder);
			console.log("fromIndex: ", fromIndex);
			console.log("prevToIndex: ", prevToIndex);
			orders.splice(Math.min(fromIndex, prevToIndex), changedOrder.length, ...changedOrder);
			console.log(orders);
		}

		return orders;

	}, [dataSize]);

	const startEditing = useCallback((item) => {
		// FIXME: Need to figure out the right element
		if (item.classList.contains('spottable')) {
			item.classList.add(css.selected);
			item.classList.add(css.selectedTransform);
			mutableRef.current.selectedItem = item;

			mutableRef.current.fromIndex = Number(item.style.order) - 1;
			mutableRef.current.prevToIndex = mutableRef.current.fromIndex;
			console.log("fromIndex:", mutableRef.current.fromIndex);
		}
	}, []);

	const handleClick = useCallback((ev) => {
		if (mutableRef.current.selectedItem) {
			// Finalize orders and forward `onComplete` event
			const orders = finalizeOrders();
			forwardCustom('onComplete', (ev) => ({orders}))({}, editable);
			reset();
		} else {
			// Start editing by adding selected transition to selected item
			startEditing(ev.target.parentElement);
		}
	}, [finalizeOrders, startEditing, props]);

	// Move siblings
	const moveSiblings = useCallback(({direction, toIndex}) => {
		// Set the direction to css variable
		wrapperRef.current.style.setProperty('--move-direction', direction);

		const {fromIndex, rearrangedItems, selectedItem} = mutableRef.current;
		const getNextElement = (item) => direction > 0 ? item.nextElementSibling : item.previousElementSibling;
		let sibling = getNextElement(selectedItem);
		let start = direction > 0 ? toIndex : fromIndex;
		let end =  direction > 0 ? fromIndex : toIndex;

		while (start > end && sibling) {
			sibling?.classList.add(css.rearranged);
			sibling?.classList.add(css.rearrangedTransform);

			if (!rearrangedItems.includes(sibling)) {
				rearrangedItems.push(sibling);
			}

			sibling = getNextElement(sibling);
			start--;
		}

		mutableRef.current.lastMoveDirection = direction;

	}, []);

	// Move items
	const moveItems = useCallback((toIndex) => {
		const {selectedItem} = mutableRef.current;

		if (selectedItem) {
			// Bail out when index is out of scope
			if (toIndex < dataSize && toIndex >= 0) {
				const {fromIndex, itemWidth, lastMoveDirection, prevToIndex, rearrangedItems} = mutableRef.current;

				// Set the selected item's offset to css variable
				const offset = (toIndex - fromIndex) * itemWidth;
				wrapperRef.current.style.setProperty('--selected-item-offset', offset + 'px');

				// Reset addable flag to true
				mutableRef.current.addable = true;

				// If the current toIndex is new,
				if (toIndex !== prevToIndex) {
					console.log("prevToIndex:", prevToIndex);
					console.log("toIndex: ", toIndex);
					// Determine the direcion of move from the latest from index
					const direction = Math.sign(toIndex - prevToIndex);
					console.log("direction: ", direction);
					console.log("lastMoveDirection to compare: ", lastMoveDirection);
					// If the direction is changed and there are rearranged items, we remove them first.
					if (lastMoveDirection && direction !== lastMoveDirection && rearrangedItems.length > 0) {
						mutableRef.current.addable = false;
					}
					if (mutableRef.current.addable) {
						moveSiblings({direction, toIndex});
						console.log("Added complete ", rearrangedItems.length);
					} else {
						console.log("Cant' add, we should remove ", rearrangedItems.length);
						const numToRemove = direction > 0 ? toIndex - prevToIndex : prevToIndex - toIndex;
						if (rearrangedItems.length > 0) {
							console.log("removing", numToRemove);
							for (let i = 0; i < numToRemove; i++) {
								const toItem = rearrangedItems.pop();
								toItem?.classList.remove(css.rearrangedTransform);
							}
						}
						// When there's jump, meaning, numToRemove is bigger than 0, we need to add an item
						if (numToRemove > rearrangedItems.length) {
							moveSiblings({direction, toIndex});
						}
					}

					mutableRef.current.prevToIndex = toIndex;
				}
			}
		}
	}, [dataSize, moveSiblings]);

	// Remove an item
	const removeItem = useCallback(() => {
		const {prevToIndex} = mutableRef.current;
		const orders = finalizeOrders();
		console.log(orders);
		console.log("prevToIndex: ", prevToIndex);
		orders.splice(prevToIndex, 1);
		console.log(orders);
		forwardCustom('onComplete', (ev) => ({orders}))({}, editable);

		reset();
	}, [finalizeOrders, props]);

	const handleMouseMove = useCallback((ev) => {
		const {centeredOffset, itemWidth, selectedItem} = mutableRef.current;
		if (selectedItem) {
			// Determine toIndex with mouse client x position
			const toIndex = Math.floor((ev.clientX + scrollContentRef.current.scrollLeft - centeredOffset) / itemWidth);

			console.log("toIndex: ", toIndex);
			moveItems(toIndex);
		}
	}, [moveItems, props]);

	const handleKeyDown = useCallback((ev) => {
		const {keyCode, target} = ev;
		const {selectedItem} = mutableRef.current;
		if (is('enter', keyCode)) {
			if (selectedItem) {
				const orders = finalizeOrders();
				forwardCustom('onComplete', (ev) => ({orders}))({}, editable);
				reset();
			} else {
				startEditing(target);
			}
		} else if (is('left', keyCode) || is('right', keyCode)) {
			if (selectedItem) {
				const container = scrollContentRef.current;
				const {itemWidth, prevToIndex} = mutableRef.current;
				const toIndex = is('left', keyCode) ? prevToIndex - 1 : prevToIndex + 1;

				const itemLeft = toIndex * itemWidth - container.scrollLeft;
				console.log("x", itemLeft);
				let left;
				if (itemLeft > container.offsetLeft + container.clientWidth - itemWidth) {
					left = itemLeft - (container.clientWidth - itemWidth) + container.scrollLeft;
				} else if(itemLeft < 0) {
					left = container.scrollLeft + itemLeft;
				}

				scrollContainerHandle.current.start({
					targetX: left,
					targetY: 0
				});

				moveItems(toIndex);

				ev.preventDefault();
				ev.stopPropagation();
			}
		}
	}, [finalizeOrders, startEditing, moveItems, props]);

	useEffect(() => {
		// Calculate the item width once
		if (!mutableRef.current.itemWidth) {
			const item = wrapperRef.current?.children[0];
			const neighbor = item.nextElementSibling || item.previousElementSibling;
			mutableRef.current.itemWidth = Math.abs(item.offsetLeft - neighbor?.offsetLeft);
			mutableRef.current.centeredOffset = centered ? item.getBoundingClientRect().x : 0;
			wrapperRef.current?.style.setProperty('--item-width', mutableRef.current.itemWidth + 'px');
		}
	}, []);

	// Return

	return (
		<div
			className={classNames(css.wrapper, {[css.centered]: centered})}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			onMouseMove={handleMouseMove}
			ref={wrapperRef}
		>
			{children}
		</div>
	);
}

export default EditableWrapper;
export {
	EditableWrapper
};
