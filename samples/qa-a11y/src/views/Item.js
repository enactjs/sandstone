import Item from '@enact/sandstone/Item';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const ItemView = () => (
	<>
		<Section title="Default">
			<Item alt="No Text" />
			<Item alt="Normal">Item</Item>
			<Item alt="Disabled" disabled>Item</Item>
		</Section>

		<Section className={css.marginTop} title="With Label">
			<Item alt="With Label" label="Label">Item</Item>
			<Item alt="Disabled with Label" disabled label="Label">Item</Item>
			<Item alt="With Label and labelPosition" label="Label" labelPosition="above">Item</Item>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Item alt="Aria-labelled" aria-label="This is a Label.">Item</Item>
			<Item alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled>Item</Item>
			<Item alt="Aria-labelled and Disabled With Label" aria-label="This is a Label." label="Label">Item</Item>
		</Section>
	</>
);

export default ItemView;
