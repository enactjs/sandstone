import Picker from '../../../../Picker';

import {withConfig} from './utils';

import * as css from './Picker.module.less';

const pickerList = {
	tall: [
		'नरेंद्र मोदी',
		' ฟิ้  ไั  ஒ  து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ',
		'តន្ត្រី'
	],
	vegetables: [
		'Celery',
		'Carrot',
		'Tomato',
		'Onion',
		'Broccoli',
		'Spinach'
	],
	oneAirport: [
		'San Francisco Airport Terminal Gate 1'
	],
	emptyList: [],
	airports: [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	]
};

const PickerTests = [
	<Picker>{[]}</Picker>,
	<Picker>{['Hello', 'Hello']}</Picker>,
	// Icon is not displayed (since it is invalid value)
	<Picker decrementIcon incrementIcon>hello</Picker>,
	<Picker>hello</Picker>,
	<Picker disabled>hello</Picker>,
	<Picker>{pickerList.vegetables}</Picker>,
	<Picker value={1}>{pickerList.vegetables}</Picker>,

	// Picker is disabled (since it only has one item)
	<Picker>{pickerList.oneAirport}</Picker>,

	// Locale Font Displays on Picker - [QWTC-2214]
	<Picker value={0}>{pickerList.tall}</Picker>,
	{
		locale: 'th-TH',
		component: <Picker value={0}>{pickerList.tall}</Picker>
	},
	// end of [QWTC-2214]

	// tallCharacters: Change 'width', 'wrap', 'joined', 'changedBy', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - [QWTC-2215]
	// Marked part automated due to Marquee and Click actions
	// Step 2: Tall characters display fully and are not truncated.
	<Picker width="large">{pickerList.tall}</Picker>,
	// Step 3: Picker width is reduced.
	<Picker value={2} width="medium">{pickerList.tall}</Picker>,
	// Step 4: 3 ellipsis display on the right of the Picker text.
	<Picker value={2} width="small">{pickerList.tall}</Picker>,
	// Step 5: Both Right (＞) and Left (＜) arrows buttons are enabled.
	<Picker value={2} width="large" wrap>{pickerList.tall}</Picker>,
	// Step 6: The arrow buttons disappear.
	<Picker value={2} width="large" joined>{pickerList.tall}</Picker>,
	// Step 7: The arrow buttons appear.
	<Picker value={2} width="large" joined changedBy="arrow">{pickerList.tall}</Picker>,
	// Step 8: Cannot verify here that Picker text transitions very quickly from one to the other without animation.
	<Picker value={2} width="large" noAnimation>{pickerList.tall}</Picker>,
	// Step 9:  Picker is disabled.
	<Picker value={2} width="large" disabled>{pickerList.tall}</Picker>,
	// Step 10: 'minus' symbol displays on the Right (＞) of the Picker text.
	<Picker value={2} width="large" incrementIcon="minus">{pickerList.tall}</Picker>,
	// Step 11: 'backward' symbol displays on the Left (＜) of the Picker text. 'plus' symbol displays on the Right (＞) of the Picker text.
	<Picker value={2} width="large" decrementIcon="backward" incrementIcon="plus">{pickerList.tall}</Picker>,
	// end of [QWTC-2215]

	<Picker value={2} width="medium">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="small">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="large">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" wrap>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" joined>{pickerList.vegetables}</Picker>,
	<Picker value={1} width="medium" joined>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" joined changedBy="arrow">{pickerList.vegetables}</Picker>,
	<Picker value={1} width="medium" joined changedBy="arrow">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" noAnimation>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" disabled>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" decrementIcon="play">{pickerList.vegetables}</Picker>,

	<Picker width="medium" wrap joined>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation disabled>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>,

	<Picker width="medium" wrap joined changedBy="arrow">{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined changedBy="arrow" noAnimation>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined changedBy="arrow" noAnimation disabled>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined changedBy="arrow" noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined changedBy="arrow" noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>,
	// Ellipsis Displays with RTL Text in LTR Locale - [QWTC-2199]
	// Marked part automated as cannnot check for marquee (step 4 - part 2)
	// Step 3 - part 1: The RTL text displays. The Right arrow button is disabled.
	// Step 4 - part 1: Ellipsis display on the left side of the text.
	<Picker value={3} width="medium">{pickerList.airports}</Picker>,
	// end of [QWTC-2199]

	// *************************************************************
	// vertical
	// *************************************************************

	<Picker orientation="vertical">{[]}</Picker>,
	<Picker orientation="vertical">{['Hello', 'Hello']}</Picker>,
	<Picker decrementIcon incrementIcon orientation="vertical">hello</Picker>,
	<Picker decrementIcon="minus" incrementIcon="plus" orientation="vertical">hello</Picker>,
	<Picker orientation="vertical">hello</Picker>,
	<Picker disabled orientation="vertical">hello</Picker>,
	<Picker orientation="vertical">{pickerList.vegetables}</Picker>,
	<Picker value={1} orientation="vertical">{pickerList.vegetables}</Picker>,

	// tallCharacters: are not truncated when 'orientation' is changed to 'Vertical' - [QWTC-2216]
	// Marked part auotomated due to one click required
	<Picker value={0} width="large" orientation="vertical">{pickerList.tall}</Picker>,
	<Picker value={1} width="large" orientation="vertical">{pickerList.tall}</Picker>,
	<Picker value={2} width="large" orientation="vertical">{pickerList.tall}</Picker>,
	<Picker value={3} width="large" orientation="vertical">{pickerList.tall}</Picker>,
	// end of [QWTC-2216]

	// oneItem: Change 'orientation'to Vertical, 'joined', 'disabled' dynamically - [QWTC-2212]
	// Step 2 Picker is disabled (since it only has one item).
	<Picker orientation="vertical">{pickerList.oneAirport}</Picker>,
	// end of [QWTC-2212]

	// Change 'width', 'wrap', 'joined', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - Vertical Picker - [QWTC-2213]
	<Picker orientation="vertical" />,
	// step 3:  Picker displays vertically.
	<Picker value={2} width="medium" orientation="vertical">{pickerList.vegetables}</Picker>,
	// step 4: Text of picker reduces and shows 3 ellipsis.
	<Picker value={2} width="small" orientation="vertical">{pickerList.vegetables}</Picker>,
	// step 5:  Text of picker displays.
	<Picker value={2} width="large" orientation="vertical">{pickerList.vegetables}</Picker>,
	// step 7: Up and Down arrow buttons are enabled.
	<Picker value={2} width="medium" orientation="vertical" wrap>{pickerList.vegetables}</Picker>,
	// step 8: The arrows buttons disappear.
	<Picker value={2} width="medium" orientation="vertical" joined>{pickerList.vegetables}</Picker>,
	// step 9: Item transition effect in picker is disabled.
	<Picker value={2} width="medium" orientation="vertical" noAnimation>{pickerList.vegetables}</Picker>,
	// step 10: Picker is disabled.
	<Picker value={2} width="medium" orientation="vertical" disabled>{pickerList.vegetables}</Picker>,
	// step 11: *minus* displays above the label.
	<Picker value={2} width="medium" orientation="vertical" incrementIcon="minus">{pickerList.vegetables}</Picker>,
	// step 12: *play* displays below the label.
	<Picker value={2} width="medium" orientation="vertical" decrementIcon="play">{pickerList.vegetables}</Picker>,
	// end of [QWTC-2213]

	<Picker value={1} width="medium" orientation="vertical" joined>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation disabled>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>,

	// title
	<Picker title="Title">{['Hello', 'Hello']}</Picker>,
	<Picker inlineTitle title="Title">{['Hello', 'Hello']}</Picker>,
	<Picker css={css} inlineTitle title="Title">{['Hello', 'Hello']}</Picker>,

	// *************************************************************
	// joined and focused
	// *************************************************************
	...withConfig({focus: true}, [
		<Picker joined>{pickerList.airports}</Picker>,
		<Picker disabled joined>{pickerList.airports}</Picker>,
		<Picker width="small" joined>{pickerList.airports}</Picker>,
		<Picker width="medium" joined>{pickerList.airports}</Picker>,
		<Picker width="large" joined>{pickerList.airports}</Picker>,
		<Picker orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker disabled orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker width="small" orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker width="medium" orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker width="large" orientation="vertical" joined>{pickerList.airports}</Picker>
	]),

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************

	// Ellipses displays for RTL Text in RTL Locale - [QWTC-2198]
	// Marked part automated as cannnot check for marquee (step 4 - part 3)
	// Step 4 - part 1: the RTL text displays with the ellipsis displaying on the left side of the text.
	// Step 4 - part 2: the Right arrow button is disabled.
	{
		locale: 'ar-SA',
		component: <Picker value={3} width="medium">{pickerList.airports}</Picker>
	},
	// end of [QWTC-2198]

	{
		locale: 'ar-SA',
		component: <Picker>{[]}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker>{['Hello', 'Hello']}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker decrementIcon incrementIcon>hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker>hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker disabled>hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={1}>{pickerList.vegetables}</Picker>
	},

	// Picker is disabled (since it only has one item)
	{
		locale: 'ar-SA',
		component: <Picker>{pickerList.oneAirport}</Picker>
	},

	// tallCharacters: Change 'width', 'wrap', 'joined', 'changedBy', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - [QWTC-2215]
	// Marked part automated due to Marquee and Click actions
	// Step 2: Tall characters display fully and are not truncated.
	{
		locale: 'ar-SA',
		component: <Picker width="large">{pickerList.tall}</Picker>
	},
	// Step 3: Picker width is reduced.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium">{pickerList.tall}</Picker>
	},
	// Step 4: 3 ellipsis display on the right of the Picker text.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="small">{pickerList.tall}</Picker>
	},
	// Step 5: Both Right (＞) and Left (＜) arrows buttons are enabled.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" wrap>{pickerList.tall}</Picker>
	},
	// Step 6: The arrow buttons disappear.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" joined>{pickerList.tall}</Picker>
	},
	// Step 7: The arrow buttons appear.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" joined changedBy="arrow">{pickerList.tall}</Picker>
	},
	// Step 8: Cannot verify here that Picker text transitions very quickly from one to the other without animation.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" noAnimation>{pickerList.tall}</Picker>
	},
	// Step 9:  Picker is disabled.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" disabled>{pickerList.tall}</Picker>
	},
	// Step 10: 'minus' symbol displays on the Right (＞) of the Picker text.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" incrementIcon="minus">{pickerList.tall}</Picker>
	},
	// Step 11: 'backward' symbol displays on the Left (＜) of the Picker text. 'plus' symbol displays on the Right (＞) of the Picker text.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" decrementIcon="backward" incrementIcon="plus">{pickerList.tall}</Picker>
	},
	// end of [QWTC-2215]

	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="small">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" wrap>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" joined>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={1} width="medium" joined>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" joined changedBy="arrow">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={1} width="medium" joined changedBy="arrow">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" noAnimation>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" disabled>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" incrementIcon="minus">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" decrementIcon="play">{pickerList.vegetables}</Picker>
	},

	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined noAnimation>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined noAnimation disabled>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>
	},

	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined changedBy="arrow">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined changedBy="arrow" noAnimation>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined changedBy="arrow" noAnimation disabled>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined changedBy="arrow" noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" wrap joined changedBy="arrow" noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>
	},

	// *************************************************************
	// locale = 'ar-SA' and vertical
	// *************************************************************

	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical">{[]}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical">{['Hello', 'Hello']}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker decrementIcon incrementIcon orientation="vertical">hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker decrementIcon="minus" incrementIcon="plus" orientation="vertical">hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical">hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker disabled orientation="vertical">hello</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={1} orientation="vertical">{pickerList.vegetables}</Picker>
	},

	// tallCharacters: are not truncated when 'orientation' is changed to 'Vertical' - [QWTC-2216]
	// Marked part auotomated due to one click required
	{
		locale: 'ar-SA',
		component: <Picker value={0} width="large" orientation="vertical">{pickerList.tall}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={1} width="large" orientation="vertical">{pickerList.tall}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" orientation="vertical">{pickerList.tall}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={3} width="large" orientation="vertical">{pickerList.tall}</Picker>
	},
	// end of [QWTC-2216]

	// oneItem: Change 'orientation'to Vertical, 'joined', 'disabled' dynamically - [QWTC-2212]
	// Step 2 Picker is disabled (since it only has one item).
	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical">{pickerList.oneAirport}</Picker>
	},
	// end of [QWTC-2212]

	// Change 'width', 'wrap', 'joined', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - Vertical Picker - [QWTC-2213]
	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical" />
	},
	// step 3:  Picker displays vertically.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical">{pickerList.vegetables}</Picker>
	},
	// step 4: Text of picker reduces and shows 3 ellipsis.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="small" orientation="vertical">{pickerList.vegetables}</Picker>
	},
	// step 5: Text of picker displays.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" orientation="vertical">{pickerList.vegetables}</Picker>
	},
	// step 7: Up and Down arrow buttons are enabled.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical" wrap>{pickerList.vegetables}</Picker>
	},
	// step 8: The arrows buttons disappear.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical" joined>{pickerList.vegetables}</Picker>
	},
	// step 9: Item transition effect in picker is disabled.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical" noAnimation>{pickerList.vegetables}</Picker>
	},
	// step 10: Picker is disabled.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical" disabled>{pickerList.vegetables}</Picker>
	},
	// step 11: *minus* displays above the label.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical" incrementIcon="minus">{pickerList.vegetables}</Picker>
	},
	// step 12: *play* displays below the label.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="medium" orientation="vertical" decrementIcon="play">{pickerList.vegetables}</Picker>
	},
	// end of [QWTC-2213]

	{
		locale: 'ar-SA',
		component: <Picker value={1} width="medium" orientation="vertical" joined>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" orientation="vertical" wrap joined>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" orientation="vertical" wrap joined noAnimation>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" orientation="vertical" wrap joined noAnimation disabled>{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" orientation="vertical" wrap joined noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker width="medium" orientation="vertical" wrap joined noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>
	},
	// title
	{
		locale: 'ar-SA',
		component: <Picker title="Title">{pickerList.vegetables}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker inlineTitle title="Title">{pickerList.vegetables}</Picker>
	},

	// *************************************************************
	// joined and focused
	// *************************************************************
	...withConfig({focus: true, locale: 'ar-SA'}, [
		<Picker joined>{pickerList.airports}</Picker>,
		<Picker disabled joined>{pickerList.airports}</Picker>,
		<Picker width="small" joined>{pickerList.airports}</Picker>,
		<Picker width="medium" joined>{pickerList.airports}</Picker>,
		<Picker width="large" joined>{pickerList.airports}</Picker>,
		<Picker orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker disabled orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker width="small" orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker width="medium" orientation="vertical" joined>{pickerList.airports}</Picker>,
		<Picker width="large" orientation="vertical" joined>{pickerList.airports}</Picker>
	])
];

export default PickerTests;
