import LabeledItem from '../../../../LabeledItem';
import React from 'react';

const LabeledItemTests = [
	<LabeledItem>Labeled Item</LabeledItem>,
	<LabeledItem disabled>Disabled</LabeledItem>,
	// ENYO-6076 - letter lower case 'g' - bottom is not cut off
	<LabeledItem label="Label Ggg">Content</LabeledItem>,
	<LabeledItem titleIcon="star">Item</LabeledItem>,
	<LabeledItem label="icon label" titleIcon="question">With icon</LabeledItem>,
	<LabeledItem disabled label="icon label" titleIcon="warning">Disabled with icon</LabeledItem>,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <LabeledItem>Labeled Item</LabeledItem>
	},
	{
		locale: 'ar-SA',
		component: <LabeledItem disabled>Disabled</LabeledItem>
	},
	// ENYO-6076 - letter lower case 'g' - bottom is not cut off
	// LabeledItem Functionality (RTL) [GT-21218]
	{
		locale: 'ar-SA',
		component: <LabeledItem label="Label Ggg">Content</LabeledItem>
	},
	{
		locale: 'ar-SA',
		component: <LabeledItem titleIcon="star">Item</LabeledItem>
	},
	{
		locale: 'ar-SA',
		component: <LabeledItem label="icon label" titleIcon="question">With icon</LabeledItem>
	},
	{
		locale: 'ar-SA',
		component: <LabeledItem disabled label="icon label" titleIcon="warning">Disabled with icon</LabeledItem>
	}
];

export default LabeledItemTests;
