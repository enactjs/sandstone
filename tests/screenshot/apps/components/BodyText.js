import BodyText from '../../../../BodyText';
import React from 'react';

const BodyTextTests = [
	<BodyText>This is some text</BodyText>,
	<BodyText centered>This is some text</BodyText>,
	<BodyText centered>-Lorem</BodyText>,
	{
		locale: 'ar-SA',
		component: <BodyText>RTL sample</BodyText>
	},
	{
		locale: 'ar-SA',
		component: <BodyText centered>This is some text</BodyText>
	},
	{
		locale: 'ar-SA',
		component: <BodyText centered>-Lorem</BodyText>
	}
];
export default BodyTextTests;
