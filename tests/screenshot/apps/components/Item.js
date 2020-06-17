import Item from '../../../../Item';
import Icon from '../../../../Icon';
import React from 'react';

import {withConfig} from './utils';

const ItemTests = [
	<Item>Hello Item</Item>,
	<Item disabled>Hello Item</Item>,
	<Item inline>Hello very very long Item</Item>,
	<Item disabled inline>Hello very very long Item</Item>,
	<Item>नरेंद्र मोदी</Item>,
	<Item> ฟิ้  ไั  ஒ  து</Item>,
	<Item>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Item>,
	<Item>صباح الخير</Item>,

	// Centered
	<Item centered>Hello Item</Item>,
	<Item centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</Item>,
	<Item slotBefore={<Icon>star</Icon>} slotAfter={<Icon>star</Icon>} centered>Hello Item</Item>,
	<Item slotBefore={<Icon>star</Icon>} slotAfter={<Icon>star</Icon>} centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</Item>,
	...withConfig({
		locale: 'ar-SA'
	}, [
		<Item centered>Hello Item</Item>,
		<Item slotBefore={<Icon>star</Icon>} slotAfter={<Icon>star</Icon>} centered>Hello Item</Item>
	]),

	// Small
	<Item size="small">Hello Item</Item>,
	<Item size="small" disabled>Hello Item</Item>,
	<Item size="small" inline>Hello very very long Item</Item>,
	<Item size="small" disabled inline>Hello very very long Item</Item>,
	<Item size="small">नरेंद्र मोदी</Item>,
	<Item size="small"> ฟิ้  ไั  ஒ  து</Item>,
	<Item size="small">ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Item>,
	<Item size="small">صباح الخير</Item>,

	// With tall characters and disabled [GT-28165]
	<Item disabled>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Item>,
	{
		textSize: 'large',
		component: <Item>Hello Item</Item>
	},
	{
		textSize: 'large',
		component: <Item inline>Hello very very long Item</Item>
	},
	{
		textSize: 'large',
		component: <Item disabled inline>Hello disabled very very long Item</Item>
	},
	// *************************************************************
	// locale = 'ar-SA'
	// Item Functionality RTL [GT-28162]
	{
		locale: 'ar-SA',
		component: <Item>Hello Item RTL</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item disabled>Hello Item RTL</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item inline>Hello very very long Item RTL</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item disabled inline>Hello very very long Item RTL</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item>नरेंद्र मोदी</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item> ฟิ้  ไั  ஒ  து</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item>صباح الخير</Item>
	},
	// With tall characters and disabled [GT-28165]
	{
		locale: 'ar-SA',
		component: <Item disabled>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Item>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Item>Hello Item RTL</Item>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Item inline>Hello very very long Item RTL</Item>
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Item disabled inline>Hello disabled very very long Item RTL</Item>
	}

];
export default ItemTests;
