import Spinner from '@enact/sandstone/Spinner';
import React from 'react';

import Section from '../components/Section';

const SpinnerView = () => (
	<Section title="Default">
		<Spinner alt="Normal">Loading...</Spinner>
	</Section>
);

export default SpinnerView;
