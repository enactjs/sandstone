import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';
import Button from '../../../../Button';
import React from 'react';

import {withConfig} from './utils';

const ContextualPopupButton = ContextualPopupDecorator(Button);
const Popup = () => <div>hello</div>;

const ContextualPopupDecoratorTests = [
	<ContextualPopupButton popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>,
	// Tooltip will be pushed Down because it's too close to the top edge of the screen (auto-swap code)
	<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
	// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code)
	<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>,
	...withConfig({
		wrapper: {
			padded: true
		}
	}, [
		<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="above left" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="above right" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="below left" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="below right" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="left top" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="left bottom" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="right top" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="right bottom" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
		// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code) - even with padding
		<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>,
		...withConfig({
			textSize: 'large'
		}, [
			<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
			// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code) - even with padding
			<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>,
			// [GT-28292] - Popup Retains Left Direction
			<ContextualPopupButton open direction="left" popupComponent={Popup}>Button</ContextualPopupButton>
		])
	]),
	// *************************************************************
	// locale = 'ur-PK'
	// *************************************************************
	// [GT-28299]
	{
		locale: 'ur-PK',
		textSize: 'large',
		component: <ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	...withConfig({
		locale: 'ar-SA'
	}, [
		<ContextualPopupButton popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>,
		// Tooltip will be pushed Down because it's too close to the top edge of the screen (auto-swap code)
		<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
		<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
		// Tooltip will be partially hidden to the Right because it's too close to the right edge of the screen (auto-swap code)
		<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>,
		...withConfig({
			wrapper: {
				padded: true
			}
		}, [
			<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
			<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
			// Tooltip will be partially hidden to the Right because it's too close to the right edge of the screen (auto-swap code)
			<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>
			...withConfig({
				textSize: 'large'
			}, [
				// [GT-28299]
				<ContextualPopupButton open direction="above center" popupComponent={Popup}>Button</ContextualPopupButton>,
				// [GT-28299]
				<ContextualPopupButton open direction="below center" popupComponent={Popup}>Button</ContextualPopupButton>,
				// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code) - even with padding
				<ContextualPopupButton open direction="left middle" popupComponent={Popup}>Button</ContextualPopupButton>,
				<ContextualPopupButton open direction="right middle" popupComponent={Popup}>Button</ContextualPopupButton>
			])
		])
	])
];
export default ContextualPopupDecoratorTests;
