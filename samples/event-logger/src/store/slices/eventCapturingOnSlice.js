import {createSlice} from '@reduxjs/toolkit';

export const eventCapturingOnSlice = createSlice({
	name: 'eventCapturingOnReducer',
	initialState: false,
	reducers: {
		setEventCapturing: (state, action) => {
			return (state = action.payload);
		}
	}
});

export const {setEventCapturing} = eventCapturingOnSlice.actions;
export default eventCapturingOnSlice;
