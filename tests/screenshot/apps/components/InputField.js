import {InputField} from '../../../../Input';
import {useLayoutEffect} from 'react';

import {LoremString, withProps} from './utils';

const SelectionInput = props => {
	useLayoutEffect(() => {
		document.querySelector('input').focus();
		document.querySelector('input').setSelectionRange(2, 7);
	});
	return <InputField {...props} />;
};

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
	<InputField value="https://enactjs.com" type="url" />,
	<InputField value="https://enactjs.com" type="url" disabled />,

	// Long Text: Ellipses display with Letters, Numbers, Special Characters - [QWTC-2165]
	<InputField value={LoremString} />,
	<InputField value="!@#$%^&()_+-=[]\;',./{}|:?" />,
	<InputField value="012345678901234567890123456789" />,

	// 'invalid' Knob - Tooltip is on the Right and Aligns with InputField in LTR Layout - [QWTC-2162]
	<InputField value={LoremString} invalid />,

	<InputField value={LoremString} invalid invalidMessage="Changed invalid Message " />,

	// Long Text is Not Truncated with IconBefore and IconAfter - [QWTC-2163]
	<InputField value={LoremString} iconBefore="check" iconAfter="home" />,

	// tallCharacters: Change 'size' dynamically - [QWTC-2164]
	// Note: text stays the same size, the InputField field becomes smaller
	<InputField value="नरेंद्र मोदी" size="large" />,
	<InputField value=" ฟิ้  ไั  ஒ  து" size="large" />,
	<InputField value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" size="large" />,
	<InputField value="តន្ត្រី" size="large" />,
	// Testing default size 'large'
	<InputField value="नरेंद्र मोदी" />,
	<InputField value=" ฟิ้  ไั  ஒ  து" />,
	<InputField value="ÃÑÕÂÊÎÔÛÄËÏÖÜŸ" />,
	<InputField value="តន្ត្រី" />,

	// Change 'size' dynamically to 'small' - [QWTC-1971]
	<InputField value="small InputField" size="large" />,

	// Disabled Characters Displays in the Disabled InputField - [QWTC-1969]
	// This will also test: Transparent Disabled InputField Displays with Background - [QWTC-1965]
	<InputField value="I am value" />,
	<InputField value="I am a disabled value" disabled />,

	// Selection color
	<SelectionInput value="Selection value" />,

	// Focused
	...withProps({focus: true}, [
		<InputField />,
		<InputField placeholder="Focused Placeholder InputField" />,
		<InputField placeholder="Focused Placeholder InputField" disabled />,

		// InputField field of type 'number' should be empty with letters as input
		<InputField value="Focused Simple value" type="number" />,
		// InputField field of type 'number' should be empty with letters as input
		<InputField value="Focused Simple value" type="number" disabled />,

		<InputField value="Focused Simple value" type="password" />,
		<InputField value="Focused Simple value" type="password" disabled />,
		<InputField value="https://enactjs.com" type="url" />,
		<InputField value="https://enactjs.com" type="url" disabled />
	]),

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <InputField />
	},

	// 'invalid' Knob - Tooltip is on the Left and Aligns with InputField in RTL Layout - [QWTC-2166]
	{
		locale: 'ar-SA',
		component: <InputField value={LoremString} invalid />
	},

	// Text Vertically Center Aligns in InputField Field - RTL - [QWTC-1966]
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
	{
		locale: 'ar-SA',
		component: <InputField value="https://enactjs.com" type="url" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="https://enactjs.com" type="url" disabled />
	},

	// Long Text: Ellipses display with Letters, Numbers, Special Characters - [QWTC-2165]
	{
		locale: 'ar-SA',
		component: <InputField value={LoremString} />
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
		component: <InputField value={LoremString} invalid invalidMessage="Changed invalid Message " />
	},

	// Long Text is Not Truncated with IconBefore and IconAfter - [QWTC-2163]
	{
		locale: 'ar-SA',
		component: <InputField value={LoremString} iconBefore="check" iconAfter="home" />
	},

	// tallCharacters: Change 'size' dynamically - [QWTC-2164]
	// Note: text stays the same size, the InputField field becomes smaller
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
	{
		locale: 'ar-SA',
		component: <InputField value="តន្ត្រី" size="large" />
	},

	// Testing default size 'large'
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
	{
		locale: 'ar-SA',
		component: <InputField value="តន្ត្រី" />
	},


	// Change 'size' dynamically to 'small' - [QWTC-1971]
	{
		locale: 'ar-SA',
		component: <InputField value="small InputField" size="large" />
	},

	// Disabled Characters Displays in the Disabled InputField - [QWTC-1969]
	// This will also test: Transparent Disabled InputField Displays with Background - [QWTC-1965]
	{
		locale: 'ar-SA',
		component: <InputField value="I am value" />
	},
	{
		locale: 'ar-SA',
		component: <InputField value="I am a disabled value" disabled />
	},
	// Selection color
	{
		locale: 'ar-SA',
		component: <SelectionInput value="Selection value" />
	}
];
export default InputFieldTests;
