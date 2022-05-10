import SwitchItem from '@enact/sandstone/SwitchItem';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addEventLog, removeEventLog, updateEventLog} from '../../store/slices/eventLogsSlice';
import eventCategory from '../../constants/eventCategory';

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

	const dispatch = useDispatch();

	const divRef = useRef();
	const eventCapturingOnRef = useRef();
	const eventLogsRef = useRef();
	const listenersRef = useRef({bubble: {}, capture: {}});
	const reactHandlers = useRef();
	const syntheticEventOnRef = useRef();
	const timerIndexRef = useRef();

	const activeEvents = useSelector((state) => state.activeEvents);
	const eventCapturingOn = useSelector((state) => state.eventCapturingOn);
	const eventLogs = useSelector((state) => state.eventLogs);
	const syntheticEventOn = useSelector((state) => state.syntheticEventOn);
	const timerIndex = useSelector((state) => state.timerIndex);

	const onAddEventLog = useCallback((timeoutId, eventName, isDOMElement, isCapturing, eventObject) => dispatch(addEventLog(timeoutId, eventName, isDOMElement, isCapturing, eventObject)), [dispatch]);
	const onRemoveEventLog = useCallback((eventName, isDOMElement, isCapturing) => dispatch(removeEventLog(eventName, isDOMElement, isCapturing)), [dispatch]);
	const onUpdateEventLog = useCallback((prevTimeoutId, postTimeoutId, eventObject) => dispatch(updateEventLog(prevTimeoutId, postTimeoutId, eventObject)), [dispatch]);

	const prevActiveEvents = usePrevious(activeEvents);

	const [showFilter, setShowFilter] = useState(true);

	const sendEventLog = useCallback((ev, isDOMElement, eventObject, isCapturing) => {
		const timergroup = [3000, 5000, 10000];

		if (eventLogsRef.current && eventLogsRef.current.length > 0) {
			const lastLog = eventLogsRef.current[eventLogsRef.current.length - 1];

			if (lastLog.eventName === ev.type) {
				const index = findLastIndexOfMatchingEvent(eventLogsRef.current, ev.type, isDOMElement, isCapturing);

				if (index >= 0) {
					window.clearTimeout(eventLogsRef.current[index].timeoutId);
					onUpdateEventLog(
						eventLogsRef.current[index].timeoutId,
						window.setTimeout(() => onRemoveEventLog(ev.type, isDOMElement, isCapturing), timergroup[timerIndexRef.current]),
						eventObject
					);
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
			timergroup[timerIndexRef.current]);

		onAddEventLog(timeoutId, ev.type, isDOMElement, isCapturing, eventObject);
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
