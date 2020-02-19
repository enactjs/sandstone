import Icon from '../../../../Icon';
import React from 'react';

import buttonstate from '../../images/button-state.svg';

const IconTests = [
	<Icon>minus</Icon>, // default `size` prop is "small"
	<Icon size="tiny">minus</Icon>,
	<Icon size="medium">minus</Icon>,
	<Icon size="large">minus</Icon>,
	<Icon>💣</Icon>,  // testing 'custom-icon' using unicode character
	<Icon size="tiny">💣</Icon>,
	<Icon size="medium">💣</Icon>,
	<Icon size="large">💣</Icon>,
	<Icon>{buttonstate}</Icon>,
	<Icon size="tiny">{buttonstate}</Icon>,
	<Icon size="medium">{buttonstate}</Icon>,
	<Icon size="large">{buttonstate}</Icon>,
	<Icon flip="vertical">question</Icon>,
	<Icon flip="vertical" size="tiny">question</Icon>,
	<Icon flip="vertical" size="medium">question</Icon>,
	<Icon flip="vertical" size="large">question</Icon>,
	<Icon flip="horizontal">question</Icon>,
	<Icon flip="horizontal" size="tiny">question</Icon>,
	<Icon flip="horizontal" size="medium">question</Icon>,
	<Icon flip="horizontal" size="large">question</Icon>,
	<Icon flip="both">repeat</Icon>,
	<Icon flip="both" size="tiny">repeat</Icon>,
	<Icon flip="both" size="medium">repeat</Icon>,
	<Icon flip="both" size="large">repeat</Icon>,
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
	// [GT-21212 - Icon Functionality RTL
	{
		locale: 'ar-SA',
		component: <Icon>minus</Icon>
	},

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
		component: <Icon flip="vertical">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="vertical" size="tiny">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="vertical" size="medium">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="vertical" size="large">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal" size="tiny">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal" size="medium">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="horizontal" size="large">question</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both">repeat</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="tiny">repeat</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="medium">repeat</Icon>
	},
	{
		locale: 'ar-SA',
		component: <Icon flip="both" size="large">repeat</Icon>
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
