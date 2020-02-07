import ToggleIcon from '../../../../ToggleIcon';
import React from 'react';

const ToggleIconTests = [
	<ToggleIcon />,
	<ToggleIcon>star</ToggleIcon>,
	<ToggleIcon disabled>star</ToggleIcon>,
	<ToggleIcon selected>star</ToggleIcon>,
	<ToggleIcon defaultSelected>star</ToggleIcon>,
	<ToggleIcon disabled selected>star</ToggleIcon>
];
export default ToggleIconTests;
