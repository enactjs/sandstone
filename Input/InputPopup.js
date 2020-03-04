import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import PropTypes from 'prop-types';
import React from 'react';

import Input from './Input';

const InputPopupBase = kind({
	name: 'InputPopup',

	propTypes: {
		type: PropTypes.oneOf(['number', 'password'])
	},

	render: ({type, ...rest}) => {
		deprecate({
			name: 'sandstone/InputPopup',
			replacedBy: 'sandstone/Input',
			message: 'Use `sandstone/Input` with `type="number"` or `type="passwordnumber"'
		});

		return (
			<Input {...rest} type={type === 'password' ? 'passwordnumber' : type} />
		);
	}
});

/**
 * Provide number input in the form of a popup
 *
 * Usage:
 * ```
 * <InputPopup
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
 * @class InputPopup
 * @memberof sandstone/InputPopup
 * @extends sandstone/InputPopup.InputPopupBase
 * @mixes ui/Changeable.Changeable
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */

export default InputPopupBase;
export {
	InputPopupBase as InputPopup,
	InputPopupBase
};
