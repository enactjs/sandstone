import RadioItem from '../../../../RadioItem';
import React from 'react';

const RadioItemTests = [
	<RadioItem>RadioItem</RadioItem>,
	<RadioItem disabled>RadioItem</RadioItem>,
	<RadioItem inline>Inline RadioItem</RadioItem>,
	<RadioItem disabled inline>RadioItem Not Checked</RadioItem>,
	// [GT-21620]
	<RadioItem disabled>مساء الخير</RadioItem>,
	// [GT-21620]
	<RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [GT-22259]
	<RadioItem>ฟิ้  ไั  ஒ  து</RadioItem>,
	// [GT-22259]
	<RadioItem defaultSelected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [GT-22259]
	<RadioItem defaultSelected>ฟิ้  ไั  ஒ  து</RadioItem>,
	// Selected - disabled
	// [GT-22104]
	<RadioItem defaultSelected disabled>RadioItem Checked</RadioItem>,
	// Selected - disabled - inline
	<RadioItem defaultSelected disabled inline>RadioItem Checked</RadioItem>,
	// Selected - inline
	// [GT-21615]
	<RadioItem defaultSelected inline>RadioItem Checked</RadioItem>,
	<RadioItem defaultSelected>RadioItem Checked</RadioItem>,
	// Long text selected - LTR [GT-21139]
	<RadioItem defaultSelected>-Lorem</RadioItem>,
	// *************************************************************
	// locale = 'ar-SA'

	// RadioItem* is NOT selected - RTL [GT-21221]
	{
		locale: 'ar-SA',
		component: <RadioItem>RadioItem</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem disabled>RadioItem</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem inline>Inline RadioItem</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem disabled inline>RadioItem Not Checked</RadioItem>
	},
	// [GT-21620]
	{
		locale: 'ar-SA',
		component: <RadioItem disabled>مساء الخير</RadioItem>
	},
	// [GT-21620]
	{
		locale: 'ar-SA',
		component: <RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	// [GT-22259]
	{
		locale: 'ar-SA',
		component: <RadioItem>ฟิ้  ไั  ஒ  து</RadioItem>
	},
	// [GT-22259]
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	// [GT-22259]
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected>ฟิ้  ไั  ஒ  து</RadioItem>
	},
	// RadioItem* is selected - RTL [GT-21221}
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected>RadioItem Checked</RadioItem>
	},
	// Selected - disabled
	// [GT-22104]
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected disabled>RadioItem Checked</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected disabled inline>RadioItem Checked</RadioItem>
	},
	// Selected - inline
	// [GT-21615]
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected inline>RadioItem Checked</RadioItem>
	},
	// Long text selected - LTR [GT-21139]
	{
		locale: 'ar-SA',
		component: <RadioItem defaultSelected>-Lorem</RadioItem>
	}
];
export default RadioItemTests;
