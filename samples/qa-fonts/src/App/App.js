import {ActivityPanels} from '@enact/sandstone/Panels';
import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

class App extends React.Component {
	render () {
		return (
			<ActivityPanels {...this.props}>
				<MainPanel />
			</ActivityPanels>
		);
	}
}

export default ThemeDecorator(App);
