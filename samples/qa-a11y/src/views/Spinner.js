import Heading from '@enact/sandstone/Heading';
import Spinner from '@enact/sandstone/Spinner';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SpinnerView = () => (
	<>
		<Heading showLine>Spinner with Text</Heading>
		<Spinner>Loading...</Spinner>
	</>
);

export default SpinnerView;
