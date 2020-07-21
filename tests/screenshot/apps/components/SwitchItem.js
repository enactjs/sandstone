import Icon from '../../../../Icon';
import SwitchItem from '../../../../SwitchItem';
import React from 'react';

import {withConfig} from './utils';

const SwitchItemTests = [
	<SwitchItem />,

	// Icon slotAfter
	<SwitchItem>SwitchItem<Icon slot="slotAfter">home</Icon></SwitchItem>,

	// Centered
	<SwitchItem centered>Hello SwitchItem</SwitchItem>,
	<SwitchItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</SwitchItem>,
	...withConfig({
		locale: 'ar-SA'
	}, [
		<SwitchItem centered>Hello SwitchItem</SwitchItem>,
		<SwitchItem centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum metus.</SwitchItem>
	])
];
export default SwitchItemTests;
