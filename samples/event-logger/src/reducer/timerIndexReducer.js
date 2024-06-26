/* action type */
const SET_TIMER_INDEX = 'timeIndexReducer/SET_TIMER_INDEX';

export const setTimerIndex = (delay) => ({type: SET_TIMER_INDEX, delay});

export default function timerIndexReducer (state, action) {
	switch (action.type) {
		case SET_TIMER_INDEX: {
			return {timerIndex: action.delay};
		}
		default: {
			return state;
		}
	}
}
