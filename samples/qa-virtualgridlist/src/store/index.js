import {configureStore, combineReducers, createSlice} from '@reduxjs/toolkit';

import {initializeRecords} from '../utils';

const recordSlice = createSlice( {
	name: 'recordReducer',
	initialState: initializeRecords(),
	reducers: {
		addItem: (state, action) => {
			const
				addedKey = Object.keys(state.data).length,
				newData = Object.assign({}, state.data);
			let newDataOrder = state.dataOrder.concat(addedKey);

			newData[addedKey] = action.payload;

			Object.assign(state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []});
		},
		changeDataSize: (state, action) => {
			Object.assign(state, {dataSize: action.payload});
		},
		changeMinHeight: (state, action) => {
			Object.assign(state, {minHeight: action.payload});
		},
		changeMinWidth: (state, action) => {
			Object.assign(state, {minWidth: action.payload});
		},
		changeSpacing: (state, action) => {
			Object.assign(state, {spacing: action.payload});
		},
		deleteItem: (state) => {
			const
				newData = {},
				newDataOrder = [];

			for (let i = 0; i < state.dataOrder.length - 1; i++) {
				newData[i] = state.data[i];
				newDataOrder.push(i);
			}

			Object.assign(state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []});
		},
		deleteSelectedItem: (state) => {
			const
				newData = {},
				newDataOrder = [],
				selectedItems = state.selectedItems,
				filteredDataOrder = state.dataOrder.filter((item) => !selectedItems.includes(item));

			for (let i = 0; i < filteredDataOrder.length; i++) {
				const newId = filteredDataOrder[i];
				newData[i] = state.data[newId];
				newDataOrder.push(i);
			}

			Object.assign(state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []});
		},
		selectAll: (state) => {
			const selectedItems = state.selectedItems;

			if (selectedItems.length === state.dataOrder.length) {
				selectedItems.length = 0;
			} else {
				for (let i = 0; i < state.dataOrder.length; i++) {
					selectedItems.push(i);
				}
			}

			Object.assign(state, {selectedItems});
		},
		selectItem: (state, action) => {
			const
				selectedItems = state.selectedItems,
				isSelected = selectedItems.includes(action.payload);

			if (state.showOverlay) {
				if (isSelected) {
					let id = selectedItems.indexOf(action.payload);
					if (id >= 0) {
						selectedItems.splice(id, 1);
					}
				} else {
					selectedItems.push(action.payload);
				}
			}

			Object.assign(state, {selectedItems});
		},
		selectionEnable: (state) => {
			const newdata = {};

			Object.keys(state.data).forEach((id) => {
				newdata[id] = Object.assign({}, state.data[id], {showSelection: !state.data[id].showSelection});
			});

			Object.assign(state, {data: newdata, showOverlay: !state.showOverlay});
		},
		setData: {
			reducer: (state, action) => {
				let
					newData = {},
					newDataOrder = [];

				if (action.payload.index > state.dataOrder.length) {
					const addedKey = Object.keys(state.data).length;

					newData = Object.assign({}, state.data);
					newDataOrder = state.dataOrder;

					newData[addedKey] = action.payload.item;
					newDataOrder = state.dataOrder.concat(addedKey);
				} else {
					for (let i = 0; i < action.payload.index; i++) {
						newData[i] = state.data[i];
						newDataOrder.push(i);
					}
				}
				Object.assign(state, {data: newData, dataOrder: newDataOrder, selectedItems: []});
			},
			prepare: (index, item) => {
				return {payload: {index, item}};
			}
		}
	}
});

export const {addItem, changeDataSize, changeMinHeight, changeMinWidth, changeSpacing, deleteItem, deleteSelectedItem, selectAll, selectItem, selectionEnable, setData} = recordSlice.actions;

const rootReducer = combineReducers({
	data : recordSlice.reducer
});

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: rootReducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./index.js', () => {
			store.replaceReducer(rootReducer);
		});
	}

	return store;
}
