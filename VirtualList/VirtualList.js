/**
 * Provides Sandstone-themed virtual list components and behaviors.
 *
 * @module sandstone/VirtualList
 * @exports VirtualGridList
 * @exports VirtualGridListNative
 * @exports VirtualList
 * @exports VirtualListBase
 * @exports VirtualListBaseNative
 * @exports VirtualListNative
 */

import kind from '@enact/core/kind';
import {gridListItemSizeShape, itemSizesShape} from '@enact/ui/VirtualList';
import PropTypes from 'prop-types';
import React from 'react';

import {ScrollableVirtualList, ScrollableVirtualListNative, VirtualListBase, VirtualListBaseNative} from './VirtualListBase';

/**
 * A Sandstone-styled scrollable and spottable virtual list component.
 *
 * @class VirtualList
 * @memberof sandstone/VirtualList
 * @extends sandstone/VirtualList.VirtualListBase
 * @ui
 * @public
 */
const VirtualList = kind({
	name: 'VirtualList',

	propTypes: /** @lends sandstone/VirtualList.VirtualList.prototype */ {
		/**
		 * Size of an item for the VirtualList; valid value is a number generally.
		 * For different item size, value is an object that has `minSize`
		 * and `size` as properties.
		 * If the direction for the list is vertical, itemSize means the height of an item.
		 * For horizontal, it means the width of an item.
		 *
		 * Usage:
		 * ```
		 * <VirtualList itemSize={ri.scale(72)} />
		 * ```
		 *
		 * @type {Number|ui/VirtualList.itemSizesShape}
		 * @required
		 * @public
		 */
		itemSize: PropTypes.oneOfType([PropTypes.number, itemSizesShape]).isRequired
	},

	render: ({itemSize, ...rest}) => {
		const props = itemSize && itemSize.minSize ?
			{
				itemSize: itemSize.minSize,
				itemSizes: itemSize.size
			} :
			{
				itemSize
			};

		return (<ScrollableVirtualList {...rest} {...props} />);
	}
});

/**
 * A Sandstone-styled scrollable and spottable virtual grid list component.
 *
 * @class VirtualGridList
 * @memberof sandstone/VirtualList
 * @extends sandstone/VirtualList.VirtualListBase
 * @ui
 * @public
 */
const VirtualGridList = kind({
	name: 'VirtualGridList',

	propTypes: /** @lends sandstone/VirtualList.VirtualGridList.prototype */ {
		/**
		 * Size of an item for the VirtualGridList; valid value is an object that has `minWidth`
		 * and `minHeight` as properties.
		 *
		 * Usage:
		 * ```
		 * <VirtualGridList
		 * 	itemSize={{
		 * 		minWidth: ri.scale(180),
		 * 		minHeight: ri.scale(270)
		 * 	}}
		 * />
		 * ```
		 *
		 * @type {ui/VirtualList.gridListItemSizeShape}
		 * @required
		 * @public
		 */
		itemSize: gridListItemSizeShape.isRequired
	},

	render: (props) => (
		<ScrollableVirtualList {...props} />
	)
});

/**
 * A Sandstone-styled scrollable and spottable virtual native list component.
 * For smooth native scrolling, web engine with below Chromium 61, should be launched
 * with the flag '--enable-blink-features=CSSOMSmoothScroll' to support it.
 * The one with Chromium 61 or above, is launched to support it by default.
 *
 * @class VirtualListNative
 * @memberof sandstone/VirtualList
 * @extends sandstone/VirtualList.VirtualListBaseNative
 * @ui
 * @private
 */
const VirtualListNative = kind({
	name: 'VirtualListNative',

	propTypes: /** @lends sandstone/VirtualList.VirtualListNative.prototype */ {
		/**
		 * Size of an item for the VirtualList; valid value is a number.
		 * For different item size, value is an object that has `minSize`
		 * and `size` as properties.
		 * If the direction for the list is vertical, itemSize means the height of an item.
		 * For horizontal, it means the width of an item.
		 *
		 * Usage:
		 * ```
		 * <VirtualListNative itemSize={ri.scale(72)} />
		 * ```
		 *
		 * @type {Number|ui/VirtualList.itemSizesShape}
		 * @required
		 * @public
		 */
		itemSize: PropTypes.oneOfType([PropTypes.number, itemSizesShape]).isRequired
	},

	render: ({itemSize, ...rest}) => {
		const props = itemSize && itemSize.minSize ?
			{
				itemSize: itemSize.minSize,
				itemSizes: itemSize.size
			} :
			{
				itemSize
			};

		return (<ScrollableVirtualListNative {...rest} {...props} />);
	}
});

/**
 * A Sandstone-styled scrollable and spottable virtual grid native list component.
 * For smooth native scrolling, web engine with below Chromium 61, should be launched
 * with the flag '--enable-blink-features=CSSOMSmoothScroll' to support it.
 * The one with Chromium 61 or above, is launched to support it by default.
 *
 * @class VirtualGridListNative
 * @memberof sandstone/VirtualList
 * @extends sandstone/VirtualList.VirtualListBaseNative
 * @ui
 * @private
 */
const VirtualGridListNative = kind({
	name: 'VirtualGridListNative',

	propTypes: /** @lends sandstone/VirtualList.VirtualGridListNative.prototype */ {
		/**
		 * Size of an item for the VirtualGridList; valid value is an object that has `minWidth`
		 * and `minHeight` as properties.
		 *
		 * Usage:
		 * ```
		 * <VirtualGridListNative
		 * 	itemSize={{
		 * 		minWidth: ri.scale(180),
		 * 		minHeight: ri.scale(270)
		 * 	}}
		 * />
		 * ```
		 *
		 * @type {ui/VirtualList.gridListItemSizeShape}
		 * @required
		 * @public
		 */
		itemSize: gridListItemSizeShape.isRequired
	},

	render: (props) => (
		<ScrollableVirtualListNative {...props} />
	)
});

export default VirtualList;
export {
	VirtualGridList,
	VirtualGridListNative,
	VirtualList,
	VirtualListBase,
	VirtualListBaseNative,
	VirtualListNative
};
