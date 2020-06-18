import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import React from 'react';

const ContextualButton = ContextualMenuDecorator(Button);

const MenuItems = ['Apple', 'Banana', 'Cherry'];

const ContextualMenuDecoratorView = () => (
	<ContextualButton
		direction="below"
		menuItems={MenuItems}
		style={{position: 'absolute', left: '50%', top: '50%'}}
	>
		Fruits
	</ContextualButton>
);

export default ContextualMenuDecoratorView;
