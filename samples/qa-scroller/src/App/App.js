import kind from '@enact/core/kind';
import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainView from '../views/MainView';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<MainView />
		</div>
	)
});

export default ThemeDecorator(App);
