import {createContext, useReducer} from 'react';

import {initializeRecords} from '../utils';

export const RecordContext = createContext(null);
export const RecordDispatchContext = createContext(null);

export const RecordProvider = ({children}) => {
	const initialData = initializeRecords();
	const [state, dispatch] = useReducer(recordReducer, initialData);

	return (
		<RecordContext.Provider value={state}>
			<RecordDispatchContext.Provider value={dispatch}>
				{children}
			</RecordDispatchContext.Provider>
		</RecordContext.Provider>
	);
};

/* action type */
const ADD_ITEM = 'recordReducer/ADD_ITEM';
const CHANGE_DATASIZE = 'recordReducer/CHANGE_DATASIZE';
const CHANGE_MIN_HEIGHT = 'recordReducer/CHANGE_MIN_HEIGHT';
const CHANGE_MIN_WIDTH = 'recordReducer/CHANGE_MIN_WIDTH';
const CHANGE_SPACING = 'recordReducer/CHANGE_SPACING';
const DELETE_ITEM = 'recordReducer/DELETE_ITEM';
const DELETE_SELECTED_ITEM = 'recordReducer/DELETE_SELECTED_ITEM';
const SELECT_ALL = 'recordReducer/SELECT_ALL';
const SELECT_ITEM = 'recordReducer/SELECT_ITEM';
const SELECTION_ENABLE = 'recordReducer/SELECTION_ENABLE';
const SET_DATA = 'recordReducer/SET_DATA';

const addItem = (item) => ({type: ADD_ITEM, item});
const changeDataSize = (size) => ({type: CHANGE_DATASIZE, size});
const changeMinHeight = (size) => ({type: CHANGE_MIN_HEIGHT, size});
const changeMinWidth = (size) => ({type: CHANGE_MIN_WIDTH, size});
const changeSpacing = (size) => ({type: CHANGE_SPACING, size});
const deleteItem = () => ({type: DELETE_ITEM});
const deleteSelectedItem = () => ({type: DELETE_SELECTED_ITEM});
const selectAll = () => ({type: SELECT_ALL});
const selectItem = (dataIndex) => ({type: SELECT_ITEM, dataIndex});
const selectionEnable = () => ({type: SELECTION_ENABLE});
const setData = (item, index) => ({type: SET_DATA, item, index});

export {
	addItem,
	changeDataSize,
	changeMinHeight,
	changeMinWidth,
	changeSpacing,
	deleteItem,
	deleteSelectedItem,
	selectAll,
	selectItem,
	selectionEnable,
	setData
};

export default function recordReducer (state, action) {
	switch (action.type) {
		case ADD_ITEM: {
			const addedKey = Object.keys(state.data).length;
			const newData = Object.assign({}, state.data);
			let newDataOrder = state.dataOrder.concat(addedKey);

			newData[addedKey] = action.item;
			return {...state, data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []};
		}
		case CHANGE_DATASIZE: {
			return {...state, dataSize: action.size};
		}
		case CHANGE_MIN_WIDTH: {
			return {...state, minWidth: action.size};
		}
		case CHANGE_MIN_HEIGHT: {
			return {...state, minHeight: action.size};
		}
		case CHANGE_SPACING: {
			return {...state, spacing: action.size};
		}
		case DELETE_ITEM: {
			const newData = {};
			const newDataOrder = [];

			for (let i = 0; i < state.dataOrder.length - 1; i++) {
				newData[i] = state.data[i];
				newDataOrder.push(i);
			}

			return {...state, data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []};
		}
		case DELETE_SELECTED_ITEM: {
			const newData = {};
			const newDataOrder = [];
			const selectedItems = state.selectedItems;
			const filteredDataOrder = state.dataOrder.filter((item) => !selectedItems.includes(item));

			for (let i = 0; i < filteredDataOrder.length; i++) {
				const newId = filteredDataOrder[i];
				newData[i] = state.data[newId];
				newDataOrder.push(i);
			}
			return {...state, data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []};
		}
		case SELECT_ALL: {
			const selectedItems = state.selectedItems;

			if (selectedItems.length === state.dataOrder.length) {
				selectedItems.length = 0;
			} else {
				for (let i = 0; i < state.dataOrder.length; i++) {
					selectedItems.push(i);
				}
			}
			return {...state, selectedItems};
		}
		case SELECT_ITEM: {
			const selectedItems = state.selectedItems;
			const isSelected = selectedItems.includes(action.dataIndex);

			if (state.showOverlay) {
				if (isSelected) {
					let id = selectedItems.indexOf(action.dataIndex);
					if (id >= 0) {
						selectedItems.splice(id, 1);
					}
				} else {
					selectedItems.push(action.dataIndex);
				}
			}
			return {...state, selectedItems};
		}
		case SELECTION_ENABLE: {
			const newData = {};

			Object.keys(state.data).forEach((id) => {
				newData[id] = Object.assign({}, state.data[id], {showSelection: !state.data[id].showSelection});
			});

			return {...state, data: newData, showOverlay: !state.showOverlay};
		}
		case SET_DATA: {
			let newData = {};
			let newDataOrder = [];

			if (action.index > state.dataOrder.length) {
				const addedKey = Object.keys(state.data).length;

				newData = Object.assign({}, state.data);
				newDataOrder = state.dataOrder;

				newData[addedKey] = action.item;
				newDataOrder = state.dataOrder.concat(addedKey);
			} else {
				for (let i = 0; i < action.index; i++) {
					newData[i] = state.data[i];
					newDataOrder.push(i);
				}
			}
			return {...state, data: newData, dataOrder: newDataOrder, selectedItems: []};
		}
	}
}
