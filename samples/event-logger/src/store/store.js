import {createStore} from 'redux';

import eventCategory from '../constants/eventCategory';
import rootReducer from '../reducers/rootReducer';

const initialState = {
	activeEvents: new Array(eventCategory.length).fill(false),
	timerIndex: 0
};
const storeFactory = () =>
	createStore(
		rootReducer,
		initialState
	);

export default storeFactory;
