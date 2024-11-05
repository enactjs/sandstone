import {createContext, useReducer} from 'react';

export const IndexContext = createContext(null);
export const IndexDispatchContext = createContext(null);

const initialData = {index: 0};

export const IndexProvider = ({children}) => {
	const [state, dispatch] = useReducer(indexReducer, initialData);

	return (
		<IndexContext.Provider value={state}>
			<IndexDispatchContext.Provider value={dispatch}>
				{children}
			</IndexDispatchContext.Provider>
		</IndexContext.Provider>
	);
};

/* action type */
const INCREASE_INDEX = 'indexReducer/INCREASE_INDEX';
const DECREASE_INDEX = 'indexReducer/DECREASE_INDEX';

export const increaseIndex = () => ({type: INCREASE_INDEX});
export const decreaseIndex = () => ({type: DECREASE_INDEX});

export default function indexReducer (state, action) {
	switch (action.type) {
		case INCREASE_INDEX: {
			const newIndex = state.index += 1;
			return {index: newIndex};
		}
		case DECREASE_INDEX: {
			return {index: state.index > 0 ? state.index - 1 : 0};
		}
	}
}
