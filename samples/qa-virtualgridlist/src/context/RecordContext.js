import {createContext, useReducer} from "react";
import {initializeRecords} from "../utils";

export const RecordContext = createContext(null);
export const RecordDispatchContext = createContext(null);

/*
const combineReducers = (slices) => (state, action) =>
	Object.keys(slices).reduce(
		(acc, prop) => ({
		...acc,
		[prop]: slices[prop](acc[prop], action),
		}),
		state
	);
*/

export const RecordProvider = ({children}) => {
	const initialData = initializeRecords();
	const [data, dispatch] = useReducer(recordReducer, initialData);

	return (
		<RecordContext.Provider value={data}>
			<RecordDispatchContext.Provider value={dispatch}>
				{children}
			</RecordDispatchContext.Provider>
		</RecordContext.Provider>
	)
};

const SELECT_ITEM = 'recordReducer/SELECTITEM';
const ADD_ITEM = 'recordReducer/ADDITEM';
const CHANGE_DATASIZE = 'recordReducer/CHANGEDATASIZE';

export const selectItem = (dataIndex) => ({ type: SELECT_ITEM, dataIndex });
export const addItem = () => ({ type: ADD_ITEM });
export const changeDataSize = () => ({ type: CHANGE_DATASIZE });

export default function recordReducer(state, action) {
	switch(action.type) {
		case(SELECT_ITEM): {
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
			break;
		}
		case(ADD_ITEM): {
			const
				addedKey = Object.keys(state.data).length,
				newData = Object.assign({}, state.data);
			let newDataOrder = state.dataOrder.concat(addedKey);
	
			newData[addedKey] = action.payload;
	
			Object.assign(state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []});
			break;
		}
		case(CHANGE_DATASIZE): {	
			Object.assign(state, {dataSize: action.payload});
		}
	}
}

/*reducers: {
	addItem: (state, action) => {
		const
			addedKey = Object.keys(state.data).length,
			newData = Object.assign({}, state.data);
		let newDataOrder = state.dataOrder.concat(addedKey);

		newData[addedKey] = action.payload;

		Object.assign(state, {data: newData, dataOrder: newDataOrder, dataSize: newDataOrder.length, selectedItems: []});
	},
	changeDataSize: (state, action) => {
		console.log('changeDataSize, state, action', state,action);

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
*/