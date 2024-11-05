import {Header} from '../../../../Panels';
import Button from '../../../../Button';
import Steps from '../../../../Steps';
import {Fragment} from 'react';

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
		<Fragment>
			<Button icon="search" />
			<Button icon="ellipsis" />
		</Fragment>
	)
};

const headerWithChildrenTests = [
	<Header type="standard" title="Title">{dropIn.doubleButtons}</Header>,
	<Header type="standard" title="Title" subtitle="Subtitle">{dropIn.doubleButtons}</Header>
];

const specificTests = [
	// [QWTC-1886]
	<Header type="standard" title="Enact" slotAfter={dropIn.singleButton} />,
	// [QWTC-1881]
	<Header type="standard" title="Enact" slotAfter={dropIn.singleButton} subtitle="An app framework" />,
	// [QWTC-1885]
	<Header type="compact" title="Enact" slotAfter={dropIn.singleButton} />,
	// [QWTC-1880]
	<Header type="compact" title="Enact" slotAfter={dropIn.singleButton} subtitle="An app framework" />,
	// start of [QWTC-1887]
	<Header type="compact" title="غينيا واستمر" slotAfter={dropIn.singleButton} subtitle="غينيا واستمر" />,
	{
		locale: 'ar-SA',
		component: <Header type="compact" title="غينيا واستمر" subtitle="غينيا واستمر" />
	},
	{
		locale: 'ar-SA',
		component: <Header type="compact" title="غينيا واستمر" slotAfter={dropIn.singleButton} subtitle="غينيا واستمر" />
	},
	// end of [QWTC-1887]

	// [QWTC-1879]
	<Header type="standard" title="ฟิ้  ไั  ஒ  த" slotAfter={dropIn.singleButton} subtitle="ฟิ้  ไั  ஒ  த" />,
	// [QWTC-1878]
	<Header type="compact" title="ฟิ้  ไั  ஒ  த" slotAfter={dropIn.singleButton} subtitle="ฟิ้  ไั  ஒ  த" />,
	// [QWTC-2224]
	<Header type="mini" title="Enact" slotBefore={dropIn.singleButton} />,
	// [QWTC-2225]
	<Header type="mini" title="Enact" slotBefore={dropIn.singleButton} subtitle="An app framework" />,
	// [QWTC-2227]
	<Header centered noCloseButton type="wizard" title="Enact" slotAbove={dropIn.steps}>{dropIn.singleButton}</Header>,
	// [QWTC-2228]
	<Header centered noCloseButton type="wizard" title="Enact" slotAbove={dropIn.steps} slotAfter={dropIn.singleButton} slotBefore={dropIn.singleButton} subtitle="An app framework">{dropIn.singleButton}</Header>
];

const LtrTests = [
	// Initial
	...withProps({type: 'standard'}, baseTests),
	...withProps({type: 'compact'}, baseTests),
	...withProps({type: 'wizard', centered: true}, baseTests),
	...withProps({type: 'mini'}, baseTests),

	// Centered
	// [QWTC-1875]
	...withProps({type: 'standard', centered: true}, baseTests),
	...withProps({type: 'standard', centered: true, slotAfter: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', centered: true, slotBefore: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', centered: true, slotAfter: dropIn.doubleButtons, slotBefore: dropIn.doubleButtons}, baseTests),
	...withProps({type: 'standard', centered: true, slotAfter: dropIn.doubleButtons, slotBefore: dropIn.singleButton}, baseTests),
	...withProps({type: 'compact', centered: true}, baseTests),

	// Standard Type Slots
	// [QWTC-2137]
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
	...withProps({type: 'wizard', centered: true, slotAbove: dropIn.steps, slotBefore: dropIn.backButton, slotAfter: dropIn.nextButton}, baseTests),

	// Mini Type Slots
	...withProps({type: 'mini'}, headerWithChildrenTests),

	// noSubtitle
	...withProps({type: 'standard', noSubtitle: true}, baseTests),
	...withProps({type: 'compact', noSubtitle: true}, baseTests),
	...withProps({type: 'wizard', noSubtitle: true}, baseTests),
	...withProps({type: 'mini', noSubtitle: true}, baseTests),

	// shadowed
	...withProps({shadowed: true}, baseTests)
];

const HeaderTests = [
	...LtrTests,
	...specificTests,
	...withConfig({locale: 'ar-SA'}, LtrTests),

	// Tallglyph Validation
	...withConfig({locale: 'vi-VN'}, [
		// Initial
		...withProps({type: 'standard'}, baseTests),
		...withProps({type: 'compact'}, baseTests),
		...withProps({type: 'wizard', centered: true}, baseTests)
	])
];

export default HeaderTests;
