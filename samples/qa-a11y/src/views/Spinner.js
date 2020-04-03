import Heading from '../../../../../Heading';
import React from 'react';
import Spinner from '../../../../../Spinner';

const SpinnerView = () => (
	<div>
		<Heading showLine>Spinner with Text</Heading>
		<Spinner>Loading...</Spinner>
	</div>
);

export default SpinnerView;
