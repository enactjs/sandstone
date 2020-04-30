import {Panels} from '@enact/sandstone/Panels';
import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

class App extends React.Component {
	render () {
		return (
			<Panels {...this.props}>
				<MainPanel />
			</Panels>
		);
	}
}

export default ThemeDecorator(App);
