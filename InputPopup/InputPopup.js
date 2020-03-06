import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import Input from '../Input';
import NumberInputPopup from './NumberInputPopup';

const InputPopupBase = kind({
	name: 'InputPopup',

	render: ({...rest}) => {
		deprecate({
			name: 'sandstone/InputPopup',
			replacedBy: 'sandstone/Input',
			message: 'Use `sandstone/Input`'
		});

		return (
			<Input {...rest} />
		);
	}
});

/**
 * Provide number input in the form of a popup
 *
 * Usage:
 * ```
 * <InputPopup
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
	InputPopupBase,
	NumberInputPopup as NumberInputPopupBase,
	NumberInputPopup
};
