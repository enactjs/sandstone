/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {Header} from '@enact/sandstone/Panels';
import {InputField as Input} from '@enact/sandstone/Input';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useContext} from 'react';

import LocaleSwitch from '../LocaleSwitch';
import ScrollModeSwitch from '../ScrollModeSwitch';

import {
	addItem as addItemAction,
	changeDataSize as changeDataSizeAction,
	changeMinHeight as changeMinHeightAction,
	changeMinWidth as changeMinWidthAction,
	changeSpacing as changeSpacingAction,
	deleteItem as deleteAction,
	deleteSelectedItem as deleteSelectedAction,
	selectAll as selectAllAction,
	selectionEnable as selectionEnableAction,
	setData as setDataAction,
	RecordContext,
	RecordDispatchContext
} from '../../context/RecordContext';
import createRecord from '../../utils';

const PanelHeader = (props) => {
	const {nativeScroll, onChangeDirection, onChangeScrollMode, ...rest} = props;

	const dispatch = useContext(RecordDispatchContext);
	const {dataSize, minHeight, minWidth, showOverlay, spacing} = useContext(RecordContext);

	const tooltipText = showOverlay ? 'Previous' : 'Selection';
	const inputWidth = {width: '5em'};

	const addMockItem = () => {
		dispatch(addItemAction(createRecord({recordIndex: dataSize, showOverlay})));
	};
	const changeMinHeight = (ev) => {
		dispatch(changeMinHeightAction(ev.value));
	};
	const changeMinWidth = (ev) => {
		dispatch(changeMinWidthAction(ev.value));
	};
	const changeSpacing = (ev) => {
		dispatch(changeSpacingAction(ev.value));
	};
	const deleteItem = () => {
		dispatch(deleteAction());
	};
	const deleteSelectedItem = () => {
		dispatch(deleteSelectedAction());
	};
	const selectAll = () => {
		dispatch(selectAllAction());
	};
	const setData = (ev) => {
		dispatch(changeDataSizeAction(ev.value));

		for (let i = 0; i <= ev.value; i++) {
			dispatch(setDataAction(createRecord({recordIndex: Number(dataSize) + i, showOverlay}), ev.value));
		}
	};
	const showSelectionOverlayHandler = () => {
		dispatch(selectionEnableAction());
	};

	return (
		<Header {...rest}>
			<Row>
				<Cell shrink>
					{/* add button */}
					{!showOverlay && <Button icon="plus" onClick={addMockItem} size="small" tooltipText="Add Item" />}
				</Cell>
				<Cell shrink>
					{/* delete button */}
					{!showOverlay && <Button icon="minus" onClick={deleteItem} size="small" tooltipText="Delete Item" />}
				</Cell>
				<Cell shrink>
					{/* delete selected button */}
					{showOverlay && <Button size="small" onClick={deleteSelectedItem}>Delete</Button>}
				</Cell>
				<Cell shrink>
					{/* select all button */}
					{showOverlay && <Button size="small" onClick={selectAll}>Select/DeSelect All</Button>}
				</Cell>
				<Cell shrink>
					{/* selection previous button */}
					<Button size="small" onClick={showSelectionOverlayHandler}>{tooltipText}</Button>
				</Cell>
				<Cell>
					{/* change direction button */}
					{!showOverlay && <CheckboxItem onClick={onChangeDirection}>Horizontal</CheckboxItem>}
				</Cell>
				<Cell>
					{/* change scroll mode */}
					{!showOverlay && <ScrollModeSwitch defaultSelected={nativeScroll} onToggle={onChangeScrollMode} />}
				</Cell>
				<Cell>
					<LocaleSwitch />
				</Cell>
			</Row>
			{!showOverlay &&
				<Row style={{direction: 'ltr'}}>
					<Cell>
						<label>dataSize:</label>
						<Input size="small" onChange={setData} style={inputWidth} type="number" value={dataSize} />
					</Cell>
					<Cell>
						<label>minHeightSize:</label>
						<Input size="small" onChange={changeMinHeight} style={inputWidth} type="number" value={minHeight} />
					</Cell>
					<Cell>
						<label>minWidthSize:</label>
						<Input size="small" onChange={changeMinWidth} style={inputWidth} type="number" value={minWidth} />
					</Cell>
					<Cell>
						<label>spacingSize:</label>
						<Input size="small" onChange={changeSpacing} style={inputWidth} type="number" value={spacing} />
					</Cell>
				</Row>
			}
		</Header>
	);
};

PanelHeader.propTypes = {
	nativeScroll: PropTypes.bool,
	onChangeDirection: PropTypes.func,
	onChangeScrollMode: PropTypes.func
};

export default PanelHeader;
