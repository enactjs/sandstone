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

import InputField from './InputField';
import {convertToPasswordFormat, extractInputFieldProps} from './util';
import componentCss from './Input.module.less';

const setInputValue = ev => ({value: ev.target.value});

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
		placeholder: '',
		subtitle: '',
		title: '',
		type: 'text'
	},

	styles: {
		css: componentCss,
		className: 'inputPopup'
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
		onInputKeyDown: handle(
			forKey('enter'),
			adaptEvent(
				setInputValue,
				forward('onComplete')
			),
			forward('onClose')
		)
	},

	render: ({placeholder, children, css, title, subtitle, type, disabled, onClose, onOpenPopup, open, value, onShow, onChange, onInputKeyDown, ...rest}) => {

		const inputProps = extractInputFieldProps(rest);

		delete rest.onComplete;

		return (
			<React.Fragment>
				<Popup
					onClose={onClose}
					onShow={onShow}
					className={css.popup}
					position="fullscreen"
					noAnimation
					open={!disabled && open}
				>
					<Layout orientation="vertical" align="center" className={css.body}>
						<Cell shrink>
							<Heading size="title" marqueeOn="render" alignment="center" className={css.title}>{title}</Heading>
							<Heading size="subtitle" marqueeOn="render" alignment="center" className={css.subtitle}>{subtitle}</Heading>
						</Cell>
						<Cell align="center" className={css.inputArea}>
							<InputField
								autoFocus
								type={type}
								defaultValue={value}
								placeholder={placeholder}
								onChange={onChange}
								onKeyDown={onInputKeyDown}
								{...inputProps}
							/>
						</Cell>
						<Cell shrink>
							{children}
						</Cell>
					</Layout>
				</Popup>
				<Button {...rest} disabled={disabled} onClick={onOpenPopup}>
					{(type === 'password' ? convertToPasswordFormat(value) : value) || placeholder}
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
