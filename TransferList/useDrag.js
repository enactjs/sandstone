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

	styles: {
		className: 'draggable-component'
	},

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
