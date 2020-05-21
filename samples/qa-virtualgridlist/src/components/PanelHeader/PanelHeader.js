import Button from '@enact/sandstone/Button';
import {Cell, Row} from '@enact/ui/Layout';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {connect} from 'react-redux';
import {InputField as Input} from '@enact/sandstone/Input';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import LocaleSwitch from '../LocaleSwitch';
import ScrollModeSwitch from '../ScrollModeSwitch';

import {
	addItem as addAction,
	changeDataSize as changeDataSizeAction,
	changeMinHeight as changeMinHeightAction,
	changeMinWidth as changeMinWidthAction,
	changeSpacing as changeSpacingAction,
	deleteItem as deleteAction,
	deleteSelectedItem as deleteSelectedAction,
	selectAll as selectAllAction,
	selectionEnable as selectionEnableAction,
	setData as setAction
} from '../../actions';

const createMockItem = (dataSize, showOverlay) => {
	const
		dataLength = dataSize,
		caption = (dataLength % 8 === 0) ? ' with looooooooooong title' : '',
		subCaption = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		children: dataLength + caption,
		label: subCaption,
		selected: false,
		showSelection: showOverlay,
		src: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength
	};
};

const PanelHeader = kind({
	name: 'PanelHeader',

	propTypes: {
		showOverlay: PropTypes.bool.isRequired,
		addItem: PropTypes.func,
		changeDataSize: PropTypes.func,
		changeMinHeight: PropTypes.func,
		changeMinWidth: PropTypes.func,
		changeSpacing: PropTypes.func,
		data: PropTypes.any,
		dataSize: PropTypes.number,
		deleteItem: PropTypes.func,
		deleteSelectedItem: PropTypes.func,
		nativeScroll: PropTypes.bool,
		onChangeDirection: PropTypes.func,
		onChangeScrollMode: PropTypes.func,
		selectAll: PropTypes.func,
		selectionEnable: PropTypes.func,
		setData: PropTypes.func
	},

	handlers: {
		addMockItem: (ev, {addItem, dataSize, showOverlay}) => {
			addItem(createMockItem(dataSize, showOverlay));
		},
		changeMinHeight: (ev, {changeMinHeight}) => {
			changeMinHeight(ev.value);
		},
		changeMinWidth: (ev, {changeMinWidth}) => {
			changeMinWidth(ev.value);
		},
		changeSpacing: (ev, {changeSpacing}) => {
			changeSpacing(ev.value);
		},
		deleteItem: (ev, {deleteItem}) => {
			deleteItem();
		},
		deleteSelectedItem: (ev, {deleteSelectedItem}) => {
			deleteSelectedItem();
		},
		selectAll: (ev, {selectAll}) => {
			selectAll();
		},
		setData: (ev, {changeDataSize, dataSize, showOverlay, setData}) => {
			changeDataSize(ev.value);
			for (let i = 0; i <= ev.value; i++) {
				setData(ev.value, createMockItem(dataSize + i, showOverlay));
			}
		},
		showSelectionOverlayHandler: (ev, {selectionEnable}) => {
			selectionEnable();
		}
	},

	computed: {
		addButton: ({addMockItem, showOverlay}) => {
			if (!showOverlay) {
				return (<Button icon="plus" onClick={addMockItem} size="small" tooltipText="Add Item" />);
			}
		},
		changeDirectionButton: ({onChangeDirection, showOverlay}) => {
			if (!showOverlay) {
				return (<CheckboxItem onClick={onChangeDirection}>Horizontal</CheckboxItem>);
			}
		},
		changeListProps: ({changeMinHeight, changeMinWidth, changeSpacing, data, setData, showOverlay}) => {
			if (!showOverlay) {
				const inputWidth = {width: '5em'};

				return (
					<Row style={{direction: 'ltr'}}>
						<Cell>
							<label>dataSize:</label>
							<Input size="small" onChange={setData} style={inputWidth} type="number" value={data.dataSize} />
						</Cell>
						<Cell>
							<label>minHeightSize:</label>
							<Input size="small" onChange={changeMinHeight} style={inputWidth} type="number" value={data.minHeight} />
						</Cell>
						<Cell>
							<label>minWidthSize:</label>
							<Input size="small" onChange={changeMinWidth} style={inputWidth} type="number" value={data.minWidth} />
						</Cell>
						<Cell>
							<label>spacingSize:</label>
							<Input size="small" onChange={changeSpacing} style={inputWidth} type="number" value={data.spacing} />
						</Cell>
					</Row>
				);
			}
		},
		changeScrollMode: ({nativeScroll, onChangeScrollMode, showOverlay}) => {
			if (!showOverlay) {
				return (<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={onChangeScrollMode} />);
			}
		},
		deleteButton: ({deleteItem, showOverlay}) => {
			if (!showOverlay) {
				return (<Button icon="minus" onClick={deleteItem} size="small" tooltipText="Delete Item" />);
			}
		},
		deleteSelectedButton: ({deleteSelectedItem, showOverlay}) => {
			if (showOverlay) {
				return (<Button size="small" onClick={deleteSelectedItem}>Delete</Button>);
			}
		},
		selectAllButton: ({selectAll, showOverlay}) => {
			if (showOverlay) {
				return (<Button size="small" onClick={selectAll}>Select/DeSelect All</Button>);
			}
		},
		selectionPreviousButton: ({showOverlay, showSelectionOverlayHandler}) => {
			const tooltipText = showOverlay ? 'Previous' : 'Selection';

			return (
				<Button size="small" onClick={showSelectionOverlayHandler}>{tooltipText}</Button>
			);
		}
	},

	render: ({addButton, changeDirectionButton, changeListProps, changeScrollMode, deleteButton, deleteSelectedButton, selectAllButton, selectionPreviousButton, ...rest}) => {
		delete rest.addItem;
		delete rest.addMockItem;
		delete rest.changeDataSize;
		delete rest.changeMinHeight;
		delete rest.changeMinWidth;
		delete rest.changeSpacing;
		delete rest.dataSize;
		delete rest.deleteItem;
		delete rest.deleteSelectedItem;
		delete rest.nativeScroll;
		delete rest.onChangeDirection;
		delete rest.onChangeScrollMode;
		delete rest.selectAll;
		delete rest.selectionEnable;
		delete rest.setData;
		delete rest.showOverlay;
		delete rest.showSelectionOverlayHandler;

		return (
			<>
				<Row>
					<Cell shrink>
						{addButton}
					</Cell>
					<Cell shrink>
						{deleteButton}
					</Cell>
					<Cell shrink>
						{deleteSelectedButton}
					</Cell>
					<Cell shrink>
						{selectAllButton}
					</Cell>
					<Cell shrink>
						{selectionPreviousButton}
					</Cell>
					<Cell>
						{changeDirectionButton}
					</Cell>
					<Cell>
						{changeScrollMode}
					</Cell>
					<Cell>
						<LocaleSwitch />
					</Cell>
				</Row>
				{changeListProps}
			</>
		);
	}
});

const mapStateToProps = ({data}) => ({
	data: data,
	dataSize: data.dataOrder.length,
	showOverlay: data.showOverlay
});

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (item) => dispatch(addAction(item)),
		changeDataSize: (size) => dispatch(changeDataSizeAction(size)),
		changeMinHeight: (size) => dispatch(changeMinHeightAction(size)),
		changeMinWidth: (size) => dispatch(changeMinWidthAction(size)),
		changeSpacing: (size) => dispatch(changeSpacingAction(size)),
		deleteItem: () => dispatch(deleteAction()),
		deleteSelectedItem: () => dispatch(deleteSelectedAction()),
		selectAll: () => dispatch(selectAllAction()),
		selectionEnable: () => dispatch(selectionEnableAction()),
		setData: (item, index) => dispatch(setAction(item, index))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelHeader);
