import {createContext, useReducer} from 'react';

import eventCategory from '../constants/eventCategory';
import activeEventsReducer from '../reducer/activeEventsReducer';
import eventCapturingOnReducer from '../reducer/eventCapturingOnReducer';
import eventLogsReducer from '../reducer/eventLogsReducer';
import syntheticEventOnReducer from '../reducer/syntheticEventOnReducer';
import timerIndexReducer from '../reducer/timerIndexReducer';

export const EventLoggerContext = createContext(null);
export const EventLoggerDispatchContext = createContext(null);

const initialData = {
	activeEventsReducer: {
		activeEvents: new Array(eventCategory.length).fill(false)
	},
	eventCapturingOnReducer: {
		eventCapturingOn: false
	},
	eventLogsReducer: {
		eventLogs: []
	},
	syntheticEventOnReducer: {
		syntheticEventOn: false
	},
	timerIndexReducer: {
		timerIndex: 0
	}
};

const combineReducers = (reducers) => (state, action) =>
	Object.keys(reducers).reduce(
		(acc, prop) => ({
			...acc,
			[prop]: reducers[prop](acc[prop], action)
		}),
		state
	);

export const EventLoggerProvider = ({children}) => {
	const [state, dispatch] = useReducer(combineReducers({
		activeEventsReducer,
		eventCapturingOnReducer,
		eventLogsReducer,
		syntheticEventOnReducer,
		timerIndexReducer
	}), initialData);

	return (
		<EventLoggerContext.Provider value={state}>
			<EventLoggerDispatchContext.Provider value={dispatch}>
				{children}
			</EventLoggerDispatchContext.Provider>
		</EventLoggerContext.Provider>
	);
};
