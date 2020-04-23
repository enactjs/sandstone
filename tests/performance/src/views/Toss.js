import kind from '@enact/core/kind';
import React from 'react';

const Toss = kind({
	name: 'Toss',

	render: (props) => (
		<div {...props} />
	)
});

const View = kind({
	name: 'TossView',

	render: () => (
		<Toss id="toss">Hello World!</Toss>
	)
});

export default View;
