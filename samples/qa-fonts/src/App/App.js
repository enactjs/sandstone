import {Panels} from '@enact/sandstone/Panels';
import {Component} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

class App extends Component {
	render () {
		return (
			<Panels {...this.props}>
				<MainPanel />
			</Panels>
		);
	}
}

export default ThemeDecorator(App);
