import kind from '@enact/core/kind';
import Panels from '@enact/sandstone/Panels';
import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

const App = kind({
	name: 'App',

	render: (props) => (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	)
});

export default ThemeDecorator(App);
