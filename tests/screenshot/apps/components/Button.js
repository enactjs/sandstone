import Button from '../../../../Button';
import React from 'react';

import buttonstate from '../../images/button-state.svg';

const ButtonTests = [
	<Button>click me</Button>,
	<Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	{
		textSize: 'large',
		component: <Button>click me</Button>
	},
	<Button disabled>click me</Button>,

	// {GT-28189]
	<Button> ฟิ้  ไั  ஒ  து</Button>,
	<Button>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Button>,
	<Button>Bản văn</Button>,
	// end [GT-28189]

	// iconPosition = before (Default) + small (default) + large
	// Leaving size small here as example but it is not required since it is the default.
	<Button size="small">click me</Button>,
	<Button size="large">click me</Button>,
	// iconPosition = before (Default) + icon + iconPosition + small (default) + large
	<Button icon="minus" iconPosition="after">click me</Button>,
	<Button icon="minus" iconPosition="after" size="large">click me</Button>,
	<Button icon="plus" iconPosition="before">click me</Button>,
	<Button icon="plus" iconPosition="before" size="large">click me</Button>,

	// Icon only, iconPosition = before (Default) + icon + iconPosition + small (default) + large
	<Button icon="minus" iconPosition="after" />,
	<Button icon="minus" iconPosition="after" size="large" />,
	<Button icon="plus" iconPosition="before" />,
	<Button icon="plus" iconPosition="before" size="large" />,

	// iconPosition = before (Default) + backgroundOpacity - [GT-27526]
	// Step 3 - [GT-28180]
	<Button icon="plus" backgroundOpacity="transparent">click me</Button>,
	// End of Step 3 - [GT-28180]
	<Button backgroundOpacity="opaque">click me</Button>,

	// iconPosition = before (Default) + children has 1 letter +	minWidth = false
	<Button minWidth={false}>H</Button>,

	// iconPosition = before (Default) + color
	<Button color="red">click me</Button>,
	<Button color="green">click me</Button>,
	<Button color="yellow">click me</Button>,
	<Button color="blue">click me</Button>,
	// iconPosition = before (Default) + color + icon + iconPosition
	<Button color="red" icon="minus" iconPosition="before">click me</Button>,
	<Button color="green" icon="plus" iconPosition="after">click me</Button>,
	// iconPosition = before (Default) + color + icon + iconPosition + minWidth
	<Button color="yellow" icon="plus" iconPosition="before" minWidth={false}>click me</Button>,
	<Button color="blue" icon="minus" iconPosition="after" minWidth={false}>click me</Button>,

	// iconPosition = before (Default) + icon
	<Button icon="plus">click me</Button>,
	<Button icon="arrowlargeright">click me</Button>,
	<Button icon="info">click me</Button>,

	// Source Images Display - [GT-21155]
	<Button icon={buttonstate} />,

	// testing 'custom-icon' using unicode character
	<Button icon="💣" />,

	// Color Underbar displays on IconButton (LTR) - GT-22247
	// Step 3
	<Button color="red" icon="plus" />,
	// Step 4
	<Button color="green" icon="plus" />,
	// Step 5
	<Button color="yellow" icon="plus" />,
	// Step 6
	<Button color="blue" icon="plus" />,

	// Color Underbar displays with 'Disabled' IconButton - GT-22248
	<Button color="red" icon="plus" disabled />,

	// [GT-28183]
	<Button icon="repeatoff">click me</Button>,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-28181]
	{
		locale: 'ar-SA',
		component: <Button>click me</Button>
	},

	// iconPosition = before (Default) + small (default) + large
	// Leaving size small here as example but it is not required since it is the default.
	{
		locale: 'ar-SA',
		component: <Button size="small">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button size="large">click me</Button>
	},
	// Icon only - iconPosition = before (Default) + icon + iconPosition + small (default) + large
	{
		locale: 'ar-SA',
		component: <Button icon="minus" iconPosition="after" />
	},
	{
		locale: 'ar-SA',
		component: <Button icon="minus" iconPosition="after" size="large" />
	},
	{
		locale: 'ar-SA',
		component: <Button icon="plus" iconPosition="before" />
	},
	{
		locale: 'ar-SA',
		component: <Button icon="plus" iconPosition="before" size="large" />
	},
	// iconPosition = before (Default) + icon + iconPosition + small (default) + large
	{
		locale: 'ar-SA',
		component: <Button icon="minus" iconPosition="after">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button icon="minus" iconPosition="after" size="large">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button icon="plus" iconPosition="before">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button icon="plus" iconPosition="before" size="large">click me</Button>
	},
	// iconPosition = before (Default) + backgroundOpacity
	{
		locale: 'ar-SA',
		component: <Button backgroundOpacity="translucent">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button backgroundOpacity="lightTranslucent">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button backgroundOpacity="transparent">click me</Button>
	},
	// iconPosition = before (Default) + children has 1 letter +	minWidth = false
	{
		locale: 'ar-SA',
		component: <Button minWidth={false}>H</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button color="red">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button color="green">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button color="yellow">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button color="blue">click me</Button>
	},
	// iconPosition = before (Default) + color + icon + iconPosition
	{
		locale: 'ar-SA',
		component: <Button color="red" icon="minus" iconPosition="before">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button color="green" icon="plus" iconPosition="after">click me</Button>
	},
	// iconPosition = before (Default) + color + icon + iconPosition + minWidth
	{
		locale: 'ar-SA',
		component: <Button color="yellow" icon="plus" iconPosition="before" minWidth={false}>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button color="blue" icon="minus" iconPosition="after" minWidth={false}>click me</Button>
	},
	// iconPosition = before (Default) + icon
	{
		locale: 'ar-SA',
		component: <Button icon="plus">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button icon="arrowlargeright">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button icon="info">click me</Button>
	}
];
export default ButtonTests;
