import types from '../constants/actionTypes';

// ACTIVE EVENTS
export const activateEvent = (index, selected) => ({
	type: types.ACTIVATE_EVENT,
	index,
	selected
});

// EVENT CAPTURING STATUS
export const setEventCapturing = (value) => ({
	type: types.SET_EVENT_CAPTURING,
	value
});

// LOG
export const addEventLog = (timeoutId, eventName, isDOMElement, isCapturing, eventObject) => ({
	type: types.ADD_EVENT_LOG,
	timeoutId,
	eventName,
	isDOMElement,
	isCapturing,
	eventObject
});

export const removeEventLog = (eventName, isDOMElement, isCapturing) => ({
	type: types.REMOVE_EVENT_LOG,
	eventName,
	isDOMElement,
	isCapturing
});

export const updateEventLog = (prevTimeoutId, postTimeoutId, eventObject) => ({
	type: types.UPDATE_EVENT_LOG,
	prevTimeoutId,
	postTimeoutId,
	eventObject
});

// SYNTHETIC EVENT
export const isSyntheticEventOn = (value) => ({
	type: types.IS_SYNTHETIC_EVENT_ON,
	value
});

// TIME
export const setDelayMs = (delayMs) => ({
	type: types.SET_DELAY_MS,
	delayMs
});
