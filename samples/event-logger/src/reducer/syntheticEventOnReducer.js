/* action type */
const IS_SYNTHETIC_EVENT_ON = 'syntheticEventOnReducer/IS_SYNTHETIC_EVENT_ON';

export const isSyntheticEventOn = (value) => ({type: IS_SYNTHETIC_EVENT_ON, value});

export default function syntheticEventOnReducer (state, action) {
	switch (action.type) {
		case IS_SYNTHETIC_EVENT_ON: {
			return {syntheticEventOn: action.value};
		}
		default: {
			return state;
		}
	}
}
