import {createSlice} from '@reduxjs/toolkit';

export const timerIndexSlice = createSlice({
	name: 'timerIndexReducer',
	initialState: 0,
	reducers: {
		setTimerIndex: (state, action) => {
			return (state = action.payload);
		}
	}
});

export const {setTimerIndex} = timerIndexSlice.actions;
export default timerIndexSlice;
