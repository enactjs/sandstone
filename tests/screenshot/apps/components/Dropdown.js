import Dropdown from '../../../../Dropdown';
import React from 'react';

// TO DO: add children options
// TO DO: add direction up/down
// TO DO: add open/close
// TO DO: add RTL tests

const DropdownTests = [
	// Change 'size' dynamically [GT-27486]
	<Dropdown />,  // default size is 'small'
	// Change 'size' dynamically [GT-27486]
	<Dropdown size="large" />,
	<Dropdown title="Dropdown" />,
	<Dropdown title="Dropdown" size="large" />,

	// Change 'width' dynamically [GT-27549]
	// width - 'medium' is default
	<Dropdown title="Dropdown" width="tiny" />,
	<Dropdown title="Dropdown" width="small" />,
	<Dropdown title="Dropdown" width="large" />,
	<Dropdown title="Dropdown" width="x-large" />,
	<Dropdown title="Dropdown" width="huge" />,

	<Dropdown title="Dropdown" width="tiny" disabled />,

	<Dropdown title="Dropdown" width="tiny" size="large" />,
	<Dropdown title="Dropdown" width="small" size="large" />,
	<Dropdown title="Dropdown" width="large" size="large" />,
	<Dropdown title="Dropdown" width="x-large" size="large" />,
	<Dropdown title="Dropdown" width="huge" size="large" />

];
export default DropdownTests;
