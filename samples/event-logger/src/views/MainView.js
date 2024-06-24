import kind from '@enact/core/kind';

import InputBoard from '../components/InputBoard';
import Logs from '../components/Log';

import * as css from './MainView.module.less';

const MainView = kind({
	name: 'MainView',

	styles: {
		css,
		className: 'mainView'
	},

	render: (props) => (
		<div {...props}>
			<InputBoard className={css.inputBoard} />
			<Logs />
		</div>
	)
});

export default MainView;
