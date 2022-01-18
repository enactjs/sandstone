import enactPkg from '@enact/core/package.json';
import {createRoot} from 'react-dom';

import appPkg from '../package.json';

import App from './App';

const container = document.getElementById('root');

const root = createRoot(container);

if (typeof window !== 'undefined') {
	root.render(<App />);

	let versionDiv = document.createElement('div');
	versionDiv.id = 'version_info';
	versionDiv.style = 'display: none;';
	document.getElementById('root').appendChild(versionDiv);
	document.getElementById('version_info').innerHTML = 'enact ' + enactPkg.version + ' / app ' + appPkg.version;
}
