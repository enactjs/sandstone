/**
 * Provides Sandstone styled item components and behaviors. Useful for content in lists.
 *
 * @example
 * <Item>Hello Enact!</Item>
 *
 * @module sandstone/Item
 * @exports Item
 * @exports ItemBase
 * @exports ItemDecorator
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import {MarqueeDecorator} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './Item.module.less';

/**
 * A Sandstone styled item without any behavior.
 *
 * @class ItemBase
 * @memberof sandstone/Item
 * @extends ui/Item.ItemBase
 * @ui
 * @public
 */
const ItemBase = kind({
	name: 'Item',

	propTypes: /** @lends sandstone/Item.ItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `item` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object
	},

	styles: {
		css: componentCss,
		publicClassNames: 'item'
	},

	render: ({css, ...rest}) => {
		return (
			<UiItemBase
				data-webos-voice-intent="Select"
				{...rest}
				css={css}
			/>
		);
	}
});

/**
 * Sandstone specific item behaviors to apply to [Item]{@link sandstone/Item.ItemBase}.
 *
 * @class ItemDecorator
 * @hoc
 * @memberof sandstone/Item
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Marquee.MarqueeDecorator
 * @mixes sandstone/Skinnable.Skinnable
 * @ui
 * @public
 */
const ItemDecorator = compose(
	Pure,
	UiItemDecorator,
	Spottable,
	MarqueeDecorator({invalidateProps: ['inline', 'autoHide']}),
	Skinnable
);

/**
 * A Sandstone styled item with built-in support for marqueed text, and Spotlight focus.
 *
 * Usage:
 * ```
 * <Item>Item Content</Item>
 * ```
 *
 * @class Item
 * @memberof sandstone/Item
 * @extends sandstone/Item.ItemBase
 * @mixes sandstone/Item.ItemDecorator
 * @ui
 * @public
 */
const Item = ItemDecorator(ItemBase);

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
