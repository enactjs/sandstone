import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';

const Div = Spottable('div');

const SpottablePicker = kind({
	name: 'SpottablePicker',

	propTypes: {
		changedBy: PropTypes.oneOf(['enter', 'leftRight']),
		disabled: PropTypes.bool,
		pickerOrientation: PropTypes.string
	},

	computed: {
		selectionKeys: ({disabled, changedBy, pickerOrientation}) => {
			if (disabled || (pickerOrientation === 'horizontal' && changedBy === 'enter')) return;

			return pickerOrientation === 'horizontal' ? [37, 39] : [38, 40];
		}
	},

	render: ({selectionKeys, ...rest}) => {
		delete rest.changedBy;
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
