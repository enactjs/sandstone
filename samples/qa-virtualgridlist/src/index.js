/* global ENACT_PACK_ISOMORPHIC */
import {Provider} from 'react-redux';
import {createRoot, hydrateRoot} from 'react-dom/client';

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
	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(document.getElementById('root'), appElement);
	} else {
		createRoot(document.getElementById('root')).render(appElement);
	}
}

export default appElement;
