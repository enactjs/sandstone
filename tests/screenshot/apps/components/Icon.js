import Icon from '../../../../Icon';
import React from 'react';

import buttonstate from '../../images/button-state.svg';

const IconTests = [
	<Icon>minus</Icon>,
	<Icon>💣</Icon>,  // testing 'custom-icon' using unicode character
	<Icon size="large">💣</Icon>,
	<Icon>{buttonstate}</Icon>,
	<Icon size="large">{buttonstate}</Icon>,
	<Icon flip="vertical">question</Icon>,
	<Icon flip="horizontal">question</Icon>,
	<Icon flip="both">repeat</Icon>,
	<Icon flip="both" size="large">repeat</Icon>,
	<Icon size="large">plus</Icon>,
	{
		textSize: 'large',
		component: <Icon>plus</Icon>
	},
	{
		textSize: 'large',
		component: <Icon size="large">plus</Icon>
	},
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-21212 - Icon Functionality RTL
	{
		locale: 'ar-SA',
		component: <Icon>minus</Icon>
	},

	{
		locale: 'ar-SA',
		component: <Icon>💣</Icon>  // testing 'custom-icon' using unicode character
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
		component: <Icon size="large">{buttonstate}</Icon>
	},

	{
		locale: 'ar-SA',
		component: <Icon flip="vertical">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both">repeat</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="large">repeat</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon size="large">plus</Icon>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Icon>plus</Icon>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Icon size="large">plus</Icon>
	}
];
export default IconTests;
