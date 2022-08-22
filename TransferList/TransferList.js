/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import {Layout, Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import Button from '../Button';
import CheckboxItem from '../CheckboxItem';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

// import componentCss from './TransferList.module.less';


const TransferListBase = kind({
	name: 'TransferList',

	functional: true,

	propTypes: {
		firstList: PropTypes.array,
		secondList: PropTypes.array,
		setFirstList: PropTypes.func,
		setSecondList: PropTypes.func
	},

	defaultProps: {
		firstList: {},
		secondList: {},
		setFirstList: null,
		setSecondList: null
	},

	computed: {
		renderItems: () => ({elements, list, onSelect, selectedItems}) => {
			return elements.map((element, index) => {
				const clickHandle = useCallback(() => onSelect(index, list), [index]);
				return (
					<CheckboxItem
						draggable
						className="checkbox"
						id={`${index}-${list}`}
						inline
						key={index + list}
						onClick={clickHandle}
						selected={-1 !== selectedItems.findIndex((pair) => pair.index === index && pair.list === list)}
					>
						{element}
					</CheckboxItem>
				);
			});
		}
	},

	render: ({firstList, secondList, renderItems, setFirstList, setSecondList}) => {
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
						return element.addEventListener('dragover', (ev) => {
							console.log('dragging over element with index', index, 'from list ', list);
							dragOverElement.current = index;
						});
					}
				});
			});

		}, [firstListLocal, secondListLocal]);

		const moveIntoFirstSelected = useCallback(() => {
			let cont = 0,
				provFirst = [...firstListLocal],
				provSecond = [...secondListLocal],
				provSelected = [...selectedItems];

			selectedItems.map((item, index) => {
				if (item.list === 'second') {
					provFirst = [...provFirst, secondListLocal[item.index]];
					provSelected.splice(index - cont, 1);
					provSecond.splice(item.index - cont, 1);
					cont++;
				}
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(provFirst);
				setSecondList(provSecond);
			} else {
				setFirstListLocal(provFirst);
				setSecondListLocal(provSecond);
			}
			setSelectedItems(provSelected);
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
			let cont = 0,
				provFirst = [...firstListLocal],
				provSecond = [...secondListLocal],
				provSelected = [...selectedItems];

			selectedItems.map((item, index) => {
				if (item.list === 'first') {
					provSecond = [...provSecond, firstListLocal[item.index]];
					provSelected.splice(index - cont, 1);
					provFirst.splice(item.index - cont, 1);
					cont++;
				}
			});

			if (setFirstList !== null && setSecondList !== null) {
				setFirstList(provFirst);
				setSecondList(provSecond);
			} else {
				setFirstListLocal(provFirst);
				setSecondListLocal(provSecond);
			}
			setSelectedItems(provSelected);
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

		const setSelected = useCallback((index, list) => {
			const potentialIndex = selectedItems.findIndex((pair) => pair.index === index && pair.list === list);
			if (potentialIndex !== -1) {
				setSelectedItems(items => {
					items.splice(potentialIndex, 1);
					return [...items];
				});
			} else {
				setSelectedItems(items => ([...items, {index, list}]));
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

		const onDropRightHandler = (ev) => {
			console.log('from onDropRightHandler');
			const data = ev.dataTransfer.getData('text/plain');
			console.log(data);
			const [index, list] = data.split('-');
			if (list === 'second') return;
			console.log('dropping on the right');
			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];
			const draggedItem = firstListCopy[index];
			secondListCopy.splice(dragOverElement.current, 0, draggedItem);
			firstListCopy.splice(index, 1);
			setFirstListLocal(firstListCopy);
			setSecondListLocal(secondListCopy);
		};

		const onDropLefttHandler = (ev) => {
			console.log('from onDropLefttHandler');
			const data = ev.dataTransfer.getData('text/plain');
			const [index, list] = data.split('-');
			console.log(data);
			if (list === 'first') return;

			const secondListCopy = [...secondListLocal];
			const firstListCopy = [...firstListLocal];
			const draggedItem = secondListCopy[index];
			secondListCopy.splice(index, 1);
			firstListCopy.splice(dragOverElement.current, 0, draggedItem);
			console.log('adding ', draggedItem, 'after ', dragOverElement.current);
			dragOverElement.current = null;
			setFirstListLocal(firstListCopy);
			setSecondListLocal(secondListCopy);
		};

		return (
			<Layout align="center">
				<Column
					onDragEnter={(e) => e.preventDefault()}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(ev) => onDropLefttHandler(ev)}
					style={{width: ri.unit(300, 'rem'), height: ri.unit(500, 'rem')}}
				>
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						{renderFirstList()}
					</Scroller>
				</Column>
				<Column>
					<Button onClick={moveIntoSecondAll} size="small">{'>>>'}</Button>
					<Button onClick={moveIntoSecondSelected} size="small">{'>'}</Button>
					<Button onClick={moveIntoFirstSelected} size="small">{'<'}</Button>
					<Button onClick={moveIntoFirstAll} size="small">{'<<<'}</Button>
				</Column>
				<Column
					onDragEnter={(e) => e.preventDefault()}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(ev) => onDropRightHandler(ev)}
					style={{width: ri.unit(300, 'rem'), height: ri.unit(500, 'rem')}}
				>
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						{renderSecondList()}
					</Scroller>
				</Column>
			</Layout>
		);
	}
});

const TransferList = Skinnable(TransferListBase);

export default TransferList;
export {TransferList, TransferListBase};
