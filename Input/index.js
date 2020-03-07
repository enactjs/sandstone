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

import {Input, InputBase, InputDecorator} from './Input';
import {InputField, InputFieldBase, InputFieldDecorator} from './InputField';
import {calcAriaLabel, extractInputFieldProps} from './util';

export default Input;
export {
	calcAriaLabel,
	extractInputFieldProps,
	Input,
	InputBase,
	InputDecorator,
	InputField,
	InputFieldBase,
	InputFieldDecorator
};
