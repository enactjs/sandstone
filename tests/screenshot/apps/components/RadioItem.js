import Icon from '../../../../Icon';
import RadioItem from '../../../../RadioItem';
import React from 'react';

const RadioItemTests = [
	<RadioItem>RadioItem</RadioItem>,
	<RadioItem disabled>RadioItem</RadioItem>,
	<RadioItem inline>Inline RadioItem</RadioItem>,
	<RadioItem disabled inline>RadioItem Not Checked</RadioItem>,
	// [GT-28206]
	<RadioItem disabled>مساء الخير</RadioItem>,
	// [GT-28206]
	<RadioItem inline>مساء الخير</RadioItem>,
	// [GT-28210]
	<RadioItem disabled>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [GT-28210]
	<RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [GT-28210]
	<RadioItem disabled>តន្ត្</RadioItem>,
	// [GT-28210]
	<RadioItem inline>តន្ត្</RadioItem>,
	// [GT-28210]
	<RadioItem inline>ฟิ้  ไั  ஒ  து</RadioItem>,
	// [GT-28207]
	<RadioItem>ฟิ้  ไั  ஒ  து</RadioItem>,
	// [GT-28207]
	<RadioItem selected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [GT-28207]
	<RadioItem selected>តន្ត្</RadioItem>,
	// [GT-28207]
	<RadioItem selected>ฟิ้  ไั  ஒ  து</RadioItem>,
	// Selected - disabled
	// [GT-28198]
	<RadioItem selected disabled>RadioItem Checked</RadioItem>,
	// Selected - disabled - inline
	<RadioItem selected disabled inline>RadioItem Checked</RadioItem>,
	// Selected - inline
	// [GT-28199]
	<RadioItem selected inline>RadioItem Checked</RadioItem>,
	<RadioItem selected>RadioItem Checked</RadioItem>,
	// Long text selected - LTR [GT-28204]
	<RadioItem selected>-Lorem</RadioItem>,

	// Icon slotBefore
	<RadioItem><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem inline><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem selected><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,
	<RadioItem selected inline><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,
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
	// [GT-28206]
	{
		locale: 'ar-SA',
		component: <RadioItem disabled>مساء الخير</RadioItem>
	},
	// [GT-28206]
	{
		locale: 'ar-SA',
		component: <RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	// [GT-28206]
	{
		locale: 'ar-SA',
		component: <RadioItem inline>តន្ត្</RadioItem>
	},
	// [GT-28207]
	{
		locale: 'ar-SA',
		component: <RadioItem>ฟิ้  ไั  ஒ  து</RadioItem>
	},
	// [GT-28207]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	// [GT-28207]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>តន្ត្</RadioItem>
	},
	// [GT-28207]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>ฟิ้  ไั  ஒ  து</RadioItem>
	},
	// RadioItem* is selected - RTL [GT-21221}
	{
		locale: 'ar-SA',
		component: <RadioItem selected>RadioItem Checked</RadioItem>
	},
	// Selected - disabled
	// [GT-28198]
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled>RadioItem Checked</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled inline>RadioItem Checked</RadioItem>
	},
	// Selected - inline
	// [GT-28199]
	{
		locale: 'ar-SA',
		component: <RadioItem selected inline>RadioItem Checked</RadioItem>
	},
	// Long text selected - LTR [GT-28204]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>-Lorem</RadioItem>
	}
];
export default RadioItemTests;
