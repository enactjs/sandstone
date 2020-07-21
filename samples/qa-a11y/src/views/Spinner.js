import Heading from '@enact/sandstone/Heading';
import Spinner from '@enact/sandstone/Spinner';
import React from 'react';

const SpinnerView = () => (
	<>
		<Heading showLine>Spinner with Text</Heading>
		<Spinner>Loading...</Spinner>
	</>
);

export default SpinnerView;
