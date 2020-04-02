import {ActivityPanels} from '../../../../../Panels';
import React from 'react';
import ThemeDecorator from '../../../../../ThemeDecorator';

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
