import CheckboxItem from '../../../../CheckboxItem';
import Icon from '../../../../Icon';

import {withConfig} from './utils';

const CheckboxItemTests = [
	<CheckboxItem />,
	<CheckboxItem>CheckboxItem</CheckboxItem>, 					// not selected
	<CheckboxItem label="label">CheckboxItem</CheckboxItem>,
	<CheckboxItem disabled>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem inline>CheckboxItem</CheckboxItem>,		// not selected
	<CheckboxItem inline label="label">CheckboxItem</CheckboxItem>,		// not selected
	<CheckboxItem disabled inline>CheckboxItem</CheckboxItem>,	// not selected
	// [QWTC-1861]
	<CheckboxItem selected>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected label="label">CheckboxItem Checked</CheckboxItem>,
	// [QWTC-1861]
	<CheckboxItem selected disabled>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected disabled label="label">CheckboxItem Checked</CheckboxItem>,
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

	// Custom icon
	<CheckboxItem icon="star" selected>Custom icon CheckboxItem</CheckboxItem>,
	<CheckboxItem icon="star" selected inline>Custom icon CheckboxItem</CheckboxItem>,

	// Icon slotBefore
	<CheckboxItem><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem label="label"><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem inline><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem inline label="label"><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected><Icon slot="slotBefore">home</Icon>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected inline><Icon slot="slotBefore">home</Icon>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem indeterminate><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,

	// Centered
	<CheckboxItem centered>Hello CheckboxItem</CheckboxItem>,
	<CheckboxItem centered label="label">Hello CheckboxItem</CheckboxItem>,
	<CheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>,
	<CheckboxItem centered label="Really looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong label to test centered CheckboxItem with label">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>,
	...withConfig({
		locale: 'ar-SA'
	}, [
		<CheckboxItem centered>Hello CheckboxItem</CheckboxItem>,
		<CheckboxItem centered label="label">Hello CheckboxItem</CheckboxItem>,
		<CheckboxItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>,
		<CheckboxItem centered label="Really looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong label to test centered CheckboxItem with label on RTL locale">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</CheckboxItem>
	]),

	// Label positions
	<CheckboxItem label="label" labelPosition="above">CheckboxItem</CheckboxItem>,
	<CheckboxItem label="label" labelPosition="below">CheckboxItem</CheckboxItem>,
	<CheckboxItem label="label" labelPosition="before">CheckboxItem</CheckboxItem>,
	<CheckboxItem label="label" labelPosition="after">CheckboxItem</CheckboxItem>,
	<CheckboxItem inline label="label" labelPosition="above">Inline CheckboxItem</CheckboxItem>,
	<CheckboxItem inline label="label" labelPosition="below">CheckboxItem</CheckboxItem>,
	<CheckboxItem inline label="label" labelPosition="before">CheckboxItem</CheckboxItem>,
	<CheckboxItem inline label="label" labelPosition="after">CheckboxItem</CheckboxItem>,

	// Focused
	...withConfig({focus: true}, [
		<CheckboxItem>Hello Focused CheckboxItem</CheckboxItem>,
		<CheckboxItem selected>Hello Focused CheckboxItem</CheckboxItem>,
		// [QWTC-1861]
		<CheckboxItem selected disabled>Hello Focused CheckboxItem</CheckboxItem>,
		<CheckboxItem inline>Hello Focused CheckboxItem</CheckboxItem>,
		<CheckboxItem inline selected>Hello Focused CheckboxItem</CheckboxItem>,
		<CheckboxItem label="label"><Icon slot="slotBefore">home</Icon>Hello Focused CheckboxItem</CheckboxItem>,
		<CheckboxItem inline label="label"><Icon slot="slotBefore">home</Icon>Hello Focused Inline CheckboxItem</CheckboxItem>,
		<CheckboxItem indeterminat>Hello Focused CheckboxItem</CheckboxItem>,
		<CheckboxItem inline indeterminat>Hello Focused CheckboxItem</CheckboxItem>
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
