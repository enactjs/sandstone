import Button from '../../../../Button';
import ContextualMenuDecorator from '../../../../ContextualMenuDecorator';
import React from 'react';

const ContextualMenuButton = ContextualMenuDecorator(Button);
const popupProps = {
	style: {width: '500px'}
};
const menuItems = ['Item 1', 'Item 2', 'Item 3'];
const style = {
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)'
};

// TO DO: add menuItem options
// TO DO: add open/close
// TO DO: add RTL tests

const ContextualMenuDecoratorTests = [
	// directions
	/*
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above center" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above left" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="above right" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below center" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below left" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="below right" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="left top" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="left middle" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="left bottom" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="right top" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="right middle" style={style}>Button</ContextualMenuButton>,
	<ContextualMenuButton popupProps={popupProps} menuItems={menuItems} open direction="right bottom" style={style}>Button</ContextualMenuButton>
	*/
].map(component => ({
	component,
	wrapper: {
		full: true
	}
}));
export default ContextualMenuDecoratorTests;
