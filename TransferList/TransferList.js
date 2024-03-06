/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Provides Sandstone-themed transfer list components and behaviors.
 *
 * @module sandstone/TransferList
 * @exports TransferListBase
 * @exports TransferListDecorator
 * @exports TransferList
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useRef, useState} from 'react';

import Skinnable from '../Skinnable';
import VirtualList, {VirtualGridList} from '../VirtualList';

import ButtonList from './ButtonList';
import CustomDragImage from './CustomDragImage';
import {renderImageItem, renderItem} from './RenderItem';
import {
	checkForSameList,
	checkListsCapacity,
	getTransferData,
	handlePreventDefault, performMoveOperation,
	performSelectAllOperation,
	rearrangeList, setItemsOnMove,
	setSelectedItemsPosition
} from './utils';

import componentCss from './TransferList.module.less';

/**
 * A Sandstone-styled scrollable, draggable and spottable transfer list component.
 *
 * @class TransferListBase
 * @memberof sandstone/TransferList
 * @ui
 * @public
 */
const TransferListBase = kind({
	name: 'TransferList',

	functional: true,

	propTypes: /** @lends sandstone/TransferList.TransferListBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `transferList` - The root component class for TransferList
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables TransferList and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * An array containing the name of each item that will populate the first list.
		 *
		 * @type {Array}
		 * @private
		 */
		firstList: PropTypes.array,

		/**
		 * Sets the maximum number of items for the first list.
		 *
		 * @type {Number}
		 * @public
		 */
		firstListMaxCapacity: PropTypes.number,

		/**
		 * Sets the minimum number of items for the first list.
		 *
		 * @type {Number}
		 * @public
		 */
		firstListMinCapacity: PropTypes.number,

		/**
		 * Controls how items are handled when dropped onto another list.
		 *
		 * @type {Component}
		 * @default 'move'
		 * @public
		 */
		firstListOperation: PropTypes.oneOf(['move', 'copy', 'delete']),

		/**
		 * The height of the list container.
		 *
		 * @type {Number}
		 * @default 999
		 * @public
		 */
		height: PropTypes.number,

		/**
		 * The height of each item in the list.
		 *
		 * @type {Number}
		 * @default 201
		 * @public
		 */
		itemSize: PropTypes.number,

		/**
		 * The type of component used to render the list of items.
		 *
		 * @type {Component}
		 * @default 'VirtualList'
		 * @public
		 */
		listComponent: PropTypes.oneOf(['VirtualList', 'VirtualGridList']),

		/**
		 * Allows items to be transferred from one list to another using Spotlight Right and/or Spotlight Left.
		 *
		 * @type {Boolean}
		 * @public
		 */
		moveOnSpotlight: PropTypes.bool,

		/**
		 * Blocks multiple elements to be dragged from one list to another.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noMultipleSelect: PropTypes.bool,

		/**
		 * The orientation for the transfer list.
		 *
		 * @type {('horizontal', 'vertical')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * An array containing the name of each item that will populate the second list.
		 *
		 * @type {Array}
		 * @private
		 */
		secondList: PropTypes.array,

		/**
		 * Sets the maximum number of items for the second list.
		 *
		 * @type {Number}
		 * @public
		 */
		secondListMaxCapacity: PropTypes.number,

		/**
		 * Sets the minimum number of items for the second list.
		 *
		 * @type {Number}
		 * @public
		 */
		secondListMinCapacity: PropTypes.number,

		/**
		 * Controls how items are handled when dropped onto another list.
		 *
		 * @type {Component}
		 * @default 'move'
		 * @public
		 */
		secondListOperation: PropTypes.oneOf(['move', 'copy', 'delete']),

		/**
		 * Called when the first list needs to be modified.
		 *
		 * @type {Function}
		 * @public
		 */
		setFirstList: PropTypes.func,

		/**
		 * Called when the second list needs to be modified.
		 *
		 * @type {Function}
		 * @public
		 */
		setSecondList: PropTypes.func,

		/**
		 * Allows items to display the order in which the items were selected.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showSelectionOrder: PropTypes.bool,

		/**
		 * The height of the vertical item.
		 *
		 * @type {Number}
		 * @default 465
		 * @public
		 */
		verticalHeight: PropTypes.number
	},

	defaultProps: {
		disabled: false,
		firstList: {},
		height: 999,
		itemSize: 201,
		listComponent: 'VirtualList',
		moveOnSpotlight: false,
		noMultipleSelect: false,
		orientation: 'horizontal',
		secondList: {},
		setFirstList: null,
		setSecondList: null,
		showSelectionOrder: false,
		verticalHeight: 600
	},

	styles: {
		css: componentCss,
		className: 'transferList',
		publicClassNames: true
	},

	render: ({css, disabled, firstList, firstListMaxCapacity, firstListMinCapacity, firstListOperation, height: defaultHeight, itemSize: defaultItemSize, listComponent, moveOnSpotlight, noMultipleSelect, orientation, secondList, secondListMaxCapacity, secondListMinCapacity, secondListOperation, setFirstList, setSecondList, showSelectionOrder, verticalHeight}) => {
		const [firstListLocal, setFirstListLocal] = useState(firstList);
		const [position, setPosition] = useState(null);
		const [secondListLocal, setSecondListLocal] = useState(secondList);
		const [selectedItems, setSelectedItems] = useState([]);
		const [touchOverElement, setTouchOverElement] = useState(null);

		const height = ri.scaleToRem(orientation === 'horizontal' ? defaultHeight : verticalHeight);
		const isDefaultListComponent = listComponent === 'VirtualList';
		const isVertical = orientation === 'vertical';
		const itemSize = ri.scale(defaultItemSize);
		const width = orientation === 'horizontal' ? 'inherit' : '100%';
		let isAboveDropPosition = useRef(false);
		let currentElement = useRef();
		let dragOverElement = useRef();
		let dragImageNode = useRef();
		let startDragElement = useRef();
		let scrollToRefFirst = useRef(null);
		let scrollToRefSecond = useRef(null);

		const getScrollToFirst = useCallback((scrollTo) => {
			scrollToRefFirst.current = scrollTo;
		}, []);

		const getScrollToSecond = useCallback((scrollTo) => {
			scrollToRefSecond.current = scrollTo;
		}, []);

		// Apply animation and above/below border when dragging items. We also set the drop position of the dragged item (above/below)
		const applyDropBorder = useCallback((element, ev, isAboveCurrentElement, isBelowCurrentElement) => {
			// Check if the drop position of the element we start dragging is not its initial position for horizontal VirtualList
			if (startDragElement.current !== element && (!isVertical || !isDefaultListComponent)) {
				// Check if the position of the dragged item is above the element we drag over
				if ((ev.offsetY < currentElement.current.offsetHeight / 3 || isAboveCurrentElement) && !isBelowCurrentElement) {
					currentElement.current.classList.add(`${css.overAbove}`);
					currentElement.current.classList.remove(`${css.overBelow}`);
					isAboveDropPosition.current = true;
				} else {
					currentElement.current.classList.add(`${css.overBelow}`);
					currentElement.current.classList.remove(`${css.overAbove}`);
					isAboveDropPosition.current = false;
				}
			// Check if the drop position of the element we start dragging is not its initial position for vertical or VirtualGridList
			} else if (startDragElement.current !== element) {
				// Check if the position of the dragged item is on the left side of the element we drag over
				if ((ev.offsetX < currentElement.current.offsetWidth / 3 || isAboveCurrentElement) && !isBelowCurrentElement) {
					currentElement.current.classList.add(`${css.overLeft}`);
					currentElement.current.classList.remove(`${css.overRight}`);
					isAboveDropPosition.current = true;
				} else {
					currentElement.current.classList.add(`${css.overRight}`);
					currentElement.current.classList.remove(`${css.overLeft}`);
					isAboveDropPosition.current = false;
				}
			}
		}, [css.overAbove, css.overBelow, css.overLeft, css.overRight, isDefaultListComponent, isVertical]);

		// Cleanup for removing css animations and borders
		const removeDropBorder = useCallback((element) => {
			element.classList.remove(`${css.overAbove}`);
			element.classList.remove(`${css.overBelow}`);
			element.classList.remove(`${css.overLeft}`);
			element.classList.remove(`${css.overRight}`);
		}, [css.overAbove, css.overBelow, css.overLeft, css.overRight]);

		// Handle the operations between the two lists
		const rearrangeLists = useCallback((sourceList, destinationList, draggedElementIndex, draggedElementList, dragOverElementIndex, setSourceList, setDestinationList, sourceOperation) => {
			const draggedItem = sourceList[draggedElementIndex];
			const elementPosition = isAboveDropPosition.current ? dragOverElementIndex : dragOverElementIndex + 1;
			const transferElements = selectedItems.map(element => element.element);
			let deletedItems = 0;
			let stop = false;

			const filterElements = (element) => {
				const includes = transferElements.includes(element);
				if (element === destinationList[elementPosition]) {
					stop = true;
				}
				if (!stop && includes) {
					deletedItems++;
				}

				return !includes;
			};

			// Check if the dragged item is selected
			const selectListIndex = selectedItems.findIndex((pair) => pair.element === draggedItem);

			// If the dragged item is not selected
			if (selectListIndex === -1) {
				// In case source operation is move or copy, add the item into the destination list
				if (sourceOperation === 'move' || sourceOperation === 'copy') {
					const destinationIndex = destinationList.indexOf(draggedItem);
					if (destinationIndex !== -1) {
						destinationList.splice(destinationIndex, 1);
						deletedItems = !isAboveDropPosition.current * 1;
					}
					destinationList.splice(elementPosition - deletedItems, 0, draggedItem);
				}

				// In case source operation is move or delete, remove the item from the source list
				if (sourceOperation === 'move' || sourceOperation === 'delete') sourceList.splice(draggedElementIndex, 1);
			} else {
				// In case source operation is move or delete, remove the items from the source list
				if (sourceOperation === 'move' || sourceOperation === 'delete') sourceList = sourceList.filter(element => !transferElements.includes(element));

				// In case source operation is move or copy, add the items into the destination list
				if (sourceOperation === 'move' || sourceOperation === 'copy') {
					// destinationList = destinationList.filter(element => !transferElements.includes(element));
					destinationList = destinationList.filter(filterElements);

					destinationList.splice(elementPosition - deletedItems, 0, ...transferElements);
				}
			}

			dragOverElement.current = null;
			setSourceList(sourceList);
			setDestinationList(destinationList);
		}, [selectedItems]);

		// Handler for `dragleave` event - remove the drop border
		const dropEventListenerFunction = useCallback((ev) => {
			let element;
			// Check if the item is rendered by `CheckboxItem` or `ImageItem`
			if (!ev.target.children.length) {
				element = ev.target.parentElement;
			} else {
				element = ev.currentTarget;
			}

			removeDropBorder(element);
		}, [removeDropBorder]);

		// Handler for `dragover` event - apply the drop border on dragged-over item
		const dragoverListenerFunction = useCallback((ev) => {
			let element;
			// Check if the item is rendered by `CheckboxItem` or `ImageItem`
			if (!ev.target.children.length) {
				element = ev.target.parentElement;
			} else {
				element = ev.currentTarget;
			}

			const startDragOrder = Number(startDragElement.current.getAttribute('order'));
			const dragOverOrder = Number(element.getAttribute('order'));
			const isAboveCurrentElement = startDragOrder - 1 === dragOverOrder;
			const isBelowCurrentElement = startDragOrder + 1 === dragOverOrder;

			currentElement.current = dragOverOrder > 0 ? element : currentElement.current;
			dragOverElement.current = parseInt(element.id.split('-')[0]);

			applyDropBorder(element, ev, isAboveCurrentElement, isBelowCurrentElement);
		}, [applyDropBorder]);

		// Identify which item(s) is/are going to be dragged and set drag image accordingly
		const startListenerFunction = useCallback((ev) => {
			const element = ev.target;
			const [index, list] = element.id.split('-');

			startDragElement.current = element;
			ev.dataTransfer.setData('text/plain', `${index}-${list}`);
			ev.dataTransfer.effectAllowed = 'move';

			let isMultiple = selectedItems.length > 1;

			dragImageNode?.current?.(!isMultiple, (nodeRef) => {
				ev.dataTransfer.setDragImage(nodeRef, 0, 0);
			});
		}, [selectedItems.length]);

		// Handler for `touchStart` event - in case of touch events, set the `startDragElement` to the item we are dragging
		const handleTouchStart = useCallback((ev) => {
			startDragElement.current = ev.target.closest('[draggable]');
		}, []);

		// Handler for `onTouchMove` event
		const handleTouchMove = useCallback((ev) => {
			// In case of touch events we need to select the closest element that has the `draggable` attribute
			let element = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).closest('[draggable]');

			if (element) {
				const startDragOrder = Number(startDragElement.current.getAttribute('order'));
				const dragOverOrder = Number(element.getAttribute('order'));
				const isAboveCurrentElement = startDragOrder - 1 === dragOverOrder;
				const isBelowCurrentElement = startDragOrder + 1 === dragOverOrder;

				currentElement.current = dragOverOrder > 0 ? element : currentElement.current;
				dragOverElement.current = parseInt(element.id.split('-')[0]);

				if (touchOverElement && touchOverElement !== element) {
					removeDropBorder(touchOverElement);

					applyDropBorder(element, ev, isAboveCurrentElement, isBelowCurrentElement);

					setTouchOverElement(element);
				} else {
					setTouchOverElement(element);
				}
			}
		}, [applyDropBorder, removeDropBorder, touchOverElement]);

		// Handler for `onTouchEnd` for the first list
		const handleTouchEndFirst = useCallback((ev) => {
			let element = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).closest('[draggable]');
			const list = element.id.split('-')[1];
			const [startElementIndex, startElementList] = startDragElement.current.id.split('-');
			if (startDragElement.current === element) return;

			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];

			// if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === secondListCopy[index] && pair.list === list) === -1) return;

			// An object where we have lists capacity
			const listsCapacity = {firstListMaxCapacity, secondListMinCapacity};
			// Check for lists capacity
			const isListCapacityExceeded = checkListsCapacity('second', null, firstListCopy, list, listsCapacity, secondListCopy, selectedItems);
			if (isListCapacityExceeded) return;

			// Check if we are dropping on the same list with touch events
			const isSameList = checkForSameList('second', dragOverElement, startElementIndex, isAboveDropPosition, startElementList, firstListCopy, selectedItems, setFirstListLocal, setPosition, removeDropBorder(element));
			if (isSameList) return;

			// Check if the selected item is already present in the selected items array
			setSelectedItemsPosition(dragOverElement, startElementIndex, startElementList, firstListCopy, noMultipleSelect, selectedItems, setPosition, setSelectedItems);

			rearrangeLists(firstListCopy, secondListCopy, startElementIndex, startElementList, dragOverElement.current, setFirstListLocal, setSecondListLocal, firstListOperation);

			removeDropBorder(element);
		}, [removeDropBorder, firstListLocal, firstListMaxCapacity, firstListOperation, noMultipleSelect, rearrangeLists, secondListLocal, secondListMinCapacity, selectedItems]);

		// Handler for `onTouchEnd` for the second list
		const handleTouchEndSecond = useCallback((ev) => {
			let element = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY).closest('[draggable]');
			const list = element.id.split('-')[1];
			const [startElementIndex, startElementList] = startDragElement.current.id.split('-');

			if (startDragElement.current === element) return;

			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];

			// if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === firstListCopy[index] && pair.list === list) === -1) return;

			// An object where we have lists capacity
			const listsCapacity = {firstListMinCapacity, secondListMaxCapacity};
			// Check for lists capacity
			const isListCapacityExceeded = checkListsCapacity('first', null, firstListCopy, list, listsCapacity, secondListCopy, selectedItems);
			if (isListCapacityExceeded) return;


			// In case of dropping items into the same list with touch events
			const isSameList = checkForSameList('first', dragOverElement, startElementIndex, isAboveDropPosition, startElementList, secondListCopy, selectedItems,setSecondListLocal, setPosition, removeDropBorder(element));
			if (isSameList) return;

			// Check if the selected item is already present in the selected items array
			setSelectedItemsPosition(dragOverElement, startElementIndex, startElementList, secondListCopy, noMultipleSelect, selectedItems, setPosition, setSelectedItems);

			rearrangeLists(secondListCopy, firstListCopy, startElementIndex, startElementList, dragOverElement.current, setSecondListLocal, setFirstListLocal, secondListOperation);

			removeDropBorder(element);
		}, [removeDropBorder, firstListLocal, firstListMinCapacity, noMultipleSelect, rearrangeLists, secondListLocal, secondListMaxCapacity, secondListOperation, selectedItems]);

		// Add all the event listeners to the visible items inside VirtualList and VirtualGridList
		const handleScroll = useCallback(() => {
			const selectCheckboxItem = document.querySelectorAll(`.${css.draggableItem}`);
			let orderCounter = 0;

			selectCheckboxItem.forEach(element => {
				element.setAttribute('order', `${orderCounter + 1}`);
				orderCounter++;

				const eventListeners = ['dragstart', 'dragover', 'dragenter', 'dragleave', 'drop'];
				eventListeners.forEach(event => {
					if (event === 'dragstart') {
						return element.addEventListener('dragstart', startListenerFunction);
					}
					if (event === 'dragover') {
						return element.addEventListener('dragover', dragoverListenerFunction);
					}
					if (event === 'dragenter') {
						return element.addEventListener('dragenter', dragoverListenerFunction);
					}
					if (event === 'dragleave') {
						return element.addEventListener('dragleave', dropEventListenerFunction);
					}
					if (event === 'drop') {
						return element.addEventListener('drop', dropEventListenerFunction);
					}
				});
			});
		}, [css.draggableItem, dragoverListenerFunction, dropEventListenerFunction, startListenerFunction]);

		// Inside this useEffect we add all event listeners to all the items, and handle the scroll behavior when the items are transferred
		useEffect(() => {
			const updateElements = setTimeout(() => {
				handleScroll();

				if (position === null) return;

				if (position.list === 'first') {
					scrollToRefFirst.current({index: position.index});
				} else {
					scrollToRefSecond.current({index: position.index});
				}

				setPosition(null);
			}, 100);
			// Cleanup function. Remove all event listeners
			return () => {
				const selectCheckboxItem = document.querySelectorAll(`.${css.draggableItem}`);
				selectCheckboxItem.forEach((element) => {
					element.removeEventListener('dragenter', dragoverListenerFunction);
					element.removeEventListener('dragleave', dropEventListenerFunction);
					element.removeEventListener('dragover', dragoverListenerFunction);
					element.removeEventListener('dragstart', startListenerFunction);
					element.removeEventListener('drop', dropEventListenerFunction);
				});
				clearTimeout(updateElements);
			};
		}, [dragOverElement, dragoverListenerFunction, dropEventListenerFunction, firstListLocal, handleTouchEndFirst, handleTouchEndSecond, handleTouchMove, handleTouchStart, listComponent, position, secondListLocal, selectedItems, startDragElement]); // eslint-disable-line react-hooks/exhaustive-deps

		// Handle move/copy/delete the selected items into the first list by 5-way or transfer buttons
		const moveIntoFirstSelected = useCallback(() => {
			// Make a copy of all lists
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			// Check for min-max capacity
			if (tempSecond.length <= secondListMinCapacity || tempSecond.length - tempSelected.length < secondListMinCapacity) return;
			if (tempFirst.length >= firstListMaxCapacity || tempFirst.length + tempSelected.length > firstListMaxCapacity) return;

			performMoveOperation('second', secondListLocal, secondListOperation, selectedItems, tempFirst, tempSecond, tempSelected);

			// If the state is externally controlled, use the provided functions
			setItemsOnMove(setFirstList, setFirstListLocal, setSecondList, setSecondListLocal, setSelectedItems, tempFirst, tempSecond, tempSelected);

			if (secondListOperation === 'move' || secondListOperation === 'copy') setPosition({index: tempFirst.length - 1, list: 'first'});
		}, [firstListLocal, firstListMaxCapacity, secondListLocal, secondListOperation, selectedItems, setFirstList, setSecondList, secondListMinCapacity]);

		// Handle move/copy/delete all item from the second list into the first list
		const selectIntoFirstAll = useCallback(() => {
			const concatList = secondListLocal.concat(firstListLocal.filter((item) => secondListLocal.indexOf(item) < 0));

			// Perform items actions based on `secondListOperation`
			performSelectAllOperation(concatList, 'second', secondListOperation, setFirstList, setFirstListLocal, setSecondList, setSecondListLocal, setSelectedItems);

			if (secondListOperation === 'move' || secondListOperation === 'copy') setPosition({index: (firstListLocal.length + secondListLocal.length) - 1, list: 'first'});
		}, [firstListLocal, secondListLocal, secondListOperation, setFirstList, setSecondList]);

		// Handle move/copy/delete the selected items into the second list by 5-way or transfer buttons
		const moveIntoSecondSelected = useCallback(() => {
			// Make a copy of all lists
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			// Check for min-max capacity
			if (tempFirst.length <= firstListMinCapacity || tempFirst.length - tempSelected.length < firstListMinCapacity) return;
			if (tempSecond.length >= secondListMaxCapacity || tempSecond.length + tempSelected.length > secondListMaxCapacity) return;

			performMoveOperation('first', firstListLocal, firstListOperation, selectedItems, tempSecond, tempFirst, tempSelected);

			// If the state is externally controlled, use the provided functions
			setItemsOnMove(setFirstList, setFirstListLocal, setSecondList, setSecondListLocal, setSelectedItems, tempFirst, tempSecond, tempSelected);

			if (firstListOperation === 'move' || firstListOperation === 'copy') setPosition({index: tempSecond.length - 1, list: 'second'});
		}, [firstListLocal, firstListMinCapacity, firstListOperation, secondListLocal, selectedItems, setFirstList, setSecondList, secondListMaxCapacity]);

		// Handle move/copy/delete all item into the second list
		const selectIntoSecondAll = useCallback(() => {
			const concatList = secondListLocal.concat(firstListLocal.filter((item) => secondListLocal.indexOf(item) < 0));

			// Perform items actions based on `firstListOperation`
			performSelectAllOperation(concatList, 'first', firstListOperation, setFirstList, setFirstListLocal, setSecondList, setSecondListLocal, setSelectedItems);

			if (firstListOperation === 'move' || firstListOperation === 'copy') setPosition({index: (firstListLocal.length + secondListLocal.length) - 1, list: 'second'});
		}, [firstListLocal, firstListOperation, secondListLocal, setFirstList, setSecondList]);

		// Adds or removes items from the selectedList
		const setSelected = useCallback((element, index, list) => {
			if (selectedItems.findIndex((newElement) => newElement.list === list) === -1 && selectedItems.length) return;
			const potentialIndex = selectedItems.findIndex((pair) => pair.element === element && pair.list === list);
			if (potentialIndex !== -1) {
				setSelectedItems(items => {
					items.splice(potentialIndex, 1);
					return [...items];
				});
			} else {
				setSelectedItems(items => {
					if (noMultipleSelect) {
						return [{element, index, list}];
					}
					return [...items, {element, index, list}];
				});
			}
		}, [selectedItems, noMultipleSelect]);

		// Change item position with arrow keys
		const reorderList = (list, index, inc, element) => {
			if (moveOnSpotlight) {
				const listLocal = list === 'first' ? firstListLocal : secondListLocal;
				const setListLocal = list === 'first' ? setFirstListLocal : setSecondListLocal;
				if (index + inc < 0 || index + inc >= listLocal.length) return;

				const listTemp = listLocal;
				listTemp.splice(index, 1);
				listTemp.splice(index + inc, 0, element);
				setListLocal(listTemp);
				setSelectedItems([{element, index: index + inc, list}]);
			}
		};

		// Handle drop actions for the second list
		const onDropSecondHandler = useCallback((ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const firstListCopy = [...firstListLocal];
			const secondListCopy = [...secondListLocal];

			// An object where we have lists capacity
			const listsCapacity = {firstListMinCapacity, secondListMaxCapacity};
			// Check for lists capacity
			const isListCapacityExceeded = checkListsCapacity('second', index, firstListCopy, list, listsCapacity, secondListCopy, selectedItems);
			if (isListCapacityExceeded) return;

			// Check if we are dropping on the same list
			const isSameList = checkForSameList('second', dragOverElement, index, isAboveDropPosition, list, secondListCopy, selectedItems, setSecondListLocal, setPosition);
			if (isSameList) return;

			// Set new position for the items after the drop action
			setSelectedItemsPosition(dragOverElement, index, list, firstListCopy, noMultipleSelect, selectedItems, setPosition, setSelectedItems);

			rearrangeLists(firstListCopy, secondListCopy, index, list, dragOverElement.current, setFirstListLocal, setSecondListLocal, firstListOperation);
		}, [firstListLocal, firstListMinCapacity, firstListOperation, noMultipleSelect, rearrangeLists, secondListLocal, selectedItems, secondListMaxCapacity]);

		// Handle drop action for the first list
		const onDropFirstHandler = useCallback((ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const firstListCopy = [...firstListLocal];
			const secondListCopy = [...secondListLocal];

			// An object where we have lists capacity
			const listsCapacity = {firstListMaxCapacity, secondListMinCapacity};
			// Check for lists capacity
			const isListCapacityExceeded = checkListsCapacity('first', index, firstListCopy, list, listsCapacity, secondListCopy, selectedItems);
			if (isListCapacityExceeded) return;

			// Check if we are dropping on the same list
			const isSameList = checkForSameList('first', dragOverElement, index, isAboveDropPosition, list, firstListCopy, selectedItems, setFirstListLocal, setPosition);
			if (isSameList) return;

			// Set new position for the items after the drop action
			setSelectedItemsPosition(dragOverElement, index, list, secondListCopy, noMultipleSelect, selectedItems, setPosition, setSelectedItems);

			rearrangeLists(secondListCopy, firstListCopy, index, list, dragOverElement.current, setSecondListLocal, setFirstListLocal, secondListOperation);
		}, [firstListLocal, firstListMaxCapacity, noMultipleSelect, rearrangeLists, secondListLocal, secondListMinCapacity, secondListOperation, selectedItems]);

		// Remove all the items in the `selectedItems` array
		const handleRemoveSelected = useCallback(() => setSelectedItems([]), []);

		// Move the selected items into the first list when `moveOnSpotlight` is true
		const moveInFirst = useCallback((ev) => {
			if (selectedItems.findIndex(elm => elm.list === 'second') === -1 || !moveOnSpotlight) return;
			moveIntoFirstSelected();
			ev?.preventDefault();
			ev?.stopPropagation();
		}, [moveIntoFirstSelected, moveOnSpotlight, selectedItems]);

		// Move the selected items into the second list when `moveOnSpotlight` is true
		const moveInSecond = useCallback((ev) => {
			if (selectedItems.findIndex(elm => elm.list === 'first') === -1 || !moveOnSpotlight) return;
			moveIntoSecondSelected();
			ev?.preventDefault();
			ev?.stopPropagation();
		}, [moveIntoSecondSelected, moveOnSpotlight, selectedItems]);

		// Configuration for the first list
		const firstListSpecs = {
			disabled,
			elements: firstListLocal,
			itemSize,
			list: 'first',
			onSelect: setSelected,
			orientation,
			reorderList,
			selectedItems,
			moveInSecond,
			showSelectionOrder
		};

		// Configuration for the second list
		const secondListSpecs = {
			disabled,
			elements: secondListLocal,
			itemSize,
			list: 'second',
			onSelect: setSelected,
			orientation,
			reorderList,
			selectedItems,
			moveInFirst,
			showSelectionOrder
		};

		return (
			<Layout align="center" className={componentCss.transferList} orientation={orientation}>
				<CustomDragImage listComponent={listComponent} ref={dragImageNode} />
				<Cell
					className={componentCss.listCell}
					onDragEnter={handlePreventDefault}
					onDragOver={handlePreventDefault}
					onDrop={onDropFirstHandler}
					onTouchEnd={handleTouchEndFirst}
					onTouchMove={handleTouchMove}
					onTouchStart={handleTouchStart}
					size="40%"
					style={{height: height, width: width}}
				>
					{listComponent === 'VirtualList' ?
						<VirtualList
							cbScrollTo={getScrollToFirst}
							dataSize={firstListLocal.length}
							direction={orientation === 'vertical' ? 'horizontal' : 'vertical'}
							horizontalScrollbar="hidden"
							itemRenderer={renderItem(firstListSpecs)}
							itemSize={itemSize}
							onScrollStop={handleScroll}
							spacing={orientation === 'vertical' ? itemSize * 3 : null}
						/> :
						<VirtualGridList
							cbScrollTo={getScrollToFirst}
							dataSize={firstListLocal.length}
							direction={orientation === 'vertical' ? 'horizontal' : 'vertical'}
							horizontalScrollbar="hidden"
							itemRenderer={renderImageItem(firstListSpecs)}
							itemSize={{
								minWidth: 5 * itemSize,
								minHeight: itemSize
							}}
							onScrollStop={handleScroll}
						/> }
				</Cell>
				<ButtonList
					disabled={disabled}
					firstListMaxCapacity={firstListMaxCapacity}
					firstListMinCapacity={firstListMinCapacity}
					handleRemoveSelected={handleRemoveSelected}
					moveIntoFirstSelected={moveIntoFirstSelected}
					moveIntoSecondSelected={moveIntoSecondSelected}
					moveOnSpotlight={moveOnSpotlight}
					orientation={orientation}
					secondListMaxCapacity={secondListMaxCapacity}
					secondListMinCapacity={secondListMinCapacity}
					selectIntoFirstAll={selectIntoFirstAll}
					selectIntoSecondAll={selectIntoSecondAll}
					selectedItems={selectedItems}
				/>
				<Cell
					className={componentCss.listCell}
					onDragEnter={handlePreventDefault}
					onDragOver={handlePreventDefault}
					onDrop={onDropSecondHandler}
					onTouchEnd={handleTouchEndSecond}
					onTouchMove={handleTouchMove}
					onTouchStart={handleTouchStart}
					size="40%"
					style={{height: height, width: width}}
				>
					{listComponent === 'VirtualList' ?
						<VirtualList
							cbScrollTo={getScrollToSecond}
							dataSize={secondListLocal.length}
							direction={orientation === 'vertical' ? 'horizontal' : 'vertical'}
							horizontalScrollbar="hidden"
							itemRenderer={renderItem(secondListSpecs)}
							itemSize={itemSize}
							onScrollStop={handleScroll}
							spacing={orientation === 'vertical' ? itemSize * 3 : null}
						/> :
						<VirtualGridList
							cbScrollTo={getScrollToSecond}
							dataSize={secondListLocal.length}
							direction={orientation === 'vertical' ? 'horizontal' : 'vertical'}
							horizontalScrollbar="hidden"
							itemRenderer={renderImageItem(secondListSpecs)}
							itemSize={{
								minWidth: 5 * itemSize,
								minHeight: itemSize
							}}
							onScrollStop={handleScroll}
						/> }
				</Cell>
			</Layout>
		);
	}
});

/**
 * Sandstone-specific behaviors to apply to {@link sandstone/TransferList.TransferListBase|TransferListBase}.
 *
 * @hoc
 * @memberof sandstone/TransferList
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 *
 * @public
 */
const TransferListDecorator = compose(
	Skinnable,
	Spottable
);
const TransferList = TransferListDecorator(TransferListBase);

export default TransferList;
export {TransferList, TransferListBase, TransferListDecorator};
