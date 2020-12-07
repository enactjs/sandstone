import BodyText from '../../../../BodyText';
import React from 'react';

import {withConfig, LoremString} from './utils';

const commonTests = [
	<BodyText>This is some text</BodyText>, // [GT-28439]
	<BodyText size="small">This is some text small</BodyText>, // [GT-28440]
	<BodyText centered>This is some text</BodyText>, // [GT-28438]
	<BodyText centered>{LoremString}</BodyText>,
	<BodyText centered size="small">This is some text</BodyText> // [GT-28443]
];

const BodyTextTests = [
	...commonTests,

	// Tallglyph validation
	...withConfig({
		locale: 'vi-VN'
	}, [
		<BodyText>RTL sample</BodyText>,  // [GT-28439]
		<BodyText size="small">RTL sample small</BodyText>  // [GT-28440]
	]),

	// RTL
	...withConfig({
		locale: 'ar-SA'
	}, [
		...commonTests
	])
];

export default BodyTextTests;
