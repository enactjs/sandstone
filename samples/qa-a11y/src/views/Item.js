import {CheckboxItem as CheckboxItemBase} from '@enact/sandstone/CheckboxItem';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Icon from '@enact/sandstone/Icon';
import LabeledItem from '@enact/sandstone/LabeledItem';
import Layout, {Cell} from '@enact/ui/Layout';
import {RadioItem as RadioItemBase} from '@enact/sandstone/RadioItem';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';
import {SelectableItem as SelectItemBase} from '@enact/sandstone/SelectableItem';
import {SwitchItem as SwitchItemBase} from '@enact/sandstone/SwitchItem';
import Toggleable from '@enact/ui/Toggleable';
import {ToggleItem as ToggleItemBase} from '@enact/sandstone/ToggleItem';

const CheckboxItem = Toggleable({prop: 'selected'}, CheckboxItemBase);
const RadioItem = Toggleable({prop: 'selected'}, RadioItemBase);
const SelectableItem = Toggleable({prop: 'selected'}, SelectItemBase);
const SwitchItem = Toggleable({prop: 'selected'}, SwitchItemBase);
const ToggleItem = Toggleable({prop: 'selected'}, ToggleItemBase);

const CustomIcon = (props) => <Icon {...props}>lock</Icon>;

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
			<LabeledItem label="Label">Labeled item</LabeledItem>
			<Heading showLine>Radio Item</Heading>
			<RadioItem>Radio item</RadioItem>
			<Heading showLine>Selectable Item</Heading>
			<SelectableItem>Selectable item</SelectableItem>
			<Heading showLine>Switch Item</Heading>
			<SwitchItem>Switch item</SwitchItem>
			<Heading showLine>Toggle Item</Heading>
			<ToggleItem iconComponent={CustomIcon}>Toggle item</ToggleItem>
			<Heading showLine>Aria-labled Items</Heading>
			<Item aria-label="item">Item</Item>
			<LabeledItem label="Label" aria-label="labeled item">Labeled item</LabeledItem>
		</Cell>
	</Layout>
);

export default ItemView;
