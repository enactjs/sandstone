import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Layout, {Cell} from '@enact/ui/Layout';
import RadioItem from '@enact/sandstone/RadioItem';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';

const ItemView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller} focusableScrollbar>
			<Heading showLine>Default</Heading>
			<Item />
			<Item>Item</Item>
			<Item disabled>Disabled Item</Item>
			<Heading showLine>Checkbox Item</Heading>
			<CheckboxItem>Checkbox</CheckboxItem>
			<Heading showLine>Labeled Item</Heading>
			<Item label="Label">Labeled item</Item>
			<Heading showLine>Radio Item</Heading>
			<RadioItem>Radio item</RadioItem>
			<Heading showLine>Switch Item</Heading>
			<SwitchItem>Switch item</SwitchItem>
			<Heading showLine>Aria-labled Items</Heading>
			<Item aria-label="item">Item</Item>
			<Item label="Label" aria-label="labeled item">Labeled item</Item>
		</Cell>
	</Layout>
);

export default ItemView;
