/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import {Cell, Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import Button from '../Button';
import CheckboxItem from '../CheckboxItem';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import componentCss from './TransferList.module.less';

const TransferListBase = kind({
	name: 'TransferList',

	functional: true,

	propTypes: {
		firstList: PropTypes.array,
		height: PropTypes.string,
		secondList: PropTypes.array,
		setFirstList: PropTypes.func,
		setSecondList: PropTypes.func
	},

	defaultProps: {
		height: ri.scaleToRem(999),
		firstList: {},
		secondList: {},
		setFirstList: null,
		setSecondList: null
	},

	styles: {
		css: componentCss,
		className: 'transferList',
		publicClassNames: true
	},

	computed: {
		renderItems: () => ({elements, list, onSelect, selectedItems}) => {
			return elements.map((element, index) => {
				const clickHandle = useCallback(() => onSelect(element, index, list), [element, index, list, onSelect]);
				return (
					<CheckboxItem
						draggable
						className="checkbox"
						id={`${index}-${list}`}
						key={index + list}
						onClick={clickHandle}
						selected={-1 !== selectedItems.findIndex((pair) => pair.element === element && pair.list === list)}
					>
						{element}
					</CheckboxItem>
				);
			});
		}
	},

	render: ({firstList, height, secondList, renderItems, setFirstList, setSecondList}) => {
		const [firstListLocal, setFirstListLocal] = useState(firstList);
		const [secondListLocal, setSecondListLocal] = useState(secondList);
		const [selectedItems, setSelectedItems] = useState([]);

		const dragOverElement = useRef();

		useEffect(() => {

			const seletCheckboxItem = document.querySelectorAll('.checkbox');
			seletCheckboxItem.forEach(element => {
				const [index, list] = element.id.split('-');

				const eventListeners = ['dragstart', 'drag'];
				eventListeners.forEach(event => {
					if (event === 'dragstart') {
						return element.addEventListener('dragstart', (ev) => {
							console.log('dragging element with index', index, 'from list ', list);
							ev.dataTransfer.setData('text/plain', `${index}-${list}`);
							ev.dataTransfer.effectAllowed = 'move';
						});
					}
					if (event === 'drag') {
						return element.addEventListener('dragover', () => {
							console.log('dragging over element with index', index, 'from list ', list);
							dragOverElement.current = index;
						});
					}
				});
			});

		}, [firstListLocal, secondListLocal]);

		const moveIntoFirstSelected = useCallback(() => {
			let tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			selectedItems.map((item) => {
				if (item.list === 'second') {
					tempFirst = [...tempFirst, secondListLocal[secondListLocal.findIndex(element => element === item.element)]];
					tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
					tempSecond.splice(tempSecond.findIndex((element) => element === item.element), 1);
				}
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(tempFirst);
				setSecondList(tempSecond);
			} else {
				setFirstListLocal(tempFirst);
				setSecondListLocal(tempSecond);
			}
			setSelectedItems(tempSelected);
		}, [firstListLocal, secondListLocal, selectedItems, setFirstList, setSecondList]);

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

			selectedItems.map((item) => {
				if (item.list === 'first') {
					tempSecond = [...tempSecond, firstListLocal[firstListLocal.findIndex(element => element === item.element)]];
					tempSelected.splice(tempSelected.findIndex((pair) => pair.element === item.element && pair.list === item.list), 1);
					tempFirst.splice(tempFirst.findIndex((element) => element === item.element), 1);
				}
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(tempFirst);
				setSecondList(tempSecond);
			} else {
				setFirstListLocal(tempFirst);
				setSecondListLocal(tempSecond);
			}
			setSelectedItems(tempSelected);
		}, [firstListLocal, secondListLocal, selectedItems, setFirstList, setSecondList]);

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

		const renderFirstList = useCallback(() => (
			renderItems({
				elements: firstListLocal,
				list: 'first',
				onSelect: setSelected,
				selectedItems: selectedItems
			})
		), [firstListLocal, renderItems, selectedItems, setSelected]);

		const renderSecondList = useCallback(() => (
			renderItems({
				elements: secondListLocal,
				list: 'second',
				onSelect: setSelected,
				selectedItems: selectedItems
			})
		), [renderItems, secondListLocal, selectedItems, setSelected]);

		const rearrangeList = (dragOverElementIndex, itemIndex, list, setNewList) => {
			const draggedItem = list[itemIndex];
			list.splice(itemIndex, 1);
			list.splice(dragOverElementIndex, 0, draggedItem);
			setNewList(list);
		};

		const rearrangeLists = (sourceList, destinationList, draggedElementIndex, dragOverElementIndex, setSourceList, setDestinationList) => {
			const draggedItem = sourceList[draggedElementIndex];
			sourceList.splice(draggedElementIndex, 1);
			destinationList.splice(dragOverElementIndex, 0, draggedItem);
			dragOverElement.current = null;
			setSourceList(sourceList);
			setDestinationList(destinationList);
		};

		const getTransferData = (dataTransferObj) => {
			if (dataTransferObj) {
				const data = dataTransferObj.getData('text/plain');
				const [index, list] = data.split('-');
				return {index, list};
			}
			return null;
		};

		const onDropRightHandler = (ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];

			if (list === 'second') {
				rearrangeList(dragOverElement.current, index, secondListCopy, setSecondListLocal);
				return;
			}

			const potentialIndex = selectedItems.findIndex((pair) => pair.element === firstListCopy[index] && pair.list === list);
			if (potentialIndex !== -1) {
				const selectedListCopy = [...selectedItems];
				selectedListCopy.splice(potentialIndex, 1);
				setSelectedItems(selectedListCopy);
			}

			rearrangeLists(firstListCopy, secondListCopy, index, dragOverElement.current, setFirstListLocal, setSecondListLocal);
		};

		const onDropLeftHandler = (ev) => {
			const {index, list} = getTransferData(ev.dataTransfer);
			const firstListCopy = [...firstListLocal];
			const secondListCopy = [...secondListLocal];

			if (list === 'first') {
				rearrangeList(dragOverElement.current, index, firstListCopy, setFirstListLocal);
				return;
			}

			const potentialIndex = selectedItems.findIndex((pair) => pair.element === secondListCopy[index] && pair.list === list);
			if (potentialIndex !== -1) {
				const selectedListCopy = [...selectedItems];
				selectedListCopy.splice(potentialIndex, 1);
				setSelectedItems(selectedListCopy);
			}

			rearrangeLists(secondListCopy, firstListCopy, index, dragOverElement.current, setSecondListLocal, setFirstListLocal);
		};

		return (
			<Layout align="center" className={componentCss.transferList}>
				<Cell
					className={componentCss.listCell}
					onDragEnter={(e) => e.preventDefault()}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(ev) => onDropLeftHandler(ev)}
					size="40%"
					style={{height: height}}
				>
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						<div className={componentCss.itemsList}>
							{renderFirstList()}
						</div>
					</Scroller>
				</Cell>
				<Cell className={componentCss.listButtons}>
					<Button onClick={moveIntoSecondAll} size="small">{'>>>'}</Button>
					<Button disabled={!(selectedItems.find((item) => item.list === "first"))} onClick={moveIntoSecondSelected} size="small">{'>'}</Button>
					<Button disabled={!(selectedItems.find((item) => item.list === "second"))} onClick={moveIntoFirstSelected} size="small">{'<'}</Button>
					<Button onClick={moveIntoFirstAll} size="small">{'<<<'}</Button>
				</Cell>
				<Cell
					className={componentCss.listCell}
					onDragEnter={(e) => e.preventDefault()}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(ev) => onDropRightHandler(ev)}
					size="40%"
					style={{height: height}}
				>
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						<div className={componentCss.itemsList}>
							{renderSecondList()}
						</div>
					</Scroller>
				</Cell>
			</Layout>
		);
	}
});

const TransferList = Skinnable(TransferListBase);

export default TransferList;
export {TransferList, TransferListBase};
