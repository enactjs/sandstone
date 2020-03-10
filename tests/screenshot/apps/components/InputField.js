import {InputField} from '../../../../Input';
import React from 'react';

const InputFieldTests = [
	<InputField />,
	<InputField placeholder="Placeholder InputField" />,
	<InputField placeholder="Placeholder InputField" disabled />,

	// InputField field of type 'number' should be empty with letters as input
	<InputField value="Simple value" type="number" />,
	// InputField field of type 'number' should be empty with letters as input
	<InputField value="Simple value" type="number" disabled />,

	<InputField value="1234567890" type="number" />,
	<InputField value="1234567890" type="number" disabled />,
	<InputField value="Simple value" type="password" />,
	<InputField value="Simple value" type="password" disabled />,

	// Long Text: Ellipses display with Letters, Numbers, Special Characters - [GT-21198]
	<InputField value="-Lorem" />,
	<InputField value="!@#$%^&()_+-=[]\;',./{}|:?" />,
	<InputField value="012345678901234567890123456789" />,

	// 'invalid' Knob - Tooltip is on the Right and Aligns with InputField in LTR Layout - [GT-22818]
	<InputField value="-Lorem" invalid />,

	<InputField value="-Lorem" invalid invalidMessage="Changed invalid Message " />,

	// Long Text is Not Truncated with IconBefore and IconAfter - [GT-21089]
	<InputField value="-Lorem" iconBefore="check" iconAfter="bluetoothoff" />,

	// tallCharacters: Change 'size' dynamically - [GT-27619]
	// Note: text stays the same size, the input field becomes larger
	<InputField value="नरेंद्र मोदी" size="large" />,
	<InputField value=" ฟิ้  ไั  ஒ  து" size="large" />,
	<InputField value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" size="large" />,
	// Testing default size 'small'
	<InputField value="नरेंद्र मोदी" />,
	<InputField value=" ฟิ้  ไั  ஒ  து" />,
	<InputField value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" />,

	// Change 'size' dynamically to 'Large' - [GT-25290]
	<InputField value="large InputField" size="large" />,

	// Disabled Characters Displays in the Disabled InputField - [GT-22051]
	// This will also test: Transparent Disabled InputField Displays with Background - [GT-21161]
	<InputField value="I am value" />,
	<InputField value="I am a disabled value" disabled />,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <InputField />
	},

	// 'invalid' Knob - Tooltip is on the Left and Aligns with InputField in RTL Layout - [GT-22817]
	{
		locale: 'ar-SA',
		component: <InputField value="-Lorem" invalid />
	},

	// Text Vertically Center Aligns in InputField Field - RTL - [GT-23785]
	{
		locale: 'ar-SA',
		component: <InputField value="HHHHHH" />
	},

	{
		locale: 'ar-SA',
		component: <InputField placeholder="Placeholder InputField" />
	},
	{
		locale: 'ar-SA',
		component: <InputField placeholder="Placeholder InputField" disabled />
	},

	// InputField field of type 'number' should be empty with letters as input
	{
		locale: 'ar-SA',
		component: <InputField value="Simple value" type="number" />
	},

	// InputField field of type 'number'should be empty with letters as input
	{
		locale: 'ar-SA',
		component: <InputField value="Simple value" type="number" disabled />
	},

	{
		locale: 'ar-SA',
		component: <InputField value="1234567890" type="number" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="1234567890" type="number" disabled />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="Simple value" type="password" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="Simple value" type="password" disabled />
	},

	// Long Text: Ellipses display with Letters, Numbers, Special Characters - [GT-21198]
	{
		locale: 'ar-SA',
		component: <InputField value="-Lorem" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="!@#$%^&()_+-=[]\;',./{}|:?" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="012345678901234567890123456789" />
	},

	{
		locale: 'ar-SA',
		component: <InputField value="-Lorem" invalid invalidMessage="Changed invalid Message " />
	},

	// Long Text is Not Truncated with IconBefore and IconAfter - [GT-21089]
	{
		locale: 'ar-SA',
		component: <InputField value="-Lorem" iconBefore="check" iconAfter="bluetoothoff" />
	},

	// tallCharacters: Change 'size' dynamically - [GT-27619]
	// Note: text stays the same size, the input field becomes larger
	{
		locale: 'ar-SA',
		component: <InputField value="नरेंद्र मोदी" size="large" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value=" ฟิ้  ไั  ஒ  து" size="large" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" size="large" />
	},

	// Testing default size 'small'
	{
		locale: 'ar-SA',
		component: <InputField value="नरेंद्र मोदी" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value=" ฟิ้  ไั  ஒ  து" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" />
	},

	// Change 'size' dynamically to 'Large' - [GT-25290]
	{
		locale: 'ar-SA',
		component: <InputField value="large InputField" size="large" />
	},

	// Disabled Characters Displays in the Disabled InputField - [GT-22051]
	// This will also test: Transparent Disabled InputField Displays with Background - [GT-21161]
	{
		locale: 'ar-SA',
		component: <InputField value="I am value" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="I am a disabled value" disabled />
	}

];
export default InputFieldTests;
