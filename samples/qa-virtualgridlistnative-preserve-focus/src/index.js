import {Provider} from 'react-redux';
import {createRoot} from 'react-dom';

import App from './App';
import configureStore from './store';

const container = document.getElementById('root');

const root = createRoot(container);

const store = configureStore();
const appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	root.render(appElement);
}

export default appElement;
