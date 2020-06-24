import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import React from 'react';

const ItemView = () => (
	<>
		<Heading showLine>Default</Heading>
		<Item />
		<Item>Item</Item>
		<Item disabled>Disabled Item</Item>
		<Heading showLine>Labeled Item</Heading>
		<Item label="Label">Labeled item</Item>
		<Item label="Label and labelPosition" labelPosition="above">Labeled item</Item>
		<Heading showLine>Aria-labled Items</Heading>
		<Item aria-label="item">Item</Item>
		<Item label="Label" aria-label="labeled item">Labeled item</Item>
	</>
);

export default ItemView;
