import Button from '../../../../Button';

import {withConfig, withProps} from './utils';

import css from './Button.module.less';

const ButtonTests = [
	<Button>click me</Button>,
	<Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	{
		textSize: 'large',
		component: <Button>click me</Button>
	},
	// [QWTC-2232] Checking of the expanded button will be confirmed in other test cases(QWTC-1832).
	<Button disabled>click me</Button>,
	// [QWTC-2232] end

	// [QWTC-2255] - Color Underbar displays Icon with 'minWidth' and with 'Disabled'
	<Button color="red" icon="minus" iconPosition="after" minWidth={false} disabled />,
	// [QWTC-2256] - Change 'disabled' dynamically - Icon is slightly visible with focus / Spotlight
	<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} disabled />,

	<Button color="red" disabled>plus</Button>,

	// [QWTC-1837]
	<Button> ฟิ้  ไั  ஒ  து</Button>,
	<Button>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Button>,
	<Button>Bản văn</Button>,
	<Button>តន្ត្រី</Button>,
	// end [QWTC-1837]

	// iconPosition = before (Default) + small (default) + large
	// Leaving size small here as example, but it is not required since it is the default.
	<Button size="small">click me</Button>,
	<Button size="large">click me</Button>,
	// iconPosition = before (Default) + icon + iconPosition + small (default) + large
	<Button icon="minus" iconPosition="after">click me</Button>,
	<Button icon="minus" iconPosition="after" size="large">click me</Button>,
	<Button icon="plus" iconPosition="before">click me</Button>,
	<Button icon="plus" iconPosition="before" size="large">click me</Button>,

	// Icon only, iconPosition = before (Default) + icon + iconPosition + small (default) + large
	<Button icon="minus" iconPosition="after" />,
	<Button icon="minus" iconPosition="after" size="large" />,
	<Button icon="plus" iconPosition="before" />,
	<Button icon="plus" iconPosition="before" size="large" />,

	// iconPosition = before (Default) + backgroundOpacity
	<Button icon="plus" backgroundOpacity="transparent">click me</Button>,
	<Button backgroundOpacity="opaque">click me</Button>,

	// Selected buttons
	<Button selected>click me</Button>,
	<Button selected icon="plus" />,
	<Button selected backgroundOpacity="transparent">click me</Button>, 	// [QWTC-1828]
	<Button selected backgroundOpacity="transparent" icon="plus" />, // Default for icon-only buttons
	<Button selected backgroundOpacity="opaque">click me</Button>, // Default for text button

	// iconPosition = before (Default) + children has 1 letter +	minWidth = false
	<Button minWidth={false}>H</Button>,

	// iconPosition = before (Default) + color
	<Button color="red">click me</Button>,
	<Button color="green">click me</Button>,
	<Button color="yellow">click me</Button>,
	<Button color="blue">click me</Button>,
	// iconPosition = before (Default) + color + icon + iconPosition
	<Button color="red" icon="minus" iconPosition="before">click me</Button>,
	<Button color="green" icon="plus" iconPosition="after">click me</Button>,
	// iconPosition = before (Default) + color + icon + iconPosition + minWidth
	<Button color="yellow" icon="plus" iconPosition="before" minWidth={false}>click me</Button>,
	<Button color="blue" icon="minus" iconPosition="after" minWidth={false}>click me</Button>,

	// [QWTC-2257] - Color Underbar displays on Button (LTR)
	<Button color="red" icon="plus" iconPosition="before" minWidth={false} />,
	<Button color="green" icon="plus" iconPosition="after" minWidth={false} />,
	<Button color="yellow" icon="plus" iconPosition="after" minWidth={false} />,
	<Button color="blue" icon="plus" iconPosition="after" minWidth={false} />,

	// [QWTC-2259] - Color Underbar displays on Small / Large size in Selected state
	<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="large" />,
	<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="small" />,

	// iconPosition = before (Default) + icon
	<Button icon="plus">click me</Button>,
	<Button icon="arrowlargeright">click me</Button>,
	<Button icon="info">click me</Button>,

	// iconFlip
	<Button icon="arrowhookright" iconFlip="horizontal">click me</Button>,
	<Button icon="arrowhookright" iconFlip="vertical">click me</Button>,
	<Button icon="arrowhookright" iconFlip="both">click me</Button>,
	<Button icon="arrowhookright" iconFlip="auto">click me</Button>,

	// [QWTC-1831]
	<Button icon="rotate">click me</Button>,

	// roundBorder
	<Button roundBorder>click me</Button>,
	<Button roundBorder size="small">click me</Button>,
	<Button roundBorder size="large">click me</Button>,
	<Button backgroundOpacity="transparent" roundBorder>click me</Button>,
	<Button backgroundOpacity="opaque" roundBorder>click me</Button>,
	<Button icon="minus" iconPosition="after" roundBorder />,
	<Button icon="minus" iconPosition="after" roundBorder size="large" />,
	<Button icon="plus" iconPosition="before" roundBorder />,
	<Button icon="plus" iconPosition="before" roundBorder size="large" />,
	{
		textSize: 'large',
		component: <Button roundBorder>click me</Button>
	},
	{
		textSize: 'large',
		component: <Button roundBorder size="small">click me</Button>
	},
	{
		textSize: 'large',
		component: <Button roundBorder size="large">click me</Button>
	},
	{
		textSize: 'large',
		component: <Button backgroundOpacity="transparent" roundBorder>click me</Button>
	},
	{
		textSize: 'large',
		component: <Button backgroundOpacity="opaque" roundBorder>click me</Button>
	},
	{
		textSize: 'large',
		component: <Button icon="minus" iconPosition="after" roundBorder />
	},
	{
		textSize: 'large',
		component: <Button icon="minus" iconPosition="after" roundBorder size="large" />
	},
	{
		textSize: 'large',
		component: <Button icon="plus" iconPosition="before" roundBorder />
	},
	{
		textSize: 'large',
		component: <Button icon="plus" iconPosition="before" roundBorder size="large" />
	},

	// shadowed
	...withConfig({wrapper: {light: true, padded: true}}, [
		<Button shadowed icon="plus" minWidth={false} />,
		<Button shadowed backgroundOpacity="transparent" minWidth={false}>click me</Button>
	]),

	// Focused with light wrapper
	...withConfig({focus: true, wrapper: {light: true, padded: true}}, [
		// [QWTC-2232]
		<Button>Focused button</Button>,
		<Button disabled>Focused button</Button>,
		// [QWTC-2232] end
		<Button>Focused Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
		{
			textSize: 'large',
			component: <Button>Focused button</Button>
		},
		<Button disabled>Focused button</Button>,

		// iconPosition = before (Default) + small (default) + large
		// Leaving size small here as example, but it is not required since it is the default.
		<Button size="small">Focused button</Button>,
		<Button size="large">Focused button</Button>,
		// iconPosition = before (Default) + icon + iconPosition + small (default) + large
		<Button icon="minus" iconPosition="after">Focused button</Button>,
		<Button icon="minus" iconPosition="after" size="large">Focused button</Button>,
		<Button icon="plus" iconPosition="before">Focused button</Button>,
		<Button icon="plus" iconPosition="before" size="large">Focused button</Button>,

		// iconPosition = before (Default) + backgroundOpacity
		<Button icon="plus" backgroundOpacity="transparent">Focused button</Button>,
		<Button backgroundOpacity="opaque">Focused button</Button>,

		// Selected buttons
		<Button selected>Focused button</Button>,
		<Button selected backgroundOpacity="transparent">Focused button</Button>, 	// [QWTC-1828]
		<Button selected backgroundOpacity="opaque">Focused button</Button>, // Default for text button

		// iconPosition = before (Default) + children has 1 letter +	minWidth = false
		<Button minWidth={false}>A</Button>,

		// iconPosition = before (Default) + color
		<Button color="red">Focused button</Button>,
		<Button color="green">Focused button</Button>,
		<Button color="yellow">Focused button</Button>,
		<Button color="blue">Focused button</Button>,
		// iconPosition = before (Default) + color + icon + iconPosition
		<Button color="red" icon="minus" iconPosition="before">Focused button</Button>,
		<Button color="green" icon="plus" iconPosition="after">Focused button</Button>,
		// iconPosition = before (Default) + color + icon + iconPosition + minWidth
		<Button color="yellow" icon="plus" iconPosition="before" minWidth={false}>Focused button</Button>,
		<Button color="blue" icon="minus" iconPosition="after" minWidth={false}>Focused button</Button>,

		// iconPosition = before (Default) + icon
		<Button icon="plus">Focused button</Button>,
		<Button icon="arrowlargeright">Focused button</Button>,
		<Button icon="info">Focused button</Button>,

		// iconFlip
		<Button icon="arrowhookright" iconFlip="horizontal">Focused button</Button>,
		<Button icon="arrowhookright" iconFlip="vertical">Focused button</Button>,
		<Button icon="arrowhookright" iconFlip="both">Focused button</Button>,
		<Button icon="arrowhookright" iconFlip="auto">Focused button</Button>,

		// [QWTC-1831]
		<Button icon="rotate">Focused button</Button>,

		// [QWTC-2531]
		<Button disabled icon="forward" size="samll" tooltipText="tooltip" tooltipType="transparent">Focused button</Button>,

		// roundBorder
		<Button roundBorder>Focused button</Button>,
		<Button roundBorder size="small">Focused button</Button>,
		<Button roundBorder size="large">Focused button</Button>,
		<Button backgroundOpacity="transparent" roundBorder>Focused button</Button>,
		<Button backgroundOpacity="opaque" roundBorder>Focused button</Button>,
		<Button icon="minus" iconPosition="after" roundBorder />,
		<Button icon="minus" iconPosition="after" roundBorder size="large" />,
		<Button icon="plus" iconPosition="before" roundBorder />,
		<Button icon="plus" iconPosition="before" roundBorder size="large" />,
		{
			textSize: 'large',
			component: <Button roundBorder>Focused button</Button>
		},
		{
			textSize: 'large',
			component: <Button roundBorder size="small">Focused button</Button>
		},
		{
			textSize: 'large',
			component: <Button roundBorder size="large">Focused button</Button>
		},
		{
			textSize: 'large',
			component: <Button backgroundOpacity="transparent" roundBorder>Focused button</Button>
		},
		{
			textSize: 'large',
			component: <Button backgroundOpacity="opaque" roundBorder>Focused button</Button>
		},
		{
			textSize: 'large',
			component: <Button icon="minus" iconPosition="after" roundBorder />
		},
		{
			textSize: 'large',
			component: <Button icon="minus" iconPosition="after" roundBorder size="large" />
		},
		{
			textSize: 'large',
			component: <Button icon="plus" iconPosition="before" roundBorder />
		},
		{
			textSize: 'large',
			component: <Button icon="plus" iconPosition="before" roundBorder size="large" />
		},

		// shadowed + focused
		<Button shadowed icon="minus" minWidth={false} />,
		<Button shadowed backgroundOpacity="transparent" minWidth={false}>Focused button</Button>
	]),

	// *************************************************************
	// Tallglyph validation
	// locale = 'vi-VN'
	// *************************************************************
	...withConfig({locale: 'vi-VN'}, [
		<Button>Vietnamese Text</Button>,
		<Button color="red">Vietnamese Text</Button>,
		<Button small>Vietnamese Text</Button>,
		<Button small color="red">Vietnamese Text</Button>,
		<Button icon="star" />,
		<Button icon="star">Vietnamese Text</Button>,
		<Button icon="star" color="red" />,
		<Button icon="star" color="red">Vietnamese Text</Button>,

		// Real tall glyphs
		<Button> ฟิ้  ไั  ஒ  து</Button>,
		<Button>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Button>,
		<Button>Bản văn</Button>,
		<Button>តន្ត្រី</Button>

	]),


	// *************************************************************
	// Tallglyph validation
	// locale = 'km-KH'
	// *************************************************************
	...withConfig({locale: 'km-KH'}, [
		<Button>Cambodian Text</Button>,
		<Button color="red">Cambodian Text</Button>,
		<Button small>Cambodian Text</Button>,
		<Button small color="red">Cambodian Text</Button>,
		<Button icon="star" />,
		<Button icon="star">Cambodian Text</Button>,
		<Button icon="star" color="red" />,
		<Button icon="star" color="red">Cambodian Text</Button>,

		// Real tall glyphs
		<Button size="small">តន្ត្រី</Button>
	]),


	// *************************************************************
	// RTL
	// locale = 'ar-SA'
	// *************************************************************
	// [QWTC-1829]
	...withConfig({locale: 'ar-SA'}, [
		<Button>click me</Button>,

		// iconPosition = before (Default) + small (default) + large
		// Leaving size small here as example, but it is not required since it is the default.
		<Button size="small">click me</Button>,
		<Button size="large">click me</Button>,
		// Icon only - iconPosition = before (Default) + icon + iconPosition + small (default) + large
		<Button icon="minus" iconPosition="after" />,
		<Button icon="minus" iconPosition="after" size="large" />,
		<Button icon="plus" iconPosition="before" />,
		<Button icon="plus" iconPosition="before" size="large" />,
		// iconPosition = before (Default) + icon + iconPosition + small (default) + large
		<Button icon="minus" iconPosition="after">click me</Button>,
		<Button icon="minus" iconPosition="after" size="large">click me</Button>,
		<Button icon="plus" iconPosition="before">click me</Button>,
		<Button icon="plus" iconPosition="before" size="large">click me</Button>,
		// iconPosition = before (Default) + backgroundOpacity
		<Button icon="plus" backgroundOpacity="transparent">click me</Button>,
		<Button backgroundOpacity="opaque">click me</Button>,
		// Selected buttons
		<Button selected>click me</Button>,
		<Button selected icon="plus" />,
		<Button selected backgroundOpacity="transparent">click me</Button>, 	// [QWTC-1828]
		<Button selected backgroundOpacity="transparent" icon="plus" />, // Default for icon-only buttons
		<Button selected backgroundOpacity="opaque">click me</Button>, // Default for text button

		// iconPosition = before (Default) + children has 1 letter +	minWidth = false
		<Button minWidth={false}>H</Button>,
		// iconPosition = before (Default) + color
		<Button color="red">click me</Button>,
		<Button color="green">click me</Button>,
		<Button color="yellow">click me</Button>,
		<Button color="blue">click me</Button>,
		// iconPosition = before (Default) + color + icon + iconPosition
		<Button color="red" icon="minus" iconPosition="before">click me</Button>,
		<Button color="green" icon="plus" iconPosition="after">click me</Button>,
		// iconPosition = before (Default) + color + icon + iconPosition + minWidth
		<Button color="yellow" icon="plus" iconPosition="before" minWidth={false}>click me</Button>,
		<Button color="blue" icon="minus" iconPosition="after" minWidth={false}>click me</Button>,
		// [QWTC-2258] - Color Underbar displays on Button (RTL)
		<Button color="red" icon="plus" iconPosition="before" minWidth={false} />,
		<Button color="green" icon="plus" iconPosition="after" minWidth={false} />,
		<Button color="yellow" icon="plus" iconPosition="after" minWidth={false} />,
		<Button color="blue" icon="plus" iconPosition="after" minWidth={false} />,

		// [QWTC-2259] - Color Underbar displays on Small / Large size in Selected state
		<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="large" />,
		<Button selected color="red" icon="minus" iconPosition="after" minWidth={false} size="small" />,
		// iconPosition = before (Default) + icon
		<Button icon="plus">click me</Button>,
		<Button icon="arrowlargeright">click me</Button>,
		<Button icon="info">click me</Button>,
		// iconFlip
		<Button icon="arrowhookright" iconFlip="horizontal">click me</Button>,
		<Button icon="arrowhookright" iconFlip="vertical">click me</Button>,
		<Button icon="arrowhookright" iconFlip="both">click me</Button>,
		<Button icon="arrowhookright" iconFlip="auto">click me</Button>
	]),

	// *************************************************************
	// With customized button
	// *************************************************************
	// Note: When the file name of the test is too long, different tests may be recognized as the same test.
	// So we changed the Button name of Focus prop tests.
	...withProps({css: css}, [
		// standard button
		<Button>Customized button</Button>,
		<Button selected>Customized button</Button>,
		<Button size="small">Customized button</Button>,

		// With icon.
		<Button icon="minus" />,
		<Button icon="minus" size="small" />,
		<Button icon="minus" selected />,
		<Button icon="minus" iconPosition="after">Customized button</Button>,
		<Button icon="minus" iconPosition="after" size="small">Customized button</Button>
	])
];

export default ButtonTests;
