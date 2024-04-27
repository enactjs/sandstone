import {hexToRGB} from './hexToRGB';

export const generateStylesheet = (componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, textColor, subTextColor) => {
	const textColorRGB = hexToRGB(textColor);
	const subTextColorRGB = hexToRGB(subTextColor);
	const focusBgColorRGB = hexToRGB(focusBackgroundColor);
	const popupBgColorRGB = hexToRGB(popupBackgroundColor);

	return {
		'--sand-text-color-rgb': `${textColorRGB}`,
		'--sand-text-sub-color': `${subTextColor}`,
		'--sand-component-text-color-rgb': `${textColorRGB}`,
		'--sand-component-text-sub-color-rgb': `${subTextColorRGB}`,
		'--sand-component-bg-color': `${componentBackgroundColor}`,
		'--sand-component-active-indicator-bg-color': `${focusBackgroundColor}`,
		'--sand-focus-bg-color-rgb': `${focusBgColorRGB}`,
		'--sand-selected-color-rgb': `${textColorRGB}`,
		'--sand-disabled-focus-bg-color': `${subTextColor}`,
		'--sand-overlay-bg-color-rgb': `${popupBgColorRGB}`,
		'--sand-toggle-on-color': `${focusBackgroundColor}`,
		'--sand-progress-color-rgb': `${textColorRGB}`,
		'--sand-checkbox-color': `${focusBackgroundColor}`
	};
};
