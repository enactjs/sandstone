import Button from '../../../../Button';
import React from 'react';

const ButtonTests = [
	<Button>click me</Button>,
	<Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	{
		textSize: 'large',
		component: <Button>click me</Button>
	},
	<Button disabled>click me</Button>,

	// [GT-28736] - Color Underbar displays Icon with 'minWidth' and with 'Disabled'
	<Button color="red" icon="minus" iconPosition="after" minWidth={false} disabled />,
	// [GT-28737] - Change 'disabled' dynamically - Icon is slightly visible with focus / Spotlight
	<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} disabled />,

	<Button color="red" disabled>plus</Button>,

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

	// iconPosition = before (Default) + backgroundOpacity
	<Button icon="plus" backgroundOpacity="transparent">click me</Button>,
	<Button backgroundOpacity="opaque">click me</Button>,

	// Selected buttons
	<Button selected>click me</Button>,
	<Button selected icon="plus" />,
	<Button selected backgroundOpacity="transparent">click me</Button>, 	// [GT-28180]
	<Button selected backgroundOpacity="transparent" icon="plus" />, // Default for icon-only buttons
	<Button selected backgroundOpacity="opaque">click me</Button>, // Default for text button

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

	// [GT-28738] - Color Underbar displays on Button (LTR)
	<Button color="red" icon="plus" iconPosition="before" minWidth={false} />,
	<Button color="green" icon="plus" iconPosition="after" minWidth={false} />,
	<Button color="yellow" icon="plus" iconPosition="after" minWidth={false} />,
	<Button color="blue" icon="plus" iconPosition="after" minWidth={false} />,

	// [GT-28740] - Color Underbar displays on Small / Large size in Selected state
	<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="large" />,
	<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="small" />,

	// iconPosition = before (Default) + icon
	<Button icon="plus">click me</Button>,
	<Button icon="arrowlargeright">click me</Button>,
	<Button icon="info">click me</Button>,

	// [GT-28183]
	<Button icon="rotate">click me</Button>,
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
		component: <Button icon="plus" backgroundOpacity="transparent">click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button backgroundOpacity="opaque">click me</Button>
	},
	// Selected buttons
	{
		locale: 'ar-SA',
		component: <Button selected>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button selected icon="plus" />
	},
	{
		locale: 'ar-SA',
		component: <Button selected backgroundOpacity="transparent">click me</Button> 	// [GT-28180]
	},
	{
		locale: 'ar-SA',
		component: <Button selected backgroundOpacity="transparent" icon="plus" /> // Default for icon-only buttons
	},
	{
		locale: 'ar-SA',
		component: <Button selected backgroundOpacity="opaque">click me</Button> // Default for text button
	},

	// iconPosition = before (Default) + children has 1 letter +	minWidth = false
	{
		locale: 'ar-SA',
		component: <Button minWidth={false}>H</Button>
	},
	// iconPosition = before (Default) + color
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
	// [GT-28739] - Color Underbar displays on Button (RTL)
	{
		locale: 'ar-SA',
		component: <Button color="red" icon="plus" iconPosition="before" minWidth={false} />
	},
	{
		locale: 'ar-SA',
		component: <Button color="green" icon="plus" iconPosition="after" minWidth={false} />
	},
	{
		locale: 'ar-SA',
		component: <Button color="yellow" icon="plus" iconPosition="after" minWidth={false} />
	},
	{
		locale: 'ar-SA',
		component: <Button color="blue" icon="plus" iconPosition="after" minWidth={false} />
	},

	// [GT-28740] - Color Underbar displays on Small / Large size in Selected state
	{
		locale: 'ar-SA',
		component: <Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="large" />
	},
	{
		locale: 'ar-SA',
		component: <Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="small" />
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
