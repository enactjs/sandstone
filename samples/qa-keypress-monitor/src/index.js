import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {PressedKeysProvider} from './contexts/PressedKeysContext';

const appElement = (
	<PressedKeysProvider>
		<App />
	</PressedKeysProvider>
);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
