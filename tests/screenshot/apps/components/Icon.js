import Icon from '../../../../Icon';
import React from 'react';

import buttonstate from '../../images/button-state.svg';

const IconTests = [
	<Icon>minus</Icon>, // default `size` prop is "small"
	<Icon size="tiny">minus</Icon>,
	<Icon size="medium">minus</Icon>,
	<Icon size="large">minus</Icon>,
	<Icon size={120}>minus</Icon>,
	<Icon>💣</Icon>, // [GT-28730] testing 'custom-icon' using unicode character
	<Icon size="tiny">💣</Icon>,
	<Icon size="medium">💣</Icon>,
	<Icon size="large">💣</Icon>,
	<Icon size={120}>💣</Icon>,
	<Icon>{buttonstate}</Icon>,  // [GT-28730]
	<Icon size="tiny">{buttonstate}</Icon>,
	<Icon size="medium">{buttonstate}</Icon>,
	<Icon size="large">{buttonstate}</Icon>,
	<Icon flip="vertical">transponder</Icon>,
	<Icon flip="vertical" size="tiny">transponder</Icon>,
	<Icon flip="vertical" size="medium">transponder</Icon>,
	<Icon flip="vertical" size="large">transponder</Icon>,
	<Icon flip="horizontal">transponder</Icon>,
	<Icon flip="horizontal" size="tiny">transponder</Icon>,
	<Icon flip="horizontal" size="medium">transponder</Icon>,
	<Icon flip="horizontal" size="large">transponder</Icon>,
	<Icon flip="both">rotate</Icon>,
	<Icon flip="both" size="tiny">rotate</Icon>,
	<Icon flip="both" size="medium">rotate</Icon>,
	<Icon flip="both" size="large">rotate</Icon>,
	{
		textSize: 'large',
		component: <Icon>plus</Icon>
	},
	{
		textSize: 'large',
		component: <Icon size="tiny">plus</Icon>
	},
	{
		textSize: 'large',
		component: <Icon size="medium">plus</Icon>
	},
	{
		textSize: 'large',
		component: <Icon size="large">plus</Icon>
	},
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-28211] - Icon Functionality RTL
	{
		locale: 'ar-SA',
		component: <Icon>minus</Icon>
	},
	// end of [GT-28211]
	{
		locale: 'ar-SA',
		component: <Icon size="tiny">minus</Icon>
	},

	{
		locale: 'ar-SA',
		component: <Icon size="medium">minus</Icon>
	},

	{
		locale: 'ar-SA',
		component: <Icon size="large">minus</Icon>
	},

	{
		locale: 'ar-SA',
		component: <Icon>💣</Icon>  // testing 'custom-icon' using unicode character
	},
	{
		locale: 'ar-SA',
		component: <Icon size="tiny">💣</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon size="medium">💣</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon size="large">💣</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon>{buttonstate}</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon size="tiny">{buttonstate}</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon size="medium">{buttonstate}</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon size="large">{buttonstate}</Icon>
	},

	{
		locale: 'ar-SA',
		component: <Icon flip="vertical">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="vertical" size="tiny">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="vertical" size="medium">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="vertical" size="large">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal" size="tiny">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal" size="medium">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal" size="large">transponder</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both">rotate</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="tiny">rotate</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="medium">rotate</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="large">rotate</Icon>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Icon>plus</Icon>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Icon size="tiny">plus</Icon>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Icon size="medium">plus</Icon>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Icon size="large">plus</Icon>
	}
];
export default IconTests;
