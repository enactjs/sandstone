import types from '../constants/actionTypes';

// ACTIVE EVENTS
const activateEvent = (index, selected) => ({
	type: types.ACTIVATE_EVENT,
	index,
	selected
});

// EVENT CAPTURING STATUS
const setEventCapturing = (value) => ({
	type: types.SET_EVENT_CAPTURING,
	value
});

// LOG
const addEventLog = (timeoutId, eventName, isDOMElement, isCapturing, eventObject) => ({
	type: types.ADD_EVENT_LOG,
	timeoutId,
	eventName,
	isDOMElement,
	isCapturing,
	eventObject
});

const removeEventLog = (eventName, isDOMElement, isCapturing) => ({
	type: types.REMOVE_EVENT_LOG,
	eventName,
	isDOMElement,
	isCapturing
});

const updateEventLog = (prevTimeoutId, postTimeoutId, eventObject) => ({
	type: types.UPDATE_EVENT_LOG,
	prevTimeoutId,
	postTimeoutId,
	eventObject
});

// SYNTHETIC EVENT
const isSyntheticEventOn = (value) => ({
	type: types.IS_SYNTHETIC_EVENT_ON,
	value
});

// TIME
const setDelayMs = (delayMs) => ({
	type: types.SET_DELAY_MS,
	delayMs
});

export {
	activateEvent,
	addEventLog,
	isSyntheticEventOn,
	removeEventLog,
	setDelayMs,
	setEventCapturing,
	updateEventLog
};
