/**
 * Provides Sandstone-themed scroller components and behaviors.
 * @example
 * <Scroller>
 * 	<div style={{height: '300px'}}>
 * 		<p>San Francisco</p>
 * 		<p>Seoul</p>
 * 		<p>Bangalore</p>
 * 		<p>New York</p>
 * 		<p>London</p>
 * 	</div>
 * </Scroller>
 *
 * @module sandstone/Scroller
 * @exports Scroller
 */

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import {ResizeContext} from '@enact/ui/Resizable';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import PropTypes from 'prop-types';
import React from 'react';

import useScroll from '../useScroll';
import Scrollbar from '../useScroll/Scrollbar';
import Skinnable from '../Skinnable';

import useThemeScroller from './useThemeScroller';

/**
 * A Sandstone-styled Scroller, useScroll applied.
 *
 * Usage:
 * ```
 * <Scroller>Scroll me.</Scroller>
 * ```
 *
 * @class Scroller
 * @memberof sandstone/Scroller
 * @extends ui/Scroller.ScrollerBasic
 * @ui
 * @public
 */
let Scroller = (props) => {
	// Hooks

	const {
		scrollContentWrapper: ScrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		resizeContextProps,
		scrollContainerProps,
		scrollInnerContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll(props);

	const themeScrollContentProps = useThemeScroller(scrollContentProps);
	const ScrollContainerDiv = (props.focusableScrollbar === 'byEnter') ? Spottable('div') : 'div';

	// Render
	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<ScrollContainerDiv {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiScrollerBasic {...themeScrollContentProps} />
					</ScrollContentWrapper>
				</div>
				{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</ScrollContainerDiv>
		</ResizeContext.Provider>
	);
};

Scroller.propTypes = /** @lends sandstone/Scroller.Scroller.prototype */ {
	/**
	 * `false` if the content of the scroller could get focus
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	'data-spotlight-container-disabled': PropTypes.bool,

	/**
	 * Allows 5-way navigation to the scroll thumb.
	 * By default, 5-way will not move focus to the scroll thumb.
	 * If `true`, the scroll thumb will get focus by directional keys.
	 * If `'byEnter'`, scroll body will get focus first by directional keys,
	 * then the scroll thumb will get focus by enter key pressed on scroll body.
	 *
	 * @type {Boolean|String}
	 * @default false
	 * @public
	 */
	focusableScrollbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['byEnter'])]),

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `Scroller` is within a [Panel]{@link sandstone/Panels.Panel}, the
	 * `Scroller` will store its scroll position and restore that position when returning to the
	 * `Panel`.
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

	/**
	 * Specifies how to scroll.
	 *
	 * Valid values are:
	 * * `'translate'`,
	 * * `'native'`.
	 *
	 * @type {String}
	 * @default 'native'
	 * @public
	 */
	scrollMode: PropTypes.string
};

Scroller.defaultProps = {
	'data-spotlight-container-disabled': false, // eslint-disable-line react/default-props-match-prop-types
	direction: 'both',
	focusableScrollbar: false, // eslint-disable-line react/default-props-match-prop-types
	horizontalScrollbar: 'auto',
	overscrollEffectOn: { // eslint-disable-line react/default-props-match-prop-types
		arrowKey: false,
		drag: false,
		pageKey: false,
		track: false,
		wheel: true
	},
	scrollMode: 'native', // eslint-disable-line react/default-props-match-prop-types
	verticalScrollbar: 'auto'
};

Scroller = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			Scroller
		)
	)
);

export default Scroller;
export {
	Scroller,
};
