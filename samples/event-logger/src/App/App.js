import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

import MainView from '../views/MainView';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<MainView />
		</div>
	)
});

export default MoonstoneDecorator(App);
