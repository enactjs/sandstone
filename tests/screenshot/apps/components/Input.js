import Input from '../../../../Input';
import React from 'react';

const InputTests = [
	<Input />,
	<Input placeholder="Placeholder Input" />,
	<Input placeholder="Placeholder Input" disabled />,

	// Input field of type 'number' should be empty with letters as input
	<Input value="Simple value" type="number" />,
	// Input field of type 'number'should be empty with letters as input
	<Input value="Simple value" type="number" disabled />,

	<Input value="1234567890" type="number" />,
	<Input value="1234567890" type="number" disabled />,
	<Input value="Simple value" type="password" />,
	<Input value="Simple value" type="password" disabled />,

	// Long Text: Ellipses display with Letters, Numbers, Special Characters - [GT-21198]
	<Input value="-Lorem" />,
	<Input value="!@#$%^&()_+-=[]\;',./{}|:?" />,
	<Input value="012345678901234567890123456789" />,

	// 'invalid' Knob - Tooltip is on the Right and Aligns with Input in LTR Layout - [GT-22818]
	<Input value="-Lorem" invalid />,

	<Input value="-Lorem" invalid invalidMessage="Changed invalid Message " />,

	// Long Text is Not Truncated with IconBefore and IconAfter - [GT-21089]
	<Input value="-Lorem" iconBefore="check" iconAfter="bluetoothoff" />,

	// tallCharacters: Change 'size' dynamically - [GT-27619]
	// Note: text stays the same size, the input field becomes larger
	<Input value="नरेंद्र मोदी" size="large" />,
	<Input value=" ฟิ้  ไั  ஒ  து" size="large" />,
	<Input value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" size="large" />,
	// Testing default size 'small'
	<Input value="नरेंद्र मोदी" />,
	<Input value=" ฟิ้  ไั  ஒ  து" />,
	<Input value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" />,

	// Change 'size' dynamically to 'Large' - [GT-25290]
	<Input value="large Input" size="large" />,

	// Disabled Characters Displays in the Disabled Input - [GT-22051]
	// This will also test: Transparent Disabled Input Displays with Background - [GT-21161]
	<Input value="I am value" />,
	<Input value="I am a disabled value" disabled />,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <Input />
	},

	// 'invalid' Knob - Tooltip is on the Left and Aligns with Input in RTL Layout - [GT-22817]
	{
		locale: 'ar-SA',
		component: <Input value="-Lorem" invalid />
	},

	// Text Vertically Center Aligns in Input Field - RTL - [GT-23785]
	{
		locale: 'ar-SA',
		component: <Input value="HHHHHH" />
	},

	{
		locale: 'ar-SA',
		component: <Input placeholder="Placeholder Input" />
	},
	{
		locale: 'ar-SA',
		component: <Input placeholder="Placeholder Input" disabled />
	},

	// Input field of type 'number' should be empty with letters as input
	{
		locale: 'ar-SA',
		component: <Input value="Simple value" type="number" />
	},

	// Input field of type 'number'should be empty with letters as input
	{
		locale: 'ar-SA',
		component: <Input value="Simple value" type="number" disabled />
	},

	{
		locale: 'ar-SA',
		component: <Input value="1234567890" type="number" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="1234567890" type="number" disabled />
	},
	{
		locale: 'ar-SA',
		component: <Input value="Simple value" type="password" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="Simple value" type="password" disabled />
	},

	// Long Text: Ellipses display with Letters, Numbers, Special Characters - [GT-21198]
	{
		locale: 'ar-SA',
		component: <Input value="-Lorem" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="!@#$%^&()_+-=[]\;',./{}|:?" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="012345678901234567890123456789" />
	},

	{
		locale: 'ar-SA',
		component: <Input value="-Lorem" invalid invalidMessage="Changed invalid Message " />
	},

	// Long Text is Not Truncated with IconBefore and IconAfter - [GT-21089]
	{
		locale: 'ar-SA',
		component: <Input value="-Lorem" iconBefore="check" iconAfter="bluetoothoff" />
	},

	// tallCharacters: Change 'size' dynamically - [GT-27619]
	// Note: text stays the same size, the input field becomes larger
	{
		locale: 'ar-SA',
		component: <Input value="नरेंद्र मोदी" size="large" />
	},
	{
		locale: 'ar-SA',
		component: <Input value=" ฟิ้  ไั  ஒ  து" size="large" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" size="large" />
	},

	// Testing default size 'small'
	{
		locale: 'ar-SA',
		component: <Input value="नरेंद्र मोदी" />
	},
	{
		locale: 'ar-SA',
		component: <Input value=" ฟิ้  ไั  ஒ  து" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" />
	},

	// Change 'size' dynamically to 'Large' - [GT-25290]
	{
		locale: 'ar-SA',
		component: <Input value="large Input" size="large" />
	},

	// Disabled Characters Displays in the Disabled Input - [GT-22051]
	// This will also test: Transparent Disabled Input Displays with Background - [GT-21161]
	{
		locale: 'ar-SA',
		component: <Input value="I am value" />
	},
	{
		locale: 'ar-SA',
		component: <Input value="I am a disabled value" disabled />
	}

];
export default InputTests;
