import IconButton from '@enact/moonstone/IconButton';
import {Link} from 'react-router-dom';
import React from 'react';

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
