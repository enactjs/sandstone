import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import App from './App';
import axe from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
	// const axe = require('@axe-core/react');
	axe(React, ReactDOM, 1000);
}

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(appElement);
}

export default appElement;
