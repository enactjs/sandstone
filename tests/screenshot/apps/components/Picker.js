import Picker from '../../../../Picker';
import React from 'react';

const pickerList = {
	tall: [
		'नरेंद्र मोदी',
		' ฟิ้  ไั  ஒ  து',
		'ÃÑÕÂÊÎÔÛÄËÏÖÜŸ',
		'តន្ត្រី្'
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
	<Picker decrementIcon incrementIcon>hello</Picker>,
	<Picker>hello</Picker>,
	<Picker disabled>hello</Picker>,
	<Picker>{pickerList.vegetables}</Picker>,
	<Picker value={1}>{pickerList.vegetables}</Picker>,

	// Picker is disabled (since it only has one item)
	<Picker>{pickerList.oneAirport}</Picker>,

	// Locale Font Displays on Picker - [GT-28678]
	<Picker value={0}>{pickerList.tall}</Picker>,
	{
		locale: 'th-TH',
		component: <Picker value={0}>{pickerList.tall}</Picker>
	},
	// end of [GT-28678]

	// tallCharacters: Change 'width', 'wrap', 'joined', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - [GT-28679]
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
	// Step 7: Cannot verify here that Picker text transitions very quickly from one to the other without animation.
	<Picker value={2} width="large" noAnimation>{pickerList.tall}</Picker>,
	// Step 8:  Picker is disabled.
	<Picker value={2} width="large" disabled>{pickerList.tall}</Picker>,
	// Step 9: 'minus' symbol displays on the Right (＞) of the Picker text.
	<Picker value={2} width="large" incrementIcon="minus">{pickerList.tall}</Picker>,
	// Step 10: 'backward' symbol displays on the Left (＜) of the Picker text. 'plus' symbol displays on the Right (＞) of the Picker text.
	<Picker value={2} width="large" decrementIcon="backward" incrementIcon="plus">{pickerList.tall}</Picker>,
	// end of [GT-28679]

	<Picker value={2} width="medium">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="small">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="large">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" wrap>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" joined>{pickerList.vegetables}</Picker>,
	<Picker value={1} width="medium" joined>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" noAnimation>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" disabled>{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker value={2} width="medium" decrementIcon="play">{pickerList.vegetables}</Picker>,

	<Picker width="medium" wrap joined>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation disabled>{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker width="medium" wrap joined noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>,

	// Ellipsis Displays with RTL Text in LTR Locale - [GT-28663]
	// Marked part automated as cannnot check for marquee (step 4 - part 2)
	// Step 3 - part 1: The RTL text displays. The Right arrow button is disabled.
	// Step 4 - part 1: Ellipsis display on the left side of the text.
	<Picker value={3} width="medium">{pickerList.airports}</Picker>,
	// end of [GT-28663]

	// *************************************************************
	// vertical
	// *************************************************************

	<Picker orientation="vertical">{[]}</Picker>,
	<Picker orientation="vertical">{['Hello', 'Hello']}</Picker>,
	<Picker decrementIcon incrementIcon orientation="vertical">hello</Picker>,
	<Picker orientation="vertical">hello</Picker>,
	<Picker disabled orientation="vertical">hello</Picker>,
	<Picker orientation="vertical">{pickerList.vegetables}</Picker>,
	<Picker value={1} orientation="vertical">{pickerList.vegetables}</Picker>,

	// tallCharacters: are not truncated when 'orientation' is changed to 'Vertical' - [GT-28680]
	// Marked part auotomated due to one click required
	<Picker value={0} width="large" orientation="vertical">{pickerList.tall}</Picker>,
	<Picker value={1} width="large" orientation="vertical">{pickerList.tall}</Picker>,
	// end of [GT-28680]

	// oneItem: Change 'orientation'to Vertical, 'joined', 'disabled' dynamically - [GT-28676]
	// Step 2 Picker is disabled (since it only has one item).
	<Picker orientation="vertical">{pickerList.oneAirport}</Picker>,
	// end of [GT-28676]

	// Change 'width', 'wrap', 'joined', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - Vertical Picker - [GT-28677]
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
	// end of [GT-28677]

	<Picker value={1} width="medium" orientation="vertical" joined>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation disabled>{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation disabled incrementIcon="minus">{pickerList.vegetables}</Picker>,
	<Picker width="medium" orientation="vertical" wrap joined noAnimation disabled decrementIcon="play">{pickerList.vegetables}</Picker>,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************

	// Ellipses displays for RTL Text in RTL Locale - [GT-28662]
	// Marked part automated as cannnot check for marquee (step 4 - part 3)
	// Step 4 - part 1: the RTL text displays with the ellipsis displaying on the left side of the text.
	// Step 4 - part 2: the Right arrow button is disabled.
	{
		locale: 'ar-SA',
		component: <Picker value={3} width="medium">{pickerList.airports}</Picker>
	},
	// end of [GT-28662]

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

	// tallCharacters: Change 'width', 'wrap', 'joined', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - [GT-28679]
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
	// Step 7: Cannot verify here that Picker text transitions very quickly from one to the other without animation.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" noAnimation>{pickerList.tall}</Picker>
	},
	// Step 8:  Picker is disabled.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" disabled>{pickerList.tall}</Picker>
	},
	// Step 9: 'minus' symbol displays on the Right (＞) of the Picker text.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" incrementIcon="minus">{pickerList.tall}</Picker>
	},
	// Step 10: 'backward' symbol displays on the Left (＜) of the Picker text. 'plus' symbol displays on the Right (＞) of the Picker text.
	{
		locale: 'ar-SA',
		component: <Picker value={2} width="large" decrementIcon="backward" incrementIcon="plus">{pickerList.tall}</Picker>
	},
	// end of [GT-28679]

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

	// tallCharacters: are not truncated when 'orientation' is changed to 'Vertical' - [GT-28680]
	// Marked part auotomated due to one click required
	{
		locale: 'ar-SA',
		component: <Picker value={0} width="large" orientation="vertical">{pickerList.tall}</Picker>
	},
	{
		locale: 'ar-SA',
		component: <Picker value={1} width="large" orientation="vertical">{pickerList.tall}</Picker>
	},
	// end of [GT-28680]

	// oneItem: Change 'orientation'to Vertical, 'joined', 'disabled' dynamically - [GT-28676]
	// Step 2 Picker is disabled (since it only has one item).
	{
		locale: 'ar-SA',
		component: <Picker orientation="vertical">{pickerList.oneAirport}</Picker>
	},
	// end of [GT-28676]

	// Change 'width', 'wrap', 'joined', 'noAnimation', 'disabled', 'incrementIcon', decrementIcon' dynamically - Vertical Picker - [GT-28677]
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
	// end of [GT-28677]

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
	}

];

export default PickerTests;
