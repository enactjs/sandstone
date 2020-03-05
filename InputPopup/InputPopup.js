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
import Input, {extractInputProps} from '../Input';
import Popup from '../Popup';
import Skinnable from '../Skinnable';
import Heading from '../Heading';

import {convertToPasswordFormat} from './util';
import componentCss from './InputPopup.module.less';

const setInputValue = ev => ({value: ev.target.value});

/**
 * Base component for providing text input in the form of a popup
 *
 * @class InputPopupBase
 * @memberof sandstone/InputPopup
 * @ui
 * @public
 */
const InputPopupBase = kind({
	name: 'InputPopup',

	propTypes: /** @lends sandstone/InputPopup.InputPopupBase */ {
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
		 * @type {String}
		 * @default 'text'
		 * @public
		 */
		type: PropTypes.oneOf(['text', 'password']),

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

	render: ({placeholder, children, css, title, subtitle, type, disabled, onClose, onOpenPopup, className, open, value, onShow, onChange, onInputKeyDown, ...rest}) => {

		// const inputProps = extractInputProps(rest);

		delete rest.onComplete;

		return (
			<React.Fragment>
				<Popup
					onClose={onClose}
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
							<Input placeholder="hello" />
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

const InputPopupDecorator = compose(
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
 * <InputPopup
 *   onComplete={this.handleInputComplete}
 *   placeholder="Placeholder"
 *   subtitle="TitleBelow"
 *   title="Title"
 *   value={this.state.inputText}
 * />
 * ```
 *
 * @class InputPopup
 * @memberof sandstone/InputPopup
 * @extends sandstone/InputPopup.InputPopupBase
 * @mixes ui/Changeable.Changeable
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
