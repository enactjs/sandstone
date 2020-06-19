import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';

import TooltipLabel from './TooltipLabel';
import componentCss from './Tooltip.module.less';


// Set the default Arrow Anchor value based on the type of tooltip
function defaultArrowAnchor (type) {
	return (type === 'transparent' ? 'center' : 'right');
}

// Set the default Direction of tooltip based on the type of tooltip
function defaultDirection (type) {
	return (type === 'transparent' ? 'below' : 'above');
}

/**
 * A stateless tooltip component with Sandstone styling applied.
 *
 * @class TooltipBase
 * @memberof sandstone/TooltipDecorator
 * @ui
 * @public
 */
const TooltipBase = kind({
	name: 'Tooltip',

	propTypes: /** @lends sandstone/TooltipDecorator.TooltipBase.prototype */ {
		/**
		 * The node to be displayed as the main content of the tooltip.
		 *
		 * @type {Node}
		 * @required
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Position of tooltip arrow in relation to the activator.
		 *
		 * Note that `'left'`, `'center'`, `'right'` are applicable when direction is in vertical
		 * orientation (i.e. `'above'`, `'below'`), and `'top'`, `'middle'`, and `'bottom'` are
		 * applicable when direction is in horizontal orientation (i.e. `'left'`, `'right'`)
		 *
		 * For `type="balloon"`, the default is `"right"`
		 * For `type="transparent"`, the default is `"center"` (The arrow will not be visible)
		 *
		 * @type {('left'|'center'|'right'|'top'|'middle'|'bottom')}
		 * @public
		 */
		arrowAnchor: PropTypes.oneOf(['left', 'center', 'right', 'top', 'middle', 'bottom']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `tooltip` - The root component class
		 * * `tooltipLabel` - Applied the label node
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Direction of label in relation to the activator.
		 *
		 * For `type="balloon"`, the default is `"above"`
		 * For `type="transparent"`, the default is `"below"`
		 *
		 * @type {('above'|'below'|'left'|'right')}
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'below', 'left', 'right']),

		/**
		 * A value representing the amount to offset the label portion of the tooltip.
		 *
		 * In a "center" aligned tooltip, the label may be desirable to offset to one side or the
		 * other. This prop accepts a value between -0.5 and 0.5 (representing 50% to the left or
		 * right). This defaults to 0 offset (centered). It also automatically caps the value so it
		 * never positions the tooltip label past the anchored arrow. If the tooltip label or arrow
		 * has non-rectangular geometry (rounded corners, a wide tail, etc), you'll need to manually
		 * account for that in your provided offset value.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		labelOffset: PropTypes.number,

		/**
		 * Allows the tooltip to marquee.
		 *
		 * Specifying a [`width`]{@link sandstone/TooltipDecorator.TooltipBase#width} restrects
		 * the marquee to that size.
		 *
		 * @type {Boolean}
		 * @public
		 */
		marquee: PropTypes.bool,

		/**
		 * Style object for tooltip position.
		 *
		 * @type {Object}
		 * @public
		 */
		position: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number
		}),

		/**
		 * Anchors the tooltip relative to its container.
		 *
		 * Reconfigures the component to anchor itself to the designated edge of its container.
		 * When this is not specified, the implication is that the component is "absolutely"
		 * positioned, relative to the viewport, rather than its parent layer.
		 *
		 * @type {Boolean}
		 * @public
		 */
		relative: PropTypes.bool,

		/**
		 * Called when the tooltip mounts/unmounts, giving a reference to the DOM.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		tooltipRef: EnactPropTypes.ref,

		/**
		 * Type of tooltip.
		 *
		 * | *Value* | *Tooltip Appearance* |
		 * |---|---|
		 * | `'balloon'` | Tooltip with a border, background and arrow to the activator |
		 * | `'transparent'` | Text only without any of the decorations above |
		 *
		 * @type {('balloon'|'transparent')}
		 * @default 'balloon'
		 * @public
		 */
		type: PropTypes.oneOf(['balloon', 'transparent']),

		/**
		 * The width of tooltip content in pixels (px).
		 *
		 * If the content goes over the given width, then it will automatically wrap or marquee,
		 * depending on `marquee`. When `null`, content does not wrap or marquee.
		 *
		 * @type {Number|null}
		 * @public
		 */
		width: PropTypes.number
	},

	defaultProps: {
		type: 'balloon',
		labelOffset: 0
	},

	styles: {
		css: componentCss,
		className: 'tooltip',
		publicClassNames: ['tooltip', 'tooltipLabel']
	},

	computed: {
		labelOffset: ({labelOffset}) => {
			if (labelOffset) {
				const cappedPosition = Math.max(-0.5, Math.min(0.5, labelOffset));
				return {transform: `translateX(${cappedPosition * 100}%)`};
			}
		},
		className: ({direction, arrowAnchor, relative, type, styler}) => styler.append(direction || defaultDirection(type), `${arrowAnchor || defaultArrowAnchor(type)}Arrow`, {relative, absolute: !relative}, type),
		style: ({position, style}) => {
			return {
				...style,
				...position
			};
		}
	},

	render: ({arrowAnchor, children, css, tooltipRef, width, labelOffset, marquee, ...rest}) => {
		delete rest.labelOffset;
		delete rest.direction;
		delete rest.position;
		delete rest.relative;
		delete rest.type;

		return (
			<div {...rest}>
				<div className={css.tooltipAnchor} ref={tooltipRef} >
					<div className={css.tooltipArrow} />
					<TooltipLabel className={css.tooltipLabel} marquee={marquee} centered={arrowAnchor === 'center'} width={width} style={labelOffset}>
						{children}
					</TooltipLabel>
				</div>
			</div>
		);
	}
});

/**
 * A tooltip component with Sandstone styling applied.
 *
 * @class Tooltip
 * @memberof sandstone/TooltipDecorator
 * @ui
 * @public
 */
const Tooltip = Skinnable(TooltipBase);

export default Tooltip;
export {Tooltip, TooltipBase, defaultArrowAnchor, defaultDirection};
