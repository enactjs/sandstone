import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

/**
 * TBD.
 *
 * @class useDrag
 * @memberof sandstone/TransferList
 * @ui
 * @private
 */
export const useDrag = (Wrapped) => kind({
	name: 'useDrag',

	// propTypes: /** @lends sandstone/TransferList.useDrag.prototype */ {
	// 	draggable: PropTypes.bool,
	// 	name: PropTypes.string,
	// 	slot: PropTypes.string
	// },

	render: ({disabled, ...rest}) => {
		return (
			<Wrapped
				{...rest}
				draggable={!disabled}
				disabled={disabled}
			/>
		);
	}
});
