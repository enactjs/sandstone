import Dropdown from '../../../../Dropdown';
import React from 'react';

import {withProps} from './utils';

// TO DO: add children options
// TO DO: add direction up/down
// TO DO: add open/close
// TO DO: add RTL tests

const Widths = [
	<Dropdown placeholder="Dropdown" width="tiny" />,
	<Dropdown placeholder="Dropdown" width="small" />,
	<Dropdown placeholder="Dropdown" width="large" />,
	<Dropdown placeholder="Dropdown" width="x-large" />,
	<Dropdown placeholder="Dropdown" width="huge" />
];

const DropdownTests = [
	<Dropdown />,  // default size is 'large'
	// Change 'size' dynamically [GT-28629]
	<Dropdown size="large" />,
	<Dropdown placeholder="Dropdown" />,
	<Dropdown size="small" />,
	<Dropdown placeholder="Dropdown" size="small" />,
	<Dropdown placeholder="Dropdown" width="tiny" disabled />,

	// With title
	<Dropdown title="Select an option below" />,
	<Dropdown title="Select an option below" placeholder="Dropdown" />,
	<Dropdown title="Select an option below" placeholder="Dropdown" disabled />,

	// Change 'width' dynamically [GT-28630]
	// width - 'medium' is default
	...Widths,

	// size="small"
	...withProps({
		size: 'small'
	}, Widths)

];
export default DropdownTests;
