/**
 * Popup style inputs for text and numbers.
 *
 * @module sandstone/Input
 * @exports Input
 * @exports InputBase
 * @exports InputDecorator
 * @exports InputField
 * @exports InputFieldBase
 * @exports InputFieldDecorator
 */

import {Input, InputBase, InputPopup, InputPopupBase, InputDecorator} from './Input';
import {InputField, InputFieldBase, InputFieldDecorator} from './InputField';
import {calcAriaLabel, extractInputFieldProps, convertToPasswordFormat} from './util';

export default Input;
export {
	calcAriaLabel,
	convertToPasswordFormat,
	extractInputFieldProps,
	Input,
	InputBase,
	InputDecorator,
	InputPopup,
	InputPopupBase,
	InputField,
	InputFieldBase,
	InputFieldDecorator
};
