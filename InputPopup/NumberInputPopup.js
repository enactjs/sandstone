import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import PropTypes from 'prop-types';
import React from 'react';

import Input from '../Input';

const NumberInputPopupBase = kind({
	name: 'NumberInputPopup',

	propTypes: {
		type: PropTypes.oneOf(['number', 'password'])
	},

	render: deprecate(({type, ...rest}) => {
		return (
			<Input {...rest} type={type === 'password' ? 'passwordnumber' : type} />
		);
	}, {
		name: 'sandstone/NumberInputPopup',
		replacedBy: 'sandstone/Input',
		message: 'Use `sandstone/Input` with `type="number"` or `type="passwordnumber"'
	})
});

/**
 * Provide number input in the form of a popup
 *
 * Usage:
 * ```
 * <NumberInputPopup
 *   length={4}
 *   onComplete={this.handleInputComplete}
 *   placeholder="Placeholder"
 *   popupType="overlay"
 *   title="Title"
 *   subtitle="TitleBelow"
 *   value={this.state.inputText}
 * />
 * ```
 *
 * @class NumberInputPopup
 * @memberof sandstone/InputPopup
 * @extends sandstone/InputPopup.NumberInputPopupBase
 * @mixes ui/Changeable.Changeable
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */

export default NumberInputPopupBase;
export {
	NumberInputPopupBase as NumberInputPopup,
	NumberInputPopupBase
};
