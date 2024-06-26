/* action type */
const ADD_EVENT_LOG = 'eventLogsReducer/ADD_EVENT_LOG';
const REMOVE_EVENT_LOG = 'eventLogsReducer/REMOVE_EVENT_LOG';
const UPDATE_EVENT_LOG = 'eventLogsReducer/UPDATE_EVENT_LOG';

export const addEventLog = (eventName, eventObject, isDOMElement, isCapturing, timeoutId) =>
	({type: ADD_EVENT_LOG, eventName, eventObject, isDOMElement, isCapturing, timeoutId});
export const removeEventLog = (eventName, isDOMElement, isCapturing) =>
	({type: REMOVE_EVENT_LOG, eventName, isDOMElement, isCapturing});
export const updateEventLog = (eventObject, prevTimeoutId, postTimeoutId) =>
	({type: UPDATE_EVENT_LOG, eventObject, prevTimeoutId, postTimeoutId});

function findFirstIndexMatchingEvent (logs, eventName) {
	for (let i = 0; i < logs.length; i++) {
		if (logs[i].eventName === eventName) {
			return i;
		}
	}
	return -1;
}

export default function eventLogsReducer (state, action) {
	switch (action.type) {
		case ADD_EVENT_LOG: {
			const newState = [...state.eventLogs, {
				eventName: action.eventName,
				eventObject: action.eventObject,
				isDOMElement: action.isDOMElement,
				isCapturing: action.isCapturing,
				timeoutId: action.timeoutId
			}];
			return {eventLogs: newState};
		}
		case REMOVE_EVENT_LOG: {
			const
				index = findFirstIndexMatchingEvent(state.eventLogs, action.eventName),
				logs = state.eventLogs.slice();

			logs.splice(index, 1);

			return {eventLogs: logs};
		}
		case UPDATE_EVENT_LOG: {
			const index = state.eventLogs.findIndex(log => log.timeoutId === action.prevTimeoutId);
			const logs = state.eventLogs.slice();

			if (index >= 0) {
				const log = {
					...logs[index],
					eventObject: action.eventObject,
					timeoutId: action.postTimeoutId
				};
				logs.splice(index, 1, log);
			}
			return {eventLogs: logs};
		}
		default: {
			return state;
		}
	}
}
