import Button from '../../../../Button';
import ContextualMenuDecorator from '../../../../ContextualMenuDecorator';
import React from 'react';

const ContextualMenuButton = ContextualMenuDecorator(Button);
const popupProps = {
	style: {width: '500px'}
};

// TO DO: add menuItem options
// TO DO: add open/close
// TO DO: add RTL tests

const ContextualMenuDecoratorTests = [
	// directions
	<ContextualMenuButton popupProps={popupProps} direction="above">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="above center">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="above left">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="above right">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="below">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="below center">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="below left">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="below right">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="left top">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="left middle">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="left bottom">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="right top">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="right middle">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} direction="right bottom">Button</ContextualMenuButton>
];
export default ContextualMenuDecoratorTests;
