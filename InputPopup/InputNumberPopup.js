/**
 * Popup style input for number
 *
 * @module sandstone/InputNumberPopup
 * @exports InputNumberPopup
 * @exports InputNumberBasePopup
 */

import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {handle, forKeyCode, forward} from '@enact/core/handle';
import Layout from '@enact/ui/Layout';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import {Marquee} from '@enact/sandstone/Marquee';
import Popup from '@enact/sandstone/Popup';
import Skinnable from '@enact/sandstone/Skinnable';
import Spottable from '@enact/spotlight/Spottable';

import {convertToPasswordFormat} from './util';
import componentCss from './InputNumberPopup.module.less';

const LENGTH_LIMIT = 6;
const FULL_KEY_LIST = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del']];
const OVERLAY_KEY_LIST = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', 'del']];

const SpottableDiv = Spottable('div');

class InputNumberPopupBase extends React.Component {
	static propTypes = {
		length: PropTypes.number.isRequired,

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
		 * Set the type of input value.
		 *
		 * @type {String}
		 * @default 'number'
		 * @public
		 */
		inputType: PropTypes.oneOf(['number', 'password']),

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
		 * Set the type of popup.
		 *
		 * @type {String}
		 * @default 'full'
		 * @public
		 */
		popupType: PropTypes.oneOf(['full', 'overlay']),

		/**
		 * Title text of popup.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Title below text of popup.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		titleBelow: PropTypes.string,

		/**
		 * The value of the input.
		 *
		 * @type {String|Number}
		 * @public
		 */
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	}

	static defaultProps = {
		inputType: 'number',
		placeholder: '',
		popupType: 'full',
		title: '',
		titleBelow: '',
		value: ''
	}

	constructor (props) {
		super(props);
		this.state = {
			inputValue: props.value
		};
	}

	handle = handle.bind(this);

	add = (str) => () => {
		const result = this.state.inputValue + str;

		if (result.length < this.props.length) {
			this.handleChange(result);
		} else if (result.length === this.props.length)  {
			this.handleChange(result);
			setTimeout(() => {
				this.complete();
				this.props.closePopup();
			}, 100);
		} else {
			this.props.closePopup();
		}
	}

	remove = () => {
		const result = this.state.inputValue.toString().slice(0, -1);
		this.handleChange(result);
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
	}

	handleChange = (value) => {
		this.setState({inputValue: value});
	}

	handleBackKey = this.handle(
		forKeyCode(461),
		() => this.cancel(),
		() => this.props.closePopup()
	)

	renderPreview = () => {
		const {inputType} = this.props;
		const values = this.state.inputValue.toString().split('');
		const getItemValue = (index) => {
			if (index < values.length) {
				if (this.props.inputType === 'password') {
					return '*';
				} else {
					return values[index];
				}
			} else {
				return '';
			}
		};

		if (this.props.length <= LENGTH_LIMIT) {
			const items = new Array(this.props.length).fill('');
			return (
				<Layout inline aria-label={inputType !== 'password' ? values.join(' ') : null} aria-live="polite">
					{items.map((_, index) => (
						<div className={componentCss.previewItem} key={index}>
							{getItemValue(index)}
						</div>
					))}
				</Layout>
			);
		} else {
			return <div className={componentCss.previewText}>{inputType === 'password' ? convertToPasswordFormat(values) : values.join('')}</div>;
		}
	}

	renderKeypad = () => {
		const keyList = this.props.popupType === 'full' ?  FULL_KEY_LIST : OVERLAY_KEY_LIST;

		return (
			<Layout orientation="vertical" align="center center">
				{
					keyList.map((row, rowIndex) => (
						<Layout key={`row_${rowIndex}`} align="center center" inline>
							{
								row.map((val, colIndex) => {
									const content = val === 'del' ? <Icon>arrowleftprevious</Icon> : val; // TBD: arrowleftprevious should be replaced to correct one base on GUI

									return (
										<SpottableDiv
											role="button"
											data-webos-voice-intent="Select"
											className={componentCss.keypadItem}
											style={{visibility: val === '' ? 'hidden' : 'visible'}}
											onClick={val === 'del' ? this.remove : this.add(val)}
											key={`col_${colIndex}`}
										>
											{content}
										</SpottableDiv>
									);
								})
							}
						</Layout>
					))
				}
			</Layout>
		);
	}

	render () {
		let {placeholder, title, titleBelow, popupType, inputType, buttonProps, children, disabled, value, openPopup, className, ...rest} = this.props;

		delete rest.closePopup;
		delete rest.onComplete;

		return (
			<React.Fragment>
				<Popup
					onShow={this.handleShow}
					onKeyDown={this.handleBackKey}
					className={`${className} ${componentCss.inputNumberPopup} ${popupType === 'full' ? componentCss.full : componentCss.overlay}`}
					{...rest}
				>
					<div className={componentCss.popupBody}>
						<div className={componentCss.headerArea}>
							<Marquee marqueeOn={'render'} alignment={'center'} className={componentCss.title}>{title}</Marquee>
							<Marquee marqueeOn={'render'} alignment={'center'} className={componentCss.titleBelow}>{titleBelow}</Marquee>
						</div>
						<div className={componentCss.previewArea}>{this.renderPreview()}</div>
						<div className={componentCss.keypadArea}>{this.renderKeypad()}</div>
						<div className={componentCss.buttonArea}>{children}</div>
					</div>
				</Popup>
				<Button disabled={disabled} onClick={openPopup} {...buttonProps}>
					{(inputType === 'password' ? convertToPasswordFormat(value) : value) || placeholder}
				</Button>
			</React.Fragment>
		);
	}
}

const InputNumberPopupDecorator = compose(
	Pure,
	Toggleable({activate: 'openPopup', deactivate: 'closePopup', prop: 'open'}),
	Skinnable
);

/**
 * Provide number input in the form of a popup
 *
 * Usage:
 * ```
 * <InputNumberPopup
 * 	 popupType={'overlay'}
 * 	 length={4}
 *   title={'Title'}
 *   titleBelow={'TitleBelow'}
 *   placeholder={'Placeholder'}
 * 	 value={this.state.inputText}
 * 	 onComplete={this.handleInputComplete}
 * />
 * ```
 *
 * @class InputPopup
 * @memberof sandstone/InputNumberPopup
 * @extends sandstone/InputNumberPopup.InputNumberPopupBase
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */

const InputNumberPopup = InputNumberPopupDecorator(InputNumberPopupBase);

export default InputNumberPopup;
export {InputNumberPopup, InputNumberPopupBase};
