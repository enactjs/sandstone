/**
 * Provides Sandstone-themed virtual list components and behaviors.
 *
 * @module sandstone/VirtualList
 * @exports VirtualGridList
 * @exports VirtualList
 */

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {ResizeContext} from '@enact/ui/Resizable';
import {gridListItemSizeShape, itemSizesShape, VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import useScroll from '../useScroll';
import Scrollbar from '../useScroll/Scrollbar';
import Skinnable from '../Skinnable';

import {useThemeVirtualList} from './useThemeVirtualList';

const nop = () => {};

/**
 * A Sandstone-styled scrollable and spottable virtual list component.
 *
 * @class VirtualList
 * @memberof sandstone/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @public
 */
let VirtualList = ({itemSize, ...rest}) => {
	const props = itemSize && itemSize.minSize ?
		{
			itemSize: itemSize.minSize,
			itemSizes: itemSize.size
		} :
		{
			itemSize
		};

	warning(
		!rest.itemSizes || !rest.cbScrollTo,
		'VirtualList with `minSize` in `itemSize` prop does not support `cbScrollTo` prop'
	);

	// Hooks

	const {
		// Variables
		scrollContentWrapper: ScrollContentWrapper,
		scrollContentHandle,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		// Child Props
		resizeContextProps,
		scrollContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll({...rest, ...props});

	const {
		className,
		...scrollContentWrapperRest
	} = scrollContentWrapperProps;

	const themeScrollContentProps = useThemeVirtualList({...scrollContentProps, className: classnames(className, scrollContentProps.className)});

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<ScrollContentWrapper {...scrollContainerProps} {...scrollContentWrapperRest}>
				<UiVirtualListBasic {...themeScrollContentProps} ref={scrollContentHandle} />
				{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</ScrollContentWrapper>
		</ResizeContext.Provider>
	);
};

VirtualList.displayName = 'VirtualList';

VirtualList.propTypes = /** @lends sandstone/VirtualList.VirtualList.prototype */ {
	/**
	 * Size of an item for the VirtualList; valid value is a number generally.
	 * For different item size, value is an object that has `minSize`
	 * and `size` as properties.
	 * If the direction for the list is vertical, itemSize means the height of an item.
	 * For horizontal, it means the width of an item.
	 *
	 * Usage:
	 * ```
	 * <VirtualList itemSize={ri.scale(144)} />
	 * ```
	 *
	 * @type {Number|ui/VirtualList.itemSizesShape}
	 * @required
	 * @public
	 */
	itemSize: PropTypes.oneOfType([PropTypes.number, itemSizesShape]).isRequired,

	/**
	 * A callback function that receives a reference to the `scrollTo` feature.
	 *
	 * Once received, the `scrollTo` method can be called as an imperative interface.
	 *
	 * The `scrollTo` function accepts the following parameters:
	 * - {position: {x, y}} - Pixel value for x and/or y position
	 * - {align} - Where the scroll area should be aligned. Values are:
	 *   `'left'`, `'right'`, `'top'`, `'bottom'`,
	 *   `'topleft'`, `'topright'`, `'bottomleft'`, and `'bottomright'`.
	 * - {index} - Index of specific item. (`0` or positive integer)
	 *   This option is available for only `VirtualList` kind.
	 * - {node} - Node to scroll into view
	 * - {animate} - When `true`, scroll occurs with animation. When `false`, no
	 *   animation occurs.
	 * - {focus} - When `true`, attempts to focus item after scroll. Only valid when scrolling
	 *   by `index` or `node`.
	 * > Note: Only specify one of: `position`, `align`, `index` or `node`
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
	 * `false` if the content of the list could get focus
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
	 * The layout direction of the list.
	 *
	 * @type {('horizontal'|'vertical')}
	 * @default 'vertical'
	 * @public
	 */
	direction: PropTypes.oneOf(['horizontal', 'vertical']),

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
	 * @default $L('scroll up down with up down button')
	 * @public
	 */
	horizontalScrollThumbAriaLabel: PropTypes.string,

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `VirtualList` is within a [Panel]{@link sandstone/Panels.Panel},
	 * the `VirtualList` will store its scroll position and restore that position when returning to
	 * the `Panel`.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Prop to check if horizontal Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isHorizontalScrollbarVisible: PropTypes.bool,

	/**
	 * Prop to check if vertical Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isVerticalScrollbarVisible: PropTypes.bool,

	/**
	 * The array for individually sized items.
	 *
	 * @type {Number[]}
	 * @private
	 */
	itemSizes: PropTypes.arrayOf(PropTypes.number),

	/**
	 * Removes affordance area on the list.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	noAffordance: PropTypes.bool,

	/**
	 * Prevents scroll by dragging or flicking on the list.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	noScrollByDrag: PropTypes.bool,

	/**
	 * Prevents scroll by wheeling on the list.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noScrollByWheel: PropTypes.bool,

	/**
	 * Called when scrolling.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * It is not recommended to set this prop since it can cause performance degradation.
	 * Use `onScrollStart` or `onScrollStop` instead.
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScroll: PropTypes.func,

	/**
	 * Called when scroll starts.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * You can get firstVisibleIndex and lastVisibleIndex from VirtualList with `moreInfo`.
	 *
	 * Example:
	 * ```
	 * onScrollStart = ({scrollLeft, scrollTop, moreInfo}) => {
	 *     const {firstVisibleIndex, lastVisibleIndex} = moreInfo;
	 *     // do something with firstVisibleIndex and lastVisibleIndex
	 * }
	 *
	 * render = () => (
	 *     <VirtualList
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
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScrollStart: PropTypes.func,

	/**
	 * Called when scroll stops.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * You can get firstVisibleIndex and lastVisibleIndex from VirtualList with `moreInfo`.
	 *
	 * Example:
	 * ```
	 * onScrollStop = ({scrollLeft, scrollTop, moreInfo}) => {
	 *     const {firstVisibleIndex, lastVisibleIndex} = moreInfo;
	 *     // do something with firstVisibleIndex and lastVisibleIndex
	 * }
	 *
	 * render = () => (
	 *     <VirtualList
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
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScrollStop: PropTypes.func,

	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {
	 *	arrowKey: false,
	 *	drag: false,
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
	 * When `true`, the list will scroll by page. Otherwise the list will scroll by item.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	pageScroll: PropTypes.bool,

	/**
	 * The ARIA role for the list.
	 *
	 * @type {String}
	 * @default 'list'
	 * @public
	 */
	role: PropTypes.string,

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
	scrollMode: PropTypes.string,

	/**
	 * Spotlight Id.
	 *
	 * @type {String}
	 * @private
	 */
	spotlightId: PropTypes.string,

	/**
	 * Specifies how to show vertical scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
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
	 * @default $L('scroll left right with left right button')
	 * @public
	 */
	verticalScrollThumbAriaLabel: PropTypes.string,

	/**
	 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
	 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
	 *
	 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
	 * except that a list is scrolled without an animation.
	 *
	 * Valid values are:
	 * * `false`,
	 * * `true`, and
	 * * `'noAnimation'`
	 * @type {Boolean|'noAnimation'}
	 * @default false
	 * @public
	 */
	wrap: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['noAnimation'])
	])
};

VirtualList = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first',
			enterTo: 'last-focused'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			VirtualList
		)
	)
);

VirtualList.defaultProps = {
	'data-spotlight-container-disabled': false,
	cbScrollTo: nop,
	direction: 'vertical',
	horizontalScrollbar: 'auto',
	noAffordance: false,
	noScrollByDrag: false,
	noScrollByWheel: false,
	onScroll: nop,
	onScrollStart: nop,
	onScrollStop: nop,
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		track: false,
		wheel: true
	},
	pageScroll: false,
	role: 'list',
	scrollMode: 'native',
	verticalScrollbar: 'auto',
	wrap: false
};

/**
 * A Sandstone-styled scrollable and spottable virtual grid list component.
 *
 * @class VirtualGridList
 * @memberof sandstone/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @public
 */
let VirtualGridList = (props) => {
	const {
		// Variables
		scrollContentWrapper: ScrollContentWrapper,
		scrollContentHandle,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		// Child Props
		resizeContextProps,
		scrollContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll(props);

	const {
		className,
		...scrollContentWrapperRest
	} = scrollContentWrapperProps;

	const themeScrollContentProps = useThemeVirtualList({...scrollContentProps, className: classnames(className, scrollContentProps.className)});

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<ScrollContentWrapper {...scrollContainerProps} {...scrollContentWrapperRest}>
				<UiVirtualListBasic {...themeScrollContentProps} ref={scrollContentHandle} />
				{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</ScrollContentWrapper>
		</ResizeContext.Provider>
	);
};

VirtualGridList.displayName = 'VirtualGridList';

VirtualGridList.propTypes = /** @lends sandstone/VirtualList.VirtualGridList.prototype */ {
	/**
	 * Size of an item for the VirtualGridList; valid value is an object that has `minWidth`
	 * and `minHeight` as properties.
	 *
	 * Usage:
	 * ```
	 * <VirtualGridList
	 * 	itemSize={{
	 * 		minWidth: ri.scale(360),
	 * 		minHeight: ri.scale(540)
	 * 	}}
	 * />
	 * ```
	 *
	 * @type {ui/VirtualList.gridListItemSizeShape}
	 * @required
	 * @public
	 */
	itemSize: gridListItemSizeShape.isRequired,

	/**
	 * A callback function that receives a reference to the `scrollTo` feature.
	 *
	 * Once received, the `scrollTo` method can be called as an imperative interface.
	 *
	 * The `scrollTo` function accepts the following parameters:
	 * - {position: {x, y}} - Pixel value for x and/or y position
	 * - {align} - Where the scroll area should be aligned. Values are:
	 *   `'left'`, `'right'`, `'top'`, `'bottom'`,
	 *   `'topleft'`, `'topright'`, `'bottomleft'`, and `'bottomright'`.
	 * - {index} - Index of specific item. (`0` or positive integer)
	 *   This option is available for only `VirtualList` kind.
	 * - {node} - Node to scroll into view
	 * - {animate} - When `true`, scroll occurs with animation. When `false`, no
	 *   animation occurs.
	 * - {focus} - When `true`, attempts to focus item after scroll. Only valid when scrolling
	 *   by `index` or `node`.
	 * > Note: Only specify one of: `position`, `align`, `index` or `node`
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
	 * `false` if the content of the list could get focus
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
	 * The layout direction of the list.
	 *
	 * @type {('horizontal'|'vertical')}
	 * @default 'vertical'
	 * @public
	 */
	direction: PropTypes.oneOf(['horizontal', 'vertical']),

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
	 * @default $L('scroll up down with up down button')
	 * @public
	 */
	horizontalScrollThumbAriaLabel: PropTypes.string,

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `VirtualGridList` is within a [Panel]{@link sandstone/Panels.Panel},
	 * the `VirtualGridList` will store its scroll position and restore that position when returning to
	 * the `Panel`.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Prop to check if horizontal Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isHorizontalScrollbarVisible: PropTypes.bool,

	/**
	 * Prop to check if vertical Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isVerticalScrollbarVisible: PropTypes.bool,

	/**
	 * Removes affordance area on the list.
	 * Set this to `true` only if the item needs to stick to the bottom for vertical direction,
	 * to the right for horizontal direction, when scrolling by keys.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noAffordance: PropTypes.bool,

	/**
	 * Prevents scroll by dragging or flicking on the list.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	noScrollByDrag: PropTypes.bool,

	/**
	 * Prevents scroll by wheeling on the list.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noScrollByWheel: PropTypes.bool,

	/**
	 * Called when scrolling.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * It is not recommended to set this prop since it can cause performance degradation.
	 * Use `onScrollStart` or `onScrollStop` instead.
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScroll: PropTypes.func,

	/**
	 * Called when scroll starts.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * You can get firstVisibleIndex and lastVisibleIndex from VirtualGridList with `moreInfo`.
	 *
	 * Example:
	 * ```
	 * onScrollStart = ({scrollLeft, scrollTop, moreInfo}) => {
	 *     const {firstVisibleIndex, lastVisibleIndex} = moreInfo;
	 *     // do something with firstVisibleIndex and lastVisibleIndex
	 * }
	 *
	 * render = () => (
	 *     <VirtualGridList
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
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScrollStart: PropTypes.func,

	/**
	 * Called when scroll stops.
	 *
	 * Passes `scrollLeft`, `scrollTop`, and `moreInfo`.
	 * You can get firstVisibleIndex and lastVisibleIndex from VirtualGridList with `moreInfo`.
	 *
	 * Example:
	 * ```
	 * onScrollStop = ({scrollLeft, scrollTop, moreInfo}) => {
	 *     const {firstVisibleIndex, lastVisibleIndex} = moreInfo;
	 *     // do something with firstVisibleIndex and lastVisibleIndex
	 * }
	 *
	 * render = () => (
	 *     <VirtualGridList
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
	 * @param {Object} event.moreInfo The object including `firstVisibleIndex` and `lastVisibleIndex` properties.
	 * @public
	 */
	onScrollStop: PropTypes.func,

	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {
	 *	arrowKey: false,
	 *	drag: false,
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
	 * When `true`, the list will scroll by page. Otherwise the list will scroll by item.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	pageScroll: PropTypes.bool,

	/**
	 * The ARIA role for the list.
	 *
	 * @type {String}
	 * @default 'list'
	 * @public
	 */
	role: PropTypes.string,

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
	scrollMode: PropTypes.string,

	/**
	 * Spotlight Id.
	 *
	 * @type {String}
	 * @private
	 */
	spotlightId: PropTypes.string,

	/**
	 * Specifies how to show vertical scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
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
	 * @default $L('scroll left right with left right button')
	 * @public
	 */
	verticalScrollThumbAriaLabel: PropTypes.string,

	/**
	 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
	 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
	 *
	 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
	 * except that a list is scrolled without an animation.
	 *
	 * Valid values are:
	 * * `false`,
	 * * `true`, and
	 * * `'noAnimation'`
	 *
	 * @type {Boolean|'noAnimation'}
	 * @default false
	 * @public
	 */
	wrap: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['noAnimation'])
	])
};

VirtualGridList = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first',
			enterTo: 'last-focused'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			VirtualGridList
		)
	)
);

VirtualGridList.defaultProps = {
	'data-spotlight-container-disabled': false,
	cbScrollTo: nop,
	direction: 'vertical',
	horizontalScrollbar: 'auto',
	noAffordance: false,
	noScrollByDrag: false,
	noScrollByWheel: false,
	onScroll: nop,
	onScrollStart: nop,
	onScrollStop: nop,
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		track: false,
		wheel: true
	},
	pageScroll: false,
	role: 'list',
	scrollMode: 'native',
	verticalScrollbar: 'auto',
	wrap: false
};

export default VirtualList;
export {
	VirtualGridList,
	VirtualList
};
