import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';

const Div = Spottable('div');

const SpottablePicker = kind({
	name: 'SpottablePicker',

	propTypes: {
		disabled: PropTypes.bool,
		noIndicator: PropTypes.bool,
		pickerOrientation: PropTypes.string
	},

	computed: {
		selectionKeys: ({disabled, noIndicator, pickerOrientation}) => {
			if (disabled || (pickerOrientation === 'horizontal' && !noIndicator)) return;

			return pickerOrientation === 'horizontal' ? [37, 39] : [38, 40];
		}
	},

	render: ({selectionKeys, ...rest}) => {
		delete rest.pickerOrientation;
		delete rest.noIndicator;

		return (
			<Div {...rest} selectionKeys={selectionKeys} />
		);
	}
});

export default SpottablePicker;
export {
	SpottablePicker
};
