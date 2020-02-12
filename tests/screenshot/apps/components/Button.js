import Button from '../../../../Button';
import React from 'react';

const ButtonTests = [
	<Button>click me</Button>,
	<Button selected>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	<Button>Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	{
		textSize: 'large',
		component: <Button>click me</Button>
	},
	// iconPosition = before (Default) + disabled + minWidth + selected
	<Button disabled>click me</Button>,
	<Button disabled minWidth selected>click me</Button>,  // minWidth: true is default
	<Button disabled minWidth={false} selected>click me</Button>,
	<Button disabled minWidth={false} selected={false}>click me</Button>,
	<Button disabled={false} minWidth selected>click me</Button>,
	<Button disabled={false} minWidth selected={false}>click me</Button>,
	<Button disabled={false} minWidth={false} selected={false}>click me</Button>,
	// iconPosition = before (Default) + small (default) + large
	// Leaving size small here as example but it is not required since it is the default.
	<Button size="small">click me</Button>,
	<Button size="large">click me</Button>,
	// iconPosition = before (Default) + icon + iconPosition + small (default) + large
	<Button icon="minus" iconPosition="after">click me</Button>,
	<Button icon="minus" iconPosition="after" size="large">click me</Button>,
	<Button icon="plus" iconPosition="before">click me</Button>,
	<Button icon="plus" iconPosition="before" size="large">click me</Button>,
	// iconPosition = before (Default) + backgroundOpacity
	<Button backgroundOpacity="translucent">click me</Button>,
	<Button backgroundOpacity="lightTranslucent">click me</Button>,
	<Button backgroundOpacity="transparent">click me</Button>,
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
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <Button>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button selected>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button>Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
	},
	// iconPosition = before (Default) + disabled + minWidth + selected
	{
		locale: 'ar-SA',
		component: <Button disabled>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button disabled minWidth selected>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button disabled minWidth={false} selected>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button disabled minWidth={false} selected={false}>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button disabled={false} minWidth selected>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button disabled={false} minWidth selected={false}>click me</Button>
	},
	{
		locale: 'ar-SA',
		component: <Button disabled={false} minWidth={false} selected={false}>click me</Button>
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
