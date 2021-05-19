import Icon from '../../../../Icon';
import FormCheckboxItem from '../../../../FormCheckboxItem';

import {withConfig, withProps} from './utils';

const slotBeforeFormCheckboxItemTests = [
	<FormCheckboxItem><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem disabled><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem inline><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem disabled inline><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem selected><Icon slot="slotBefore">home</Icon>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem disabled selected><Icon slot="slotBefore">home</Icon>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem selected inline><Icon slot="slotBefore">home</Icon>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem disabled selected inline><Icon slot="slotBefore">home</Icon>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem indeterminate><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem disabled indeterminate><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem disabled indeterminate inline><Icon slot="slotBefore">home</Icon>FormCheckboxItem</FormCheckboxItem>
];

const defaultFormCheckboxItemTests = [
	<FormCheckboxItem />,
	<FormCheckboxItem>FormCheckboxItem</FormCheckboxItem>, 					// not selected
	<FormCheckboxItem disabled>FormCheckboxItem</FormCheckboxItem>,	// not selected
	<FormCheckboxItem inline>FormCheckboxItem</FormCheckboxItem>,		// not selected
	<FormCheckboxItem disabled inline>FormCheckboxItem</FormCheckboxItem>,	// not selected
	<FormCheckboxItem selected>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem selected disabled>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem selected inline>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem selected disabled inline>FormCheckboxItem Checked</FormCheckboxItem>,
	<FormCheckboxItem indeterminate>FormCheckboxItem</FormCheckboxItem>, 					// not selected
	<FormCheckboxItem disabled indeterminate>FormCheckboxItem</FormCheckboxItem>,	// not selected
	<FormCheckboxItem inline indeterminate>FormCheckboxItem</FormCheckboxItem>,		// not selected
	<FormCheckboxItem disabled inline indeterminate>FormCheckboxItem</FormCheckboxItem>, // not selected
	<FormCheckboxItem selected indeterminate>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem selected disabled indeterminate>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem selected inline indeterminate>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem selected disabled inline indeterminate>FormCheckboxItem</FormCheckboxItem>,
	<FormCheckboxItem indeterminate indeterminateIcon="lock">FormCheckboxItem</FormCheckboxItem> 					// not selected
];

const FormCheckboxItemTests = [

	// Default tests
	...defaultFormCheckboxItemTests,
	// Icon slotBefore
	...slotBeforeFormCheckboxItemTests,
	...withConfig({focus: true}, slotBeforeFormCheckboxItemTests),
	// With Label
	...withProps({label: "This is a label"}, defaultFormCheckboxItemTests),
	...withProps({label: "This is a label", labelPosition: 'above'}, defaultFormCheckboxItemTests),
	...withProps({label: "This is a label", labelPosition: 'after'}, defaultFormCheckboxItemTests),
	...withProps({label: "This is a label", labelPosition: 'before'}, defaultFormCheckboxItemTests),

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
