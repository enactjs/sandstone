import kind from '@enact/core/kind';
import {isRtlText} from '@enact/i18n/util';
import React from 'react';
import PropTypes from 'prop-types';

import Marquee from '../Marquee';

import css from './Tooltip.module.less';

/**
 * {@link sandstone/TooltipDecorator.TooltipLabel} is a stateless tooltip component with
 * Sandstone styling applied.
 *
 * @class TooltipLabel
 * @memberof sandstone/TooltipDecorator
 * @ui
 * @private
 */
const TooltipLabel = kind({
	name: 'TooltipLabel',

	propTypes: /** @lends sandstone/TooltipDecorator.TooltipLabel.prototype */ {
		/**
		 * The node to be displayed as the main content of the tooltip.
		 *
		 * @type {Node}
		 * @required
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Apply marquee flow. To use this, `width` must be specified together.
		 *
		 * @type {Boolean}
		 * @public
		 */
		marquee: PropTypes.bool,

		/**
		 * The width of tooltip content in pixels (px). If the content goes over the given width,
		 * then it will automatically wrap. When `null`, content does not wrap.
		 *
		 * @type {Number}
		 * @public
		 */
		width: PropTypes.number
	},

	styles: {
		css
	},

	computed: {
		className: ({marquee, width, styler}) => styler.append({multi: (!marquee && !!width)}),
		style: ({children, width, style}) => {
			return {
				...style,
				direction: isRtlText(children) ? 'rtl' : 'ltr',
				width
			};
		}
	},

	render: ({children, marquee, width, ...rest}) => {
		if (marquee && width) {
			return (
				<Marquee {...rest} marqueeOn="render">
					{children}
				</Marquee>
			);
		} else {
			return (
				<div {...rest}>
					{children}
				</div>
			);
		}
	}
});

export default TooltipLabel;
export {
	TooltipLabel
};
