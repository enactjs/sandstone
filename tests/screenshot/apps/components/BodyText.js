import BodyText from '../../../../BodyText';

import {withConfig, LoremString} from './utils';

const commonTests = [
	<BodyText>This is some text</BodyText>, // [QWTC - 2022]
	<BodyText size="small">This is some text small</BodyText>, // [QWTC - 2023]
	<BodyText centered>This is some text</BodyText>, // [QWTC - 2021]
	<BodyText centered>{LoremString}</BodyText>,
	<BodyText centered size="small">This is some text</BodyText>, // [QWTC - 2026]
	<BodyText noWrap size="small">{LoremString}</BodyText>,
	<BodyText noWrap>{LoremString}</BodyText>
];

const BodyTextTests = [
	...commonTests,

	// Tallglyph validation
	...withConfig({
		locale: 'vi-VN'
	}, [
		<BodyText>RTL sample</BodyText>,  // [QWTC - 2022]
		<BodyText size="small">RTL sample small</BodyText>  // [QWTC - 2023]
	]),

	// RTL
	...withConfig({
		locale: 'ar-SA'
	}, [
		...commonTests
	]),

	// Indian
	{
		locale: 'bn-IN',
		component: <BodyText>পারেন।</BodyText>  // [QWTC - 642]
	},
	{
		locale: 'te-IN',
		component: <BodyText>পারেন।</BodyText>  // [QWTC - 642]
	}
];

export default BodyTextTests;
