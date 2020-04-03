import enactPkg from '@enact/core/package.json';
import React from 'react';
import {render} from 'react-dom';

import appPkg from '../package.json';

import App from './App.js';

let appElement = (<App />);

if (typeof window !== 'undefined') {
	render(
		appElement,
		document.getElementById('root')
	);

	let versionDiv = document.createElement('div');
	versionDiv.id = 'version_info';
	versionDiv.style = 'display: none;';
	document.getElementById('root').appendChild(versionDiv);
	document.getElementById('version_info').innerHTML = 'enact ' + enactPkg.version + ' / app ' + appPkg.version;
}

export default appElement;
