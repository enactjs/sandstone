/* action type */
const SET_EVENT_CAPTURING = 'eventCapturingOnReducer/SET_EVENT_CAPTURING';

export const setEventCapturing = (value) => ({type: SET_EVENT_CAPTURING, value});

export default function eventCapturingOnReducer (state, action) {
	switch (action.type) {
		case SET_EVENT_CAPTURING: {
			return {eventCapturingOn: action.value};
		}
		default: {
			return state;
		}
	}
}
