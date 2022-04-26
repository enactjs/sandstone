import {mergeClassNameMaps} from '@enact/core/util';
import {forwardCustom} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {is} from '@enact/core/keymap';
import Spotlight from '@enact/spotlight';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef} from 'react';

import componentCss from './EditableWrapper.module.less';

/**
 * The shape for editable of [Scroller]{@link sandstone/Scroller}.
 *
 * @typedef {Object} EditableShape
 * @memberof sandstone/Scroller
 * @property {Function} onComplete The callback function called when editing is finished.
 * @property {Boolean} centered Centers the contents of the scroller.
 * @property {Object} css Customizes the component by mapping the supplied collection of CSS class names to the
 *  corresponding internal elements and states of this component.
 * @property {Function|Object} removeItemFuncRef Obtains a reference to `removeItem` function.
 * @public
 */
const EditableShape = PropTypes.shape({
	onComplete: PropTypes.func.isRequired,
	centered: PropTypes.bool,
	css: PropTypes.object,
	removeItemFuncRef: EnactPropTypes.ref
});

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
	const centered = editable.centered != null ? editable.centered : true;
	const customCss = editable.css || {};

	const mergedCss = mergeClassNameMaps(componentCss, customCss, Object.keys(componentCss));

	const dataSize = children?.length;
	// Mutable value

	const wrapperRef = useRef();
	const mutableRef = useRef({
		// Constants
		itemWidth: null,
		centeredOffset: 0,
		spotlightId: null,

		// DOM elements
		selectedItem: null,
		rearrangedItems: [],

		// Indices
		fromIndex: null,
		prevToIndex: null,

		// Position for restoring focus after removing item
		nextSpotlightRect: null,

		// Flags
		lastMoveDirection: null
	});

	// Functions

	// Reset values
	const reset = useCallback(() => {
		const {selectedItem, spotlightId} = mutableRef.current;

		selectedItem?.classList.remove(componentCss.selected, customCss.selected, componentCss.rearranged);

		mutableRef.current.selectedItem = null;
		mutableRef.current.lastMoveDirection = null;
		mutableRef.current.prevToIndex = null;
		wrapperRef.current.style.setProperty('--selected-item-offset', '0px');

		Spotlight.set(spotlightId, {restrict: 'self-first'});
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

	const startEditing = useCallback((item) => {
		if (item.dataset.index) {
			Spotlight.set(mutableRef.current.spotlightId, {restrict: 'self-only'});

			item.classList.add(componentCss.selected, customCss.selected);
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
		}

		// Consume the event to prevent Item behavior
		ev.preventDefault();
		ev.stopPropagation();
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
			sibling?.classList.add(componentCss.rearranged, componentCss.rearrangedTransform);

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
				toItem?.classList.remove(componentCss.rearrangedTransform);
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
		const {prevToIndex, selectedItem} = mutableRef.current;
		if (selectedItem) {
			const selectedItemRect = selectedItem && selectedItem.getBoundingClientRect();
			mutableRef.current.nextSpotlightRect = {x: selectedItemRect.right, y: selectedItemRect.top};
			const orders = finalizeOrders();
			orders.splice(prevToIndex, 1);
			forwardCustom('onComplete', () => ({orders}))({}, editable);
			reset();
		}
	}, [editable, finalizeOrders, reset]);

	const handleMouseMove = useCallback((ev) => {
		const {centeredOffset, itemWidth, selectedItem} = mutableRef.current;
		if (selectedItem) {
			// Determine toIndex with mouse client x position
			const toIndex = Math.floor((ev.clientX + scrollContentRef.current.scrollLeft - centeredOffset) / itemWidth);

			moveItems(toIndex);
		}
	}, [moveItems, scrollContentRef]);

	const handleMouseLeave = useCallback(() => {
		const {selectedItem} = mutableRef.current;
		if (selectedItem) {
			const orders = finalizeOrders();
			forwardCustom('onComplete', () => ({orders}))({}, editable);
			reset();
		}
	}, [editable, finalizeOrders, reset]);

	const handleKeyDown = useCallback((ev) => {
		const {keyCode, target} = ev;
		const {selectedItem} = mutableRef.current;
		const targetItemNode = findItemNode(target);

		if (is('enter', keyCode) && target.getAttribute('role') !== 'button') {
			if (selectedItem) {
				const orders = finalizeOrders();
				forwardCustom('onComplete', () => ({orders}))({}, editable);
				reset();
			} else if (targetItemNode) {
				startEditing(targetItemNode);
			}

			// Consume the event to prevent Item behavior
			ev.preventDefault();
			ev.stopPropagation();
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
	}, [editable, finalizeOrders, findItemNode, moveItems, reset, scrollContainerHandle, scrollContentRef, startEditing]);

	useEffect(() => {
		if (mutableRef.current.nextSpotlightRect !== null) {
			Spotlight.focusNextFromPoint('down', mutableRef.current.nextSpotlightRect);
			mutableRef.current.nextSpotlightRect = null;
		}
	});

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

	useEffect(() => {
		if (editable.removeItemFuncRef) {
			editable.removeItemFuncRef.current = removeItem;
		}
	}, [removeItem, editable.removeItemFuncRef]);

	return (
		<div
			className={classNames(mergedCss.wrapper, {[mergedCss.centered]: centered})}
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
	 * Enables editing items in the scroller. You can specify props for editable scroller as an object.
	 *
	 * Followings are supported properties.
	 * @property {Function} onComplete - The callback function called when editing is finished.
	 *   It has an event object contains `orders` array which app can use for repopulate items.
	 * @property {Boolean} centered - Centers the contents of the scroller.
	 * @property {Object} css - Customizes the component by mapping the supplied collection of CSS class names to the
	 *  corresponding internal elements and states of this component.
	 *  The following classes are supported:
	 *
	 * * `wraper` - The content wrapper component class
	 * * `selected` - The selected item class
	 * @property {Function|Object} removeItemFuncRef - Obtains a reference to `removeItem` function.
	 *  If you would like to remove an item, you can get the reference to `removeItem` function via `useRef`.
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
