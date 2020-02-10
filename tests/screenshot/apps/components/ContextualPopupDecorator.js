import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';
import Button from '../../../../Button';
import React from 'react';

const ContextualPopupButton = ContextualPopupDecorator(Button);
const Popup = () => <div>hello</div>;

const ContextualPopupDecoratorTests = [
	// ContextualPopupDecorator: Popup Displays and Hides - [GT-21638]
	<ContextualPopupButton popupComponent={Popup}>Button</ContextualPopupButton>,
	// ContextualPopupDecorator: Popup Displays and Hides - [GT-21638]
	<ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
	// Tooltip will be pushed Down because it's too close to the top edge of the screen (auto-swap code)
	<ContextualPopupButton open direction="up" popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open direction="down" popupComponent={Popup}>Button</ContextualPopupButton>,
	// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code)
	<ContextualPopupButton open direction="left" popupComponent={Popup}>Button</ContextualPopupButton>,
	<ContextualPopupButton open direction="right" popupComponent={Popup}>Button</ContextualPopupButton>,
	{
		component: <ContextualPopupButton open direction="up" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualPopupButton open direction="down" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualPopupButton open direction="left" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualPopupButton open direction="right" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualPopupButton open direction="up" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualPopupButton open direction="down" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code) - even with padding
	{
		component: <ContextualPopupButton open direction="left" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualPopupButton open direction="right" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		textSize: 'large',
		component: <ContextualPopupButton open direction="up" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		textSize: 'large',
		component: <ContextualPopupButton open direction="down" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code) - even with padding
	{
		textSize: 'large',
		component: <ContextualPopupButton open direction="left" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		textSize: 'large',
		component: <ContextualPopupButton open direction="right" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// ContextualPopupDecorator: Popup Displays and Hides - [GT-21638]
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton popupComponent={Popup}>Button</ContextualPopupButton>
	},
	// ContextualPopupDecorator: Popup Displays and Hides - [GT-21638]
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open popupComponent={Popup}>Button</ContextualPopupButton>
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>
	},
	// Tooltip will be pushed Down because it's too close to the top edge of the screen (auto-swap code)
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="up" popupComponent={Popup}>Button</ContextualPopupButton>
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="down" popupComponent={Popup}>Button</ContextualPopupButton>
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="left" popupComponent={Popup}>Button</ContextualPopupButton>
	},
	// Tooltip will be partially hidden to the Right because it's too close to the right edge of the screen (auto-swap code)
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="right" popupComponent={Popup}>Button</ContextualPopupButton>
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="up" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="down" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="left" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="right" popupComponent={Popup}>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="up" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="down" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="left" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	// Tooltip will be partially hidden to the Right because it's too close to the right edge of the screen (auto-swap code)
	{
		locale: 'ar-SA',
		component: <ContextualPopupButton open direction="right" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <ContextualPopupButton open direction="up" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <ContextualPopupButton open direction="down" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	// Tooltip will be pushed Right because it's too close to the left edge of the screen (auto-swap code) - even with padding
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <ContextualPopupButton open direction="left" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <ContextualPopupButton open direction="right" popupComponent={Popup} showCloseButton>Button</ContextualPopupButton>,
		wrapper: {
			padded: true
		}
	}
];
export default ContextualPopupDecoratorTests;
