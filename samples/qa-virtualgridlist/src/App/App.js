import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import {RecordProvider} from '../context/RecordContext';
import MainView from '../views/MainView';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<RecordProvider>
				<MainView />
			</RecordProvider>
		</div>
	)
});

export default ThemeDecorator(App);
