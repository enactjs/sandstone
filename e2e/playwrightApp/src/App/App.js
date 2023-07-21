import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import Button from '../views/Button';
import DatePicker from '../views/DatePicker';
import DatePickerScreenshot from "../views/DatePickerScreenshot";


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
					<Route path="/button" element={<Button />} />
					<Route path="/datepicker" element={<DatePicker />} />
					<Route path="/datepickerscreenshot" element={<DatePickerScreenshot />} />
				</Routes>
			</div>
		</Router>
	)
});

export default ThemeDecorator(App);
