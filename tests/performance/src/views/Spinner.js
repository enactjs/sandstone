import kind from '@enact/core/kind';
import React from 'react';
import Spinner from '@enact/sandstone/Spinner';

const SpinnerView = kind({
	name: 'SpinnerView',

	render: () => (
		<Spinner id="spinner">Loading message...</Spinner>
	)
});

export default SpinnerView;
