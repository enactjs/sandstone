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
import Slottable from '@enact/ui/Slottable';
import ForwardRef from '@enact/ui/ForwardRef';
import Spottable from '@enact/spotlight/Spottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import {Marquee, MarqueeController} from '@enact/ui/Marquee';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import componentCss from './Item.module.less';

const ItemContent = kind({
	name: 'ItemContent',
	propTypes: {
		content: PropTypes.any,
		css: PropTypes.object,
		label: PropTypes.any,
		labelPosition: PropTypes.any
	},
	defaultProps: {
		labelPosition: 'below'
	},
	styles: {
		className: 'itemContent',
		css: componentCss
	},
	computed: {
		className: ({label, labelPosition, styler}) => styler.append({
			hasLabel: Boolean(label),
			labelAbove: labelPosition === 'above',
			labelAfter: labelPosition === 'after',
			labelBefore: labelPosition === 'before',
			labelBelow: labelPosition === 'below'
		}),
		orientation: ({labelPosition}) => {
			return (labelPosition === 'above' || labelPosition === 'below') ? 'vertical' : 'horizontal';
		}
	},
	render: ({orientation, content, css, label, ...rest}) => {
		delete rest.labelPosition;

		// Due to flex-box sizing (used in Layout/Cell), in a vertical orientation with no height
		// specified, all of the cells should be set to `shrink` so their height is summed to define
		// the height of the entire Layout. Without this, a cell will collapse, causing unwanted overlap.
		const contentElement = (
			<Cell component={Marquee} className={css.content} shrink={(label != null && orientation === 'vertical')}>
				{content}
			</Cell>
		);

		if (label == null) return contentElement;

		return (
			<Cell {...rest}>
				<Layout orientation={orientation}>
					{contentElement}
					<Cell component={Marquee} className={css.label}>
						{label}
					</Cell>
				</Layout>
			</Cell>
		);
	}
});


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
		componentRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

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
		css: PropTypes.object,

		/**
		 * Applies a disabled style and the control becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The label to be displayed along with the text.
		 *
		 * @type {Node}
		 * @public
		 */
		label: PropTypes.node,
		labelPosition: PropTypes.oneOf(['above', 'after', 'before', 'below']),
		selected: PropTypes.bool,
		slotAfter: PropTypes.node,
		slotBefore: PropTypes.node
	},

	styles: {
		css: componentCss,
		publicClassNames: ['item', 'slotAfter', 'slotBefore']
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected})
	},

	render: ({children, css, componentRef, label, labelPosition, slotBefore, slotAfter,  ...rest}) => {
		return (
			<UiItemBase
				data-webos-voice-intent="Select"
				component={Row}
				ref={componentRef}
				{...rest}
				css={css}
			>
				<div className={css.bg} />
				{slotBefore ? (
					<Cell className={css.slotBefore} shrink>
						{slotBefore}
					</Cell>
				) : null}
				<ItemContent
					content={children}
					label={label}
					labelPosition={labelPosition}
				/>
				{slotAfter ? (
					<Cell className={css.slotAfter} shrink>
						{slotAfter}
					</Cell>
				) : null}
			</UiItemBase>
		);
	}
});

/**
 * Sandstone specific item behaviors to apply to [Item]{@link sandstone/Item.ItemBase}.
 *
 * @class ItemDecorator
 * @hoc
 * @memberof sandstone/Item
 * @mixes ui/ForwardRef.ForwardRef
 * @mixes ui/Slottable.Slottable
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Marquee.MarqueeController
 * @mixes sandstone/Skinnable.Skinnable
 * @ui
 * @public
*/
const ItemDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Slottable({slots: ['label', 'slotAfter', 'slotBefore']}),
	Pure,
	UiItemDecorator,
	Spottable,
	MarqueeController({marqueeOnFocus: true, invalidateProps: ['inline', 'autoHide']}),
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
