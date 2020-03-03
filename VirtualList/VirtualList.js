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
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import useScroll from '../useScroll';
import Scrollbar from '../useScroll/Scrollbar';
import Skinnable from '../Skinnable';

import {useThemeVirtualList} from './useThemeVirtualList';

/**
 * A Sandstone-styled scrollable and spottable virtual list component.
 *
 * @class VirtualList
 * @memberof sandstone/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @public
 */
let VirtualList = ({itemSize, role, ...rest}) => {
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
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		// Child Props
		resizeContextProps,
		scrollContainerProps,
		scrollInnerContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll({...rest, ...props});

	const themeScrollContentProps = useThemeVirtualList({
		...scrollContentProps,
		role
	});

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiVirtualListBasic {...themeScrollContentProps} />
					</ScrollContentWrapper>
				</div>
				{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
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
	 * `false` if the content of the list could get focus
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	'data-spotlight-container-disabled': PropTypes.bool,

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
	 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
	 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
	 *
	 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
	 * except that a list is scrolled without an animation.
	 *
	 * @type {Boolean|String}
	 * @default false
	 * @public
	 */
	wrap: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['noAnimation'])
	])
};

VirtualList.defaultProps = {
	'data-spotlight-container-disabled': false,
	dataSize: 0,
	direction: 'vertical',
	horizontalScrollbar: 'auto',
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
	spacing: 0,
	verticalScrollbar: 'auto',
	wrap: false
};

VirtualList = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			VirtualList
		)
	)
);

/**
 * A Sandstone-styled scrollable and spottable virtual grid list component.
 *
 * @class VirtualGridList
 * @memberof sandstone/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @public
 */
let VirtualGridList = ({role, ...rest}) => {
	const {
		// Variables
		scrollContentWrapper: ScrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		// Child Props
		resizeContextProps,
		scrollContainerProps,
		scrollInnerContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll(rest);

	const themeScrollContentProps = useThemeVirtualList({
		...scrollContentProps,
		role
	});

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiVirtualListBasic {...themeScrollContentProps} />
					</ScrollContentWrapper>
				</div>
				{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
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
	 * `false` if the content of the list could get focus
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	'data-spotlight-container-disabled': PropTypes.bool,

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
	 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
	 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
	 *
	 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
	 * except that a list is scrolled without an animation.
	 *
	 * @type {Boolean|String}
	 * @default false
	 * @public
	 */
	wrap: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['noAnimation'])
	])
};

VirtualGridList.defaultProps = {
	'data-spotlight-container-disabled': false,
	dataSize: 0,
	direction: 'vertical',
	horizontalScrollbar: 'auto',
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
	spacing: 0,
	verticalScrollbar: 'auto',
	wrap: false
};

VirtualGridList = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			VirtualGridList
		)
	)
);

export default VirtualList;
export {
	VirtualGridList,
	VirtualList
};
