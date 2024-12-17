import SwitchItem from '@enact/sandstone/SwitchItem';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';

import eventCategory from '../../constants/eventCategory';
import {EventLoggerContext, EventLoggerDispatchContext} from '../../context/EventLoggerContext';
import {
	addEventLog as addEventLogAction,
	removeEventLog as removeEventLogAction,
	updateEventLog as updateEventLogAction
} from '../../reducer/eventLogsReducer';

import eventRegData from './Event/EventRegistrationData';
import Filter from './Filter';

function extractLogObjectFromEventObject (ev, type, properties) {
	let obj = Object.create(null);
	for (let p of properties) {
		if (typeof ev[p] === 'object') {
			if (type === 'touch') {
				const subType = 'touches';
				if (p === subType && ev[p].length > 0) {
					obj['touchListLength'] = ev[p].length;
					obj[p] = extractLogObjectFromEventObject(ev[p][0], subType, eventRegData.properties[subType]);
				}
			}
		} else if (typeof ev[p] !== 'function') {
			// primitive value
			obj[p] = ev[p];
		}
	}

	return obj;
}

function findLastIndexOfMatchingEvent (array, eventName, isDOMElement, isCapturing) {
	const nomatch = -1;
	for (let i = array.length - 1; i >= 0; i--) {
		if (array[i].eventName === eventName &&
			array[i].isDOMElement === isDOMElement &&
			array[i].isCapturing === isCapturing) {
			return i;
		}
	}

	return nomatch;
}

function usePrevious (value) {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
}

const InputBoard = ({className}) => {
	const isCapturingEvent = true;

	const dispatch = useContext(EventLoggerDispatchContext);
	const {
		activeEventsReducer,
		eventCapturingOnReducer,
		eventLogsReducer,
		syntheticEventOnReducer,
		timerIndexReducer
	} = useContext(EventLoggerContext);

	const {activeEvents} = activeEventsReducer;
	const {eventCapturingOn} = eventCapturingOnReducer;
	const {eventLogs} = eventLogsReducer;
	const {syntheticEventOn} = syntheticEventOnReducer;
	const {timerIndex} = timerIndexReducer;

	const divRef = useRef();
	const eventCapturingOnRef = useRef();
	const eventLogsRef = useRef();
	const listenersRef = useRef({bubble: {}, capture: {}});
	const reactHandlers = useRef();
	const syntheticEventOnRef = useRef();
	const timerIndexRef = useRef();
	const beforeTimeoutId = useRef();

	const onAddEventLog =
		useCallback(
			(eventName, eventObject, isDOMElement, isCapturing, timeoutId) =>
				dispatch(addEventLogAction(eventName, eventObject, isDOMElement, isCapturing, timeoutId)), [dispatch]
		);
	const onRemoveEventLog =
		useCallback(
			(eventName, isDOMElement, isCapturing) =>
				dispatch(removeEventLogAction(eventName, isDOMElement, isCapturing)), [dispatch]
		);
	const onUpdateEventLog =
		useCallback(
			(eventObject, prevTimeoutId, postTimeoutId) =>
				dispatch(updateEventLogAction(eventObject, prevTimeoutId, postTimeoutId)), [dispatch]
		);

	const prevActiveEvents = usePrevious(activeEvents);

	const [showFilter, setShowFilter] = useState(true);

	const sendEventLog = useCallback((ev, isDOMElement, eventObject, isCapturing) => {
		const timerGroup = [3000, 5000, 10000];

		if (eventLogsRef.current && eventLogsRef.current.length > 0) {
			const lastLog = eventLogsRef.current[eventLogsRef.current.length - 1];

			if (lastLog.eventName === ev.type) {
				const index = findLastIndexOfMatchingEvent(eventLogsRef.current, ev.type, isDOMElement, isCapturing);
				if (index >= 0) {
					// Exception handling for issue where the previous 'timeoutId' is updated once more after being updated
					if (beforeTimeoutId.current === eventLogsRef.current[index].timeoutId) return;

					beforeTimeoutId.current = eventLogsRef.current[index].timeoutId;

					window.clearTimeout(eventLogsRef.current[index].timeoutId);
					const newTimeoutId = window.setTimeout(() => onRemoveEventLog(ev.type, isDOMElement, isCapturing), timerGroup[timerIndexRef.current]);

					onUpdateEventLog(eventObject, eventLogsRef.current[index].timeoutId, newTimeoutId);
					return;
				}
			}
		}

		// check the conditions to add new event log
		if (!isDOMElement && !syntheticEventOnRef.current) {
			return;
		}

		if (isCapturing && !eventCapturingOnRef.current) {
			return;
		}

		const timeoutId = window.setTimeout(
			() => onRemoveEventLog(ev.type, isDOMElement, isCapturing),
			timerGroup[timerIndexRef.current]);

		onAddEventLog(ev.type, eventObject, isDOMElement, isCapturing, timeoutId);
	}, [onAddEventLog, onRemoveEventLog, onUpdateEventLog]);

	const handleEvent = useCallback((eventType, isDOMElement) => {
		const send = sendEventLog;
		return function (isCapturing) {
			return function (ev) {
				send(ev,
					isDOMElement,
					extractLogObjectFromEventObject(ev, eventType, eventRegData.properties[eventType]),
					isCapturing
				);
			};
		};
	}, [sendEventLog]);

	const registerEventHandlerForDOM = useCallback((type, isCapturing = false) => {
		const handle = handleEvent(type, true);
		const bubblingListener = handle(false);
		const capturingListener = handle(true);

		listenersRef.current.bubble[type] = bubblingListener;
		if (isCapturing) {
			listenersRef.current.capture[type] = capturingListener;
		}

		for (let name of eventRegData.domEventNames[type]) {
			if (isCapturing) {
				divRef.current.addEventListener(name, capturingListener, true);
			}
			divRef.current.addEventListener(name, bubblingListener);
		}
	}, [divRef, handleEvent]);

	const unRegisterEventHandlerForDOM = useCallback((type, isCapturing = false) => {
		for (let name of eventRegData.domEventNames[type]) {
			divRef.current.removeEventListener(name, listenersRef.current.bubble[type]);
			if (isCapturing) {
				divRef.current.removeEventListener(name, listenersRef.current.capture[type], true);
			}
		}

		delete listenersRef.current.bubble[type];
		if (isCapturing) {
			delete listenersRef.current.capture[type];
		}
	}, [divRef]);

	const registerEventHandlerForReact = useCallback((type, isCapturing = false) => {
		const handle = handleEvent(type, false);
		let results = {};

		for (let name of eventRegData.reactSyntheticEventNames[type]) {
			results[name] = handle(false);
			if (isCapturing && name.match('Enter') == null && name.match('Leave') == null) {
				results[name + 'Capture'] = handle(true);
			}
		}

		return results;
	}, [handleEvent]);

	const handleShowFilter = useCallback(({selected}) => {
		setShowFilter(selected);
	}, []);

	useEffect(() => {
		eventCapturingOnRef.current = eventCapturingOn;
		syntheticEventOnRef.current = syntheticEventOn;
		timerIndexRef.current = timerIndex;
		eventLogsRef.current = eventLogs;
		// add/remove event
		if (prevActiveEvents && prevActiveEvents !== activeEvents) {
			const
				prev = prevActiveEvents,
				curr = activeEvents,
				handlers = {};

			for (let i = 0; i < curr.length; i++) {
				// manage React Event Listeners
				if (curr[i]) {
					Object.assign(
						handlers,
						registerEventHandlerForReact(eventCategory[i], isCapturingEvent)
					);
				}

				// manage DOM Event Listeners
				if (curr[i] !== prev[i]) {
					if (curr[i]) {
						registerEventHandlerForDOM(eventCategory[i], isCapturingEvent);
					} else {
						unRegisterEventHandlerForDOM(eventCategory[i], isCapturingEvent);
					}
				}
			}
			reactHandlers.current = handlers;
		}
	});

	useEffect( () => {
		return () => {
			for (let i = 0; i < activeEvents.length; i++) {
				if (activeEvents[i]) {
					unRegisterEventHandlerForDOM(eventCategory[i], isCapturingEvent);
				}
			}
		};
	// eslint-disable-next-line
	}, []);

	return (
		<div>
			<SwitchItem
				selected={showFilter}
				size="small"
				onToggle={handleShowFilter}
			>
				Filters
			</SwitchItem>
			{showFilter ? <Filter /> : null}
			<div
				className={className}
				ref={divRef}
				tabIndex="0"
				{...reactHandlers.current}
			>
				{'You can trigger variable events here. For detecting keyboard event, mouse click is needed on it.'}
			</div>
		</div>
	);
};

export default InputBoard;
