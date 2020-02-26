import PropTypes from 'prop-types';
import {Component} from 'react';

/**
 * Provides Sandstone-themed scrollable components and behaviors.
 *
 * @module sandstone/Scrollable
 * @exports Scrollable
 * @private
 */

/**
 * A Sandstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class ScrollableBasic
 * @memberof sandstone/Scrollable
 * @extends ui/Scrollable.ScrollableBasic
 * @ui
 * @private
 */
class ScrollableBasic extends Component { // ScrollableBasic is now only used in storybook.
	static displayName = 'Scrollable'

	static propTypes = /** @lends sandstone/Scrollable.Scrollable.prototype */ {
		/**
		 * Render function.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		childRenderer: PropTypes.func.isRequired,

		/**
		 * This is set to `true` by SpotlightContainerDecorator
		 *
		 * @type {Boolean}
		 * @private
		 */
		'data-spotlight-container': PropTypes.bool,

		/**
		 * `false` if the content of the list or the scroller could get focus
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		'data-spotlight-container-disabled': PropTypes.bool,

		/**
		 * This is passed onto the wrapped component to allow
		 * it to customize the spotlight container for its use case.
		 *
		 * @type {String}
		 * @private
		 */
		'data-spotlight-id': PropTypes.string,

		/**
		 * Direction of the list or the scroller.
		 * `'both'` could be only used for[Scroller]{@link sandstone/Scroller.Scroller}.
		 *
		 * Valid values are:
		 * * `'both'`,
		 * * `'horizontal'`, and
		 * * `'vertical'`.
		 *
		 * @type {String}
		 * @private
		 */
		direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

		/**
		 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
		 * not move focus to the scrollbar controls.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		focusableScrollbar: PropTypes.bool,

		/**
		 * A unique identifier for the scrollable component.
		 *
		 * When specified and when the scrollable is within a SharedStateDecorator, the scroll
		 * position will be shared and restored on mount if the component is destroyed and
		 * recreated.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Specifies overscroll effects shows on which type of inputs.
		 *
		 * @type {Object}
		 * @default {
		 *	arrowKey: false,
		 *	drag: false,
		 *	pageKey: false,
		 *	wheel: true
		 * }
		 * @private
		 */
		overscrollEffectOn: PropTypes.shape({
			arrowKey: PropTypes.bool,
			drag: PropTypes.bool,
			pageKey: PropTypes.bool,
			track: PropTypes.bool,
			wheel: PropTypes.bool
		}),

		/*
		 * TBD
		 */
		scrollMode: PropTypes.string
	}

	static defaultProps = {
		'data-spotlight-container-disabled': false,
		focusableScrollbar: false,
		overscrollEffectOn: {
			arrowKey: false,
			drag: false,
			pageKey: false,
			track: false,
			wheel: true
		},
		scrollMode: 'translate'
	}
}

/**
 * A Sandstone-styled component that provides horizontal and vertical scrollbars.
 *
 * @class Scrollable
 * @memberof sandstone/Scrollable
 * @mixes spotlight/SpotlightContainerDecorator
 * @extends sandstone/Scrollable.ScrollableBasic
 * @ui
 * @private
 */

export default ScrollableBasic;
export {
	ScrollableBasic as Scrollable,
	ScrollableBasic
};
