/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import {Layout, Cell, Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

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

	styles: {
		css: componentCss,
		className: 'transferList',
		publicClassNames: true
	},

	computed: {
		renderItems: () => ({elements, list, onSelect, selectedItems}) => {
			return elements.map((element, index) => {
				const clickHandle = useCallback(() => onSelect(index, list), [index]);

				return (
					<CheckboxItem
						id={index + list}
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

		const moveIntoFirstSelected = useCallback(() => {
			let cont = 0,
				tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			selectedItems.map((item, index) => {
				if (item.list === 'second') {
					tempFirst = [...tempFirst, secondListLocal[item.index]];
					tempSelected.splice(index - cont, 1);
					tempSecond.splice(item.index - cont, 1);
					cont++;
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
			let cont = 0,
				tempFirst = [...firstListLocal],
				tempSecond = [...secondListLocal],
				tempSelected = [...selectedItems];

			selectedItems.map((item, index) => {
				if (item.list === 'first') {
					tempSecond = [...tempSecond, firstListLocal[item.index]];
					tempSelected.splice(index - cont, 1);
					tempFirst.splice(item.index - cont, 1);
					cont++;
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

		const setSelected = useCallback((index, list) => {
			const potentialIndex = selectedItems.findIndex((pair) => pair.index === index && pair.list === list);

			if (potentialIndex !== -1) {
				setSelectedItems(items => {
					items.splice(potentialIndex, 1);
					return [...items];
				})
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

		return (
			<Layout align="center" className={componentCss.transferList}>
				<Cell size="40%">
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
					<Button onClick={moveIntoSecondSelected} size="small">{'>'}</Button>
					<Button onClick={moveIntoFirstSelected} size="small">{'<'}</Button>
					<Button onClick={moveIntoFirstAll} size="small">{'<<<'}</Button>
				</Cell>
				<Cell size="40%">
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
