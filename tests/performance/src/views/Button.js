import kind from '@enact/core/kind';
import React from 'react';
import Button from '@enact/sandstone/Button';

const ButtonView = kind({
	name: 'ButtonView',

	render: () => (
		<Button id="button">Hello World!</Button>
	)
});

export default ButtonView;
