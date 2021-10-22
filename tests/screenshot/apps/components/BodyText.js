import BodyText from '../../../../BodyText';

import {withConfig, LoremString} from './utils';

const commonTests = [
	<BodyText>This is some text</BodyText>, // [QWT - 2628]
	<BodyText size="small">This is some text small</BodyText>, // [QWT - 2627]
	<BodyText centered>This is some text</BodyText>, // [QWT - 2629]
	<BodyText centered>{LoremString}</BodyText>,
	<BodyText centered size="small">This is some text</BodyText>, // [QWT - 2624]
	<BodyText noWrap size="small">{LoremString}</BodyText>,
	<BodyText noWrap>{LoremString}</BodyText>
];

const BodyTextTests = [
	...commonTests,

	// Tallglyph validation
	...withConfig({
		locale: 'vi-VN'
	}, [
		<BodyText>RTL sample</BodyText>,  // [QWT - 2628]
		<BodyText size="small">RTL sample small</BodyText>  // [QWT - 2627]
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
		component: <BodyText>পারেন।</BodyText>  // [QWT - 4248]
	},
	{
		locale: 'te-IN',
		component: <BodyText>পারেন।</BodyText>  // [QWT - 4248]
	}
];

export default BodyTextTests;
