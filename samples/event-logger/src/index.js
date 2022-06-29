/* global ENACT_PACK_ISOMORPHIC */
import {createRoot, hydrateRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './App';
import configureAppStore from './store';

const store = configureAppStore();
const appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

if (typeof window !== 'undefined') {
	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(document.getElementById('root'), appElement);
	} else {
		createRoot(document.getElementById('root')).render(appElement);
	}
}

export default appElement;
