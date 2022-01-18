import {Provider} from 'react-redux';
import {createRoot} from 'react-dom';

import App from './App';
import configureStore from './store';

const container = document.getElementById('root');

const root = createRoot(container);

const store = configureStore();

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}
