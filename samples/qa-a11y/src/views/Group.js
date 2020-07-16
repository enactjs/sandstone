import Button from '@enact/sandstone/Button';
import Group from '@enact/ui/Group';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const GroupView = () => (
	<>
		<Section title="Default">
			<Group
				alt="Selected With Items"
				childComponent={Button}
				defaultSelected={0}
				itemProps={{size: 'small'}}
				select={'radio'}
				selectedProp="selected"
			>
				{['Item 1', 'Item 2', 'Item 3']}
			</Group>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Group
				alt="Selected With aria-labelled Items"
				childComponent={Button}
				defaultSelected={0}
				itemProps={{size: 'small'}}
				select={'radio'}
				selectedProp="selected"
			>
				{[
					{'aria-label': 'This is an Item 1.', children: 'Item 1', key: 1},
					{'aria-label': 'This is an Item 2.', children: 'Item 2', key: 2},
					{'aria-label': 'This is an Item 3.', children: 'Item 3', key: 3}
				]}
			</Group>

			<Group
				alt="Selected With aria-labelled and Disabled Items"
				childComponent={Button}
				defaultSelected={0}
				itemProps={{size: 'small'}}
				select={'radio'}
				selectedProp="selected"
			>
				{[
					{'aria-label': 'This is an Item 1.', children: 'Item 1', disabled: true, key: 1},
					{'aria-label': 'This is an Item 2.', children: 'Item 2', disabled: true, key: 2},
					{'aria-label': 'This is an Item 3.', children: 'Item 3', key: 3}
				]}
			</Group>
		</Section>
	</>
);

export default GroupView;
