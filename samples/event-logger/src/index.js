import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './App';
import storeFactory from './store';

const container = document.getElementById('root');

const root = createRoot(container);

const store = storeFactory();
const appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

if (typeof window !== 'undefined') {
	root.render(appElement);
}

export default appElement;
