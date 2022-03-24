import {combineReducers} from 'redux';

import {ADD_ITEM, CHANGE_DATASIZE, CHANGE_MINHEIGHT, CHANGE_MINWIDTH, CHANGE_SPACING, DELETE_ITEM, DELETE_SELECTED_ITEM, SELECT_ALL, SELECT_ITEM, SELECTION_ENABLE, SET_DATA, UPDATE_ITEMS_ORDER} from '../actions';
import {initializeRecords} from '../utils';


const data = (state = initializeRecords(), action) => {
	switch (action.type) {
		case ADD_ITEM: {
			const
				addedKey = Object.keys(state.data).length,
				newData = Object.assign({}, state.data);
			let newDataOrder = state.dataOrder.concat(addedKey);

			newData[addedKey] = action.item;

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: new Set()});
		}
		case CHANGE_DATASIZE: {
			return Object.assign({}, state, {dataSize: action.size});
		}
		case CHANGE_MINHEIGHT: {
			return Object.assign({}, state, {minHeight: action.size});
		}
		case CHANGE_MINWIDTH: {
			return Object.assign({}, state, {minWidth: action.size});
		}
		case CHANGE_SPACING: {
			return Object.assign({}, state, {spacing: action.size});
		}
		case DELETE_ITEM: {
			const
				newData = {},
				newDataOrder = [];

			for (let i = 0; i < state.dataOrder.length - 1; i++) {
				newData[i] = state.data[i];
				newDataOrder.push(i);
			}

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: new Set()});
		}
		case DELETE_SELECTED_ITEM: {
			const
				newData = {},
				newDataOrder = [],
				selectedItems = new Set(state.selectedItems),
				filteredDataOrder = state.dataOrder.filter((item) => !selectedItems.has(item));

			for (let i = 0; i < filteredDataOrder.length; i++) {
				const newId = filteredDataOrder[i];
				newData[i] = state.data[newId];
				newDataOrder.push(i);
			}

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: new Set()});
		}
		case SELECT_ALL: {
			const selectedItems = new Set(state.selectedItems);

			if (selectedItems.size === state.dataOrder.length) {
				selectedItems.clear();
			} else {
				for (let i = 0; i < state.dataOrder.length; i++) {
					selectedItems.add(i);
				}
			}

			return Object.assign({}, state, {selectedItems});
		}
		case SELECT_ITEM: {
			const
				selectedItems = new Set(state.selectedItems),
				isSelected = selectedItems.has(action.index);

			if (state.showOverlay) {
				if (isSelected) {
					selectedItems.delete(action.index);
				} else {
					selectedItems.add(action.index);
				}
			}

			return Object.assign({}, state, {selectedItems});
		}
		case SELECTION_ENABLE: {
			const newdata = {};

			Object.keys(state.data).forEach((id) => {
				newdata[id] = Object.assign({}, state.data[id], {showSelection: !state.data[id].showSelection});
			});

			return Object.assign({}, state, {data: newdata, showOverlay: !state.showOverlay});
		}
		case SET_DATA: {
			let
				newData = {},
				newDataOrder = [];

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
			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, selectedItems: new Set()});
		}
		case UPDATE_ITEMS_ORDER: {
			const newData = {};
			const newDataOrder = [];

			if (action.newDataOrder) {
				for (let i = 0; i < action.newDataOrder.length; i++) {
					newData[i] = state.data[action.newDataOrder[i]];
					newDataOrder.push(i);
				}
			}

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder});
		}
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	data
});

export default rootReducer;
