import {handle, adaptEvent, forKey, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spotlight from '@enact/spotlight';
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
import {convertToPasswordFormat, extractInputFieldProps} from './util';

import componentCss from './Input.module.less';

const prepareInputEventPayload = ev => ({value: ev.target.value});

/**
 * Base component for providing text input in the form of a popup
 *
 * @class InputBase
 * @memberof sandstone/Input
 * @ui
 * @public
 */
const InputBase = kind({
	name: 'Input',

	propTypes: /** @lends sandstone/Input.InputBase */ {
		/**
		 * Customize component style
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables the button that activates the input popup.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Set the length of number input field.
		 *
		 * Sets the amount of numbers this field will collect. Any number between 1 and 6
		 * (inclusive) will render individual number cells, greater than 6 will render a single  box
		 * with numbers in it. This only has an effect on "number" and "passwordnumber" `type`.
		 *
		 * @type {Number}
		 * @public
		 */
		length: PropTypes.number,

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
		 * @default ''
		 * @public
		 */
		placeholder: PropTypes.string,

		/**
		 * Set the type of popup.
		 *
		 * @type {(fullscreen|overlay)}
		 * @default 'fullscreen'
		 * @public
		 */
		popupType: PropTypes.oneOf(['fullscreen', 'overlay']),

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
		 * @type {(text|password|number|passwordnumber)}
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
		length: 4,
		placeholder: '-',
		popupType: 'fullscreen',
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
		onClick: handle(
			forward('onClick'),
			forward('onOpenPopup')
		),
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
		popupClassName: ({popupType, styler}) => styler.join('popup', popupType)
	},

	render: ({
		children,
		css,
		disabled,
		length,
		onChange,
		onClose,
		onNumberComplete,
		onInputKeyDown,
		onShow,
		open,
		placeholder,
		popupClassName,
		popupType,
		subtitle,
		title,
		type,
		value,
		...rest
	}) => {

		const inputProps = extractInputFieldProps(rest);
		const textMode = (type === 'text' || type === 'password');
		const password = (type === 'password' || type === 'passwordnumber');

		delete rest.onComplete;
		delete rest.onOpenPopup;

		return (
			<React.Fragment>
				<Popup
					onClose={onClose}
					onShow={onShow}
					position={popupType === 'fullscreen' ? 'fullscreen' : 'center'}
					className={popupClassName}
					noAnimation
					open={!disabled && open}
				>
					<Layout orientation="vertical" align={`center ${textMode ? '' : 'space-between'}`} className={css.body}>
						<Cell shrink>
							<Heading size="title" marqueeOn="render" alignment="center" className={css.title}>{title}</Heading>
							<Heading size="subtitle" marqueeOn="render" alignment="center" className={css.subtitle}>{subtitle}</Heading>
						</Cell>
						<Cell shrink className={css.inputArea}>
							{textMode ?
								<InputField
									autoFocus
									type={type}
									defaultValue={value}
									placeholder={placeholder}
									onChange={onChange}
									onKeyDown={onInputKeyDown}
									{...inputProps}
								/> :
								<NumberField
									defaultValue={value}
									length={length}
									onChange={onChange}
									onComplete={onNumberComplete}
									showKeypad
									type={(type === 'passwordnumber') ? 'password' : 'number'}
								/>
							}
						</Cell>
						<Cell shrink className={css.buttonArea}>{children}</Cell>
					</Layout>
				</Popup>
				<Button {...rest} disabled={disabled}>
					{(password ? convertToPasswordFormat(value) : value) || placeholder}
				</Button>
			</React.Fragment>
		);
	}
});

const InputDecorator = compose(
	Pure,
	Toggleable({activate: 'onOpenPopup', deactivate: 'onClose', prop: 'open'}),
	Changeable({change: 'onComplete'}),
	Skinnable
);

/**
 * Provide input in the form of a popup
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
 * @mixes ui/Changeable.Changeable
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */
const Input = InputDecorator(InputBase);

export default Input;
export {
	Input,
	InputBase,
	InputDecorator
};
