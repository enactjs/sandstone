import Icon from '../../../../Icon';
import SwitchItem from '../../../../SwitchItem';

import {withConfig} from './utils';

const SwitchItemTests = [
	<SwitchItem />,
	<SwitchItem>Hello SwitchItem</SwitchItem>,
	<SwitchItem selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline selected>Hello SwitchItem</SwitchItem>,

	// Icon slotAfter
	<SwitchItem>SwitchItem<Icon slot="slotAfter">home</Icon></SwitchItem>,

	// Centered
	<SwitchItem centered>Hello SwitchItem</SwitchItem>,
	<SwitchItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</SwitchItem>,

	...withConfig({
		locale: 'ar-SA'
	}, [
		<SwitchItem />,
		<SwitchItem>Hello SwitchItem</SwitchItem>,
		<SwitchItem selected>Hello SwitchItem</SwitchItem>,
		<SwitchItem disabled>Hello SwitchItem</SwitchItem>,
		<SwitchItem disabled selected>Hello SwitchItem</SwitchItem>,
		<SwitchItem inline>Hello SwitchItem</SwitchItem>,
		<SwitchItem inline selected>Hello SwitchItem</SwitchItem>,
		<SwitchItem>SwitchItem<Icon slot="slotAfter">home</Icon></SwitchItem>,
		<SwitchItem centered>Hello SwitchItem</SwitchItem>,
		<SwitchItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</SwitchItem>
	]),

	...withConfig({
		focus: true
	}, [
		// [QWTC-2130]
		<SwitchItem>Focused SwitchItem</SwitchItem>,
		<SwitchItem selected>Focused SwitchItem</SwitchItem>,
		<SwitchItem disabled>Focused SwitchItem</SwitchItem>,
		// [QWTC-2130]
		<SwitchItem disabled selected>Focused SwitchItem</SwitchItem>,
		<SwitchItem inline>Focused SwitchItem</SwitchItem>,
		<SwitchItem inline selected>Focused SwitchItem</SwitchItem>,

		// Icon slotAfter
		<SwitchItem>Focused SwitchItem<Icon slot="slotAfter">home</Icon></SwitchItem>,

		// Centered
		<SwitchItem centered>Focused Hello SwitchItem</SwitchItem>,
		<SwitchItem centered>Focused Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</SwitchItem>
	])
];

export default SwitchItemTests;
