import kind from '@enact/core/kind';
import ForwardRef from '@enact/ui/ForwardRef';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';

import css from './Scrollbar.module.less';

/**
 * An [Button]{@link sandstone/Button.Button} used within
 * a [Scrollbar]{@link sandstone/Scrollable.Scrollbar}.
 *
 * @class ScrollButton
 * @memberof sandstone/Scrollable
 * @extends sandstone/Button.Button
 * @ui
 * @private
 */
const ScrollButtonBase = kind({
	name: 'ScrollButton',

	propTypes: /** @lends sandstone/Scrollable.ScrollButton.prototype */ {
		/**
		 * Name of icon.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		children: PropTypes.string.isRequired,

		/**
		 * Sets the `aria-label`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		active: PropTypes.bool,

		/**
		* Sets the hint string read when focusing the scroll bar button.
		*
		* @type {String}
		* @memberof sandstone/Scrollable.ScrollButton.prototype
		* @public
		*/
		'aria-label': PropTypes.string,

		/**
		 * Disables the button.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Returns a ref to the root node of the scroll button
		 *
		 * See: https://github.com/facebook/prop-types/issues/240
		 *
		 * @type {Function|Object}
		 * @private
		 */
		forwardRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.shape({current: PropTypes.any})
		])
	},

	styles: {
		css,
		className: 'scrollButton'
	},

	handlers: {
		forwardRef: (node, {forwardRef}) => {
			// Allowing findDOMNode in the absence of a means to retrieve a node ref through Button
			// eslint-disable-next-line react/no-find-dom-node
			const current = ReactDOM.findDOMNode(node);

			// Safely handle old ref functions and new ref objects
			switch (typeof forwardRef) {
				case 'object':
					forwardRef.current = current;
					break;
				case 'function':
					forwardRef(current);
					break;
			}
		}
	},

	computed: {
		'aria-label': ({active, 'aria-label': ariaLabel}) => (active ? null : ariaLabel)
	},

	render: ({children, disabled, forwardRef, ...rest}) => {
		delete rest.active;

		return (
			<Button
				{...rest}
				backgroundOpacity="transparent"
				disabled={disabled}
				icon={children}
				ref={forwardRef}
				size="small"
			/>
		);
	}
});

const ScrollButton = ForwardRef(ScrollButtonBase);

export default ScrollButton;
export {
	ScrollButton
};
