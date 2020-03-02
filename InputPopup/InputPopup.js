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
import {handle, adaptEvent, oneOf, forKey, forward, returnsTrue} from '@enact/core/handle';
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

import {convertToPasswordFormat} from './util';
import componentCss from './InputPopup.module.less';

const setInputValue = ev => ({value: ev.target.value});

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
		 * Set the type of input value.
		 *
		 * @type {String}
		 * @default 'text'
		 * @public
		 */
		type: PropTypes.oneOf(['text', 'password']),

		/**
		 * The value of the input.
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
		onShow: handle(
			forward('onShow'),
			() => Spotlight.setPointerMode(false)
		),

		onKeyDown: handle(
			forward('onKeyDown'),
			// (e, props, context) => {
			// 	// console.log('custom handler', forKey('left', e, props));
			// 	if (forKeyCode(461) || forKeyCode(18) || forKey('esc')) {
			// 		return handle( // Alt key
			// 			oneOf(
			// 				// If the value didn't change at all, just close and don't bother firing an update.
			// 				[(ev, {value}) => (ev.target.value === value), forward('onClosePopup')],
			// 				// If the above failed, the value is different, proceed with firing an update.
			// 				[returnsTrue, adaptEvent(
			// 					(ev, {value}) => ({value}),
			// 					forward('onChange')
			// 				)]
			// 			),
			// 			e, props, context
			// 		);
			// 	}
			// 	return true;
			// },
			oneOf(
				// If any of the following are detected, continue
				[forKey('cancel'), handle( // Back and ESC keys
					oneOf(
						// If the value didn't change at all, just close and don't bother firing an update.
						[(ev, {value}) => (ev.target.value === value), forward('onClosePopup')],
						// If the above failed, the value is different, proceed with firing an update.
						[returnsTrue, adaptEvent(
							(ev, {value}) => ({value}),
							forward('onChange')
						)]
					),
				)],
				[forKey('enter'), adaptEvent(
					setInputValue,
					forward('onComplete')
				)]
			),
			// oneOf(
			// 	// If any of the following are detected, continue
			// 	[allOf(
			// 		[
			// 			forKeyCode(461),
			// 			forKeyCode(18), // Alt
			// 			forKeyCode(17), // Ctrl
			// 			forKeyCode(16), // Shift
			// 			forKey('esc')
			// 		], returnsTrue
			// 	), log('allOf')],
			// 	[anyOf(
			// 		[
			// 			forKeyCode(461),
			// 			forKeyCode(18), // Alt
			// 			forKeyCode(17), // Ctrl
			// 			forKeyCode(16), // Shift
			// 			forKey('esc')
			// 		], returnsTrue
			// 	), log('anyOf')],
			// 	[forKeyCode(461), returnsTrue], // Back key
			// 	[forKeyCode(18), handle( // Alt key
			// 		oneOf(
			// 			// If the value didn't change at all, just close and don't bother firing an update.
			// 			[(ev, {value}) => (ev.target.value === value), forward('onClosePopup')],
			// 			// If the above failed, the value is different, proceed with firing an update.
			// 			[returnsTrue, adaptEvent(
			// 				(ev, {value}) => ({value}),
			// 				forward('onChange')
			// 			)]
			// 		),
			// 	)],
			// 	// log('input and original differ'),
			// 	[forKey('esc'), returnsTrue],
			// 	[forKey('enter'), adaptEvent(
			// 		setInputValue,
			// 		forward('onComplete')
			// 	)]
			// ),
			// oneOf(
			// 	// If any of the following are detected, continue
			// 	[forKeyCode(461), returnsTrue], // Back key
			// 	[forKeyCode(18), handle( // Alt key
			// 		oneOf(
			// 			// If the value didn't change at all, just close and don't bother firing an update.
			// 			[(ev, {value}) => (ev.target.value === value), forward('onClosePopup')],
			// 			// If the above failed, the value is different, proceed with firing an update.
			// 			[returnsTrue, adaptEvent(
			// 				(ev, {value}) => ({value}),
			// 				forward('onChange')
			// 			)]
			// 		),
			// 	)],
			// 	// log('input and original differ'),
			// 	[forKey('esc'), returnsTrue],
			// 	[forKey('enter'), adaptEvent(
			// 		setInputValue,
			// 		forward('onComplete')
			// 	)]
			// ),
			forward('onClosePopup')
		)
	},

	render: ({placeholder, children, css, title, subtitle, type, disabled, onOpenPopup, className, open, value, onShow, onChange, onKeyDown, ...rest}) => {

		const inputProps = extractInputProps(rest);

		delete rest.onClosePopup;
		delete rest.onComplete;

		return (
			<React.Fragment>
				<Popup
					onShow={onShow}
					className={className}
					position="fullscreen"
					noAnimation
					open={!disabled && open}
				>
					<Layout orientation="vertical" align="center" className={css.popupBody}>
						<Cell shrink>
							<Heading size="title" marqueeOn="render" alignment="center" className={css.title}>{title}</Heading>
							<Heading size="subtitle" marqueeOn="render" alignment="center" className={css.subtitle}>{subtitle}</Heading>
						</Cell>
						<Cell align="center" className={css.inputArea}>
							<Input
								autoFocus
								type={type}
								defaultValue={value}
								placeholder={placeholder}
								onChange={onChange}
								onKeyDown={onKeyDown}
								{...inputProps}
							/>
						</Cell>
						<Cell shrink>
							{children}
						</Cell>
					</Layout>
				</Popup>
				<Button disabled={disabled} onClick={onOpenPopup} {...rest}>
					{(type === 'password' ? convertToPasswordFormat(value) : value) || placeholder}
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
export {
	InputPopup,
	InputPopupBase,
	InputPopupDecorator
};
