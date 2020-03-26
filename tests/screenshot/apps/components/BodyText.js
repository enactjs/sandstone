import BodyText from '../../../../BodyText';
import React from 'react';

const BodyTextTests = [
	<BodyText>This is some text</BodyText>, // [GT-28439]
	<BodyText size="small">This is some text small</BodyText>, // [GT-28440]
	<BodyText centered>This is some text</BodyText>, // [GT-28438]
	<BodyText centered>-Lorem</BodyText>,
	<BodyText centered size="small">This is some text</BodyText>, // [GT-28443]

	{
		locale: 'ar-SA',
		component: <BodyText>RTL sample</BodyText>  // [GT-28439]
	},
	{
		locale: 'ar-SA',
		component: <BodyText size="small">RTL sample small</BodyText>  // [GT-28440]
	},
	{
		locale: 'ar-SA',
		component: <BodyText centered>This is some text</BodyText> // [GT-28438]
	},
	{
		locale: 'ar-SA',
		component: <BodyText centered>-Lorem</BodyText>
	},
	{
		locale: 'ar-SA',
		component: <BodyText centered size="small">This is some text</BodyText> // [GT-28443]
	}
];
export default BodyTextTests;
