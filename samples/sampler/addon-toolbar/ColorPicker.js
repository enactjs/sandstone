import {useGlobals} from '@storybook/api';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react'; // eslint-disable-line

import {BACKGROUND_DEFAULT_VALUE, TEXT_ADDON_ID, TEXT_DEFAULT_VALUE} from "./constants";

const ColorPicker = ({colorPickerType}) => {
	const [globals, updateGlobals] = useGlobals();

	const getDefaultColor = () => {
		if (colorPickerType === TEXT_ADDON_ID) return TEXT_DEFAULT_VALUE;
		return BACKGROUND_DEFAULT_VALUE;
	};

	const handleChange = useCallback((ev) => {
		updateGlobals({[colorPickerType]: ev.target.value});
	}, [colorPickerType, updateGlobals]);

	return (
		<input
			onChange={handleChange}
			type="color"
			value={globals[colorPickerType] || getDefaultColor()}
		/>
	);
};

ColorPicker.propTypes = {
	colorPickerType: PropTypes.string
};

export default ColorPicker;
