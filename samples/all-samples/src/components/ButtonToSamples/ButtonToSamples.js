import {Link} from 'react-router-dom';
import React from 'react';

import IconButton from '../../../../../IconButton';

import css from './ButtonToSamples.module.less';

const ButtonToSamples = () => (
	<div className={css.buttonContainer}>
		<Link to="/" className={css.backLink}>
			<IconButton
				aria-label="Back To Samples"
			>
				arrowhookleft
			</IconButton>
		</Link>
	</div>
);

export default ButtonToSamples;
