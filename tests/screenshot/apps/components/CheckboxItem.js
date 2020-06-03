import CheckboxItem from '../../../../CheckboxItem';
// import Icon from '../../../../Icon';
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

	// Centered
	<CheckboxItem centered>Hello CheckboxItem</CheckboxItem>,
	<CheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>,
	...withConfig({
		locale: 'ar-SA'
	}, [
		<CheckboxItem centered>Hello CheckboxItem</CheckboxItem>,
		<CheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>
	]),

	// Removed until itemIcon, itemIconPosition, and iconPosition support is resolved
	// // itemIcon
	// <CheckboxItem itemIcon={<Icon>bulletlist</Icon>}>CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + itemIconPosition = 'before'
	// <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + itemIconPosition = 'beforeChildren'
	// <CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + itemIconPosition = 'after'
	// <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + inline = true
	// <CheckboxItem itemIcon={<Icon>list</Icon>} inline>CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + itemIconPosition = 'before' + inline = true
	// <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + itemIconPosition = 'beforeChildren' + inline = true
	// <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>,
	// // iconPosition = before (Default) + itemIcon + itemIconPosition = 'after' + inline = true
	// <CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>,
	// // iconPosition = 'after'
	// <CheckboxItem iconPosition="after">CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" disabled>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" inline>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" disabled inline>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" defaultSelected>CheckboxItem Checked</CheckboxItem>,
	// <CheckboxItem iconPosition="after" defaultSelected disabled>CheckboxItem Checked</CheckboxItem>,
	// <CheckboxItem iconPosition="after" defaultSelected inline>CheckboxItem Checked</CheckboxItem>,
	// <CheckboxItem iconPosition="after" defaultSelected disabled inline>CheckboxItem Checked</CheckboxItem>,
	// // itemPosition = 'after' + itemIcon
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>}>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} inline>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>,
	// <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>,
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
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>bulletlist</Icon>}>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>list</Icon>} inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" disabled>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" disabled inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" defaultSelected>CheckboxItem Checked</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" defaultSelected disabled>CheckboxItem Checked</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" defaultSelected inline>CheckboxItem Checked</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" defaultSelected disabled inline>CheckboxItem Checked</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>}>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>
	// },
	// {
	// 	locale: 'ar-SA',
	// 	component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>
	// }
];
export default CheckboxItemTests;
