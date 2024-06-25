/* action type */
const ACTIVATE_EVENT = 'activeEventsReducer/ACTIVATE_EVENT';

export const activateEvent = (index, selected) => ({type: ACTIVATE_EVENT, index, selected});

export default function activeEventsReducer (state, action) {
	switch (action.type) {
		case ACTIVATE_EVENT: {
			const newState = state.activeEvents.slice();
			newState.splice(action.index, 1, action.selected);
			return {activeEvents: newState};
		}
		default: {
			return state;
		}
	}
}
