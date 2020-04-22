import Dropdown from '../../../../Dropdown';
import React from 'react';

// TO DO: add children options
// TO DO: add direction up/down
// TO DO: add open/close
// TO DO: add RTL tests

const DropdownTests = [
	<Dropdown />,  // default size is 'large'
	// Change 'size' dynamically [GT-28629]
	<Dropdown size="large" />,
	<Dropdown title="Dropdown" />,
	<Dropdown size="small" />,
	<Dropdown title="Dropdown" size="small" />,

	// Change 'width' dynamically [GT-28630]
	// width - 'medium' is default
	<Dropdown title="Dropdown" width="tiny" />,
	<Dropdown title="Dropdown" width="small" />,
	<Dropdown title="Dropdown" width="large" />,
	<Dropdown title="Dropdown" width="x-large" />,
	<Dropdown title="Dropdown" width="huge" />,

	<Dropdown title="Dropdown" width="tiny" disabled />,

	<Dropdown title="Dropdown" width="tiny" size="small" />,
	<Dropdown title="Dropdown" width="small" size="small" />,
	<Dropdown title="Dropdown" width="large" size="small" />,
	<Dropdown title="Dropdown" width="x-large" size="small" />,
	<Dropdown title="Dropdown" width="huge" size="small" />

];
export default DropdownTests;
