import {Header} from '../../../../Panels';
import Button from '../../../../Button';
import Icon from '../../../../Icon';
import Input from '../../../../Input';
import React from 'react';

const withProps = (props, tests) => {
	return tests.map(t => {
		if (React.isValidElement(t)) {
			return React.cloneElement(t, props);
		}

		return {
			...t,
			component: React.cloneElement(t.component, props)
		};
	});
};

const withConfig = (config, tests) => {
	return tests.map(t => {
		if (React.isValidElement(t)) {
			return {
				...config,
				component: t
			};
		}

		return {
			...t,
			...config
		};
	});
};

const baseTests = [
	<Header type="standard" title="Title" />,
	<Header type="standard" title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." marqueeOn="hover" />,
	<Header type="standard" title="Title" subtitle="Subtitle" />,
	<Header type="standard" title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." subtitle="Subtitle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." marqueeOn="hover" />
];

const dropIn = {
	steps: (
		<React.Fragment>
			<Icon>check</Icon>
			<Icon>check</Icon>
			<Icon>circle</Icon>
			<Icon>4</Icon>
			<Icon>5</Icon>
		</React.Fragment>
	),
	backButton: <Button icon="arrowlargeleft" />,
	nextButton: <Button icon="arrowlargeright" />,
	input: <Input />,
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
	...withProps({type: 'compact', centered: true}, baseTests),

	// with Input
	...withProps({type: 'standard', showInput: true, headerInput: dropIn.input}, baseTests),
	...withProps({type: 'compact', showInput: true, headerInput: dropIn.input}, baseTests),
	...withProps({type: 'wizard', centered: true, showInput: true, headerInput: dropIn.input}, baseTests),

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
