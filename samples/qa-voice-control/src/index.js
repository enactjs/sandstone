/* global ENACT_PACK_ISOMORPHIC */
import {createRoot, hydrateRoot} from 'react-dom/client';

import App from './App';

// For Spotlight debugging
if (__DEV__ && typeof window !== 'undefined') {
	import('./utils/spotlightDebugging')
		.then(() => {
			console.log('Spotlight debugging helpers loaded.');	// eslint-disable-line no-console
		});
}

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(document.getElementById('root'), appElement);
	} else {
		createRoot(document.getElementById('root')).render(appElement);
	}
}

export default appElement;
