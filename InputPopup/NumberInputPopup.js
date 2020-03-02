/**
 * Popup style input for number
 *
 * @module sandstone/NumberInputPopup
 * @exports NumberInputPopup
 * @exports InputNumberBasePopup
 */

import React from 'react';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {handle, forKeyCode, forward, adaptEvent} from '@enact/core/handle';
import Layout, {Cell} from '@enact/ui/Layout';
import Pure from '@enact/ui/internal/Pure';
import Toggleable from '@enact/ui/Toggleable';
import Changeable from '@enact/ui/Changeable';

import Button from '../Button';
import Heading from '../Heading';
import Icon from '../Icon';
import Popup from '../Popup';
import Skinnable from '../Skinnable';

import Keypad from './Keypad';
import {convertToPasswordFormat} from './util';

import componentCss from './NumberInputPopup.module.less';

const LENGTH_LIMIT = 6;

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

const NumberInputPopupBase = kind({
	name: 'NumberInputPopup',

	propTypes: {
		css: PropTypes.object,

		/**
		 * Disable the button that activate the input popup.
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
		 * @default 'number'
		 * @public
		 */
		type: PropTypes.oneOf(['number', 'password']),

		/**
		 * The value of the input.
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
		onAdd: handle(
			adaptEvent(({value: key}, {length, value}) => ({value: (value.length >= length ? value : `${value}${key}`)}),
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
			adaptEvent((ev, {value}) => ({value: value.toString().slice(0, -1)}), forward('onChange'))
		),
		handleBackKey: handle(
			forKeyCode(461),
			forward('onClose')
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
				return <div className={css.previewText}>{password ? convertToPasswordFormat(values) : values.join('')}</div>;
			}
		}
	},

	render: ({children, css, disabled, handleBackKey, type, onAdd, onRemove, open, placeholder, popupClassName, popupType, preview, subtitle, title, value, ...rest}) => {
		const password = (type === 'password');

		delete rest.onClose;
		delete rest.onChange;
		delete rest.onComplete;
		delete rest.onOpenPopup;

		return (
			<React.Fragment>
				<Popup
					onKeyDown={handleBackKey}
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
 * 	 popupType={'overlay'}
 * 	 length={4}
 *   title={'Title'}
 *   subtitle={'TitleBelow'}
 *   placeholder={'Placeholder'}
 * 	 value={this.state.inputText}
 * 	 onComplete={this.handleInputComplete}
 * />
 * ```
 *
 * @class InputPopup
 * @memberof sandstone/NumberInputPopup
 * @extends sandstone/NumberInputPopup.NumberInputPopupBase
 * @mixes ui/Toggleable.Toggleable
 * @mixes ui/Changeable.Changeable
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
