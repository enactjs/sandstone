import Item from '../../../../Item';
import Icon from '../../../../Icon';
import React from 'react';

import {withConfig, withProps, LoremString} from './utils';

// Short text
const commonItemTests = [
	<Item>Default Item</Item>,
	<Item disabled>Disabled Item</Item>,
	<Item inline>Inline Item</Item>,
	<Item inline disabled>Disabled Inline Item</Item>
];
// Long text
const longTextItemTests = [
	<Item>Default Item with text long enough to invoke a marquee</Item>,
	<Item disabled>Disabled Item with text long enough to invoke a marquee</Item>,
	<Item inline>Inline Item with text long enough to invoke a marquee</Item>,
	<Item inline disabled>Disabled Inline Item with text long enough to invoke a marquee</Item>
];

const rtlStrings = {
	ar: 'صباح الخي'
};

// Define tests for RTL languages
const rtlItemTests = [];
for (const lang in rtlStrings) {
	rtlItemTests.push(
		<Item>{rtlStrings[lang]}</Item>,
		<Item label={rtlStrings[lang]}>{rtlStrings[lang]}</Item>
	);
}


const tallglyphStrings = {
	// hi: 'नरेंद्र मोदी',
	// th: ' ฟิ้  ไั  ஒ  து',
	vi: 'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ'
};

// Define cases where the text could be affected by tallglyph languages
const tallglyphTextCases = [];
for (const lang in tallglyphStrings) {
	tallglyphTextCases.push(
		<Item>{tallglyphStrings[lang]}</Item>,
		<Item label={tallglyphStrings[lang]}>{tallglyphStrings[lang]}</Item>
	);
}

// Attach a set of common (from above) tests to apply to each of the tallglyph cases
const tallglyphItemTests = [
	// Normal
	...tallglyphTextCases,
	// Disabled
	...withProps({disabled: true}, tallglyphTextCases),
	// Inline
	...withProps({inline: true}, tallglyphTextCases),
	// Inline Disabled
	...withProps({inline: true, disabled: true}, tallglyphTextCases)
];

const ItemTests = [
	...commonItemTests,
	...longTextItemTests,
	...rtlItemTests,

	// Centered
	...withProps({centered: true}, [
		<Item>Centered Item</Item>,
		<Item>{LoremString}</Item>,
		// Just slotBefore
		<Item slotBefore={<Icon>star</Icon>}>Centered Item</Item>,
		<Item slotBefore={<Icon>star</Icon>}>{LoremString}</Item>,
		// Just slotAfter
		<Item slotAfter={<Icon>star</Icon>}>Centered Item</Item>,
		<Item slotAfter={<Icon>star</Icon>}>{LoremString}</Item>,
		// Both slotBefore and slotAfter
		<Item slotBefore={<Icon>star</Icon>} slotAfter={<Icon>star</Icon>}>Centered Item</Item>,
		<Item slotBefore={<Icon>star</Icon>} slotAfter={<Icon>star</Icon>}>{LoremString}</Item>,

		...rtlItemTests
	]),

	// Small
	...withProps({size: 'small'}, [
		...commonItemTests,
		...rtlItemTests
	]),

	// With tall characters and disabled [GT-28165]
	...tallglyphItemTests,

	// LargeText mode
	...withConfig({
		textSize: 'large'
	}, [
		...commonItemTests,
		...rtlItemTests,
		...tallglyphItemTests,
		...withProps({size: 'small'}, [
			...commonItemTests
		])
	]),


	// *************************************************************
	// locale = 'ar-SA'
	// Item Functionality RTL [GT-28162]
	...withConfig({locale: 'ar-SA'}, [
		...commonItemTests,
		...rtlItemTests,

		// Centered
		...withProps({centered: true}, [
			<Item>Hello Item</Item>,
			<Item slotBefore={<Icon>star</Icon>} slotAfter={<Icon>star</Icon>}>Hello Item</Item>
		]),

		// Small
		...withProps({size: 'small'}, commonItemTests),

		// With tall characters and disabled [GT-28165]
		...tallglyphItemTests
	]),

	// RTL and LargeText mode
	...withConfig({
		locale: 'ar-SA',
		textSize: 'large'
	}, [
		...commonItemTests,
		...rtlItemTests,
		...tallglyphItemTests
	]),


	// *************************************************************
	// Tallglyph Validation
	// locale = 'vi-VN'
	...withConfig({
		locale: 'vi-VN'
	}, [
		...commonItemTests,
		...tallglyphItemTests,
		...withProps({size: 'small'}, commonItemTests)
	]),

	...withConfig({
		locale: 'vi-VN',
		textSize: 'large'
	}, [
		...commonItemTests,
		...tallglyphItemTests,
		...withProps({size: 'small'}, commonItemTests)
	])
];

export default ItemTests;
