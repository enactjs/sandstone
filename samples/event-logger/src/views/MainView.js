import kind from '@enact/core/kind';
import React from 'react';

import InputBoard from '../components/InputBoard/InputBoard';
import Logs from '../components/Log/Logs';

import css from './MainView.module.less';

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
