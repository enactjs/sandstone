import kind from '@enact/core/kind';
import React from 'react';

import Tossable from '../components/Tossable';

const TossableComponent = Tossable('div');

const View = kind({
	name: 'TossView',

	render: () => (
		<TossableComponent id="toss">Hello World!</TossableComponent>
	)
});

export default View;
