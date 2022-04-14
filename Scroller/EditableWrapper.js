import {forwardCustom} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {is} from '@enact/core/keymap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef} from 'react';

import css from './EditableWrapper.module.less';

/**
 * A Sandstone-styled EditableWrapper.
*
 * @class EditableWrapper
 * @memberof sandstone/Scroller
 * @ui
 * @public
 */
const EditableWrapper = (props) => {
	const {children, editable, scrollContainerHandle, scrollContentRef} = props;
	let centered = editable.centered != null ? editable.centered : true;
	let customCss = editable.editableWrapperCss || {};
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
		lastMoveDirection: null
	});

	// Functions

	// Reset values
	const reset = useCallback(() => {
		const {selectedItem} = mutableRef.current;

		selectedItem?.classList.remove(css.selected);
		selectedItem?.classList.remove(customCss.selected);
		selectedItem?.classList.remove(css.rearranged);

		mutableRef.current.selectedItem = null;
		mutableRef.current.lastMoveDirection = null;
		mutableRef.current.prevToIndex = null;
		wrapperRef.current.style.setProperty('--selected-item-offset', '0px');
	}, [customCss.selected]);

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
				item.classList.remove(css.rearrangedTransform);
				item.classList.remove(css.rearranged);
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

	const startEditing = useCallback((item) => {
		if (item.dataset.index) {
			item.classList.add(css.selected);
			item.classList.add(customCss.selected);
			mutableRef.current.selectedItem = item;

			mutableRef.current.fromIndex = Number(item.style.order) - 1;
			mutableRef.current.prevToIndex = mutableRef.current.fromIndex;
		}
	}, [customCss.selected]);

	const findItemNode = useCallback((node) => {
		for (let current = node; current !== scrollContentRef.current && current !== document; current = current.parentNode) {
			if (current.dataset.index) {
				return current;
			}
		}
	}, [scrollContentRef]);

	const handleClick = useCallback((ev) => {
		const targetItemNode = findItemNode(ev.target);

		if (mutableRef.current.selectedItem) {
			// Finalize orders and forward `onComplete` event
			const orders = finalizeOrders();
			forwardCustom('onComplete', () => ({orders}))({}, editable);
			reset();
		} else if (targetItemNode && targetItemNode.dataset.index) {
			// Start editing by adding selected transition to selected item
			startEditing(targetItemNode);
			ev.preventDefault();
			ev.stopPropagation();
		}
	}, [editable, finalizeOrders, findItemNode, reset, startEditing]);

	// Add rearranged items
	const addRearrangedItems = useCallback(({moveDirection, toIndex}) => {
		// Set the moveDirection to css variable
		wrapperRef.current.style.setProperty('--move-direction', moveDirection);

		const {fromIndex, rearrangedItems, selectedItem} = mutableRef.current;
		const getNextElement = (item) => moveDirection > 0 ? item.nextElementSibling : item.previousElementSibling;
		let sibling = getNextElement(selectedItem);
		let start = moveDirection > 0 ? toIndex : fromIndex;
		let end =  moveDirection > 0 ? fromIndex : toIndex;

		while (start > end && sibling) {
			sibling?.classList.add(css.rearranged);
			sibling?.classList.add(css.rearrangedTransform);

			if (!rearrangedItems.includes(sibling)) {
				rearrangedItems.push(sibling);
			}

			sibling = getNextElement(sibling);
			start--;
		}

		mutableRef.current.lastMoveDirection = moveDirection;

	}, []);

	const removeRearrangedItems = useCallback((numToRemove) => {
		const {rearrangedItems} = mutableRef.current;
		if (rearrangedItems.length > 0) {
			for (let i = 0; i < numToRemove; i++) {
				const toItem = rearrangedItems.pop();
				toItem?.classList.remove(css.rearrangedTransform);
			}
		}
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
			}
		}
	}, [dataSize, addRearrangedItems, removeRearrangedItems]);

	// Remove an item
	const removeItem = useCallback(() => {
		const {prevToIndex} = mutableRef.current;
		const orders = finalizeOrders();

		orders.splice(prevToIndex, 1);
		forwardCustom('onComplete', () => ({orders}))({}, editable);
		reset();
	}, [editable, finalizeOrders, reset]);


	const handleMouseMove = useCallback((ev) => {
		const {centeredOffset, itemWidth, selectedItem} = mutableRef.current;
		if (selectedItem) {
			// Determine toIndex with mouse client x position
			const toIndex = Math.floor((ev.clientX + scrollContentRef.current.scrollLeft - centeredOffset) / itemWidth);

			moveItems(toIndex);
		}
	}, [moveItems, scrollContentRef]);

	const handleKeyDown = useCallback((ev) => {
		const {keyCode} = ev;
		const {selectedItem} = mutableRef.current;
		const targetItemNode = findItemNode(ev.target);

		if (is('enter', keyCode)) {
			if (selectedItem) {
				const orders = finalizeOrders();
				forwardCustom('onComplete', () => ({orders}))({}, editable);
				reset();
			} else {
				startEditing(targetItemNode);
			}
		} else if (is('left', keyCode) || is('right', keyCode)) {
			if (selectedItem) {
				const container = scrollContentRef.current;
				const {itemWidth, prevToIndex} = mutableRef.current;
				const toIndex = is('left', keyCode) ? prevToIndex - 1 : prevToIndex + 1;

				const itemLeft = toIndex * itemWidth - container.scrollLeft;
				let left;
				if (itemLeft > container.offsetLeft + container.clientWidth - itemWidth) {
					left = itemLeft - (container.clientWidth - itemWidth) + container.scrollLeft;
				} else if (itemLeft < 0) {
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
	}, [editable, finalizeOrders, moveItems, reset, scrollContainerHandle, scrollContentRef, startEditing]);

	useEffect(() => {
		// Calculate the item width once
		if (!mutableRef.current.itemWidth) {
			const item = wrapperRef.current?.children[0];
			const neighbor = item.nextElementSibling || item.previousElementSibling;
			mutableRef.current.itemWidth = Math.abs(item.offsetLeft - neighbor?.offsetLeft);
			mutableRef.current.centeredOffset = centered ? item.getBoundingClientRect().x : 0;
			wrapperRef.current?.style.setProperty('--item-width', mutableRef.current.itemWidth + 'px');
		}
	}, [centered]); // TODO: Need dataSize dependency for centeredOffset

	useEffect(() => {
		if (editable.removeItemFuncRef) {
			editable.removeItemFuncRef.current = removeItem;
		}
	}, [removeItem, editable.removeItemFuncRef]);

	return (
		<div
			className={classNames(css.wrapper, {[css.centered]: centered}, customCss.editableWrapper)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			onMouseMove={handleMouseMove}
			ref={wrapperRef}
		>
			{children}
		</div>
	);
};

EditableWrapper.displayName = 'EditableWrapper';

EditableWrapper.propTypes = /** @lends sandstone/Scroller.EditableWrapper.prototype */ {
	/**
	 * TBD: Enables editing items in the scroller.
	 * FIXME: If the type is EditableShape, it throws errors.
	 *
	 * @type {sandstone/Scroller.EditableShape}
	 * @public
	 */
	editable: PropTypes.object,

	/**
	 * Obtains a reference to the scroll container handle.
	 *
	 * @type {Function|Object}
	 * @public
	 */
	scrollContainerHandle: EnactPropTypes.ref,

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
	EditableWrapper
};
