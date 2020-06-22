import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import React from 'react';

const ContextualButton = ContextualMenuDecorator(Button);
const MenuItems = ['Apple', 'Banana', 'Cherry'];

const ContextualMenuDecoratorView = () => (
	<ContextualButton menuItems={MenuItems}>
		Fruits
	</ContextualButton>
);

export default ContextualMenuDecoratorView;
