import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {HashRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import {render} from 'react-dom';

import ButtonKitchenSink from '../../button-kitchen-sink/src/App';

import App from './App';
import ButtonToSamples from './components/ButtonToSamples';

export const routes = [
	{path: '/', exact: true, component: App},
	{path: '/ButtonKitchenSink', component: ButtonKitchenSink}
];

// Router causes an error with our samples, but we don't want our samples to know about router.
// To avoid this for now we're just suppressing the error.
/* eslint-disable no-console */
const originalConsoleError = console.error;

console.error = (...args) => {
	return args[0].includes('React does not recognize the `staticContext` prop on a DOM element.') || args[0].includes('Unknown props `match`, `location`, `history`, `staticContext`') || args[0].includes('Warning: Hash history cannot PUSH the same path') ? null : originalConsoleError(args.join(' '));
};
/* eslint-enable no-console */

const SampleRoutes = MoonstoneDecorator(kind({
	name:  'SampleRoutes',

	render: () => {
		return (
			<Router>
				<div>
					<ButtonToSamples />
					{routes.map((route, index) => <Route key={index} {...route} />)}
				</div>
			</Router>
		);
	}
}));

const appElement =  <SampleRoutes />;

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
