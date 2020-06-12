import $L from '../internal/$L';
import warning from 'warning';

// A default value for the numeric field length. Used by maxLength and minLength.
const DEFAULT_LENGTH = 4;

// The cutoff length, at which point the numeric field switches from separated boxes to one box
const SEPARATE_DIGITS_LIMIT = 6;

const OVERLAY_JOINED_DIGITS_LIMIT = 10;
const FULLSCREEN_JOINED_DIGITS_LIMIT = 25;

/**
 * Determines the `aria-label` for an Input
 *
 * @method
 * @memberof sandstone/Input
 * @param   {String}  prefix   Text to precede the value in the aria-label
 * @param   {String}  type     `type` of the Input
 * @param   {String}  [value]  Current value of the input
 * @returns {String}           `aria-label` value
 * @private
 */
const calcAriaLabel = function (prefix, type, value = '') {
	const hint = $L('Input field');

	if (type === 'password' && value) {
		const character = value.length > 1 ? $L('characters') : $L('character');
		value = `${value.length} ${character}`;
	}

	return `${prefix} ${value} ${hint}`;
};

const convertToPasswordFormat = (value) => {
	return '*'.repeat(value && value.length);
};

/**
 * Removes `<InputField>` related props from `props` and returns them in a new object.
 *
 * Useful when redirecting `<InputField>` related props from a non-input root element to the
 * `<InputField>` component.
 *
 * @method
 * @memberof sandstone/Input
 * @param   {Object} props  Props object
 * @returns {Object}        input related props
 * @private
 */
const extractInputFieldProps = function (props) {
	const inputProps = {};
	Object.keys(props).forEach(key => {
		switch (key) {
			case 'autoComplete':
			case 'data-webos-voice-group-label':
			case 'data-webos-voice-intent':
			case 'data-webos-voice-label':
			case 'dismissOnEnter':
			case 'iconAfter':
			case 'iconBefore':
			case 'invalid':
			case 'invalidMessage':
			case 'list':
			case 'maxLength':
			case 'minLength':
			case 'onActivate':
			case 'onBlur':
			case 'onDeactivate':
			case 'pattern':
			case 'required':
			case 'size':
				inputProps[key] = props[key];
				delete props[key];
		}
	});

	return inputProps;
};

/**
 * Removes `<input>` related props from `props` and returns them in a new object.
 *
 * Useful when redirecting `<input>` related props from a non-input root element to the `<input>`
 * element.
 *
 * @method
 * @memberof sandstone/Input
 * @param   {Object} props  Props object
 * @returns {Object}        input related props
 * @private
 */
const extractInputProps = function (props) {
	const inputProps = {};
	Object.keys(props).forEach(key => {
		switch (key) {
			case 'autoComplete':
			case 'list':
			case 'maxLength':
			case 'minLength':
			case 'pattern':
			case 'required':
			case 'size':
				inputProps[key] = props[key];
				delete props[key];
		}
	});

	return inputProps;
};

const limitNumberLength = (popupType, length) => {
	let limitedLength = length;
	if (popupType === 'fullscreen') {
		if (length > FULLSCREEN_JOINED_DIGITS_LIMIT) {
			limitedLength = FULLSCREEN_JOINED_DIGITS_LIMIT;
			warning(false, `Max length of fullscreen type input must not exceed ${FULLSCREEN_JOINED_DIGITS_LIMIT} digits.`);
		}
	} else if (popupType === 'overlay') {
		if (length > OVERLAY_JOINED_DIGITS_LIMIT) {
			limitedLength = OVERLAY_JOINED_DIGITS_LIMIT;
			warning(false, `Max length of overlay type input must not exceed ${OVERLAY_JOINED_DIGITS_LIMIT} digits.`);
		}
	}
	return limitedLength;
};

export {
	DEFAULT_LENGTH,
	FULLSCREEN_JOINED_DIGITS_LIMIT,
	OVERLAY_JOINED_DIGITS_LIMIT,
	SEPARATE_DIGITS_LIMIT,
	calcAriaLabel,
	convertToPasswordFormat,
	extractInputProps,
	extractInputFieldProps,
	limitNumberLength
};
