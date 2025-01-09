import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';

const DivComponent = ({innerRef, ...rest}) => (<div {...rest} ref={innerRef} />)

DivComponent.propTypes = {
	innerRef: EnactPropTypes.ref
};

const Div = Spottable(DivComponent);

const SpottablePicker = kind({
	name: 'SpottablePicker',

	propTypes: {
		changedBy: PropTypes.oneOf(['enter', 'arrow']),
		containerRef: EnactPropTypes.ref,
		disabled: PropTypes.bool,
		pickerOrientation: PropTypes.string
	},

	computed: {
		selectionKeys: ({changedBy, disabled, pickerOrientation}) => {
			if (disabled || (pickerOrientation === 'horizontal' && changedBy === 'enter')) return;

			return pickerOrientation === 'horizontal' ? [37, 39] : [38, 40];
		}
	},

	render: ({containerRef, selectionKeys, ...rest}) => {
		delete rest.changedBy;
		delete rest.pickerOrientation;

		return (
			<Div innerRef={containerRef} {...rest} selectionKeys={selectionKeys} />
		);
	}
});

export default SpottablePicker;
export {
	SpottablePicker
};
