import PropTypes from 'prop-types';
import {Component} from 'react';

/**
 * A Sandstone-styled base component for [Scroller]{@link sandstone/Scroller.Scroller}.
 * In most circumstances, you will want to use the
 * [SpotlightContainerDecorator]{@link spotlight/SpotlightContainerDecorator.SpotlightContainerDecorator}
 * and the Scrollable version, [Scroller]{@link sandstone/Scroller.Scroller}.
 *
 * @class ScrollerBasic
 * @memberof sandstone/Scroller
 * @extends ui/Scroller.ScrollerBasic
 * @ui
 * @private
 */
class ScrollerBasic extends Component {
	static displayName = 'ScrollerBasic'

	static propTypes = /** @lends sandstone/Scroller.ScrollerBasic.prototype */ {
		/**
		 * Passes the instance of [Scroller]{@link ui/Scroller.Scroller}.
		 *
		 * @type {Object}
		 * @param {Object} ref
		 * @private
		 */
		initUiChildRef: PropTypes.func,

		/**
		 * Called when [Scroller]{@link sandstone/Scroller.Scroller} updates.
		 *
		 * @type {function}
		 * @private
		 */
		onUpdate: PropTypes.func,

		/**
		 * `true` if rtl, `false` if ltr.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The spotlight id for the component.
		 *
		 * @type {String}
		 * @private
		 */
		spotlightId: PropTypes.string
	}
}

/**
 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
 * not move focus to the scrollbar controls.
 *
 * @name focusableScrollbar
 * @memberof sandstone/Scroller.ScrollerBasic.prototype
 * @type {Boolean|'byEnter'}
 * @default false
 * @private
 */

/**
 * Unique identifier for the component.
 *
 * When defined and when the `Scroller` is within a [Panel]{@link sandstone/Panels.Panel}, the
 * `Scroller` will store its scroll position and restore that position when returning to the
 * `Panel`.
 *
 * @name id
 * @memberof sandstone/Scroller.ScrollerBasic.prototype
 * @type {String}
 * @private
 */

export default ScrollerBasic;
export {
	ScrollerBasic
};
