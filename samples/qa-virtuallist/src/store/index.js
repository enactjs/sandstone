import {configureStore, createSlice} from '@reduxjs/toolkit';

let initialStateForListItems = [];

const isItemDisabled = (index, mod) => !(index % mod === 0);

const listItemSlice = createSlice({
	name: 'listItemReducer',
	initialState: {
		listItems: initialStateForListItems
	},
	reducers: {
		setData: {
			reducer: (state, action) => {
				const newListItems = [];

				for (let i = 0; i < action.payload.dataSize; i++) {
					newListItems.push({content: 'Item ' + ('00' + i).slice(-3), disabled: isItemDisabled(i, action.payload.isDisabled ? 15 : 1)});
				}

				state.listItems = newListItems;
			},
			prepare: (dataSize, isDisabled) => {
				return {payload: {dataSize, isDisabled}};
			}
		}
	}
});

export const {setData} = listItemSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: listItemSlice.reducer,
		initialState
	});
	return store;
}
