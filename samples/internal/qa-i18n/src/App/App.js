import kind from '@enact/core/kind';
import Panels from '../../../../../Panels';
import React from 'react';
import ThemeDecorator from '../../../../../ThemeDecorator';

import MainPanel from '../views/MainPanel';

import './attachErrorHandler';

import css from './App.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	)
});

export default ThemeDecorator(App);
