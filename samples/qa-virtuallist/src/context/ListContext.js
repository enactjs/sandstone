import {createContext, useReducer} from "react";

export const ListContext = createContext(null);
export const ListDispatchContext = createContext(null);

export const ListProvider = ({children}) => {
	const initialData = {listItems: []};
	const [state, dispatch] = useReducer(listReducer, initialData);

	return (
		<ListContext.Provider value={state}>
			<ListDispatchContext.Provider value={dispatch}>
				{children}
			</ListDispatchContext.Provider>
		</ListContext.Provider>
	);
};

/* action type */
const SET_DATA = 'listReducer/SETDATA';

export const setData = (dataSize, isDisabled) => ({type: SET_DATA, dataSize, isDisabled});

const isItemDisabled = (index, mod) => !(index % mod === 0);

export default function listReducer (state, action) {
	switch (action.type) {
		case (SET_DATA): {
			const newListItems = [];

			for (let i = 0; i < action.dataSize; i++) {
				newListItems.push({content: 'Item ' + ('00' + i).slice(-3), disabled: isItemDisabled(i, action.isDisabled ? 15 : 1)});
			}
			return {...state, listItems: newListItems};
		}
	}
}
