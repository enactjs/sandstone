import {Provider} from 'react-redux';
import {createRoot} from 'react-dom';

import App from './App';
import configureStore from './store';

const store = configureStore();

const container = document.getElementById('root');

const root = createRoot(container);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}
