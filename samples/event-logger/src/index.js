import {createRoot} from 'react-dom/client';
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
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(appElement);
}

export default appElement;
