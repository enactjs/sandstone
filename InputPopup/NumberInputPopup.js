import {handle, forKey, oneOf, forward, adaptEvent} from '@enact/core/handle';
import {add} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import Layout, {Cell} from '@enact/ui/Layout';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Button from '../Button';
import Heading from '../Heading';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';

import Keypad from './Keypad';
import {convertToPasswordFormat} from './util';

import componentCss from './NumberInputPopup.module.less';

const LENGTH_LIMIT = 6;

add('number', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]); // Establish all number keys as 'number' keyword.

const PreviewItem = kind({
	name: 'PreviewItem',

	propTypes: /** @lends sandstone/Checkbox.PreviewItem.prototype */ {
		children: PropTypes.string,
		password: PropTypes.bool,
		passwordIcon: PropTypes.string
	},

	defaultProps: {
		password: false,
		passwordIcon: 'circle'
	},

	styles: {
		css: componentCss,
		className: 'previewItem'
	},

	computed: {
		className: ({password, styler}) => styler.append({password})
	},

	render: ({children, password, passwordIcon, ...rest}) => {
		return (
			<Icon
				size="large"
				{...rest}
			>
				{(password && children) ? passwordIcon : children}
			</Icon>
		);
	}
});

/**
 * Base component for providing numeric input in the form of a popup
 *
 * @class NumberInputPopupBase
 * @memberof sandstone/InputPopup
 * @ui
 * @public
 */
const NumberInputPopupBase = kind({
	name: 'NumberInputPopup',

	propTypes: /** @lends sandstone/InputPopup.NumberInputPopupBase */ {
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
		 * Set the length of input value.
		 *
		 * @type {String}
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
		 * Close input popup.
		 *
		 * @type {Function}
		 * @private
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
		 * @private
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
		 * @type {String}
		 * @default 'full'
		 * @public
		 */
		popupType: PropTypes.oneOf(['full', 'overlay']),

		/**
		 * Subtitle below the title of popup.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		subtitle: PropTypes.string,

		/**
		 * The title text of popup.
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Type of the input.
		 *
		 * @type {String}
		 * @default 'number'
		 * @public
		 */
		type: PropTypes.oneOf(['number', 'password']),

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
		popupType: 'full',
		subtitle: '',
		title: '',
		type: 'number',
		value: ''
	},

	styles: {
		css: componentCss,
		className: 'numberInput'
	},

	handlers: {
		onKeyDown: handle(
			forKey('number'),
			// LAZILY copy/paste the below code to get the same behavior
			adaptEvent(
				({key}, {length, value}) => ({
					value: (value.length >= length ? value : `${value}${key}`)
				}),
				handle(
					forward('onChange'),

					// DEV NOTE: Probably move these to its own Decorator
					({value: updatedValue}, {length}) => (updatedValue.length >= length),
					(ev, props) => {
						setTimeout(() => {
							forward('onClose', ev, props);
							forward('onComplete', ev, props);
						}, 250);
						return true;
					}
				)
			)
		),
		onAdd: handle(
			adaptEvent(
				({value: key}, {length, value}) => ({
					value: (value.length >= length ? value : `${value}${key}`)
				}),
				handle(
					forward('onChange'),

					// DEV NOTE: Probably move these to its own Decorator
					({value: updatedValue}, {length}) => (updatedValue.length >= length),
					(ev, props) => {
						setTimeout(() => {
							forward('onClose', ev, props);
							forward('onComplete', ev, props);
						}, 250);
						return true;
					}
				)
			),
		),
		onClick: handle(
			forward('onClick'),
			forward('onOpenPopup')
		),
		onRemove: handle(
			adaptEvent(
				(ev, {value}) => ({value: value.toString().slice(0, -1)}),
				forward('onChange')
			)
		)
	},

	computed: {
		popupClassName: ({popupType, styler}) => styler.join('numberInputPopup', popupType),
		preview: ({css, type, value, length}) => {
			const values = value.toString().split('');
			const password = (type === 'password');

			if (length <= LENGTH_LIMIT) {
				const items = new Array(length).fill('');
				return (
					<Layout aria-label={!password ? values.join(' ') : null} aria-live="polite">
						{items.map((_, index) => (
							<Cell shrink component={PreviewItem} key={index} password={password}>
								{values[index]}
							</Cell>
						))}
					</Layout>
				);
			} else {
				return (
					<div className={css.previewText}>
						{password ? convertToPasswordFormat(values) : values.join('')}
					</div>
				);
			}
		}
	},

	render: ({children, css, disabled, onClose, onKeyDown, type, onAdd, onRemove, open, placeholder, popupClassName, popupType, preview, subtitle, title, value, ...rest}) => {
		const password = (type === 'password');

		delete rest.onChange;
		delete rest.onComplete;
		delete rest.onOpenPopup;

		return (
			<React.Fragment>
				<Popup
					onClose={onClose}
					onKeyDown={onKeyDown}
					noAnimation
					position={popupType === 'full' ? 'fullscreen' : 'center'}
					className={popupClassName}
					open={open}
				>
					<Layout orientation="vertical" align="center space-between" className={css.popupBody}>
						<Cell shrink className={css.headerArea}>
							<Heading size="title" marqueeOn={'render'} alignment="center">{title}</Heading>
							<Heading size="subtitle" marqueeOn={'render'} alignment="center">{subtitle}</Heading>
						</Cell>
						<Cell shrink className={css.previewArea}>{preview}</Cell>
						<Cell shrink className={css.keypadArea}>
							<Keypad onAdd={onAdd} onRemove={onRemove} />
						</Cell>
						<Cell shrink className={css.buttonArea}>{children}</Cell>
					</Layout>
				</Popup>
				<Button disabled={disabled} {...rest}>
					{(password ? convertToPasswordFormat(value) : value) || placeholder}
				</Button>
			</React.Fragment>
		);
	}
});

const NumberInputPopupDecorator = compose(
	Pure,
	Toggleable({activate: 'onOpenPopup', deactivate: 'onClose', prop: 'open'}),
	Changeable,
	Skinnable
);

/**
 * Provide number input in the form of a popup
 *
 * Usage:
 * ```
 * <NumberInputPopup
 *   length={4}
 *   onComplete={this.handleInputComplete}
 *   placeholder="Placeholder"
 *   popupType="overlay"
 *   title="Title"
 *   subtitle="TitleBelow"
 *   value={this.state.inputText}
 * />
 * ```
 *
 * @class NumberInputPopup
 * @memberof sandstone/InputPopup
 * @extends sandstone/InputPopup.NumberInputPopupBase
 * @mixes ui/Changeable.Changeable
 * @mixes ui/Toggleable.Toggleable
 * @ui
 * @public
 */

const NumberInputPopup = NumberInputPopupDecorator(NumberInputPopupBase);

export default NumberInputPopup;
export {
	NumberInputPopup,
	NumberInputPopupBase,
	NumberInputPopupDecorator
};
