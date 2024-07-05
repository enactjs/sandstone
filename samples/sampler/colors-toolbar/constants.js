import {createContext} from 'react';

// Object containing the default CSS values of Sandstone used for generating custom theme
// NOTE: These values need to be updated when corresponding value from sandstone/styles/colors.less is changed
export const defaultSandstoneColors = {
	componentBackgroundColor: '#7D848C', // equivalent of @sand-component-bg-color - styles/colors.less
	focusBackgroundColor: '#E6E6E6', // equivalent of @sand-focus-bg-color-rgb - styles/colors.less
	popupBackgroundColor: '#575E66', // equivalent of @sand-overlay-bg-color-rgb - styles/colors.less
	subtitleTextColor: '#ABAEB3', // equivalent of @sand-text-sub-color - styles/colors.less
	textColor: '#E6E6E6' // equivalent of @sand-text-color-rgb - styles/colors.less
}

export const customColorsContext = {
	activeTheme: 'defaultTheme',
	componentBackgroundColor: defaultSandstoneColors.componentBackgroundColor,
	focusBackgroundColor: defaultSandstoneColors.focusBackgroundColor,
	popupBackgroundColor: defaultSandstoneColors.popupBackgroundColor,
	subtitleTextColor: defaultSandstoneColors.subtitleTextColor,
	textColor: defaultSandstoneColors.textColor,
};

export const AppContext = createContext(null);

export const BACKGROUNDCOLOR_ADDON_ID = "componentBackgroundColor";
export const BACKGROUNDCOLOR_DEFAULT_VALUE = defaultSandstoneColors.componentBackgroundColor;

export const FOCUSBGCOLOR_ADDON_ID = "focusBackgroundColor";
export const FOCUSBGCOLOR_DEFAULT_VALUE = defaultSandstoneColors.focusBackgroundColor;

export const POPUPBGCOLOR_ADDON_ID = "popupBackgroundColor";
export const POPUPBGCOLOR_DEFAULT_VALUE = defaultSandstoneColors.popupBackgroundColor;

export const SUBTEXTCOLOR_ADDON_ID = "subtitleTextColor";
export const SUBTEXTCOLOR_DEFAULT_VALUE = defaultSandstoneColors.subtitleTextColor;

export const TEXT_ADDON_ID = "textColor";
export const TEXT_DEFAULT_VALUE = defaultSandstoneColors.textColor;

export const TOOLBAR_ADDON_ID = "toolbar-colors";
