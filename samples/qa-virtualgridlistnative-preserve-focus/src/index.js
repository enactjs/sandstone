/* global ENACT_PACK_ISOMORPHIC */
import {createRoot, hydrateRoot} from 'react-dom/client';

import App from './App';
import {IndexProvider} from './context/IndexContext';

const appElement = (
	<IndexProvider>
		<App />
	</IndexProvider>
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
