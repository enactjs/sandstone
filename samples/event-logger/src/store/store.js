import {combineReducers, configureStore} from '@reduxjs/toolkit';

import activeEventsSlice from './slices/activeEventsSlice';
import eventLogsSlice from './slices/eventLogsSlice';
import eventCapturingOnSlice from './slices/eventCapturingOnSlice';
import syntheticEventOnSlice from './slices/syntheticEventOnSlice';
import timerIndexSlice from './slices/timerIndexSlice';

const rootReducer = combineReducers({
	activeEvents: activeEventsSlice.reducer,
	eventCapturingOn: eventCapturingOnSlice.reducer,
	eventLogs: eventLogsSlice.reducer,
	syntheticEventOn: syntheticEventOnSlice.reducer,
	timerIndex: timerIndexSlice.reducer
});

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: rootReducer,
		initialState
	});

	return store;
}
