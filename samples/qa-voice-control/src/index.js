import React from 'react';
import {render} from 'react-dom';

import App from './App';

// For Spotlight debugging
if (__DEV__)  {
	import('./utils/spotlightDebugging')
	.then(() => {
		console.log('Spotlight debugging helpers loaded.');
	});
}

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
