import {Header} from '../../../../Panels';
import Button from '../../../../Button';
import Steps from '../../../../Steps';
import React from 'react';

import {withConfig, withProps} from './utils';

const baseTests = [
	<Header type="standard" title="Title" />,
	<Header type="standard" title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." marqueeOn="hover" />,
	<Header type="standard" title="Title" subtitle="Subtitle" />,
	<Header type="standard" title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." subtitle="Subtitle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." marqueeOn="hover" />
];

const dropIn = {
	steps: <Steps current={3} total={5} />,
	backButton: <Button icon="arrowlargeleft" />,
	nextButton: <Button icon="arrowlargeright" />,
	singleButton: <Button icon="ellipsis" />,
	doubleButtons: (
		<React.Fragment>
			<Button icon="search" />
			<Button icon="ellipsis" />
		</React.Fragment>
	)
};


const LtrTests = [
	// Initial
	...withProps({type: 'standard'}, baseTests),
	...withProps({type: 'compact'}, baseTests),
	...withProps({type: 'wizard', centered: true}, baseTests),

	// Centered
	...withProps({type: 'standard', centered: true}, baseTests),
	...withProps({type: 'standard', centered: true, slotAfter: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', centered: true, slotBefore: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', centered: true, slotAfter: dropIn.doubleButtons, slotBefore: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', centered: true, slotAfter: dropIn.doubleButtons, slotBefore: dropIn.singleButton}, baseTests),
	...withProps({type: 'compact', centered: true}, baseTests),

	// Standard Type Slots
	...withProps({type: 'standard', slotAfter: dropIn.singleButton}, baseTests),
	...withProps({type: 'standard', slotAfter: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', slotAfter: dropIn.singleButton, slotBefore: dropIn.singleButton}, baseTests),
	...withProps({type: 'standard', slotAfter: dropIn.doubleButtons, slotBefore: dropIn.singleButton}, baseTests),

	// Compact Type Slots
	...withProps({type: 'compact', slotAfter: dropIn.singleButton}, baseTests),
	...withProps({type: 'compact', slotAfter: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'compact', slotAfter: dropIn.singleButton, slotBefore: dropIn.singleButton}, baseTests),
	...withProps({type: 'compact', slotAfter: dropIn.doubleButtons, slotBefore: dropIn.singleButton}, baseTests),

	// Wizard Type Slots
	...withProps({type: 'wizard', centered: true, slotAbove: dropIn.steps}, baseTests),
	...withProps({type: 'wizard', centered: true, slotBefore: dropIn.backButton, slotAfter: dropIn.nextButton}, baseTests),
	...withProps({type: 'wizard', centered: true, slotAbove: dropIn.steps, slotBefore: dropIn.backButton, slotAfter: dropIn.nextButton}, baseTests)
];

const HeaderTests = [
	...LtrTests,
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default HeaderTests;
