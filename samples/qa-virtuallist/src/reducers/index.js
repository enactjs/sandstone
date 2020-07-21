import {combineReducers} from 'redux';
// NOTE: We use this type of structure for performance.
let initialStateForListItems = [];

const isItemDisabled = (index, mod) => !(index % mod === 0);

function listItems (state = initialStateForListItems, action) {
	switch (action.type) {
		case 'SET_DATA': {
			const newListItems = [];

			for (let i = 0; i < action.dataSize; i++) {
				newListItems.push({content: 'Item ' + ('00' + i).slice(-3), disabled: isItemDisabled(i, action.isDisabled ? 15 : 1)});
			}

			return newListItems;
		}
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	listItems
});

export default rootReducer;
