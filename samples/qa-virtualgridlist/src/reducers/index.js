import {combineReducers} from 'redux';

import {ADD_ITEM, CHANGE_DATASIZE, CHANGE_MINHEIGHT, CHANGE_MINWIDTH, CHANGE_SPACING, DELETE_ITEM, DELETE_SELECTED_ITEM, SELECT_ALL, SELECT_ITEM, SELECTION_ENABLE, SET_DATA} from '../actions';

const createRecords = () => {
	let
		records = {
			data: {},
			dataSize: 100,
			dataOrder: [],
			minHeight: 570,
			minWidth: 688,
			selectedItems: new Set(),
			showOverlay: false,
			spacing: 24
		},
		caption, subCaption, color;

	for (let idx = 0; idx < 100; ++idx) {
		caption = (idx % 8 === 0) ? 'This is the longest, most perfect caption' : '';
		subCaption = (idx % 8 === 0) ? 'Many people are saying that they have never seen a subcaption longer than this one' : 'Subcaption';
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		records.dataOrder.push(idx);
		records.data[idx] = {
			caption: `${idx} ${caption}`,
			selected: false,
			selectionOverlayShowing: false,
			source: `http://placehold.it/300x300/${color}/ffffff&text=Image ${idx}`,
			subCaption
		};
	}

	return records;
};

const initialState = createRecords();

const data = (state = initialState, action) => {
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

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, selectedItems: new Set()});
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
				newdata[id] = Object.assign({}, state.data[id], {selectionOverlayShowing: !state.data[id].selectionOverlayShowing});
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
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	data
});

export default rootReducer;
