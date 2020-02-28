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
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {handle, forKey, forKeyCode, forward} from '@enact/core/handle';
import Toggleable from '@enact/ui/Toggleable';
import Pure from '@enact/ui/internal/Pure';
import Changeable from '@enact/ui/Changeable';
import Spotlight from '@enact/spotlight';

import Button from '../Button';
import Input from '../Input';
import {Marquee} from '../Marquee';
import Popup from '../Popup';
import Skinnable from '../Skinnable';

import {NumberInputPopup, NumberInputPopupBase} from './NumberInputPopup';
import {convertToPasswordFormat} from './util';
import componentCss from './InputPopup.module.less';

class InputPopupBase extends React.Component {
	static propTypes = {
		/**
		 * Delegate props to button component in popup.
		 *
		 * @type {Object}
		 * @public
		 */
		buttonProps: PropTypes.object,

		/**
		 * Close input popup.
		 *
		 * @type {Function}
		 * @private
		 */
		closePopup: PropTypes.func,

		/**
		 * Disable the button that activate the input popup.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Delegate props to input component in popup.
		 *
		 * @type {Object}
		 * @public
		 */
		inputProps: PropTypes.object,

		/**
		 * Set the type of input value.
		 *
		 * @type {String}
		 * @default 'text'
		 * @public
		 */
		inputType: PropTypes.oneOf(['text', 'password']),

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
		 * @private
		 */
		openPopup: PropTypes.func,

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
	}

	static defaultProps = {
		inputType: 'text',
		placeholder: '',
		title: '',
		subtitle: ''
	}

	constructor (props) {
		super(props);
		this.state = {
			inputValue: props.value
		};
	}

	handle = handle.bind(this);

	handleChange = (ev) => {
		this.setState({inputValue: ev.value});
	}

	complete = () => {
		forward('onComplete', {value: this.state.inputValue}, this.props);
		return true;
	}

	cancel = () => {
		this.setState({inputValue: this.props.value});
		return true;
	}

	handleShow = (ev) => {
		forward('onShow', ev, this.props);
		this.setState({inputValue: this.props.value});
		if (Spotlight.getPointerMode()) Spotlight.setPointerMode(false); // TBD: Need more explict way to open VKB automatically in case of cursor mode
	}

	handleEnterKey = this.handle(
		forKey('enter'),
		() => this.complete(),
		() => this.props.closePopup()
	)

	handleBackKey = this.handle(
		forKeyCode(461),
		() => this.cancel(),
		() => this.props.closePopup()
	)

	render () {
		let {placeholder, title, subtitle, buttonProps, inputProps, inputType, disabled, openPopup, value, className, ...rest} = this.props;

		delete rest.closePopup;
		delete rest.onComplete;

		return (
			<React.Fragment>
				<Popup
					onShow={this.handleShow}
					onHide={this.handleHide}
					onKeyDown={this.handleBackKey}
					className={`${className} ${componentCss.inputPopup}`}
					noAnimation
					{...rest}
				>
					<div className={componentCss.popupBody}>
						<div className={componentCss.headerArea}>
							<Marquee marqueeOn={'render'} alignment={'center'} className={componentCss.title}>{title}</Marquee>
							<Marquee marqueeOn={'render'} alignment={'center'} className={componentCss.subtitle}>{subtitle}</Marquee>
						</div>
						<div className={componentCss.inputArea}>
							<Input
								autoFocus
								type={inputType}
								value={this.state.inputValue}
								placeholder={placeholder}
								onChange={this.handleChange}
								onKeyDown={this.handleEnterKey}
								{...inputProps}
							/>
						</div>
					</div>

				</Popup>
				<Button disabled={disabled} onClick={openPopup} {...buttonProps}>
					{(inputType === 'password' ? convertToPasswordFormat(value) : value) || placeholder}
				</Button>
			</React.Fragment>
		);
	}
}

const InputPopupDecorator = compose(
	Pure,
	Toggleable({activate: 'openPopup', deactivate: 'closePopup', prop: 'open'}),
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
