import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import React from 'react';

import Section from '../components/Section';

const ContextualButton = ContextualMenuDecorator(Button);
const MenuItems = ['Item 0', 'Item 1', 'Item 2'];
const MenuItemObject = [
	{children: 'Item 0', disabled: true, key: 0},
	{children: 'Item 1', disabled: true, key: 1},
	{children: 'Item 2', disabled: true, key: 2}
];

const ContextualMenuDecoratorView = () => (
	<Section title="Button wrapped with ContextualMenuDecorator">
		<ContextualButton alt="With Menu Item" menuItems={MenuItems}>Text 0</ContextualButton>
		<ContextualButton alt="With Disabled Menu Item" menuItems={MenuItemObject}>Text 1</ContextualButton>
		<ContextualButton alt="Disabled" disabled menuItems={MenuItems}>Text 2</ContextualButton>
	</Section>
);

export default ContextualMenuDecoratorView;
