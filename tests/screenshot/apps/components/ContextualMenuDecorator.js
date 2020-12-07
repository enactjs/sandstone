import Button from '../../../../Button';
import ContextualMenuDecorator from '../../../../ContextualMenuDecorator';
import React from 'react';

const ContextualMenuButton = ContextualMenuDecorator(Button);
const popupProps = {
	style: {width: '500px'}
};
const menuItems = ['Item 1', 'Item 2', 'Item 3'];

// TO DO: add menuItem options
// TO DO: add open/close
// TO DO: add RTL tests

const ContextualMenuDecoratorTests = [
	// directions
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above center">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above left">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above right">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below center">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below left">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below right">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="left top">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="left middle">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="left bottom">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="right top">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="right middle">Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="right bottom">Button</ContextualMenuButton>
].map(component => ({
	component,
	wrapper: {
		padded: '540px'
	}
}));
export default ContextualMenuDecoratorTests;
