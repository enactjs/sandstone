import Dropdown from '../../../../Dropdown';
import {scaleToRem} from '@enact/ui/resolution';

import {withProps} from './utils';


const children = (itemCount) => (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

const Widths = [
	<Dropdown placeholder="Dropdown" width="tiny" />,
	<Dropdown placeholder="Dropdown" width="small" />,
	<Dropdown placeholder="Dropdown" width="large" />,
	<Dropdown placeholder="Dropdown" width="x-large" />,
	<Dropdown placeholder="Dropdown" width="huge" />
];

const DropdownTests = [
	<Dropdown />,  // default size is 'small'
	// Change 'size' dynamically [GT-28629]
	<Dropdown size="small" />,
	<Dropdown placeholder="Dropdown" />,
	<Dropdown size="large" />,
	<Dropdown placeholder="Dropdown" size="large" />,
	<Dropdown placeholder="Dropdown" width="tiny" disabled />,

	// With title
	<Dropdown title="Select an option below" />,
	<Dropdown title="Select an option below" placeholder="Dropdown" />,
	<Dropdown title="Select an option below" placeholder="Dropdown" disabled />,

	// Change 'width' dynamically [GT-28630]
	// width - 'medium' is default
	...Widths,

	// size="large"
	...withProps({
		size: 'large'
	}, Widths),

	// open with children
	<Dropdown open title="Select an option below">
		{children(5)}
	</Dropdown>,

	// direction - 'above', 'below'
	// 'below' is default
	<Dropdown open direction="above" title="Select an option above" style={{marginTop: scaleToRem(300)}}>
		{children(3)}
	</Dropdown>,
	<Dropdown title="Select an option below">
		{children(3)}
	</Dropdown>,

	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <Dropdown title="حدد أحد الخيارات أدناه">{children(5)}</Dropdown>
	}
];
export default DropdownTests;
