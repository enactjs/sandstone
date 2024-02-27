import {createContext, useReducer} from 'react';

export const IndexContext = createContext(null);
export const IndexDispatchContext = createContext(null);

export const IndexProvider = ({children}) => {
	const initialData = {index: 0};
	const [state, dispatch] = useReducer(indexReducer, initialData);

	return (
		<IndexContext.Provider value={state}>
			<IndexDispatchContext.Provider value={dispatch}>
				{children}
			</IndexDispatchContext.Provider>
		</IndexContext.Provider>
	)
};

/* action type */
const INCREASE_INDEX = 'indexReducer/INCREASEINDEX';
const DECREASE_INDEX = 'indexReducer/DECREASEINDEX';

export const increaseIndex = () => ({type: INCREASE_INDEX});
export const decreaseIndex = () => ({type: DECREASE_INDEX});

export default function indexReducer(state, action) {
	switch(action.type) {
		case(INCREASE_INDEX): {
			const newIndex = state.index += 1;
			return {...state, index: newIndex}
		}
		case(DECREASE_INDEX): {
			const newIndex = state.index > 0 ? state.index - 1 : 0;
			return {...state, index: newIndex}
		}
	}
}