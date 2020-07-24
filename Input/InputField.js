import kind from '@enact/core/kind';
import {handle, adaptEvent, forwardCustom, forwardWithPrevent} from '@enact/core/handle';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {isRtlText} from '@enact/i18n/util';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import Skinnable from '../Skinnable';
import Tooltip from '../TooltipDecorator/Tooltip';
import {extractVoiceProps} from '../internal/util';

import componentCss from './InputField.module.less';
import InputFieldDecoratorIcon from './InputFieldDecoratorIcon';
import InputFieldSpotlightDecorator from './InputFieldSpotlightDecorator';
import {calcAriaLabel, extractInputProps} from './util';

/**
 * A Sandstone styled input component.
 *
 * It supports start and end icons but it does not support Spotlight. Apps should use
 * {@link sandstone/Input.InputField}.
 *
 * @class InputFieldBase
 * @memberof sandstone/Input
 * @ui
 * @public
 */
const InputFieldBase = kind({
	name: 'InputField',

	propTypes: /** @lends sandstone/Input.InputFieldBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `inputField` - The root class name
		 * * `input` - The <input> class name
		 * * `inputHighlight` - The class used to make input text appear highlighted when `.inputField` has focus, but not `.input`
		 * * `tooltip` - The "invalid" tooltip
		 * * `tooltipLabel` - The "invalid" tooltip's label
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		// TODO: Document voice control props and make public
		'data-webos-voice-group-label': PropTypes.string,
		'data-webos-voice-intent': PropTypes.string,
		'data-webos-voice-label': PropTypes.string,

		/**
		 * Disables InputField and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Blurs the input when the "enter" key is pressed.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		dismissOnEnter: PropTypes.bool,

		/**
		 * The icon to be placed at the end of the input.
		 *
		 * @see {@link sandstone/Icon.Icon}
		 * @type {String}
		 * @public
		 */
		iconAfter: PropTypes.string,

		/**
		 * The icon to be placed at the beginning of the input.
		 *
		 * @see {@link sandstone/Icon.Icon}
		 * @type {String}
		 * @public
		 */
		iconBefore: PropTypes.string,

		/**
		 * Indicates [value]{@link sandstone/Input.InputFieldBase.value} is invalid and shows
		 * [invalidMessage]{@link sandstone/Input.InputFieldBase.invalidMessage}, if set.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		invalid: PropTypes.bool,

		/**
		 * The tooltip text to be displayed when the input is
		 * [invalid]{@link sandstone/Input.InputFieldBase.invalid}.
		 *
		 * If this value is *falsy*, the tooltip will not be shown.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		invalidMessage: PropTypes.string,

		/**
		 * Called before the input value is changed.
		 *
		 * The change can be prevented by calling `preventDefault` on the event.
		 *
		 * @type {Function}
		 * @public
		 */
		onBeforeChange: PropTypes.func,

		/**
		 * Called when blurred.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onBlur: PropTypes.func,

		/**
		 * Called when the input value is changed.
		 *
		 * The event payload includes the current `value` as well as a `stopPropagation()` method
		 * which may be called to stop the original `onChange` event from the `<input>` from
		 * bubbling.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Called when clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Called when focused.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onFocus: PropTypes.func,

		/**
		 * Called when a key is pressed down.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onKeyDown: PropTypes.func,

		/**
		 * Text to display when [value]{@link sandstone/Input.InputFieldBase.value} is not set.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The size of the input field.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		/**
		 * The type of input.
		 *
		 * Accepted values correspond to the standard HTML5 input types.
		 *
		 * @type {String}
		 * @see [MDN input types doc]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types}
		 * @default 'text'
		 * @public
		 */
		type: PropTypes.string,

		/**
		 * The value of the input.
		 *
		 * @type {String|Number}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		disabled: false,
		dismissOnEnter: false,
		invalid: false,
		placeholder: '',
		size: 'small',
		type: 'text'
	},

	styles: {
		css: componentCss,
		className: 'inputField',
		publicClassNames: ['inputField', 'input', 'inputHighlight', 'tooltip', 'tooltipLabel']
	},

	handlers: {
		onChange: handle(
			adaptEvent(
				ev => ({
					type: 'onBeforeChange',
					value: ev.target.value
				}),
				forwardWithPrevent('onBeforeChange')
			),
			forwardCustom('onChange', ev => ({
				stopPropagation: () => ev.stopPropagation(),
				value: ev.target.value
			}))
		)
	},

	computed: {
		'aria-label': ({placeholder, type, value}) => {
			const title = (value == null || value === '') ? placeholder : '';
			return calcAriaLabel(title, type, value);
		},
		className: ({invalid, size, styler}) => styler.append({invalid}, size),
		dir: ({value, placeholder}) => isRtlText(value || placeholder) ? 'rtl' : 'ltr',
		invalidTooltip: ({css, invalid, invalidMessage = $L('Please enter a valid value.')}) => {
			if (invalid && invalidMessage) {
				return (
					<Tooltip css={css} marquee relative type="transparent">
						{invalidMessage}
					</Tooltip>
				);
			}
		},
		// ensure we have a value so the internal <input> is always controlled
		value: ({value}) => typeof value === 'number' ? value : (value || '')
	},

	render: ({css, dir, disabled, iconAfter, iconBefore, invalidTooltip, onChange, placeholder, size, type, value, ...rest}) => {
		const inputProps = extractInputProps(rest);
		const voiceProps = extractVoiceProps(rest);
		delete rest.dismissOnEnter;
		delete rest.invalid;
		delete rest.invalidMessage;
		delete rest.onBeforeChange;
		delete rest.rtl;

		return (
			<div
				{...rest}
				aria-disabled={disabled}
				disabled={disabled}
			>
				<div className={css.bg} />
				<InputFieldDecoratorIcon position="before" size={size}>{iconBefore}</InputFieldDecoratorIcon>
				<span className={css.inputHighlight}>{value ? value : placeholder}</span>
				<input
					{...inputProps}
					{...voiceProps}
					className={css.input}
					dir={dir}
					disabled={disabled}
					onChange={onChange}
					placeholder={placeholder}
					tabIndex={-1}
					type={type}
					value={value}
				/>
				<InputFieldDecoratorIcon position="after" size={size}>{iconAfter}</InputFieldDecoratorIcon>
				{invalidTooltip}
			</div>
		);
	}
});

/**
 * Sandstone specific item behaviors to apply to [InputField]{@link sandstone/Input.InputFieldBase}.
 *
 * @class InputFieldDecorator
 * @hoc
 * @memberof sandstone/Input
 * @mixes ui/Changeable.Changeable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const InputFieldDecorator = compose(
	Pure,
	I18nContextDecorator({rtlProp: 'rtl'}),
	Changeable,
	InputFieldSpotlightDecorator,
	Skinnable
);

/**
 * A Spottable, Sandstone styled input component with embedded icon support.
 *
 * By default, `InputField` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class InputField
 * @memberof sandstone/Input
 * @extends sandstone/Input.InputFieldBase
 * @mixes ui/Changeable.Changeable
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @ui
 * @public
 */
const InputField = InputFieldDecorator(InputFieldBase);

/**
 * Focuses the internal input when the component gains 5-way focus.
 *
 * By default, the internal input is not editable when the component is focused via 5-way and must
 * be selected to become interactive. In pointer mode, the input will be editable when clicked.
 *
 * @name autoFocus
 * @memberof sandstone/Input.InputField.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

/**
 * Applies a disabled style and prevents interacting with the component.
 *
 * @name disabled
 * @memberof sandstone/Input.InputField.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

/**
 * Sets the initial value.
 *
 * @name defaultValue
 * @memberof sandstone/Input.InputField.prototype
 * @type {String}
 * @public
 */

/**
 * Blurs the input when the "enter" key is pressed.
 *
 * @name dismissOnEnter
 * @memberof sandstone/Input.InputField.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

/**
 * Called when the internal input is focused.
 *
 * @name onActivate
 * @memberof sandstone/Input.InputField.prototype
 * @type {Function}
 * @param {Object} event
 * @public
 */

/**
 * Called when the internal input loses focus.
 *
 * @name onDeactivate
 * @memberof sandstone/Input.InputField.prototype
 * @type {Function}
 * @param {Object} event
 * @public
 */

/**
 * Called when the component is removed when it had focus.
 *
 * @name onSpotlightDisappear
 * @memberof sandstone/Input.InputField.prototype
 * @type {Function}
 * @param {Object} event
 * @public
 */

/**
 * Disables spotlight navigation into the component.
 *
 * @name spotlightDisabled
 * @memberof sandstone/Input.InputField.prototype
 * @type {Boolean}
 * @default false
 * @public
 */

export default InputField;
export {
	InputField,
	InputFieldBase,
	InputFieldDecorator
};
