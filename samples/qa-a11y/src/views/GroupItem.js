import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Group from '@enact/ui/Group';
import React from 'react';

const GroupItemView = () => (
	<>
		<Heading showLine>Default</Heading>
		<Group
			childComponent={Button}
			defaultSelected={0}
			itemProps={{size: 'small'}}
			select={'radio'}
			selectedProp="selected"
		>
			{['Item 1', 'Item 2', 'Item 3']}
		</Group>
		<Heading showLine>Customizable aria-labels</Heading>
		<Group
			childComponent={Button}
			defaultSelected={0}
			itemProps={{size: 'small'}}
			select={'radio'}
			selectedProp="selected"
		>
			{[
				{'aria-label': 'first item', children: 'Item 1', key: 1},
				{'aria-label': 'second item', children: 'Item 2', key: 2},
				{'aria-label': 'third item', children: 'Item 3', key: 3}
			]}
		</Group>
	</>
);

export default GroupItemView;
