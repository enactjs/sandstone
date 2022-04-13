import {createSlice} from '@reduxjs/toolkit';

function findFirstIndexMatchingEvent (logs, eventName) {
	for (let i = 0; i < logs.length; i++) {
		if (logs[i].eventName === eventName) {
			return i;
		}
	}
	return -1;
}

export const eventLogsSlice = createSlice({
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

export const {addEventLog, removeEventLog, updateEventLog} = eventLogsSlice.actions;
export default eventLogsSlice;
