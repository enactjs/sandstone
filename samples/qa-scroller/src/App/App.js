import kind from '@enact/core/kind';
import React from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Button from '@enact/sandstone/Button';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<Button>Hello</Button>
		</div>
	)
});

export default ThemeDecorator(App);
