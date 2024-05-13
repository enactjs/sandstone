import {hexToRGB} from './hexToRGB';

export const generateStylesheet = (componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, textColor, subTextColor) => {
	const textColorRGB = hexToRGB(textColor);
	const subTextColorRGB = hexToRGB(subTextColor);
	const focusBgColorRGB = hexToRGB(focusBackgroundColor);
	const popupBgColorRGB = hexToRGB(popupBackgroundColor);

	// return stylesheet for default sandstone theme
	return {
		// '--sand-bg-color': `${backgroundColor}`,
		'--sand-text-color-rgb': `${textColorRGB}`,
		'--sand-text-sub-color': `${subTextColor}`,
		'--sand-shadow-color-rgb': '0, 0, 0',
		'--sand-component-text-color-rgb': `${textColorRGB}`,
		'--sand-component-text-sub-color-rgb': `${subTextColorRGB}`,
		'--sand-component-bg-color': `${componentBackgroundColor}`,
		'--sand-component-active-indicator-bg-color': `${focusBackgroundColor}`,
		'--sand-component-inactive-indicator-bg-color': '#9DA2A7',
		'--sand-focus-text-color': '#FFFFFF',
		'--sand-focus-bg-color-rgb': `${focusBgColorRGB}`,
		'--sand-component-focus-text-color-rgb': '76, 80, 89',
		'--sand-component-focus-active-indicator-bg-color': '#4C5059',
		'--sand-component-focus-inactive-indicator-bg-color':' #B8B9BB',
		'--sand-selected-color-rgb': `${textColorRGB}`,
		'--sand-selected-text-color': '#E6E6E6',
		'--sand-selected-bg-color': '#3E454D',
		'--sand-disabled-focus-bg-color': `${subTextColor}`,
		'--sand-disabled-selected-color': '#4C5059',
		'--sand-disabled-selected-bg-color':' #E6E6E6',
		'--sand-disabled-selected-focus-color': '#E6E6E6',
		'--sand-disabled-selected-focus-bg-color':' #4C5059',
		'--sand-fullscreen-bg-color': '#000000',
		'--sand-overlay-bg-color-rgb': `${popupBgColorRGB}`,
		'--sand-selection-color': '#4C5059',
		'--sand-selection-bg-color': '#3399FF',
		'--sand-toggle-off-color': '#AEAEAE',
		'--sand-toggle-off-bg-color': '#777777',
		'--sand-toggle-on-color': `${focusBackgroundColor}`,
		'--sand-toggle-on-bg-color': '#30AD6B',
		'--sand-progress-color-rgb': `${textColorRGB}`,
		'--sand-progress-buffer-color':' #6B6D73',
		'--sand-progress-bg-color-rgb': '55, 58, 65',
		'--sand-progress-highlighted-color': '#FFFFFF',
		'--sand-progress-slider-color': '#8D9298',
		'--sand-spinner-color-rgb': '255, 255, 255',
		'--sand-checkbox-color': `${focusBackgroundColor}`,
		'--sand-item-disabled-focus-bg-color': '#E6E6E6',
		'--sand-keyguide-bg-color-rgb': '55, 58, 65',
		'--sand-slider-disabled-knob-bg-color': '#666666',
		'--sand-alert-overlay-bg-color-rgb': '202, 203, 204',
		'--sand-alert-overlay-text-color-rgb': `${textColorRGB}`,
		'--sand-alert-overlay-text-sub-color': '#2E3239',
		'--sand-alert-overlay-focus-text-color': `${subTextColorRGB}`,
		'--sand-alert-overlay-disabled-selected-color': '#FFFFFF',
		'--sand-alert-overlay-disabled-selected-bg-color': '#788688',
		'--sand-alert-overlay-disabled-selected-focus-color': `${focusBackgroundColor}`,
		'--sand-alert-overlay-disabled-selected-focus-bg-color': '#4C5059',
		'--sand-alert-overlay-progress-color-rgb': '55, 58, 65',
		'--sand-alert-overlay-progress-bg-color-rgb': '161, 161, 161',
		'--sand-alert-overlay-checkbox-color': '#858B92',
		'--sand-alert-overlay-checkbox-disabled-selected-color': '#FFFFFF',
		'--sand-alert-overlay-formcheckboxitem-focus-text-color': '#575E66',
		'--sand-alert-overlay-item-disabled-focus-bg-color': '#989CA2'
	};
};
