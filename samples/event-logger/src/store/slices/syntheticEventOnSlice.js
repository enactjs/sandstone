import {createSlice} from '@reduxjs/toolkit';

export const syntheticEventOnSlice = createSlice({
	name: 'syntheticEventOnReducer',
	initialState: false,
	reducers: {
		isSyntheticEventOn: (state, action) => {
			return (state = action.payload);
		}
	}
});

export const {isSyntheticEventOn} = syntheticEventOnSlice.actions;
export default syntheticEventOnSlice;
