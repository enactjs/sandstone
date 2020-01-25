import {Link} from 'react-router-dom';
import React from 'react';

import Button from '@enact/sandstone/Button';

import css from './ButtonToSamples.module.less';

const ButtonToSamples = () => (
	<div className={css.buttonContainer}>
		<Link to="/" className={css.backLink}>
			<Button
				aria-label="Back To Samples"
				icon="arrowhookleft"
			/>
		</Link>
	</div>
);

export default ButtonToSamples;
