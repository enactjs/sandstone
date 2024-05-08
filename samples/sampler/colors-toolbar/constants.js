import {createContext} from 'react';

export const customColorsContext = {
	activeTheme: 'defaultTheme',
	componentBackgroundColor: '#7D848C',
	focusBackgroundColor: '#E6E6E6',
	popupBackgroundColor: '#575E66',
	subtitleTextColor: '#ABAEB3',
	textColor: '#E6E6E6'
};

export const AppContext = createContext(null);

export const BACKGROUNDCOLOR_ADDON_ID = "ComponentBackgroundColor";
export const BACKGROUNDCOLOR_DEFAULT_VALUE = "#7D848C";

export const FOCUSBGCOLOR_ADDON_ID = "FocusBackgroundColor";
export const FOCUSBGCOLOR_DEFAULT_VALUE = '#E6E6E6';

export const POPUPBGCOLOR_ADDON_ID = "PopupBackgroundColor";
export const POPUPBGCOLOR_DEFAULT_VALUE = '#575E66';

export const TEXT_ADDON_ID = "ComponentTextColor";
export const TEXT_DEFAULT_VALUE = "#E6E6E6";

export const SUBTEXTCOLOR_ADDON_ID = "SubTextColor";
export const SUBTEXTCOLOR_DEFAULT_VALUE = "#ABAEB3";

export const TOOLBAR_ADDON_ID = "toolbar-colors";
