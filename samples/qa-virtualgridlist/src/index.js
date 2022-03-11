import {Provider} from 'react-redux';
import {render} from 'react-dom';

import App from './App';
import configureAppStore from './store';

const store = configureAppStore();

const appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
