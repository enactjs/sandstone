import Icon from '../../../../Icon';
import FormCheckboxItem from '../../../../FormCheckboxItem';

import {withConfig, withProps} from './utils';

const basicFormCheckboxItemTests = (prefix) => {
	const normalName = prefix + 'FormCheckboxItem';
	const checkedName = prefix + 'FormCheckboxItem Checked';
	return [
		<FormCheckboxItem>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem disabled>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem inline>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem disabled inline>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem selected>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem selected disabled>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem selected inline>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem selected disabled inline>{checkedName}</FormCheckboxItem>
	];
};

const slotBeforeFormCheckboxItemTests = (prefix) => {
	const normalName = prefix + 'FormCheckboxItem';
	const checkedName = prefix + 'FormCheckboxItem Checked';
	return [
		<FormCheckboxItem><Icon slot="slotBefore">home</Icon>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem disabled><Icon slot="slotBefore">home</Icon>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem inline><Icon slot="slotBefore">home</Icon>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem disabled inline><Icon slot="slotBefore">home</Icon>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem selected><Icon slot="slotBefore">home</Icon>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem disabled selected><Icon slot="slotBefore">home</Icon>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem selected inline><Icon slot="slotBefore">home</Icon>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem disabled selected inline><Icon slot="slotBefore">home</Icon>{checkedName}</FormCheckboxItem>,
		<FormCheckboxItem indeterminate><Icon slot="slotBefore">home</Icon>{normalName}</FormCheckboxItem>,
		<FormCheckboxItem disabled indeterminate><Icon slot="slotBefore">home</Icon>{normalName}</FormCheckboxItem>
	];
};

const FormCheckboxItemTests = [
	// Basic
	<FormCheckboxItem />,
	// [QWTC-2120] start
	...basicFormCheckboxItemTests(''),
	...withConfig({focus: true}, basicFormCheckboxItemTests('Focused ')),
	// [QWTC-2120] end
	...withProps({indeterminate: true}, basicFormCheckboxItemTests('')),
	<FormCheckboxItem indeterminate indeterminateIcon="lock">FormCheckboxItem</FormCheckboxItem>,

	// Icon slotBefore
	...slotBeforeFormCheckboxItemTests(''),
	...withConfig({focus: true}, slotBeforeFormCheckboxItemTests('Focused ')),

	// Centered
	<FormCheckboxItem centered>Hello FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</FormCheckboxItem>,
	...withConfig({
		locale: 'ar-SA'
	}, [
		<FormCheckboxItem centered>Hello FormCheckboxItem</FormCheckboxItem>,
		<FormCheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</FormCheckboxItem>
	]),

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem>FormCheckboxItem</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem disabled>FormCheckboxItem</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem inline>FormCheckboxItem</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem disabled inline>FormCheckboxItem</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected disabled>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected inline>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected disabled inline>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem disabled indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem inline indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem disabled inline indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected disabled indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected inline indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem selected disabled inline indeterminate>FormCheckboxItem Checked</FormCheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <FormCheckboxItem indeterminate indeterminateIcon="lock">FormCheckboxItem Checked</FormCheckboxItem>
	}
];
export default FormCheckboxItemTests;
