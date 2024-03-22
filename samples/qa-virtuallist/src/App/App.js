import kind from '@enact/core/kind';
import Panels from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less'

const App = kind({
	name: 'App',

	render: (props) => (
		<Panels css={css} {...props}>
			<MainPanel />
		</Panels>
	)
});

export default ThemeDecorator(App);
