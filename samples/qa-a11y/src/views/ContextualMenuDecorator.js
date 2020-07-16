import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import React from 'react';

import Section from '../components/Section';

const ContextualButton = ContextualMenuDecorator(Button);
const MenuItems = ['Item', 'Item', 'Item'];
const MenuItemObject = [
	{children: 'Item', disabled: true, key: 0},
	{children: 'Item', disabled: true, key: 1},
	{children: 'Item', disabled: true, key: 2}
];

const ContextualMenuDecoratorView = () => (
	<Section title="Button wrapped with ContextualMenuDecorator">
		<ContextualButton alt="With Menu Item" menuItems={MenuItems}>Text</ContextualButton>
		<ContextualButton alt="With Disabled Menu Item" menuItems={MenuItemObject}>Text</ContextualButton>
		<ContextualButton alt="Disabled" disabled menuItems={MenuItems}>Text</ContextualButton>
	</Section>
);

export default ContextualMenuDecoratorView;
