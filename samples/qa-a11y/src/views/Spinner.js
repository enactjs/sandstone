import Heading from '@enact/sandstone/Heading';
import React from 'react';
import Spinner from '@enact/sandstone/Spinner';

const SpinnerView = () => (
	<div>
		<Heading showLine>Spinner with Text</Heading>
		<Spinner>Loading...</Spinner>
	</div>
);

export default SpinnerView;
