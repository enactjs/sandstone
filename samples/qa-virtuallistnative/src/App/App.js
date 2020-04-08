import kind from '@enact/core/kind';
import Panels from '@enact/sandstone/Panels';
import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

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
