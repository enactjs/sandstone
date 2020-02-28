/**
 * Popup style input
 *
 * @module sandstone/InputPopup
 * @exports InputPopup
 * @exports InputPopupBase
 * @exports NumberInputPopup
 * @exports NumberInputPopupBase
 */

import React from 'react';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {handle, forKey, forKeyCode, forward} from '@enact/core/handle';
import Toggleable from '@enact/ui/Toggleable';
import Pure from '@enact/ui/internal/Pure';
import Changeable from '@enact/ui/Changeable';
import Spotlight from '@enact/spotlight';
import Layout, {Cell} from '@enact/ui/Layout';

import Button from '../Button';
import Input, {extractInputProps} from '../Input';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import Heading from '../Heading';

import {NumberInputPopup, NumberInputPopupBase} from './NumberInputPopup';
import {convertToPasswordFormat} from './util';
import componentCss from './InputPopup.module.less';

const InputPopupBase = kind({
	name: 'InputPopup',

	propTypes: {
		/**
		 * Customize component style
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disable the button that activate the input popup.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Set the type of input value.
		 *
		 * @type {String}
		 * @default 'text'
		 * @public
		 */
		inputType: PropTypes.oneOf(['text', 'password']),

		/**
		 * Called when the input value is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Close input popup.
		 *
		 * @type {Function}
		 * @public
		 */
		onClosePopup: PropTypes.func,

		/**
		 * Pass the input value when input is complete.
		 *
		 * @type {Function}
		 * @public
		 */
		onComplete: PropTypes.func,

		/**
		 * Open input popup.
		 *
		 * @type {Function}
		 * @public
		 */
		onOpenPopup: PropTypes.func,

		/**
		 * Visibility of Popup
		 *
		 * @type {Boolean}
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Text to display when value is not set.
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
		 * The value of the input.
		 *
		 * @type {String|Number}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},

	defaultProps: {
		inputType: 'text',
		placeholder: '',
		title: '',
		subtitle: ''
	},

	styles: {
		css: componentCss,
		className: 'inputPopup'
	},

	handlers: {
		handleShow: handle(
			forward('onShow'),
			() => Spotlight.setPointerMode(false)
		),

		handleChange: handle(
			forward('onChange')
		),

		handleBackKey: handle(
			forKeyCode(461),
			forward('onClosePopup')
		),

		handleEnterKey: handle(
			forKey('enter'),
			forward('onClosePopup'),
			forward('onComplete')
		)
	},

	render: ({placeholder, css, title, subtitle, inputType, disabled, onOpenPopup, className, open, value, handleShow, handleChange, handleBackKey, handleEnterKey, ...rest}) => {

		const inputProps = extractInputProps(rest);

		delete rest.onChange;
		delete rest.onClosePopup;
		delete rest.onComplete;

		return (
			<React.Fragment>
				<Popup
					onShow={handleShow}
					onKeyDown={handleBackKey}
					className={className}
					position="fullscreen"
					noAnimation
					open={open}
				>
					<Layout orientation="vertical" align="center" className={css.popupBody}>
						<Cell shrink>
							<Heading size="title" marqueeOn="render" alignment="center" className={css.title}>{title}</Heading>
							<Heading size="subtitle" marqueeOn="render" alignment="center" className={css.subtitle}>{subtitle}</Heading>
						</Cell>
						<Cell align="center" className={css.inputArea}>
							<Input
								autoFocus
								type={inputType}
								value={value}
								placeholder={placeholder}
								onChange={handleChange}
								onKeyDown={handleEnterKey}
								{...inputProps}
							/>
						</Cell>
					</Layout>
				</Popup>
				<Button disabled={disabled} onClick={onOpenPopup} {...rest}>
					{(inputType === 'password' ? convertToPasswordFormat(value) : value) || placeholder}
				</Button>
			</React.Fragment>
		);
	}
});

const InputPopupDecorator = compose(
	Pure,
	Toggleable({activate: 'onOpenPopup', deactivate: 'onClosePopup', prop: 'open'}),
	Changeable({change: 'onComplete'}),
	Skinnable
);

/**
 * Provide input in the form of a popup
 *
 * Usage:
 * ```
 * <InputPopup
 *   title={'Title'}
 *   subtitle={'TitleBelow'}
 *   placeholder={'Placeholder'}
 * 	 value={this.state.inputText}
 * 	 onComplete={this.handleInputComplete}
 * />
 * ```
 *
 * @class InputPopup
 * @memberof sandstone/InputPopup
 * @extends sandstone/InputPopup.InputPopupBase
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */
const InputPopup = InputPopupDecorator(InputPopupBase);

export default InputPopup;
export {InputPopupBase, InputPopup, NumberInputPopupBase, NumberInputPopup};
