import {combineReducers, configureStore, createSlice} from '@reduxjs/toolkit';

import eventCategory from '../constants/eventCategory';

function findFirstIndexMatchingEvent (logs, eventName) {
	for (let i = 0; i < logs.length; i++) {
		if (logs[i].eventName === eventName) {
			return i;
		}
	}
	return -1;
}

const activeEventsSlice = createSlice( {
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

const eventLogsSlice = createSlice( {
	name: 'eventLogsReducer',
	initialState: [],
	reducers: {
		addEventLog: {
			reducer: (state, action) => {
				return [...state, {
					eventName: action.payload.eventName,
					eventObject: action.payload.eventObject,
					isDOMElement: action.payload.isDOMElement,
					isCapturing: action.payload.isCapturing,
					timeoutId: action.payload.timeoutId
				}];
			},
			prepare:(timeoutId, eventName, isDOMElement, isCapturing, eventObject) => {
				return {payload: {timeoutId, eventName, isDOMElement, isCapturing, eventObject}};
			}
		},
		removeEventLog: {
			reducer: (state, action) => {
				const
					index = findFirstIndexMatchingEvent(state, action.payload.eventName),
					logs = state.slice();

				logs.splice(index, 1);

				return logs;
			},
			prepare:(eventName, isDOMElement, isCapturing) => {
				return {payload: {eventName, isDOMElement, isCapturing}};
			}
		},
		updateEventLog: {
			reducer: (state, action) => {
				const index = state.findIndex(log => log.timeoutId === action.payload.prevTimeoutId);
				if (index >= 0) {
					const
						logs = state.slice(),
						log = {
							...logs[index],
							eventObject: action.payload.eventObject,
							timeoutId: action.payload.postTimeoutId
						};

					logs.splice(index, 1, log);
					return logs;
				}
			},
			prepare:(prevTimeoutId, postTimeoutId, eventObject) => {
				return {payload: {prevTimeoutId, postTimeoutId, eventObject}};
			}
		}
	}
});

const eventCapturingOnSlice = createSlice( {
	name: 'eventCapturingOnReducer',
	initialState: false,
	reducers: {
		setEventCapturing: (state, action) => {
			return (state = action.payload);
		}
	}
});

const syntheticEventOnSlice = createSlice( {
	name: 'syntheticEventOnReducer',
	initialState: false,
	reducers: {
		isSyntheticEventOn: (state, action) => {
			return (state = action.payload);
		}
	}
});

const timerIndexSlice = createSlice( {
	name: 'timerIndexReducer',
	initialState: 0,
	reducers: {
		setTimerIndex: (state, action) => {
			return (state = action.payload);
		}
	}
});

export const {activateEvent} = activeEventsSlice.actions;
export const {setEventCapturing} = eventCapturingOnSlice.actions;
export const {addEventLog, removeEventLog, updateEventLog} = eventLogsSlice.actions;
export const {isSyntheticEventOn} = syntheticEventOnSlice.actions;
export const {setTimerIndex} = timerIndexSlice.actions;

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
