import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';

const Div = Spottable('div');

const SpottablePicker = kind({
	name: 'SpottablePicker',

	propTypes: {
		disabled: PropTypes.bool,
		pickerOrientation: PropTypes.string
	},

	computed: {
		selectionKeys: ({disabled, pickerOrientation}) => {
			if (disabled || pickerOrientation === 'horizontal') return;

			return [38, 40];
		}
	},

	render: ({selectionKeys, ...rest}) => {
		delete rest.pickerOrientation;

		return (
			<Div {...rest} selectionKeys={selectionKeys} />
		);
	}
});

export default SpottablePicker;
export {
	SpottablePicker
};
