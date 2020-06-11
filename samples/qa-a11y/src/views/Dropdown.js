import Dropdown from '@enact/sandstone/Dropdown';
import Layout, {Cell} from '@enact/ui/Layout';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';

const list = [
	{children: 'Option1', key: 'item1', 'aria-label': 'aria label 1'},
	{children: 'Option2', key: 'item2', 'aria-label': 'aria label 2'},
	{children: 'Option3', key: 'item3', 'aria-label': 'arai label 3'}
];

const DropdownView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Dropdown placeholder="Dropdown" title="String Array children">
				{['Option1', 'Option2', 'Option3']}
			</Dropdown>
			<br />
			<br />
			<Dropdown placeholder="Dropdown" title="Object Array children with aria-label">
				{list}
			</Dropdown>
		</Cell>
	</Layout>
);

export default DropdownView;
