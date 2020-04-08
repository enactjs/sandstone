import Button from '@enact/sandstone/Button';
import {connect} from 'react-redux';
import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import IconButton from '@enact/sandstone/IconButton';
import Input from '@enact/sandstone/Input';
import kind from '@enact/core/kind';
import LocaleSwitch from '../LocaleSwitch';
import PropTypes from 'prop-types';
import React from 'react';
import ToggleButton from '@enact/sandstone/ToggleButton';

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
		caption = (dataLength % 8 === 0) ? ' with long title' : '',
		subCaption = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		selected: false,
		selectionOverlayShowing: showOverlay,
		caption: dataLength + caption,
		subCaption: subCaption,
		source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength
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
		onChangeDirection: PropTypes.func,
		onChangeFocusableScrollbar: PropTypes.func,
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
				return (<IconButton size="small" tooltipText="Add Item" onClick={addMockItem}>plus</IconButton>);
			}
		},
		changeDirectionButton: ({onChangeDirection, showOverlay}) => {
			if (!showOverlay) {
				return (<ToggleButton size="small" minWidth onClick={onChangeDirection}>Horizontal</ToggleButton>);
			}
		},
		changeFocusableScrollbarButton: ({onChangeFocusableScrollbar, showOverlay}) => {
			if (!showOverlay) {
				return (<ToggleButton size="small" minWidth onClick={onChangeFocusableScrollbar}>Focusable Scrollbar</ToggleButton>);
			}
		},
		changeListProps: ({changeMinHeight, changeMinWidth, changeSpacing, data, setData, showOverlay}) => {
			if (!showOverlay) {
				const inputWidth = {width: '5em'};

				return (
					<div style={{direction: 'ltr'}}>
						dataSize:<Input size="small" onChange={setData} style={inputWidth} type="number" value={data.dataSize} />
						minHeightSize:<Input size="small" onChange={changeMinHeight} style={inputWidth} type="number" value={data.minHeight} />
						minWidthSize:<Input size="small" onChange={changeMinWidth} style={inputWidth} type="number" value={data.minWidth} />
						spacingSize:<Input size="small" onChange={changeSpacing} style={inputWidth} type="number" value={data.spacing} />
					</div>
				);
			}
		},
		deleteButton: ({deleteItem, showOverlay}) => {
			if (!showOverlay) {
				return (<IconButton size="small" tooltipText="Delete Item" onClick={deleteItem}>minus</IconButton>);
			}
		},
		deleteSelectedButton: ({deleteSelectedItem, showOverlay}) => {
			if (showOverlay) {
				return (<Button size="small" onClick={deleteSelectedItem}>Delete</Button>);
			}
		},
		selectAllButton: ({selectAll, showOverlay}) => {
			if (showOverlay) {
				return (<Button size="small" onClick={selectAll}>Select All</Button>);
			}
		},
		selectionPreviousButton: ({showOverlay, showSelectionOverlayHandler}) => {
			const tooltipText = showOverlay ? 'Previous' : 'Selection';

			return (
				<Button size="small" onClick={showSelectionOverlayHandler}>{tooltipText}</Button>
			);
		}
	},

	render: ({addButton, changeDirectionButton, changeFocusableScrollbarButton, changeListProps, deleteButton, deleteSelectedButton, selectAllButton, selectionPreviousButton, ...rest}) => {
		delete rest.addItem;
		delete rest.addMockItem;
		delete rest.changeDataSize;
		delete rest.changeMinHeight;
		delete rest.changeMinWidth;
		delete rest.changeSpacing;
		delete rest.dataSize;
		delete rest.deleteItem;
		delete rest.deleteSelectedItem;
		delete rest.onChangeDirection;
		delete rest.onChangeFocusableScrollbar;
		delete rest.selectAll;
		delete rest.selectionEnable;
		delete rest.setData;
		delete rest.showOverlay;
		delete rest.showSelectionOverlayHandler;

		return (
			<div>
				<Header {...rest} />
				{addButton}
				{deleteButton}
				{deleteSelectedButton}
				{selectAllButton}
				{selectionPreviousButton}
				{changeFocusableScrollbarButton}
				{changeDirectionButton}
				<LocaleSwitch size="small" />
				{changeListProps}
				<Heading showLine />
			</div>
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
