import {configureStore, createSlice} from '@reduxjs/toolkit';

const indexSlice = createSlice({
	name: 'indexReducer',
	initialState: {
		index : 0
	},
	reducers: {
		increaseIndex: (state) => {
			state.index += 1;
		},
		decreaseIndex: (state) => {
			state.index = state.index > 0 ? state.index - 1 : 0;
		}
	}
});

export const {increaseIndex, decreaseIndex} = indexSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: indexSlice.reducer,
		initialState
	});
	return store;
}
