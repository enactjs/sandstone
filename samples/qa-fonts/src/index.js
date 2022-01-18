import {createRoot} from 'react-dom';

import App from './App';

const container = document.getElementById('root');

const root = createRoot(container);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	root.render(<App />);
}
