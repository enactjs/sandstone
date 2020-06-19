import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../Skinnable';

import css from './ContextualPopup.module.less';

/**
 * An SVG arrow for {@link sandstone/ContextualPopupDecorator/ContextualPopup.ContextualPopup}.
 *
 * @class ContextualPopupArrow
 * @memberof sandstone/ContextualPopupDecorator
 * @ui
 * @private
 */
const ContextualPopupArrow = kind({
	name: 'ContextualPopupArrow',

	propTypes: /** @lends sandstone/ContextualPopupDecorator.ContextualPopupArrow.prototype */ {
		direction: PropTypes.oneOf(['above', 'below', 'left', 'right']),

		/**
		 * Offset from the activator to apply to the position of the popup.
		 *
		 * @type {('none'|'overlap'|'small')}
		 * @private
		 */
		offset: PropTypes.oneOf(['none', 'overlap', 'small'])
	},

	defaultProps: {
		direction: 'below'
	},

	styles: {
		css,
		className: 'arrow'
	},

	computed: {
		className: ({direction, styler}) => styler.append(direction, css.arrow)
	},

	render: (props) => (
		<svg {...props} viewBox="0 0 30 30">
			<path d="M15 2 L0 20 L30 20 Z" className={css.arrowFill} />
		</svg>
	)
});

const ContextualPopupRoot = Skinnable('div');

/**
 * A popup component used by
 * [ContextualPopupDecorator]{@link sandstone/ContextualPopupDecorator.ContextualPopupDecorator} to
 * wrap its
 * [popupComponent]{@link sandstone/ContextualPopupDecorator.ContextualPopupDecorator.popupComponent}.
 *
 * `ContextualPopup` is usually not used directly but is made available for unique application use
 * cases.
 *
 * @class ContextualPopup
 * @memberof sandstone/ContextualPopupDecorator
 * @ui
 * @public
 */
const ContextualPopupBase = kind({
	name: 'ContextualPopup',

	propTypes: /** @lends sandstone/ContextualPopupDecorator.ContextualPopup.prototype */ {
		/**
		 * The contents of the popup.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Style object for arrow position.
		 *
		 * @type {Object}
		 * @public
		 */
		arrowPosition: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number
		}),

		/**
		 * Style object for container position.
		 *
		 * @type {Object}
		 * @public
		 */
		containerPosition: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number,
			width: PropTypes.number
		}),

		/**
		 * Called with the reference to the container node.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		containerRef: EnactPropTypes.ref,

		/**
		 * Direction of ContextualPopup.
		 *
		 * @type {('above'|'above center'|'above left'|'above right'|'below'|'below center'|'below left'|'below right'|'left middle'|'left top'|'left bottom'|'right middle'|'right top'|'right bottom')}
		 * @default 'below'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

		/**
		 * Shows the arrow.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showArrow: PropTypes.bool
	},

	defaultProps: {
		direction: 'below center'
	},

	styles: {
		css,
		className: 'container'
	},

	computed: {
		arrowDirection: ({direction}) => {
			const [arrowDirection] = direction.split(' ');
			return arrowDirection;
		},
		className: ({direction, offset, styler}) => styler.append(
			{
				fixedSize: direction === 'above' || direction === 'below'
			},
			direction.split(' '),
			offset
		)
	},

	render: ({arrowDirection, arrowPosition, className, containerPosition, containerRef, children, showArrow, ...rest}) => {
		delete rest.direction;

		return (
			<ContextualPopupRoot aria-live="off" role="alert" {...rest} className={css.contextualPopup}>
				<div className={className} style={containerPosition} ref={containerRef}>
					{children}
				</div>
				{showArrow ? <ContextualPopupArrow direction={arrowDirection} style={arrowPosition} /> : null}
			</ContextualPopupRoot>
		);
	}
});

export default ContextualPopupBase;
export {
	ContextualPopupBase as ContextualPopup,
	ContextualPopupBase
};
