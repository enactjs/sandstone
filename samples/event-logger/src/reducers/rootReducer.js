import {combineReducers} from 'redux';

import types from '../constants/actionTypes';
import eventCategory from '../constants/eventCategory';

function findFirstIndexMatchingEvent (logs, eventName) {
	for (let i = 0; i < logs.length; i++) {
		if (logs[i].eventName === eventName) {
			return i;
		}
	}
	return -1;
}

const activeEvents = (state = new Array(eventCategory.length), action) => {
	if (action.type === types.ACTIVATE_EVENT) {
		const retval = state.slice();
		retval.splice(action.index, 1, action.selected);
		return retval;
	}

	return state;
};

const timerIndex = (state = 0, action) => {
	if (action.type === types.SET_TIMER_INDEX) {
		return action.index;
	}
	return state;
};

const eventCapturingOn = (state = false, action) => {
	if (action.type === types.SET_EVENT_CAPTURING) {
		return action.value;
	}
	return state;
};

const eventLog = (state = {}, action) => {
	switch (action.type) {
		case types.ADD_EVENT_LOG: {
			return {
				eventName: action.eventName,
				eventObject: action.eventObject,
				isDOMElement: action.isDOMElement,
				isCapturing: action.isCapturing,
				timeoutId: action.timeoutId
			};
		}
		case types.UPDATE_EVENT_LOG: {
			return {
				...state,
				eventObject: action.eventObject,
				timeoutId: action.postTimeoutId
			};
		}
	}
};

const eventLogs = (state = [], action) => {
	switch (action.type) {
		case types.ADD_EVENT_LOG: {
			return [
				...state,
				eventLog({}, action)
			];
		}
		case types.REMOVE_EVENT_LOG: {
			const
				index = findFirstIndexMatchingEvent(state, action.eventName),
				logs = state.slice();

			logs.splice(index, 1);

			return logs;
		}
		case types.UPDATE_EVENT_LOG: {
			const index = state.findIndex(log => log.timeoutId === action.prevTimeoutId);

			if (index >= 0) {
				const
					logs = state.slice(),
					log = eventLog(logs[index], action);

				logs.splice(index, 1, log);
				return logs;
			}
			return state;
		}
	}
	return state;
};

const syntheticEventOn = (state = false, action) => {
	if (action.type === types.IS_SYNTHETIC_EVENT_ON) {
		return action.value;
	}
	return state;
};

const rootReducer = combineReducers({
	activeEvents,
	eventCapturingOn,
	eventLogs,
	syntheticEventOn,
	timerIndex
});

export default rootReducer;
