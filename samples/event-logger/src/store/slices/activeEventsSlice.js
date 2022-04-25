import {createSlice} from '@reduxjs/toolkit';

import eventCategory from '../../constants/eventCategory';

export const activeEventsSlice = createSlice({
	name: 'activeEventsReducer',
	initialState: new Array(eventCategory.length).fill(false),
	reducers: {
		activateEvent: {
			reducer: (state, action) => {
				const retval = state.slice();
				retval.splice(action.payload.index, 1, action.payload.selected);
				return retval;
			},
			prepare:(index, selected) => {
				return {payload: {index, selected}};
			}
		}
	}
});

export const {activateEvent} = activeEventsSlice.actions;
export default activeEventsSlice;
