import {createRoot} from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import storeFactory from './store';

const container = document.getElementById('root');

const root = createRoot(container);

const store = storeFactory();
if (typeof window !== 'undefined') {
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}
