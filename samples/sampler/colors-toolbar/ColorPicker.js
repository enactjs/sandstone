import {useGlobals} from '@storybook/api';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react'; // eslint-disable-line

import {
	BACKGROUNDCOLOR_ADDON_ID,
	BACKGROUNDCOLOR_DEFAULT_VALUE,
	FOCUSBGCOLOR_ADDON_ID,
	FOCUSBGCOLOR_DEFAULT_VALUE,
	POPUPBGCOLOR_ADDON_ID,
	POPUPBGCOLOR_DEFAULT_VALUE,
	TEXT_ADDON_ID,
	TEXT_DEFAULT_VALUE,
	SUBTEXTCOLOR_DEFAULT_VALUE
} from './constants';

const ColorPicker = ({colorPickerType}) => {
	// const [colorValue, updateColorValue] = useState(undefined);
	const [globals, updateGlobals] = useGlobals();

	const getDefaultColor = () => {
		switch (colorPickerType) {
			case BACKGROUNDCOLOR_ADDON_ID:
				return BACKGROUNDCOLOR_DEFAULT_VALUE;
			case FOCUSBGCOLOR_ADDON_ID:
				return FOCUSBGCOLOR_DEFAULT_VALUE;
			case POPUPBGCOLOR_ADDON_ID:
				return POPUPBGCOLOR_DEFAULT_VALUE;
			case TEXT_ADDON_ID:
				return TEXT_DEFAULT_VALUE;
			default:
				return SUBTEXTCOLOR_DEFAULT_VALUE;
		}
	};

	const handleColorChange = useCallback((ev) => {
		updateGlobals({[colorPickerType]: ev.target.value});
	}, [colorPickerType, updateGlobals]);

	return (
		<input
			onChange={handleColorChange}
			type="color"
			value={globals[colorPickerType] || getDefaultColor()}
		/>
	);
};

ColorPicker.propTypes = {
	colorPickerType: PropTypes.string
};

export default ColorPicker;
