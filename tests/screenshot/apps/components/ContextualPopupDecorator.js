import ri from '@enact/ui/resolution';
import React from 'react';

import Button from '../../../../Button';
import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';

import {withConfig} from './utils';

const Popup = () => <div>hello</div>;
const Wrapped = ContextualPopupDecorator(Button);
const ContextualPopupButton = props => (
	<Wrapped open {...props} popupComponent={Popup}>
		Button
	</Wrapped>
);

const padded = ri.scaleToRem(120);
const wrapper = {
	padded
};

const ContextualPopupDecoratorTests = [
	// Sanity test to ensure an activator with a closed ContextualPopup renders consistently
	<ContextualPopupButton open={false} />,
	...withConfig({wrapper}, [
		<ContextualPopupButton direction="above center" />,
		<ContextualPopupButton direction="above left" />,
		<ContextualPopupButton direction="above right" />,
		<ContextualPopupButton direction="below center" />,
		<ContextualPopupButton direction="below left" />,
		<ContextualPopupButton direction="below right" />,
		<ContextualPopupButton direction="left middle" />,
		<ContextualPopupButton direction="left top" />,
		<ContextualPopupButton direction="left bottom" />,
		<ContextualPopupButton direction="right middle" />,
		<ContextualPopupButton direction="right top" />,
		<ContextualPopupButton direction="right bottom" />,
		// *************************************************************
		// locale = 'ar-SA'
		// *************************************************************
		...withConfig({locale: 'ar-SA'}, [
			<ContextualPopupButton />,
			<ContextualPopupButton direction="above center" />,
			<ContextualPopupButton direction="below center" />,
			<ContextualPopupButton direction="left middle" />,
			<ContextualPopupButton direction="right middle" />
		])
	]),
	// *************************************************************
	// Test auto swapping side at boundaries
	// *************************************************************
	{
		wrapper: {
			padded: `0 ${padded} ${padded} ${padded}`
		},
		component: <ContextualPopupButton direction="above center" />
	},
	{
		locale: 'ar-SA',
		wrapper: {
			padded: `${padded} ${padded} ${padded} 0`
		},
		// This overflows to the right which seems like a bug - RD
		component: <ContextualPopupButton direction="right middle" />
	},
	{
		wrapper: {
			padded: `${padded} ${padded} ${padded} 0`
		},
		component: <ContextualPopupButton direction="left middle" />
	}
];

export default ContextualPopupDecoratorTests;
