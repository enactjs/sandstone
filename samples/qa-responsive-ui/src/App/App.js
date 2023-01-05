import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Panels from '@enact/sandstone/Panels';
import Layout, {Cell} from '@enact/ui/Layout';

import classnames from 'classnames';
import {useCallback, useState} from 'react';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const App = (props) => {
	const [debugLayout, setDebugLayout] = useState(false);
	const handleDebug = useCallback((ev) => {
		setDebugLayout(ev.selected);
	}, [setDebugLayout]);

	return (
		<Layout {...props} className={classnames(props.className, css.app, {'layout debug': debugLayout})} orientation="vertical">
			<Cell shrink>
				<CheckboxItem onToggle={handleDebug} selected={debugLayout}>
					Debug layout
				</CheckboxItem>
			</Cell>
			<Cell>
				<Panels>
					<MainPanel />
				</Panels>
			</Cell>
		</Layout>
	);
};

App.displayName = 'App';
export default ThemeDecorator(App);
