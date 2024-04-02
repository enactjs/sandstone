/* eslint-disable react/jsx-no-bind */

import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useContext} from 'react';

import {
	decreaseIndex as decreaseAction,
	increaseIndex as increaseAction,
	IndexContext,
	IndexDispatchContext
} from '../context/IndexContext';
import MainPanel from '../views/MainPanel';

const App = (props) => {
	const dispatch = useContext(IndexDispatchContext);
	const {index} = useContext(IndexContext);
	const pushPanel = () => dispatch(increaseAction());
	const popPanel = () => dispatch(decreaseAction());

	return (
		<Panels {...props} onBack={popPanel} index={index}>
			<MainPanel title="First" onClick={pushPanel} />
			<MainPanel title="Second" onClick={pushPanel} />
			<MainPanel title="Third" onClick={pushPanel} />
			<MainPanel title="Fourth" />
		</Panels>
	);
};

export default ThemeDecorator(App);
