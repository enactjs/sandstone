import enactPkg from '@enact/core/package.json';
import {createRoot} from 'react-dom';

import App from './App';

import appPkg from '../package.json';

const container = document.getElementById('root');

const root = createRoot(container);

const appElement = (<App />);

if (typeof window !== 'undefined') {
	root.render(appElement);

	let versionDiv = document.createElement('div');
	versionDiv.id = 'version_info';
	versionDiv.style = 'display: none;';
	document.getElementById('root').appendChild(versionDiv);
	document.getElementById('version_info').innerHTML = 'enact ' + enactPkg.version + ' / app ' + appPkg.version;
}

export default appElement;
