import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import Alert from '../views/Alert';
import Button from '../views/Button';

import css from './App.module.less';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Router>
		<div {...props}>
			<Routes>
				<Route path="/alert" element={<Alert />} />
				<Route path="/button" element={<Button />} />
			</Routes>
		</div>
		</Router>
	)
});

export default ThemeDecorator(App);
