import {useGlobals} from '@storybook/api';
import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react'; // eslint-disable-line

import {BACKGROUND_DEFAULT_VALUE, TEXT_ADDON_ID, TEXT_DEFAULT_VALUE} from './constants';

const ColorPicker = ({colorPickerType}) => {
	// const [colorValue, updateColorValue] = useState(undefined);
	const [globals, updateGlobals] = useGlobals();
	const getDefaultColor = () => {
		if (colorPickerType === TEXT_ADDON_ID) return TEXT_DEFAULT_VALUE;
		return BACKGROUND_DEFAULT_VALUE;
	};

	const handleColorChange = useCallback((ev) => {
		updateGlobals({[colorPickerType]: ev.target.value});
	}, [colorPickerType]);

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
