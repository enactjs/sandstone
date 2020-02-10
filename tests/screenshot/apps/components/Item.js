import Item from '../../../../Item';
import React from 'react';

const ItemTests = [
	<Item>Hello Item</Item>,
	<Item disabled>Hello Item</Item>,
	<Item inline>Hello very very long Item</Item>,
	<Item disabled inline>Hello very very long Item</Item>,
	<Item>नरेंद्र मोदी</Item>,
	<Item> ฟิ้  ไั  ஒ  து</Item>,
	<Item>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Item>,
	<Item>صباح الخير</Item>,
	// With tall characters and disabled [GT-23418]
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
	// Item Functionality RTL [GT-21217]
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
	// With tall characters and disabled [GT-23418]
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
