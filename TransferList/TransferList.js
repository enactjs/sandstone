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

import Button from '../Button';
import CheckboxItem from '../CheckboxItem';
import CustomDragImage from './CustomDragImage';
import Icon from '../Icon';
import ImageItem from '../ImageItem';
import Skinnable from '../Skinnable';
import VirtualList, {VirtualGridList} from '../VirtualList';

import componentCss from './TransferList.module.less';
import imageItemCss from '../ImageItem/ImageItem.module.less';

const svgGenerator = (width, height, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23117fba'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E${customText}%3C/text%3E%3C/svg%3E`
);

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
		 * The height of the checkbox item.
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
		noMultipleDrag: PropTypes.bool,

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
		noMultipleDrag: false,
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

	computed: {
		renderItem: ({disabled, itemSize, orientation}) => ({elements, list, moveInFirst, moveInSecond, onSelect, reorderList, selectedItems, showSelectionOrder, ...rest}) => (data) => {
			const {index, 'data-index': dataIndex} = data;
			const element = elements[index];
			const selectedIndex = selectedItems.findIndex((args) => args.element === element && args.list === list) + 1;
			const selected = selectedIndex !== 0;
			const style = orientation === 'horizontal' ? {} : {height: `calc(100% - ${ri.scaleToRem(42)})`, width: ri.scaleToRem(itemSize * 3)};
			const handleClick = () => {
				onSelect(element, index, list);
			};

			const handleSpotlightDown = (ev) => {
				if (orientation === 'vertical' && list === 'first') moveInSecond();
				if (elements.length - 1 !== index && orientation === 'horizontal') return;
				if (list === 'first' && orientation === 'vertical') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightLeft = (ev) => {
				if (orientation === 'horizontal' && list === 'second') moveInFirst();
				if (index !== 0 || orientation === 'horizontal') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightRight = (ev) => {
				if (orientation === 'horizontal' && list === 'first') moveInSecond();
				if (elements.length - 1 !== index || orientation === 'horizontal') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightUp = (ev) => {
				if (orientation === 'vertical' && list === 'second') moveInFirst();
				if (index !== 0 && orientation === 'horizontal') return;
				if (list === 'second' && orientation === 'vertical') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleKeyDownCapture = (ev) => {
				if (!selected || selectedItems.length > 1) return;
				if (orientation !== 'vertical') {
					if (ev.key === 'ArrowUp') {
						reorderList(list, index, -1, element);
					} else if (ev.key === 'ArrowDown') {
						reorderList(list, index, 1, element);
					}
				} else if (orientation !== 'horizontal') {
					if (ev.key === 'ArrowLeft') {
						reorderList(list, index, -1, element);
					} else if (ev.key === 'ArrowRight') {
						reorderList(list, index, 1, element);
					}
				}
			};

			return (
				<CheckboxItem
					{...rest}
					className={componentCss.draggableItem}
					data-index={dataIndex}
					draggable={!disabled}
					disabled={disabled}
					id={`${index}-${list}`}
					key={index + list}
					onClick={handleClick}	// eslint-disable-line  react/jsx-no-bind
					onKeyDownCapture={handleKeyDownCapture}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightDown={handleSpotlightDown}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightLeft={handleSpotlightLeft}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightRight={handleSpotlightRight}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightUp={handleSpotlightUp}	// eslint-disable-line  react/jsx-no-bind
					selected={selected}
					slotAfter={(selected && showSelectionOrder) && selectedIndex}
					style={style}
				>
					{element}
				</CheckboxItem>
			);
		},
		renderImageItem: ({disabled, orientation}) => ({elements, list, moveInFirst, moveInSecond, onSelect, reorderList, selectedItems, showSelectionOrder, ...rest}) => (data) => {	// eslint-disable-line	enact/display-name
			const {index, 'data-index': dataIndex} = data;
			const element = elements[index];
			const selectedIndex = selectedItems.findIndex((args) => args.element === element && args.list === list) + 1;
			const selected = selectedIndex !== 0;

			const source = {
				hd: svgGenerator(200, 200, ''),
				fhd: svgGenerator(300, 300, ''),
				uhd: svgGenerator(600, 600, '')
			};

			const selectionComponent = () => {
				return <div className={componentCss.selectionContainer}>{selected && <Icon className={imageItemCss.selectionIcon}>check</Icon>}{(selected && showSelectionOrder) && selectedIndex}</div>;
			};

			const handleClick = () => {
				onSelect(element, index, list);
			};

			const handleSpotlightDown = (ev) => {
				if (orientation === 'vertical' && list === 'first') moveInSecond();
				if (elements.length - 1 !== index && orientation === 'horizontal') return;
				if (list === 'first' && orientation === 'vertical') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightLeft = (ev) => {
				if (orientation === 'horizontal' && list === 'second') moveInFirst();
				if ((index !== 0 && index !== 1 ) || orientation === 'horizontal') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightRight = (ev) => {
				if (orientation === 'horizontal' && list === 'first') moveInSecond();
				if ((elements.length - 1 !== index && elements.length - 2 !== index) || orientation === 'horizontal') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightUp = (ev) => {
				if (orientation === 'vertical' && list === 'second') moveInFirst();
				if (index !== 0 && orientation === 'horizontal') return;
				if (list === 'second' && orientation === 'vertical') return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleKeyDownCapture = (ev) => {
				if (!selected || selectedItems.length > 1) return;
				if (orientation !== 'vertical') {
					if (ev.key === 'ArrowUp') {
						reorderList(list, index, -1, element);
					} else if (ev.key === 'ArrowDown') {
						reorderList(list, index, 1, element);
					}
				} else if (orientation !== 'horizontal') {
					if (ev.key === 'ArrowLeft') {
						reorderList(list, index, -2, element);
					} else if (ev.key === 'ArrowRight') {
						reorderList(list, index, 2, element);
					} else if (ev.key === 'ArrowUp') {
						reorderList(list, index, -1, element);
					} else if (ev.key === 'ArrowDown') {
						reorderList(list, index, 1, element);
					}
				}
			};

			return (
				<ImageItem
					{...rest}
					className={componentCss.draggableItem}
					data-index={dataIndex}
					disabled={disabled}
					draggable={!disabled}
					id={`${index}-${list}`}
					key={index + list}
					onClick={handleClick}	// eslint-disable-line  react/jsx-no-bind
					onKeyDownCapture={handleKeyDownCapture} // eslint-disable-line  react/jsx-no-bind
					onSpotlightDown={handleSpotlightDown}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightLeft={handleSpotlightLeft}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightRight={handleSpotlightRight}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightUp={handleSpotlightUp}	// eslint-disable-line  react/jsx-no-bind
					orientation="horizontal"
					selected={selected}
					selectionComponent={selectionComponent} // eslint-disable-line  react/jsx-no-bind
					showSelection
					src={source}
				>
					{element}
				</ImageItem>
			);
		}
	},

	render: ({css, disabled, firstList, firstListMaxCapacity, firstListMinCapacity, firstListOperation, height: defaultHeight, itemSize: defaultItemSize, listComponent, moveOnSpotlight, noMultipleDrag, orientation, renderImageItem, renderItem, secondList, secondListMaxCapacity, secondListMinCapacity, secondListOperation, setFirstList, setSecondList, showSelectionOrder, verticalHeight}) => {
		const [firstListLocal, setFirstListLocal] = useState(firstList);
		const [position, setPosition] = useState(null);
		const [secondListLocal, setSecondListLocal] = useState(secondList);
		const [selectedItems, setSelectedItems] = useState([]);

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

		const dropEventListenerFunction = useCallback((ev) => {
			let element;
			if (!ev.target.children.length) {
				element = ev.target.parentElement;
			} else {
				element = ev.currentTarget;
			}

			element.classList.remove(`${css.overAbove}`);
			element.classList.remove(`${css.overBelow}`);
			element.classList.remove(`${css.overLeft}`);
			element.classList.remove(`${css.overRight}`);
		}, [css.overAbove, css.overBelow, css.overLeft, css.overRight]);

		const dragoverListenerFunction = useCallback((ev) => {
			let element;
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

			if (startDragElement.current !== element && (!isVertical || !isDefaultListComponent)) {
				if ((ev.offsetY < currentElement.current.offsetHeight / 3 || isAboveCurrentElement) && !isBelowCurrentElement) {
					currentElement.current.classList.add(`${css.overAbove}`);
					currentElement.current.classList.remove(`${css.overBelow}`);
					isAboveDropPosition.current = true;
				} else {
					currentElement.current.classList.add(`${css.overBelow}`);
					currentElement.current.classList.remove(`${css.overAbove}`);
					isAboveDropPosition.current = false;
				}
			} else if (startDragElement.current !== element) {
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

		const handleScroll = useCallback(() => {
			const selectCheckboxItem = document.querySelectorAll(`.${css.draggableItem}`);
			let orderCounter = 0;

			selectCheckboxItem.forEach(element => {
				element.setAttribute('order', orderCounter + 1);
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
		}, [dragOverElement, dragoverListenerFunction, dropEventListenerFunction, firstListLocal, listComponent, position, secondListLocal, selectedItems, startDragElement]); // eslint-disable-line react-hooks/exhaustive-deps

		const moveIntoFirstSelected = useCallback(() => {
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			if (tempSecond.length <= secondListMinCapacity || tempSecond.length - tempSelected.length < secondListMinCapacity) return;
			if (tempFirst.length >= firstListMaxCapacity || tempFirst.length + tempSelected.length > firstListMaxCapacity) return;

			selectedItems.map((item) => {
				if (item.list !== 'second') return;
				if (secondListOperation === 'move' || secondListOperation === 'copy') tempFirst = [...tempFirst, secondListLocal[secondListLocal.findIndex(element => element === item.element)]];
				if (secondListOperation === 'move' || secondListOperation === 'delete') tempSecond.splice(tempSecond.findIndex((element) => element === item.element), 1);
				tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(tempFirst);
				setSecondList(tempSecond);
			} else {
				setFirstListLocal(tempFirst);
				setSecondListLocal(tempSecond);
			}
			setSelectedItems(tempSelected);

			if (secondListOperation === 'move' || secondListOperation === 'copy') setPosition({index: tempFirst.length - 1, list: 'first'});
		}, [firstListLocal, firstListMaxCapacity, secondListLocal, secondListOperation, selectedItems, setFirstList, setSecondList, secondListMinCapacity]);

		const selectIntoFirstAll = useCallback(() => {
			if (setFirstList !== null && setSecondList !== null) {
				if (secondListOperation === 'move' || secondListOperation === 'copy') setFirstList([...firstListLocal, ...secondListLocal]);
				if (secondListOperation === 'move' || secondListOperation === 'delete') setSecondList([]);
			} else {
				if (secondListOperation === 'move' || secondListOperation === 'copy') setFirstListLocal([...firstListLocal, ...secondListLocal]);
				if (secondListOperation === 'move' || secondListOperation === 'delete') setSecondListLocal([]);
			}
			setSelectedItems([]);

			if (secondListOperation === 'move' || secondListOperation === 'copy') setPosition({index: (firstListLocal.length + secondListLocal.length) - 1, list: 'first'});
		}, [firstListLocal, secondListLocal, secondListOperation, setFirstList, setSecondList]);

		const moveIntoSecondSelected = useCallback(() => {
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			if (tempFirst.length <= firstListMinCapacity || tempFirst.length - tempSelected.length < firstListMinCapacity) return;
			if (tempSecond.length >= secondListMaxCapacity || tempSecond.length + tempSelected.length > secondListMaxCapacity) return;

			selectedItems.map((item) => {
				if (item.list !== 'first') return;
				if (firstListOperation === 'move' || firstListOperation === 'copy') tempSecond = [...tempSecond, firstListLocal[firstListLocal.findIndex(element => element === item.element)]];
				if (firstListOperation === 'move' || firstListOperation === 'delete') tempFirst.splice(tempFirst.findIndex((element) => element === item.element), 1);
				tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(tempFirst);
				setSecondList(tempSecond);
			} else {
				setFirstListLocal(tempFirst);
				setSecondListLocal(tempSecond);
			}
			setSelectedItems(tempSelected);

			if (firstListOperation === 'move' || firstListOperation === 'copy') setPosition({index: tempSecond.length - 1, list: 'second'});
		}, [firstListLocal, firstListMinCapacity, firstListOperation, secondListLocal, selectedItems, setFirstList, setSecondList, secondListMaxCapacity]);

		const selectIntoSecondAll = useCallback(() => {
			if (setFirstList !== null && setSecondList !== null) {
				if (firstListOperation === 'move' || firstListOperation === 'copy') setSecondList([...secondListLocal, ...firstListLocal]);
				if (firstListOperation === 'move' || firstListOperation === 'delete') setFirstList([]);
			} else {
				if (firstListOperation === 'move' || firstListOperation === 'copy') setSecondListLocal([...secondListLocal, ...firstListLocal]);
				if (firstListOperation === 'move' || firstListOperation === 'delete') setFirstListLocal([]);
			}
			setSelectedItems([]);

			if (firstListOperation === 'move' || firstListOperation === 'copy') setPosition({index: (firstListLocal.length + secondListLocal.length) - 1, list: 'second'});
		}, [firstListLocal, firstListOperation, secondListLocal, setFirstList, setSecondList]);

		const setSelected = useCallback((element, index, list) => {
			if (selectedItems.findIndex((newElement) => newElement.list === list) === -1 && selectedItems.length) return;
			const potentialIndex = selectedItems.findIndex((pair) => pair.element === element && pair.list === list);
			if (potentialIndex !== -1) {
				setSelectedItems(items => {
					items.splice(potentialIndex, 1);
					return [...items];
				});
			} else {
				setSelectedItems(items => ([...items, {element, index, list}]));
			}
		}, [selectedItems]);

		const reorderList = (list, index, inc, element) => {
			if (list === 'first' && moveOnSpotlight) {
				if (index + inc < 0 || index + inc >= firstListLocal.length) return;

				let firstListTemp = firstListLocal;
				firstListTemp.splice(index, 1);
				firstListTemp.splice(index + inc, 0, element);
				setFirstListLocal(firstListTemp);
				setSelectedItems([{element, index: index + inc, list}]);
			} else if (list === 'second' && moveOnSpotlight) {
				if (index + inc < 0 || index + inc >= secondListLocal.length) return;

				let secondListTemp = secondListLocal;
				secondListTemp.splice(index, 1);
				secondListTemp.splice(index + inc, 0, element);
				setSecondListLocal(secondListTemp);
				setSelectedItems([{element, index: index + inc, list}]);
			}
		};

		const rearrangeList = (dragOverElementIndex, itemIndex, list, listName, setNewList) => {
			const draggedItem = list[itemIndex];
			list.splice(itemIndex, 1);
			list.splice(dragOverElementIndex, 0, draggedItem);
			setNewList(list);
		};

		const rearrangeLists = useCallback((sourceList, destinationList, draggedElementIndex, draggedElementList, dragOverElementIndex, setSourceList, setDestinationList) => {
			const draggedItem = sourceList[draggedElementIndex];
			const elementPosition = isAboveDropPosition.current ? dragOverElementIndex : dragOverElementIndex + 1;

			if (!noMultipleDrag) {
				const potentialIndex = selectedItems.findIndex((pair) => pair.element === draggedItem);

				if (potentialIndex === -1) {
					if (draggedElementList === 'second'  && (secondListOperation === 'move' || secondListOperation === 'copy')) destinationList.splice(elementPosition, 0, draggedItem);
					if (draggedElementList === 'second'  && (secondListOperation === 'move' || secondListOperation === 'delete')) sourceList.splice(sourceList.findIndex((element) => element === draggedItem), 1);
					if (draggedElementList === 'first'  && (firstListOperation === 'move' || firstListOperation === 'copy')) destinationList.splice(elementPosition, 0, draggedItem);
					if (draggedElementList === 'first'  && (firstListOperation === 'move' || firstListOperation === 'delete')) sourceList.splice(sourceList.findIndex((element) => element === draggedItem), 1);
				}

				selectedItems.map((item, arrayIndex) => {
					if (item.list !== draggedElementList) return;
					if (draggedElementList === 'second'  && (secondListOperation === 'move' || secondListOperation === 'copy')) destinationList.splice(elementPosition + arrayIndex, 0, item.element);
					if (draggedElementList === 'second'  && (secondListOperation === 'move' || secondListOperation === 'delete')) sourceList.splice(sourceList.findIndex((element) => element === item.element && item.list === draggedElementList), 1);
					if (draggedElementList === 'first'  && (firstListOperation === 'move' || firstListOperation === 'copy')) destinationList.splice(elementPosition + arrayIndex, 0, item.element);
					if (draggedElementList === 'first'  && (firstListOperation === 'move' || firstListOperation === 'delete')) sourceList.splice(sourceList.findIndex((element) => element === item.element && item.list === draggedElementList), 1);
				});
			} else {
				if (draggedElementList === 'second'  && (secondListOperation === 'move' || secondListOperation === 'copy')) destinationList.splice(elementPosition, 0, draggedItem);
				if (draggedElementList === 'second'  && (secondListOperation === 'move' || secondListOperation === 'delete')) sourceList.splice(draggedElementIndex, 1);
				if (draggedElementList === 'first'  && (firstListOperation === 'move' || firstListOperation === 'copy')) destinationList.splice(elementPosition, 0, draggedItem);
				if (draggedElementList === 'first'  && (firstListOperation === 'move' || firstListOperation === 'delete')) sourceList.splice(draggedElementIndex, 1);
			}

			dragOverElement.current = null;
			setSourceList(sourceList);
			setDestinationList(destinationList);
		}, [firstListOperation, noMultipleDrag, secondListOperation, selectedItems]);

		const getTransferData = (dataTransferObj) => {
			if (dataTransferObj) {
				const data = dataTransferObj.getData('text/plain');
				const [index, list] = data.split('-');
				return {index, list};
			}
			return null;
		};

		const onDropSecondHandler = useCallback((ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];

			if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === firstListCopy[index] && pair.list === list) === -1) return;

			if (firstListCopy.length <= firstListMinCapacity || firstListCopy.length - selectedItems.length < firstListMinCapacity) return;
			if (secondListCopy.length >= secondListMaxCapacity || secondListCopy.length + selectedItems.length > secondListMaxCapacity) return;

			if (list === 'second') {
				setPosition({index: (selectedItems.length + parseInt(dragOverElement.current)) - 2, list: 'second'});

				rearrangeList(dragOverElement.current, index, secondListCopy, list, setSecondListLocal);
				return;
			}

			const potentialIndex = selectedItems.findIndex((pair) => pair.element === firstListCopy[index] && pair.list === list);

			const selectedListCopy = [...selectedItems];
			if (!noMultipleDrag) {
				selectedItems.map((item) => {
					selectedListCopy.splice(selectedListCopy.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
				});
			} else {
				selectedListCopy.splice(potentialIndex, 1);
			}
			setSelectedItems(selectedListCopy);

			setPosition({index: ((selectedItems.length / 2) + parseInt(dragOverElement.current)) - 2, list: 'second'});

			rearrangeLists(firstListCopy, secondListCopy, index, list, dragOverElement.current, setFirstListLocal, setSecondListLocal);
		}, [firstListLocal, firstListMinCapacity, noMultipleDrag, rearrangeLists, secondListLocal, selectedItems, secondListMaxCapacity]);

		const onDropFirstHandler = useCallback((ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const firstListCopy = [...firstListLocal];
			const secondListCopy = [...secondListLocal];

			if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === secondListCopy[index] && pair.list === list) === -1) return;

			if (secondListCopy.length <= secondListMinCapacity || secondListCopy.length - selectedItems.length < secondListMinCapacity) return;
			if (firstListCopy.length >= firstListMaxCapacity || firstListCopy.length + selectedItems.length > firstListMaxCapacity) return;

			if (list === 'first') {
				setPosition({index: (selectedItems.length + parseInt(dragOverElement.current)) - 2, list: 'first'});

				rearrangeList(dragOverElement.current, index, firstListCopy, list, setFirstListLocal);
				return;
			}

			const potentialIndex = selectedItems.findIndex((pair) => pair.element === secondListCopy[index] && pair.list === list);

			if (potentialIndex !== -1) {
				const selectedListCopy = [...selectedItems];
				if (!noMultipleDrag) {
					selectedItems.map((item) => {
						selectedListCopy.splice(selectedListCopy.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
					});
				} else {
					selectedListCopy.splice(potentialIndex, 1);
				}
				setSelectedItems(selectedListCopy);
			}

			setPosition({index: ((selectedItems.length / 2) + parseInt(dragOverElement.current)) - 2, list: 'first'});

			rearrangeLists(secondListCopy, firstListCopy, index, list, dragOverElement.current, setSecondListLocal, setFirstListLocal);
		}, [firstListLocal, firstListMaxCapacity, noMultipleDrag, rearrangeLists, secondListLocal, selectedItems, secondListMinCapacity]);

		const handlePreventDefault = useCallback(ev => ev.preventDefault(), []);

		const handleRemoveSelected = useCallback(() => setSelectedItems([]), []);

		const handleSpotlightBounds = useCallback(ev => {
			ev.preventDefault();
			ev.stopPropagation();
		}, []);

		const moveInFirst = useCallback((ev) => {
			if (selectedItems.findIndex(elm => elm.list === 'second') === -1 || !moveOnSpotlight) return;
			moveIntoFirstSelected();
			ev?.preventDefault();
			ev?.stopPropagation();
		}, [moveIntoFirstSelected, moveOnSpotlight, selectedItems]);

		const moveInSecond = useCallback((ev) => {
			if (selectedItems.findIndex(elm => elm.list === 'first') === -1 || !moveOnSpotlight) return;
			moveIntoSecondSelected();
			ev?.preventDefault();
			ev?.stopPropagation();
		}, [moveIntoSecondSelected, moveOnSpotlight, selectedItems]);

		const firstListSpecs = {
			elements: firstListLocal,
			list: 'first',
			onSelect: setSelected,
			reorderList,
			selectedItems,
			moveInSecond,
			showSelectionOrder
		};

		const secondListSpecs = {
			elements: secondListLocal,
			list: 'second',
			onSelect: setSelected,
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
				<Cell className={componentCss.listButtons} style={{flexDirection: orientation === 'vertical' ? 'row' : 'column'}}>
					{!moveOnSpotlight ?
						<>
							<Button
								disabled={disabled || !!secondListMaxCapacity || !!firstListMinCapacity}
								icon={orientation === 'vertical' ? 'triangledown' : 'triangleright'}
								iconOnly
								onClick={selectIntoSecondAll}
								onSpotlightLeft={orientation === 'vertical' ? handleSpotlightBounds : null}
								onSpotlightUp={orientation === 'horizontal' ? handleSpotlightBounds : null}
								size="small"
							/>
							<Button
								disabled={!(selectedItems.find((item) => item.list === "first")) || disabled}
								icon={orientation === 'vertical' ? 'arrowlargedown' : 'arrowsmallright'}
								iconOnly
								onClick={moveIntoSecondSelected}
								size="small"
							/>
							<Button
								disabled={!(selectedItems.find((item) => item.list === "second")) || disabled}
								icon={orientation === 'vertical' ? 'arrowlargeup' : 'arrowsmallleft'}
								iconOnly
								onClick={moveIntoFirstSelected}
								size="small"
							/>
							<Button
								disabled={disabled || !!firstListMaxCapacity || !!secondListMinCapacity}
								icon={orientation === 'vertical' ? 'triangleup' : 'triangleleft'}
								iconOnly
								onClick={selectIntoFirstAll}
								size="small"
							/>
							<Button
								disabled={disabled}
								icon="refresh"
								iconOnly
								onClick={handleRemoveSelected}
								onSpotlightDown={orientation === 'horizontal' ? handleSpotlightBounds : null}
								onSpotlightRight={orientation === 'vertical' ? handleSpotlightBounds : null}
								size="small"
							/>
						</> : ''
					}
				</Cell>
				<Cell
					className={componentCss.listCell}
					onDragEnter={handlePreventDefault}
					onDragOver={handlePreventDefault}
					onDrop={onDropSecondHandler}
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
 * Sandstone-specific behaviors to apply to [TransferListBase]{@link sandstone/TransferList.TransferListBase}.
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
