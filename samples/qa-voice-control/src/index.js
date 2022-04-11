import {createRoot} from 'react-dom/client';

import App from './App';

// For Spotlight debugging
if (__DEV__)  {
	import('./utils/spotlightDebugging')
		.then(() => {
			console.log('Spotlight debugging helpers loaded.');	// eslint-disable-line no-console
		});
}

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(appElement);
}

export default appElement;
