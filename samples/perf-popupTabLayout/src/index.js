/* global ENACT_PACK_ISOMORPHIC */
import enactPkg from '@enact/core/package.json';
import {createRoot, hydrateRoot} from 'react-dom/client';

import appPkg from '../package.json';

import App from './App';

const appElement = (<App />);

if (typeof window !== 'undefined') {
	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(document.getElementById('root'), appElement);
	} else {
		createRoot(document.getElementById('root')).render(appElement);
	}

	let versionDiv = document.createElement('div');
	versionDiv.id = 'version_info';
	versionDiv.style = 'display: none;';
	document.getElementById('root').appendChild(versionDiv);
	document.getElementById('version_info').innerHTML = 'enact ' + enactPkg.version + ' / app ' + appPkg.version;
}

export default appElement;
