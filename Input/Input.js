import {handle, adaptEvent, forKey, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import Spotlight from '@enact/spotlight';
import {useAnnounce} from '@enact/ui/AnnounceDecorator';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Button from '../Button';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import Heading from '../Heading';

import NumberField from './NumberField';
import InputField from './InputField';
import {DEFAULT_LENGTH, calcAriaLabel, convertToPasswordFormat, extractInputFieldProps, limitNumberLength} from './util';

import componentCss from './Input.module.less';

const prepareInputEventPayload = ev => ({value: ev.target.value});
const isPasswordType = type => type === 'password' || type === 'passwordnumber';

/**
 * Base component for providing text input in the form of a popup without button.
 *
 * @class InputPopupBase
 * @memberof sandstone/Input
 * @ui
 * @public
 */
const InputPopupBase = kind({
	name: 'InputPopup',

	propTypes: /** @lends sandstone/Input.InputPopupBase.prototype */ {
		/**
		 * Passed by AnnounceDecorator for accessibility.
		 *
		 * @type {Object}
		 * @public
		 */
		announce: PropTypes.func,

		/**
		 * Customize component style
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables the input popup.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Indicates value is invalid and shows `invalidMessage`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		invalid: PropTypes.bool,

		/**
		 * The tooltip text to be displayed when the input is `invalid`.
		 *
		 * @type {String}
		 * @public
		 */
		invalidMessage: PropTypes.string,

		/**
		 * Set the length of number input field.
		 *
		 * Sets the amount of numbers this field will collect. Any number between 1 and 6
		 * (inclusive) will render individual number cells, greater than 6 will render a single box
		 * with numbers in it. This only has an effect on `'number'` and `'passwordnumber'` `type`
		 * and when `numberInputField` is `'auto'`.
		 *
		 * This value will override `minLength` and `maxLength`.
		 *
		 * @type {Number}
		 * @public
		 */
		length: PropTypes.number,

		/**
		 * The maximum length of number input fields.
		 *
		 * Overridden by `length` value.
		 *
		 * @type {Number}
		 * @default 4
		 * @public
		 */
		maxLength: PropTypes.number,

		/**
		 * The minimum length of number input fields.
		 *
		 * Overridden by `length` value.
		 *
		 * When smaller than `maxLength`, number type inputs will show a submit button and will not
		 * auto-submit when the length reaches `maxLength`. Defaults to the `maxLength` value.
		 *
		 * @type {Number}
		 * @public
		 */
		minLength: PropTypes.number,

		/**
		 * The type of numeric input to use.
		 *
		 * The default is to display separated digits when `length` is less than `7`. If `field` is
		 * set, a standard `InputField` will be used instead of the normal number input.
		 *
		 * This has no effect on other [types]{@link sandstone/Input.InputPopupBase.prototype#type}.
		 *
		 * @type {('auto'|'separated'|'joined'|'field')}
		 * @default 'auto'
		 * @public
		 */
		numberInputField: PropTypes.oneOf(['auto', 'separated', 'joined', 'field']),

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
		 * Called when the input value is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Called when the popup is closed.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called when input is complete.
		 *
		 * @type {Function}
		 * @public
		 */
		onComplete: PropTypes.func,

		/**
		 * Called when the popup is opened.
		 *
		 * @type {Function}
		 * @public
		 */
		onOpenPopup: PropTypes.func,

		/**
		 * Opens the popup.
		 *
		 * @type {Boolean}
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Text displayed when value is not set.
		 *
		 * @type {String}
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * The "aria-label" for the popup when opened.
		 *
		 * @type {String}
		 * @public
		 */
		popupAriaLabel: PropTypes.string,

		/**
		 * Type of popup.
		 *
		 * @type {('fullscreen'|'overlay')}
		 * @default 'fullscreen'
		 * @public
		 */
		popupType: PropTypes.oneOf(['fullscreen', 'overlay']),

		/**
		 * Size of the input field.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		/**
		 * Subtitle below the title of popup.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		subtitle: PropTypes.string,

		/**
		 * Title text of popup.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Type of the input.
		 *
		 * @type {('text'|'password'|'number'|'passwordnumber')}
		 * @default 'text'
		 * @public
		 */
		type: PropTypes.oneOf(['text', 'password', 'number', 'passwordnumber']),

		/**
		 * Value of the input.
		 *
		 * @type {String|Number}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		popupType: 'fullscreen',
		numberInputField: 'auto',
		size: 'small',
		subtitle: '',
		title: '',
		type: 'text',
		value: '' // value is provided by Changeable, but will be null if defaultValue wasn't specified by the consumer
	},

	styles: {
		css: componentCss,
		className: 'input'
	},

	handlers: {
		onShow: handle(
			forward('onShow'),
			() => Spotlight.setPointerMode(false)
		),
		onNumberComplete: handle(
			(ev, props) => {
				setTimeout(() => {
					forward('onComplete', ev, props);
					forward('onClose', ev, props);
				}, 250);
				return true;
			}
		),
		onInputKeyDown: handle(
			forKey('enter'),
			adaptEvent(
				prepareInputEventPayload,
				forward('onComplete')
			),
			forward('onClose')
		)
	},

	computed: {
		maxLength: ({length, maxLength}) => (length || maxLength),
		minLength: ({length, maxLength, minLength}) => {
			if (length) return length;
			if (minLength != null) return minLength;
			if (maxLength != null) return maxLength;
			return DEFAULT_LENGTH;
		},
		popupClassName: ({popupType, type, styler}) => styler.join('popup', popupType, type)
	},

	render: ({
		announce,
		children,
		css,
		numberInputField,
		onBeforeChange,
		onClose,
		onNumberComplete,
		onInputKeyDown,
		onShow,
		open,
		placeholder,
		popupAriaLabel,
		popupClassName,
		popupType,
		size,
		subtitle,
		title,
		type,
		value,
		maxLength,
		minLength,
		...rest
	}) => {

		const inputProps = extractInputFieldProps(rest);
		const numberMode = (numberInputField !== 'field') && (type === 'number' || type === 'passwordnumber');

		delete rest.length;
		delete rest.onComplete;
		delete rest.onOpenPopup;

		return (
			<Popup
				aria-label={popupAriaLabel}
				onClose={onClose}
				onShow={onShow}
				position={popupType === 'fullscreen' ? 'fullscreen' : 'center'}
				className={popupClassName}
				noAnimation
				open={open}
			>
				<Layout orientation="vertical" align={`center ${numberMode ? 'space-between' : ''}`} className={css.body}>
					<Cell shrink className={css.titles}>
						<Heading size="title" marqueeOn="render" alignment="center" className={css.title}>{title}</Heading>
						<Heading size="subtitle" marqueeOn="render" alignment="center" className={css.subtitle}>{subtitle}</Heading>
					</Cell>
					<Cell shrink className={css.inputArea}>
						{numberMode ?
							<NumberField
								{...inputProps}
								announce={announce}
								maxLength={limitNumberLength(popupType, maxLength)}
								minLength={limitNumberLength(popupType, minLength)}
								defaultValue={value}
								onBeforeChange={onBeforeChange}
								onComplete={onNumberComplete}
								showKeypad
								type={(type === 'passwordnumber') ? 'password' : 'number'}
								numberInputField={numberInputField}
							/> :
							<InputField
								{...inputProps}
								maxLength={maxLength}
								minLength={minLength}
								size={size}
								autoFocus
								type={type}
								defaultValue={value}
								noReadoutOnFocus
								placeholder={placeholder}
								onBeforeChange={onBeforeChange}
								onKeyDown={onInputKeyDown}
							/>
						}
					</Cell>
					<Cell shrink className={css.buttonArea}>{children}</Cell>
				</Layout>
			</Popup>
		);
	}
});

/**
 * Base component for providing text input in the form of a popup.
 *
 * @class InputBase
 * @memberof sandstone/Input
 * @ui
 * @public
 */
const InputBase = kind({
	name: 'Input',

	propTypes: /** @lends sandstone/Input.InputBase.prototype */ {
		/**
		 * Disables the button that activates the input popup.
		 *
		 * @type {Boolean}
		 * @private
		 */
		announce: PropTypes.func,

		/**
		 * Disables the button that activates the input popup.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Text displayed when value is not set.
		 *
		 * @type {String}
		 * @default '-'
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * The size of the input field.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		/**
		 * Type of the input.
		 *
		 * @type {('text'|'password'|'number'|'passwordnumber')}
		 * @default 'text'
		 * @public
		 */
		type: PropTypes.oneOf(['text', 'password', 'number', 'passwordnumber']),

		/**
		 * Value of the input.
		 *
		 * @type {String|Number}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		placeholder: '-'
	},

	handlers: {
		onClick: handle(
			forward('onClick'),
			forward('onOpenPopup')
		)
	},

	computed: {
		buttonAriaLabel: ({placeholder, type, value}) => {
			if (value) {
				type = isPasswordType(type) ? 'password' : null;
				return calcAriaLabel('', type, type === 'number' ? value.split('') : value);
			}

			return calcAriaLabel('', null, placeholder);
		},
		buttonLabel: ({placeholder, type, value}) => {
			return (isPasswordType(type) ? convertToPasswordFormat(value) : value) || placeholder;
		}
	},

	render: ({announce, buttonAriaLabel, buttonLabel, type, size, disabled, value, placeholder, onClick, className, style, ...rest}) => {
		const ariaProps = extractAriaProps(rest);

		return (
			<React.Fragment>
				<InputPopupBase
					announce={announce}
					type={type}
					size={size}
					disabled={disabled}
					value={value}
					placeholder={placeholder}
					{...rest}
				/>
				<Button
					size={size}
					disabled={disabled}
					className={className}
					style={style}
					onClick={onClick}
					aria-label={buttonAriaLabel}
					{...ariaProps}
				>
					{buttonLabel}
				</Button>
			</React.Fragment>
		);
	}
});

// eslint-disable-next-line no-shadow
const AnnounceDecorator = Wrapped => function AnnounceDecorator (props) {
	const {announce, children} = useAnnounce();

	return (
		<React.Fragment>
			<Wrapped {...props} announce={announce} />
			{children}
		</React.Fragment>
	);
};

/**
 * Sandstone specific item behaviors to apply to [Input]{@link sandstone/Input.InputBase}.
 *
 * @class InputDecorator
 * @hoc
 * @memberof sandstone/Input
 * @mixes ui/Toggleable.Toggleable
 * @mixes ui/Changeable.Changeable
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const InputDecorator = compose(
	Pure,
	Toggleable({activate: 'onOpenPopup', deactivate: 'onClose', prop: 'open'}),
	Changeable({change: 'onComplete'}),
	AnnounceDecorator,
	Skinnable
);

/**
 * Provides an input in the form of a popup.
 *
 * Usage:
 * ```
 * <Input
 *   onComplete={this.handleInputComplete}
 *   placeholder="Placeholder"
 *   subtitle="TitleBelow"
 *   title="Title"
 *   value={this.state.inputText}
 * />
 * ```
 *
 * @class Input
 * @memberof sandstone/Input
 * @extends sandstone/Input.InputBase
 * @ui
 * @public
 */
const Input = InputDecorator(InputBase);

/**
 * Provides an input popup without button.
 *
 * Usage:
 * ```
 * <InputPopup
 *   open={this.state.open}
 *   onComplete={this.handleInputPopupComplete}
 *   placeholder="Placeholder"
 *   subtitle="Subtitle"
 *   title="Title"
 *   value={this.state.inputText}
 * />
 * ```
 *
 * @class InputPopup
 * @memberof sandstone/Input
 * @extends sandstone/Input.InputPopupBase
 * @ui
 * @public
 */
const InputPopup = InputDecorator(InputPopupBase);

export default Input;
export {
	Input,
	InputBase,
	InputPopup,
	InputPopupBase,
	InputDecorator
};
