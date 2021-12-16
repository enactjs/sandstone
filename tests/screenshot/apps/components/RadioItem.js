import Icon from '../../../../Icon';
import RadioItem from '../../../../RadioItem';

import {withConfig} from './utils';

const RadioItemTests = [
	<RadioItem>RadioItem</RadioItem>,
	<RadioItem disabled>RadioItem</RadioItem>,
	<RadioItem inline>Inline RadioItem</RadioItem>,
	<RadioItem disabled inline>RadioItem Not Checked</RadioItem>,
	// [QWT-2799]
	<RadioItem disabled>مساء الخير</RadioItem>,
	// [QWT-2799]
	<RadioItem inline>مساء الخير</RadioItem>,
	// [QWT-2795]
	<RadioItem disabled>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [QWT-2795]
	<RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [QWT-2795]
	<RadioItem disabled>តន្ត្រី</RadioItem>,
	// [QWT-2795]
	<RadioItem inline>តន្ត្រី</RadioItem>,
	// [QWT-2795]
	<RadioItem inline>ฟิ้ ไั ஒ து</RadioItem>,
	// [QWT-2798]
	<RadioItem>ฟิ้ ไั ஒ து</RadioItem>,
	// [QWT-2798]
	<RadioItem selected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	// [QWT-2798]
	<RadioItem selected>តន្ត្រី</RadioItem>,
	// [QWT-2798]
	<RadioItem selected>ฟิ้ ไั ஒ து</RadioItem>,
	// Selected - disabled
	// [QWT-2807]
	<RadioItem selected disabled>RadioItem Checked</RadioItem>,
	// Selected - disabled - inline
	<RadioItem selected disabled inline>RadioItem Checked</RadioItem>,
	// Selected - inline
	// [QWT-2806]
	<RadioItem selected inline>RadioItem Checked</RadioItem>,
	<RadioItem selected>RadioItem Checked</RadioItem>,
	// Long text selected - LTR [QWT-2801]
	<RadioItem selected>-Lorem</RadioItem>,

	<RadioItem selected icon="arrowup">ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>,
	<RadioItem selected icon="arrowup">តន្ត្រី</RadioItem>,
	<RadioItem selected icon="arrowup">ฟิ้ ไั ஒ து</RadioItem>,
	// Selected - disabled
	<RadioItem selected disabled icon="arrowup">RadioItem Checked</RadioItem>,
	// Selected - disabled - inline
	<RadioItem selected disabled inline icon="arrowup">RadioItem Checked</RadioItem>,
	// Selected - inline
	<RadioItem selected inline icon="arrowup">RadioItem Checked</RadioItem>,
	<RadioItem selected icon="arrowup">RadioItem Checked</RadioItem>,
	// Long text selected - LTR
	<RadioItem selected icon="arrowup">-Lorem</RadioItem>,

	// Icon slotBefore
	<RadioItem><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem inline><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem selected><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,
	<RadioItem selected inline><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,

	// Focused
	...withConfig({focus: true}, [
		<RadioItem>Focused RadioItem</RadioItem>,
		<RadioItem disabled>Focused RadioItem</RadioItem>,
		<RadioItem inline>Focused Inline RadioItem</RadioItem>,
		<RadioItem disabled inline>Focused RadioItem Not Checked</RadioItem>,
		<RadioItem selected disabled>Focused RadioItem Checked</RadioItem>,
		// Selected - disabled - inline
		<RadioItem selected disabled inline>Focused RadioItem Checked</RadioItem>,
		<RadioItem selected inline>Focused RadioItem Checked</RadioItem>,
		<RadioItem selected>Focused RadioItem Checked</RadioItem>,
		<RadioItem selected disabled icon="arrowup">Focused RadioItem Checked</RadioItem>,
		<RadioItem selected disabled inline icon="arrowup">Focused RadioItem Checked</RadioItem>,
		<RadioItem selected inline icon="arrowup">Focused RadioItem Checked</RadioItem>,
		<RadioItem selected icon="arrowup">Focused RadioItem Checked</RadioItem>,
		// Icon slotBefore
		<RadioItem><Icon slot="slotBefore">home</Icon>Focused RadioItem</RadioItem>,
		<RadioItem inline><Icon slot="slotBefore">home</Icon>Focused RadioItem</RadioItem>,
		<RadioItem selected><Icon slot="slotBefore">home</Icon>Focused RadioItem Checked</RadioItem>,
		<RadioItem selected inline><Icon slot="slotBefore">home</Icon>Focused RadioItem Checked</RadioItem>
	]),

	// *************************************************************
	// locale = 'ar-SA'

	// RadioItem* is NOT selected - RTL [QWT-2796]
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
	// [QWT-2799]
	{
		locale: 'ar-SA',
		component: <RadioItem disabled>مساء الخير</RadioItem>
	},
	// [QWT-2799]
	{
		locale: 'ar-SA',
		component: <RadioItem inline>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	// [QWT-2799]
	{
		locale: 'ar-SA',
		component: <RadioItem inline>តន្ត្រី</RadioItem>
	},
	// [QWT-2798]
	{
		locale: 'ar-SA',
		component: <RadioItem>ฟิ้ ไั ஒ து</RadioItem>
	},
	// [QWT-2798]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	// [QWT-2798]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>តន្ត្រី</RadioItem>
	},
	// [QWT-2798]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>ฟิ้ ไั ஒ து</RadioItem>
	},
	// RadioItem* is selected - RTL [QWT-2796}
	{
		locale: 'ar-SA',
		component: <RadioItem selected>RadioItem Checked</RadioItem>
	},
	// Selected - disabled
	// [QWT-2807]
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled>RadioItem Checked</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled inline>RadioItem Checked</RadioItem>
	},
	// Selected - inline
	// [QWT-2806]
	{
		locale: 'ar-SA',
		component: <RadioItem selected inline>RadioItem Checked</RadioItem>
	},
	// Long text selected - LTR [QWT-2801]
	{
		locale: 'ar-SA',
		component: <RadioItem selected>-Lorem</RadioItem>
	},

	// custom icon RTL
	{
		locale: 'ar-SA',
		component: <RadioItem selected icon="arrowup">ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected icon="arrowup">តន្ត្រី</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected icon="arrowup">ฟิ้ ไั ஒ து</RadioItem>
	},
	// RadioItem* is selected
	{
		locale: 'ar-SA',
		component: <RadioItem selected icon="arrowup">RadioItem Checked</RadioItem>
	},
	// Selected - disabled
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled icon="arrowup">RadioItem Checked</RadioItem>
	},
	{
		locale: 'ar-SA',
		component: <RadioItem selected disabled inline icon="arrowup">RadioItem Checked</RadioItem>
	},
	// Selected - inline
	{
		locale: 'ar-SA',
		component: <RadioItem selected inline icon="arrowup">RadioItem Checked</RadioItem>
	},
	// Long text selected
	{
		locale: 'ar-SA',
		component: <RadioItem selected icon="arrowup">-Lorem</RadioItem>
	}
];
export default RadioItemTests;
