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
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useRef, useState} from 'react';

import Button from '../Button';
import CheckboxItem from '../CheckboxItem';
import Skinnable from '../Skinnable';
import VirtualList from '../VirtualList';

import componentCss from './TransferList.module.less';
import itemCss from '../Item/Item.module.less';

let multipleItemDragContainer, singleItemDragContainer;

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
		showSelectionOrder: PropTypes.bool
	},

	defaultProps: {
		disabled: false,
		firstList: {},
		height: 999,
		itemSize: 201,
		moveOnSpotlight: false,
		noMultipleDrag: false,
		secondList: {},
		setFirstList: null,
		setSecondList: null,
		showSelectionOrder: false
	},

	styles: {
		css: componentCss,
		className: 'transferList',
		publicClassNames: true
	},

	computed: {
		renderItem: ({disabled}) => ({elements, handleDrag, handleDragEnd, handleDragStart, list, onSelect, selectedItems, showSelectionOrder, ...rest}) => (data) => {	// eslint-disable-line	enact/display-name
			const {index, 'data-index': dataIndex} = data;
			const element = elements[index];
			const selectedIndex = selectedItems.findIndex((args) => args.element === element && args.list === list) + 1;
			const selected = selectedIndex !== 0;

			const handleClick = () => {
				onSelect(element, index, list);
			};

			const handleSpotlightDown = (ev) => {
				if (elements.length - 1 !== index) return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			const handleSpotlightUp = (ev) => {
				if (index !== 0) return;
				ev.preventDefault();
				ev.stopPropagation();
			};

			return (
				<CheckboxItem
					{...rest}
					data-index={dataIndex}
					draggable={!disabled}
					disabled={disabled}
					className={componentCss.draggableItem}
					id={`${index}-${list}`}
					key={index + list}
					onClick={handleClick}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightDown={handleSpotlightDown}	// eslint-disable-line  react/jsx-no-bind
					onSpotlightUp={handleSpotlightUp}	// eslint-disable-line  react/jsx-no-bind
					selected={selected}
					slotAfter={(selected && showSelectionOrder) && selectedIndex}
					onDragStart={handleDragStart}
					onDrag={handleDrag}
					onDragEnd={handleDragEnd}
				>
					{element}
				</CheckboxItem>
			);
		}
	},

	render: ({css, disabled, firstList, firstListMaxCapacity, firstListMinCapacity, height: defaultHeight, itemSize: defaultItemSize, moveOnSpotlight, noMultipleDrag, renderItem, secondList, secondListMaxCapacity, secondListMinCapacity, setFirstList, setSecondList, showSelectionOrder}) => {
		const [firstListLocal, setFirstListLocal] = useState(firstList);
		const [secondListLocal, setSecondListLocal] = useState(secondList);
		const [selectedItems, setSelectedItems] = useState([]);

		const height = ri.scaleToRem(defaultHeight);
		const itemSize = ri.scale(defaultItemSize);
		let dragOverElement = useRef();
		let startDragElement = useRef();

		const setCommonElementStyles = (element) => {
			const item = document.querySelectorAll(`.${css.draggableItem}`)[0];
			if (item) {
				const itemBg = item.querySelectorAll(`.${itemCss.bg}`)[0];

				element.style.backgroundColor = window.getComputedStyle(itemBg).backgroundColor;
				element.style.border = '1px solid black';
				element.style.borderRadius = window.getComputedStyle(itemBg).borderRadius;
				element.style.height = item.clientHeight + 'px';
				element.style.left = "0px";
				element.style.position = "absolute";
				element.style.width = item.clientWidth + 'px';
			}
		};

		const generateDragImage = () => {
			const item = document.querySelectorAll(`.${css.draggableItem}`)[0];
			if (item) {
				singleItemDragContainer = document.createElement("div");
				setCommonElementStyles(singleItemDragContainer);
				singleItemDragContainer.style.bottom = "0px";
				singleItemDragContainer.style.left = "0px";
				singleItemDragContainer.style.zIndex = '-100';
				document.body.appendChild(singleItemDragContainer);

				multipleItemDragContainer = document.createElement("div");
				setCommonElementStyles(multipleItemDragContainer);
				multipleItemDragContainer.style.height = 1.6 * item.clientHeight + 'px';
				multipleItemDragContainer.style.top = "0px";
				multipleItemDragContainer.style.zIndex = '-110';
				document.body.appendChild(multipleItemDragContainer);

				let div2 = document.createElement("div");
				setCommonElementStyles(div2);
				div2.style.top = "0px";
				div2.style.zIndex = '-100';

				let div3 = document.createElement("div");
				setCommonElementStyles(div3);
				div3.style.top = 0.3 * item.clientHeight + 'px';
				div3.style.zIndex = '-90';

				let div4 = document.createElement("div");
				setCommonElementStyles(div4);
				div4.style.top = 0.6 * item.clientHeight + 'px';
				div4.style.zIndex = '-80';

				multipleItemDragContainer.appendChild(div2);
				multipleItemDragContainer.appendChild(div3);
				multipleItemDragContainer.appendChild(div4);
			}
		};

		useEffect(() => {
			generateDragImage();
		});

		const handleScroll = useCallback(() => {
			const selectCheckboxItem = document.querySelectorAll(`.${css.draggableItem}`);
			let orderCounter = 0;

			selectCheckboxItem.forEach(element => {
				const [index, list] = element.id.split('-');
				element.setAttribute('order', orderCounter + 1);
				orderCounter++;

				const potentialIndex = selectedItems.findIndex((pair) => '✓' + pair.element === element.textContent && pair.list === list);

				const eventListeners = ['dragstart', 'dragover', 'dragenter', 'dragleave', 'drop'];
				eventListeners.forEach(event => {
					if (event === 'dragstart') {
						return element.addEventListener('dragstart', (ev) => {
							startDragElement.current = element;
							ev.dataTransfer.setData('text/plain', `${index}-${list}`);
							ev.dataTransfer.effectAllowed = 'move';

							if (!noMultipleDrag && potentialIndex === -1 ? selectedItems.length + 1 > 1 : selectedItems.length > 1) {
								ev.dataTransfer.setDragImage(multipleItemDragContainer, 0, 0);
							} else {
								ev.dataTransfer.setDragImage(singleItemDragContainer, 0, 0);
							}
						});
					}
					if (event === 'dragover') {
						return element.addEventListener('dragover', (ev) => {
							dragOverElement.current = index;
							const startDragOrder = Number(startDragElement.current.getAttribute('order'));
							const dragOverOrder = Number(element.getAttribute('order'));
							if (startDragOrder < dragOverOrder && startDragElement.current !== element) {
								if (ev.offsetY <= 20) {
									element.classList.add(`${css.overAbove}`);
								}
							} else if (startDragOrder > dragOverOrder && startDragElement.current !== element) {
								if (ev.offsetY === -1 || ev.offsetY === 0) {
									element.classList.remove(`${css.overAbove}`);
									element.classList.remove(`${css.overBelow}`);
								} else if (ev.offsetY <= 60 && ev.offsetY >= 35) {
									element.classList.add(`${css.overBelow}`);
								}
							}
						});
					}
					if (event === 'dragenter') {
						return element.addEventListener('dragenter', (ev) => {
							dragOverElement.current = index;
							const startDragOrder = Number(startDragElement.current.getAttribute('order'));
							const dragOverOrder = Number(element.getAttribute('order'));
							if (startDragOrder < dragOverOrder && startDragElement.current !== element) {
								if (ev.offsetY <= 20) {
									element.classList.add(`${css.overAbove}`);
								}
							} else if (startDragOrder > dragOverOrder && startDragElement.current !== element) {
								if (ev.offsetY === -1 || ev.offsetY === 0) {
									element.classList.remove(`${css.overAbove}`);
									element.classList.remove(`${css.overBelow}`);
								} else if (ev.offsetY <= 60 && ev.offsetY >= 35) {
									element.classList.add(`${css.overBelow}`);
								}
							}
						});
					}
					if (event === 'dragleave') {
						return element.addEventListener('dragleave', () => {
							element.classList.remove(`${css.overAbove}`);
							element.classList.remove(`${css.overBelow}`);
						});
					}
					if (event === 'drop') {
						return element.addEventListener('drop', () => {
							element.classList.remove(`${css.overAbove}`);
							element.classList.remove(`${css.overBelow}`);
						});
					}
				});
			});
		}, [css.draggableItem, css.overAbove, css.overBelow, noMultipleDrag, selectedItems]);

		useEffect(() => {
			const updateElements = setTimeout(() => handleScroll(), 100);
			return () => {
				clearTimeout(updateElements);
			};
		}, [dragOverElement, firstListLocal, secondListLocal, selectedItems, startDragElement]); // eslint-disable-line react-hooks/exhaustive-deps

		const moveIntoFirstSelected = useCallback(() => {
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			if (tempSecond.length <= secondListMinCapacity || tempSecond.length - tempSelected.length < secondListMinCapacity) return;
			if (tempFirst.length >= firstListMaxCapacity || tempFirst.length + tempSelected.length > firstListMaxCapacity) return;

			selectedItems.map((item) => {
				if (item.list !== 'second') return;
				tempFirst = [...tempFirst, secondListLocal[secondListLocal.findIndex(element => element === item.element)]];
				tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
				tempSecond.splice(tempSecond.findIndex((element) => element === item.element), 1);
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(tempFirst);
				setSecondList(tempSecond);
			} else {
				setFirstListLocal(tempFirst);
				setSecondListLocal(tempSecond);
			}
			setSelectedItems(tempSelected);
		}, [firstListLocal, firstListMaxCapacity, secondListLocal, selectedItems, setFirstList, setSecondList, secondListMinCapacity]);

		const moveIntoFirstAll = useCallback(() => {
			if (setFirstList !== null && setSecondList !== null) {
				setFirstList([...firstListLocal, ...secondListLocal]);
				setSecondList([]);
			} else {
				setFirstListLocal([...firstListLocal, ...secondListLocal]);
				setSecondListLocal([]);
			}
			setSelectedItems([]);
		}, [firstListLocal, secondListLocal, setFirstList, setSecondList]);

		const moveIntoSecondSelected = useCallback(() => {
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			if (tempFirst.length <= firstListMinCapacity || tempFirst.length - tempSelected.length < firstListMinCapacity) return;
			if (tempSecond.length >= secondListMaxCapacity || tempSecond.length + tempSelected.length > secondListMaxCapacity) return;

			selectedItems.map((item) => {
				if (item.list !== 'first') return;
				tempSecond = [...tempSecond, firstListLocal[firstListLocal.findIndex(element => element === item.element)]];
				tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
				tempFirst.splice(tempFirst.findIndex((element) => element === item.element), 1);
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(tempFirst);
				setSecondList(tempSecond);
			} else {
				setFirstListLocal(tempFirst);
				setSecondListLocal(tempSecond);
			}
			setSelectedItems(tempSelected);
		}, [firstListLocal, firstListMinCapacity, secondListLocal, selectedItems, setFirstList, setSecondList, secondListMaxCapacity]);

		const moveIntoSecondAll = useCallback(() => {
			if (setFirstList !== null && setSecondList !== null) {
				setFirstList([]);
				setSecondList([...secondListLocal, ...firstListLocal]);
			} else {
				setFirstListLocal([]);
				setSecondListLocal([...secondListLocal, ...firstListLocal]);
			}
			setSelectedItems([]);
		}, [firstListLocal, secondListLocal, setFirstList, setSecondList]);

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

		const rearrangeList = (dragOverElementIndex, itemIndex, list, listName, setNewList) => {
			const draggedItem = list[itemIndex];
			list.splice(itemIndex, 1);
			list.splice(dragOverElementIndex, 0, draggedItem);
			setNewList(list);
		};

		const rearrangeLists = useCallback((sourceList, destinationList, draggedElementIndex, draggedElementList, dragOverElementIndex, setSourceList, setDestinationList) => {
			const draggedItem = sourceList[draggedElementIndex];

			if (!noMultipleDrag) {
				const potentialIndex = selectedItems.findIndex((pair) => pair.element === draggedItem);

				if (potentialIndex === -1) {
					destinationList.splice(Number(dragOverElement.current), 0, draggedItem);
					sourceList.splice(sourceList.findIndex((element) => element === draggedItem), 1);
				}

				selectedItems.map((item, arrayIndex) => {
					if (item.list !== draggedElementList) return;
					destinationList.splice(Number(dragOverElement.current) + arrayIndex, 0, item.element);
					sourceList.splice(sourceList.findIndex((element) => element === item.element && item.list === draggedElementList), 1);
				});
			} else {
				sourceList.splice(draggedElementIndex, 1);
				destinationList.splice(dragOverElementIndex, 0, draggedItem);
			}

			dragOverElement.current = null;
			setSourceList(sourceList);
			setDestinationList(destinationList);
		}, [noMultipleDrag, selectedItems]);

		const getTransferData = (dataTransferObj) => {
			if (dataTransferObj) {
				const data = dataTransferObj.getData('text/plain');
				const [index, list] = data.split('-');
				return {index, list};
			}
			return null;
		};

		const onDropRightHandler = useCallback((ev) => {
			console.log("dropping", ev);
			const {index, list} = getTransferData(ev.dataTransfer);
			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];

			if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === firstListCopy[index] && pair.list === list) === -1) return;

			if (firstListCopy.length <= firstListMinCapacity || firstListCopy.length - selectedItems.length < firstListMinCapacity) return;
			if (secondListCopy.length >= secondListMaxCapacity || secondListCopy.length + selectedItems.length > secondListMaxCapacity) return;

			if (list === 'second') {
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

			rearrangeLists(firstListCopy, secondListCopy, index, list, dragOverElement.current, setFirstListLocal, setSecondListLocal);
		}, [firstListLocal, firstListMinCapacity, noMultipleDrag, rearrangeLists, secondListLocal, selectedItems, secondListMaxCapacity]);

		const onDropLeftHandler = useCallback((ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const firstListCopy = [...firstListLocal];
			const secondListCopy = [...secondListLocal];

			if (selectedItems.length && selectedItems.findIndex((pair) => pair.element === secondListCopy[index] && pair.list === list) === -1) return;

			if (secondListCopy.length <= secondListMinCapacity || secondListCopy.length - selectedItems.length < secondListMinCapacity) return;
			if (firstListCopy.length >= firstListMaxCapacity || firstListCopy.length + selectedItems.length > firstListMaxCapacity) return;

			if (list === 'first') {
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

			rearrangeLists(secondListCopy, firstListCopy, index, list, dragOverElement.current, setSecondListLocal, setFirstListLocal);
		}, [firstListLocal, firstListMaxCapacity, noMultipleDrag, rearrangeLists, secondListLocal, selectedItems, secondListMinCapacity]);

		const handlePreventDefault = useCallback(ev => ev.preventDefault(), []);

		const handleRemoveSelected = useCallback(() => setSelectedItems([]), []);

		const handleSpotlightBounds = useCallback(ev => {
			ev.preventDefault();
			ev.stopPropagation();
		}, []);

		const handleSpotlightLeft = useCallback((ev) => {
			if (selectedItems.findIndex(elm => elm.list === 'second') === -1 || !moveOnSpotlight) return;
			moveIntoFirstSelected();
			ev.preventDefault();
			ev.stopPropagation();
		}, [moveIntoFirstSelected, moveOnSpotlight, selectedItems]);

		const handleSpotlightRight = useCallback((ev) => {
			if (selectedItems.findIndex(elm => elm.list === 'first') === -1 || !moveOnSpotlight) return;
			moveIntoSecondSelected();
			ev.preventDefault();
			ev.stopPropagation();
		}, [moveIntoSecondSelected, moveOnSpotlight, selectedItems]);

		const [dragging, setDragging] = useState(false);

		const handleDragStart = useCallback((ev) => {
			console.log('start dragging', ev);
			setDragging(true);

			if (ev.type === 'onDragStart') {
				const [index, list] = ev.node.id.split('-');
				return ev.node.addEventListener('dragstart', (event) => {
					startDragElement.current = event.target;
					event.dataTransfer.setData('text/plain', `${index}-${list}`);
					event.dataTransfer.effectAllowed = 'move';
					// ev.dataTransfer.setDragImage(img, 0, 0);
				});
			}
		}, [moveIntoFirstSelected, moveOnSpotlight, selectedItems]);

		const handleDrag = useCallback((ev) => {
			setDragging(true);
			console.log('dragging', ev);

			if (ev.type === 'onDrag') {
				const [index, list] = ev.node.id.split('-');
				return ev.node.addEventListener('dragover', (event) => {
					dragOverElement.current = index;
					const startDragOrder = Number(startDragElement.current.getAttribute('order'));
					const dragOverOrder = Number(event.target.getAttribute('order'));
					if (startDragOrder < dragOverOrder && startDragElement.current !== event.target) {
						if (event.offsetY <= 20) {
							event.target.classList.add(`${css.overAbove}`);
						}
					} else if (startDragOrder > dragOverOrder && startDragElement.current !== ev.target) {
						if (event.offsetY === -1 || event.offsetY === 0) {
							event.target.classList.remove(`${css.overAbove}`);
							event.target.classList.remove(`${css.overBelow}`);
						} else if (event.offsetY <= 60 && event.offsetY >= 35) {
							event.target.classList.add(`${css.overBelow}`);
						}
					}
				});
			}
			// if (ev.type === 'dragenter') {
			// 	const [index, list] = ev.target.id.split('-');
			// 	return ev.target.addEventListener('dragenter', (ev) => {
			// 		dragOverElement.current = index;
			// 		const startDragOrder = Number(startDragElement.current.getAttribute('order'));
			// 		const dragOverOrder = Number(ev.target.getAttribute('order'));
			// 		if (startDragOrder < dragOverOrder && startDragElement.current !== ev.target) {
			// 			if (ev.offsetY <= 20) {
			// 				ev.target.classList.add(`${css.overAbove}`);
			// 			}
			// 		} else if (startDragOrder > dragOverOrder && startDragElement.current !== ev.target) {
			// 			if (ev.offsetY === -1 || ev.offsetY === 0) {
			// 				ev.target.classList.remove(`${css.overAbove}`);
			// 				ev.target.classList.remove(`${css.overBelow}`);
			// 			} else if (ev.offsetY <= 60 && ev.offsetY >= 35) {
			// 				ev.target.classList.add(`${css.overBelow}`);
			// 			}
			// 		}
			// 	});
			// }
		}, []);
		const handleDragEnd = useCallback((ev) => {
			console.log('dragging ended', ev);
			setDragging(false);

			if (ev.type === 'onDragEnd') {
				return ev.node.addEventListener('dragleave', () => {
					ev.target.classList.remove(`${css.overAbove}`);
					ev.target.classList.remove(`${css.overBelow}`);
				});
			}
			// if (ev.type === 'drop') {
			// 	return ev.target.addEventListener('drop', () => {
			// 		ev.target.classList.remove(`${css.overAbove}`);
			// 		ev.target.classList.remove(`${css.overBelow}`);
			// 	});
			// }
		}, []);

		const firstListSpecs = {
			elements: firstListLocal,
			list: 'first',
			onSelect: setSelected,
			selectedItems,
			onSpotlightRight: handleSpotlightRight,
			showSelectionOrder,
			handleDragStart,
			handleDrag,
			handleDragEnd
		};

		const secondListSpecs = {
			elements: secondListLocal,
			list: 'second',
			onSelect: setSelected,
			selectedItems,
			onSpotlightLeft: handleSpotlightLeft,
			showSelectionOrder,
			handleDragStart,
			handleDrag,
			handleDragEnd
		};

		const TouchableCell = Touchable(Cell);

		return (
			<Layout align="center" className={componentCss.transferList}>
				<TouchableCell
					className={componentCss.listCell}
					onDragEnter={handlePreventDefault}
					onDragOver={handlePreventDefault}
					onDrop={onDropLeftHandler}
					// onPointerDown={(ev) => handleDragStart(ev)}
					// onPointerMove={() => console.log('pointer move')}
					// onPointerUp={() => console.log('pointer up')}
					//onDragStart={(ev) => handleDragStart(ev)}
					//onDrag={(ev) => handleDrag(ev)}
					onDragEnd={handleDragEnd}
					size="40%"
					style={{height: height}}
				>
					<VirtualList
						dataSize={firstListLocal.length}
						horizontalScrollbar="hidden"
						itemRenderer={renderItem(firstListSpecs)}
						itemSize={itemSize}
						onScrollStop={handleScroll}
						style={{height: height}}
						verticalScrollbar="hidden"
					/>
				</TouchableCell>
				<Cell className={componentCss.listButtons}>
					{!moveOnSpotlight ?
						<>
							<Button disabled={disabled || !!secondListMaxCapacity || !!firstListMinCapacity} onClick={moveIntoSecondAll} onSpotlightUp={handleSpotlightBounds} size="small">{'>>>'}</Button>
							<Button disabled={!(selectedItems.find((item) => item.list === "first")) || disabled} onClick={moveIntoSecondSelected} size="small">{'>'}</Button>
							<Button disabled={!(selectedItems.find((item) => item.list === "second")) || disabled} onClick={moveIntoFirstSelected} size="small">{'<'}</Button>
							<Button disabled={disabled || !!firstListMaxCapacity || !!secondListMinCapacity} onClick={moveIntoFirstAll} size="small">{'<<<'}</Button>
							<Button onClick={handleRemoveSelected} onSpotlightDown={handleSpotlightBounds} size="small">{'Clear'}</Button>
						</> : ''
					}
				</Cell>
				<TouchableCell
					className={componentCss.listCell}
					onDragEnter={handlePreventDefault}
					onDragOver={handlePreventDefault}
					onDrop={onDropRightHandler}
					size="40%"
					style={{height: height}}
				>
					<VirtualList
						dataSize={secondListLocal.length}
						horizontalScrollbar="hidden"
						itemRenderer={renderItem(secondListSpecs)}
						itemSize={itemSize}
						onScrollStop={handleScroll}
						verticalScrollbar="hidden"
					/>
				</TouchableCell>
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
