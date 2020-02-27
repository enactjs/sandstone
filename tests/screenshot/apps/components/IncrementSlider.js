import IncrementSlider from '../../../../IncrementSlider';
import React from 'react';

const IncrementSliderTests = [
	<IncrementSlider />,
	// backgroundProgress - value
	<IncrementSlider backgroundProgress={0} value={0} />,
	<IncrementSlider backgroundProgress={0.3} value={30} />,
	<IncrementSlider backgroundProgress={0.3} value={60} />,
	<IncrementSlider backgroundProgress={0.6} value={30} />,
	<IncrementSlider backgroundProgress={1} value={0} />,
	<IncrementSlider backgroundProgress={1} value={60} />,
	// backgroundProgress - value - noFill
	<IncrementSlider backgroundProgress={0} value={0} noFill />,
	<IncrementSlider backgroundProgress={0.3} value={30} noFill />,
	<IncrementSlider backgroundProgress={0.3} value={60} noFill />,
	<IncrementSlider backgroundProgress={0.6} value={30} noFill />,
	<IncrementSlider backgroundProgress={1} value={0} noFill />,
	<IncrementSlider backgroundProgress={1} value={60} noFill />,
	// backgroundProgress - value - noFill - disabled
	<IncrementSlider backgroundProgress={0} value={0} noFill disabled />,
	<IncrementSlider backgroundProgress={0.3} value={30} noFill disabled />,
	<IncrementSlider backgroundProgress={0.3} value={60} noFill disabled />,
	<IncrementSlider backgroundProgress={0.6} value={30} noFill disabled />,
	<IncrementSlider backgroundProgress={1} value={0} noFill disabled />,
	<IncrementSlider backgroundProgress={1} value={60} noFill disabled />,
	// backgroundProgress - textSize: 'large'
	{
		textSize: 'large',
		component: <IncrementSlider backgroundProgress={0.6} value={30} noFill disabled />
	},
	{
		textSize: 'large',
		component: <IncrementSlider backgroundProgress={0.6} value={30} noFill />
	},
	{
		textSize: 'large',
		component: <IncrementSlider backgroundProgress={0.6} value={30} />
	},

	// defaultValue - value - noFill - disabled
	<IncrementSlider defaultValue={50} />,
	<IncrementSlider value={50} />,
	// Change 'noFill' dynamically - Bar is not colored [GT-27828]
	// Step 3 only - part automated only due to Step 4
	<IncrementSlider value={50} noFill />,

	<IncrementSlider value={100} />,
	// Disable Functionality of Paging Control Buttons - [GT-22067]
	// Step 3 only - part automated only due to Step 4
	<IncrementSlider disabled />,

	<IncrementSlider defaultValue={50} disabled />,
	<IncrementSlider defaultValue={100} disabled />,
	// value, min, max,
	<IncrementSlider min={-50} />,
	<IncrementSlider max={50} />,
	<IncrementSlider max={50} value={50} />,
	// 'min', 'max', and 'value' knobs Remain within Boundaries - [GT-21737]
	// Step 3,4,5 only - part automated only due to Step 6
	<IncrementSlider min={50} max={50} value={50} />,
	// Change 'min', 'max', and 'value' dynamically - [GT-26837]
	// Step 3
	<IncrementSlider min={4} max={10} value={2} />,
	// Step 4
	<IncrementSlider min={4} max={10} value={15} />,
	// Step 5
	<IncrementSlider min={4} max={10} value={4} />,
	// Step 6
	<IncrementSlider min={4} max={10} value={6} />,

	<IncrementSlider incrementIcon="plus" decrementIcon="minus" />,
	// There is no testing for RTL since there is no visual difference between LTR and RTL
	// *************************************************************
	// vertical
	// *************************************************************
	<IncrementSlider orientation="vertical" />,
	// backgroundProgress - value
	<IncrementSlider orientation="vertical" backgroundProgress={0} value={0} />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.3} value={30} />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.3} value={60} />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.6} value={30} />,
	<IncrementSlider orientation="vertical" backgroundProgress={1} value={0} />,
	<IncrementSlider orientation="vertical" backgroundProgress={1} value={60} />,
	// backgroundProgress - value - noFill
	<IncrementSlider orientation="vertical" backgroundProgress={0} value={0} noFill />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.3} value={30} noFill />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.3} value={60} noFill />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.6} value={30} noFill />,
	<IncrementSlider orientation="vertical" backgroundProgress={1} value={0} noFill />,
	<IncrementSlider orientation="vertical" backgroundProgress={1} value={60} noFill />,
	// backgroundProgress - value - noFill - disabled
	<IncrementSlider orientation="vertical" backgroundProgress={0} value={0} noFill disabled />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.3} value={30} noFill disabled />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.3} value={60} noFill disabled />,
	<IncrementSlider orientation="vertical" backgroundProgress={0.6} value={30} noFill disabled />,
	<IncrementSlider orientation="vertical" backgroundProgress={1} value={0} noFill disabled />,
	<IncrementSlider orientation="vertical" backgroundProgress={1} value={60} noFill disabled />,
	// backgroundProgress - textSize: 'large'
	{
		textSize: 'large',
		component: <IncrementSlider orientation="vertical" backgroundProgress={0.6} value={30} noFill disabled />
	},
	{
		textSize: 'large',
		component: <IncrementSlider orientation="vertical" backgroundProgress={0.6} value={30} noFill />
	},
	{
		textSize: 'large',
		component: <IncrementSlider orientation="vertical" backgroundProgress={0.6} value={30} />
	},

	// defaultValue - value - noFill - disabled
	<IncrementSlider orientation="vertical" defaultValue={50} />,
	<IncrementSlider orientation="vertical" value={50} />,
	// Change 'noFill' dynamically - Bar is not colored [GT-27828]
	// Step 3 only - part automated only due to Step 4
	<IncrementSlider orientation="vertical" value={50} noFill />,

	<IncrementSlider orientation="vertical" value={100} />,
	// Disable Functionality of Paging Control Buttons - [GT-22067]
	// Step 3 only - part automated only due to Step 4
	<IncrementSlider orientation="vertical" disabled />,
	<IncrementSlider orientation="vertical" defaultValue={50} disabled />,
	<IncrementSlider orientation="vertical" defaultValue={100} disabled />,

	// value, min, max,
	<IncrementSlider orientation="vertical" min={-50} />,
	<IncrementSlider orientation="vertical" max={50} />,
	<IncrementSlider orientation="vertical" max={50} value={50} />,
	// 'min', 'max', and 'value' knobs Remain within Boundaries - [GT-21737]
	// Step 3,4,5 only - part automated only due to Step 6
	<IncrementSlider orientation="vertical" min={50} max={50} value={50} />,
	// Change 'min', 'max', and 'value' dynamically - [GT-26837]
	// Step 3
	<IncrementSlider orientation="vertical" min={4} max={10} value={2} />,
	// Step 4
	<IncrementSlider orientation="vertical" min={4} max={10} value={15} />,
	// Step 5
	<IncrementSlider orientation="vertical" min={4} max={10} value={4} />,
	// Step 6
	<IncrementSlider orientation="vertical" min={4} max={10} value={6} />,

	<IncrementSlider orientation="vertical" incrementIcon="plus" decrementIcon="minus" />
];
export default IncrementSliderTests;
