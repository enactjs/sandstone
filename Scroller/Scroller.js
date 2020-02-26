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
 * @exports ScrollerBasic
 */

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {ResizeContext} from '@enact/ui/Resizable';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import PropTypes from 'prop-types';
import React from 'react';

import useScroll from '../useScroll';
import Scrollbar from '../useScroll/Scrollbar';
import Skinnable from '../Skinnable';

import ScrollerBasic from './ScrollerBasic';
import useThemeScroller from './useThemeScroller';

/**
 * A Sandstone-styled Scroller, Scrollable applied.
 *
 * Usage:
 * ```
 * <Scroller>Scroll me.</Scroller>
 * ```
 *
 * @class Scroller
 * @memberof sandstone/Scroller
 * @extends sandstone/Scroller.ScrollerBasic
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

	// Render

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiScrollerBasic {...themeScrollContentProps} />
					</ScrollContentWrapper>
				</div>
				{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
		</ResizeContext.Provider>
	);
};

Scroller.propTypes = /** @lends sandstone/Scroller.Scroller.prototype */ {
	direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

	/**
	 * Specifies how to show horizontal scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	horizontalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

	/**
	 * Specifies how to show vertical scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	verticalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden'])
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
	type: 'JS', // eslint-disable-line react/default-props-match-prop-types
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
	ScrollerBasic
};
