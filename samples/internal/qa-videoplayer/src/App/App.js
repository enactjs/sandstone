import kind from '@enact/core/kind';
import React from 'react';
import ThemeDecorator from '../../../../../ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<MainPanel />
		</div>
	)
});

export default ThemeDecorator(App);
