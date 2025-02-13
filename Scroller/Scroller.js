/**
 * Provides Sandstone-themed scroller components and behaviors.
 *
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

import {setDefaultProps} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import {ResizeContext} from '@enact/ui/Resizable';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Fragment} from 'react';

import useScroll from '../useScroll';
import HoverToScroll from '../useScroll/HoverToScroll';
import Scrollbar from '../useScroll/Scrollbar';
import ScrollbarPlaceholder from '../useScroll/ScrollbarPlaceholder';
import Skinnable from '../Skinnable';

import {ContentContainerDecorator} from './ContentContainerDecorator';
import {EditableShape, EditableWrapper} from './EditableWrapper';
import useThemeScroller from './useThemeScroller';

const nop = () => {};
const SpottableDiv = Spottable('div');
let scrollerId = 0;

const scrollerDefaultProps = {
	'data-spotlight-container-disabled': false,
	cbScrollTo: nop,
	direction: 'both',
	fadeOut: false,
	focusableScrollbar: false,
	horizontalScrollbar: 'auto',
	noScrollByDrag: false,
	noScrollByWheel: false,
	onScroll: nop,
	onScrollStart: nop,
	onScrollStop: nop,
	overscrollEffectOn: {
		arrowKey: false,
		drag: true,
		pageKey: false,
		track: false,
		wheel: true
	},
	scrollMode: 'native',
	verticalScrollbar: 'auto'
};

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
	const scrollerProps = setDefaultProps(props, scrollerDefaultProps);
	if (typeof ENACT_PACK_NO_ANIMATION !== 'undefined' && ENACT_PACK_NO_ANIMATION) {
		scrollerProps.overscrollEffectOn = {
			arrowKey: false,
			drag: false,
			pageKey: false,
			track: false,
			wheel: false
		};
	}
	const {'aria-label': ariaLabel, hoverToScroll, ...rest} = scrollerProps;

	const id = `scroller_${++scrollerId}_content`;

	// Hooks

	const {
		scrollContentWrapper: ScrollContentWrapper,
		scrollContentHandle,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		resizeContextProps,
		scrollContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		horizontalScrollbarProps,
		verticalScrollbarProps,
		hoverToScrollProps
	} = useScroll({...rest, scrollToContentContainerOnFocus: true});

	const {
		className,
		...scrollContentWrapperRest
	} = scrollContentWrapperProps;

	const {
		editableWrapperProps,
		focusableBodyProps,
		themeScrollContentProps
	} = useThemeScroller(rest, {...scrollContentProps, className: classnames(className, scrollContentProps.className)}, id, isHorizontalScrollbarVisible, isVerticalScrollbarVisible);

	const {children, direction, editable} = rest;

	// To apply spotlight navigableFilter, SpottableDiv should be in scrollContainer.
	const ScrollBody = rest.focusableScrollbar === 'byEnter' ? SpottableDiv : Fragment;

	// Render
	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<ScrollContentWrapper {...scrollContainerProps} {...scrollContentWrapperRest}>
				<ScrollBody {...focusableBodyProps}>
					{rest.focusableScrollbar ? <ScrollbarPlaceholder /> : null}
					<UiScrollerBasic {...themeScrollContentProps} aria-label={ariaLabel} id={id} ref={scrollContentHandle}>
						{(editable && direction === 'horizontal') ?
							<EditableWrapper {...editableWrapperProps} /> :
							children
						}
					</UiScrollerBasic>
					{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
					{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
					{hoverToScroll ? <HoverToScroll {...hoverToScrollProps} /> : null}
				</ScrollBody>
			</ScrollContentWrapper>
		</ResizeContext.Provider>
	);
};

Scroller.displayName = 'Scroller';

Scroller.propTypes = /** @lends sandstone/Scroller.Scroller.prototype */ {
	/**
	 * The "aria-label" for the Scroller.
	 *
	 * When `aria-label` is set and `focusableScrollbar` is `byEnter`, it will be used
	 * instead to provide an accessibility label for the Scroller.
	 *
	 * @type {String}
	 * @public
	 */
	'aria-label': PropTypes.string,

	/**
	 * A callback function that receives a reference to the `scrollTo` feature.
	 *
	 * Once received, the `scrollTo` method can be called as an imperative interface.
	 *
	 * - {position: {x, y}} - Pixel value for x and/or y position
	 * - {align} - Where the scroll area should be aligned. Values are:
	 *   `'left'`, `'right'`, `'top'`, `'bottom'`,
	 *   `'topleft'`, `'topright'`, `'bottomleft'`, and `'bottomright'`.
	 * - {node} - Node to scroll into view
	 * - {animate} - When `true`, scroll occurs with animation. When `false`, no
	 *   animation occurs.
	 * - {focus} - When `true`, attempts to focus item after scroll. Only valid when scrolling
	 *   by `node`.
	 * > Note: Only specify one of: `position`, `align`, `node`
	 *
	 * Example:
	 * ```
	 *	// If you set cbScrollTo prop like below;
	 *	cbScrollTo: (fn) => {this.scrollTo = fn;}
	 *	// You can simply call like below;
	 *	this.scrollTo({align: 'top'}); // scroll to the top
	 * ```
	 *
	 * @type {Function}
	 * @public
	 */
	cbScrollTo: PropTypes.func,

	/**
	 * This is set to `true` by SpotlightContainerDecorator
	 *
	 * @type {Boolean}
	 * @private
	 */
	'data-spotlight-container': PropTypes.bool,

	/**
	 * `false` if the content of the scroller could get focus
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
	 * Disable voice control feature of component.
	 *
	 * @type {Boolean}
	 * @public
	 */
	'data-webos-voice-disabled': PropTypes.bool,

	/**
	 * Activates the component for voice control.
	 *
	 * @type {Boolean}
	 * @public
	 */
	'data-webos-voice-focused': PropTypes.bool,

	/**
	 * The voice control group label.
	 *
	 * @type {String}
	 * @public
	 */
	'data-webos-voice-group-label': PropTypes.string,

	/**
	 * Direction of the scroller.
	 *
	 * @type {('both'|'horizontal'|'vertical')}
	 * @default 'both'
	 * @public
	 */
	direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

	/**
	 * Enables editing items in the scroller.
	 * You can specify props for editable scroller as an object.
	 * See the details in {@link sandstone/Scroller.EditableShape|EditableShape}
	 *
	 * @type {sandstone/Scroller.EditableShape}
	 * @public
	 */
	editable: EditableShape,

	/**
	 * Adds fade-out effect on the scroller.
	 *
	 * Set this to `true` only if the content has no spottable but text.
	 * > Note: Fade-out effect will not show if the `direction` is set to `both`.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	fadeOut: PropTypes.bool,

	/**
	 * Allows 5-way navigation to the scroll thumb.
	 *
	 * By default, 5-way will not move focus to the scroll thumb.
	 * If `true`, the scroll thumb will get focus by directional keys.
	 * If `'byEnter'`, scroll thumb will get focus first by directional keys,
	 * then the scroll body will get focus by enter key or back key pressed on scroll thumb.
	 *
	 * @type {Boolean|'byEnter'}
	 * @default false
	 * @public
	 */
	focusableScrollbar: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['byEnter'])]),

	/**
	 * Specifies how to show horizontal scrollbar.
	 *
	 * @type {('auto'|'visible'|'hidden')}
	 * @default 'auto'
	 * @public
	 */
	horizontalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

	/**
	 * Sets the hint string read when focusing the scroll thumb in the horizontal scroll bar.
	 *
	 * @type {String}
	 * @default $L('scroll up or down with up down button')
	 * @public
	 */
	horizontalScrollThumbAriaLabel: PropTypes.string,

	/**
	 * Enables scroll by hover on edges in scroll direction.
	 *
	 * @type {Boolean}
	 * @public
	 */
	hoverToScroll: PropTypes.bool,

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `Scroller` is within a {@link sandstone/Panels.Panel|Panel}, the
	 * `Scroller` will store its scroll position and restore that position when returning to the
	 * `Panel`.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Prevents scroll by dragging or flicking on the scroller.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	noScrollByDrag: PropTypes.bool,

	/**
	 * Prevents scroll by wheeling on the scroller.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noScrollByWheel: PropTypes.bool,

	/**
	 * Called when scrolling.
	 *
	 * Passes `scrollLeft`, `scrollTop`.
	 * It is not recommended to set this prop since it can cause performance degradation.
	 * Use `onScrollStart` or `onScrollStop` instead.
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @public
	 */
	onScroll: PropTypes.func,

	/**
	 * Called when scroll starts.
	 *
	 * Passes `scrollLeft` and `scrollTop`.
	 *
	 * Example:
	 * ```
	 * onScrollStart = ({scrollLeft, scrollTop}) => {
	 *     // do something with scrollLeft and scrollTop
	 * }
	 *
	 * render = () => (
	 *     <Scroller
	 *         ...
	 *         onScrollStart={this.onScrollStart}
	 *         ...
	 *     />
	 * )
	 * ```
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @public
	 */
	onScrollStart: PropTypes.func,

	/**
	 * Called when scroll stops.
	 *
	 * Passes `scrollLeft` and `scrollTop`.
	 *
	 * Example:
	 * ```
	 * onScrollStop = ({scrollLeft, scrollTop}) => {
	 *     // do something with scrollLeft and scrollTop
	 * }
	 *
	 * render = () => (
	 *     <Scroller
	 *         ...
	 *         onScrollStop={this.onScrollStop}
	 *         ...
	 *     />
	 * )
	 * ```
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @public
	 */
	onScrollStop: PropTypes.func,

	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {
	 *	arrowKey: false,
	 *	drag: true,
	 *	pageKey: false,
	 *	track: false,
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
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `scrollbarTrack` - The scrollbarTrack component class
	 * * `thumb` - The scrollbar thumb component class
	 *
	 * @type {Object}
	 * @public
	 */
	scrollbarTrackCss: PropTypes.object,

	/**
	 * Specifies how to scroll.
	 *
	 * @type {('native'|'translate')}
	 * @default 'native'
	 * @public
	 */
	scrollMode: PropTypes.oneOf(['native', 'translate']),

	/**
	 * Specifies how to show vertical scrollbar.
	 *
	 * @type {('auto'|'visible'|'hidden')}
	 * @default 'auto'
	 * @public
	 */
	verticalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

	/**
	 * Sets the hint string read when focusing the scroll thumb in the vertical scroll bar.
	 *
	 * @type {String}
	 * @default $L('scroll left or right with left right button')
	 * @public
	 */
	verticalScrollThumbAriaLabel: PropTypes.string
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

Scroller.defaultPropValues = scrollerDefaultProps;

export default Scroller;
export {
	ContentContainerDecorator,
	Scroller
};
