import CheckboxItem from '../../../../CheckboxItem';
import Icon from '../../../../Icon';
import React from 'react';

import {withConfig} from './utils';

const CheckboxItemTests = [
	<CheckboxItem />,
	<CheckboxItem>CheckboxItem</CheckboxItem>, 					// not selected
	<CheckboxItem disabled>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem inline>CheckboxItem</CheckboxItem>,		// not selected
	<CheckboxItem disabled inline>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem selected>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected disabled>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected inline>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected disabled inline>CheckboxItem Checked</CheckboxItem>,

	<CheckboxItem indeterminate>CheckboxItem</CheckboxItem>, 			// not selected
	<CheckboxItem disabled indeterminate>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem inline indeterminate>CheckboxItem</CheckboxItem>,		// not selected
	<CheckboxItem disabled inline indeterminate>CheckboxItem</CheckboxItem>, // not selected
	<CheckboxItem selected indeterminate>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected disabled indeterminate>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected inline indeterminate>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected disabled inline indeterminate>CheckboxItem</CheckboxItem>,
	<CheckboxItem indeterminate indeterminateIcon="lock">CheckboxItem</CheckboxItem>, 	// not selected

	// Icon slotBefore
	<CheckboxItem><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem inline><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected><Icon slot="slotBefore">home</Icon>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected inline><Icon slot="slotBefore">home</Icon>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem indeterminate><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,

	// Centered
	<CheckboxItem centered>Hello CheckboxItem</CheckboxItem>,
	<CheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>,
	...withConfig({
		locale: 'ar-SA'
	}, [
		<CheckboxItem centered>Hello CheckboxItem</CheckboxItem>,
		<CheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>
	]),


	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <CheckboxItem>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected disabled>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected inline>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected disabled inline>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem inline indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled inline indeterminate>CheckboxItem Checked</CheckboxItem>
	},

	{
		locale: 'ar-SA',
		component: <CheckboxItem selected indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected disabled indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected inline indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected disabled inline indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem indeterminate indeterminateIcon="lock">CheckboxItem Checked</CheckboxItem>
	}
];
export default CheckboxItemTests;
