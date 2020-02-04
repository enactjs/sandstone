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
import ForwardRef from '@enact/ui/ForwardRef';
import Slottable from '@enact/ui/Slottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import {Marquee, MarqueeController} from '@enact/ui/Marquee';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
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
					<Cell component={Marquee} className={css.label} shrink>
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
		/**
		 * Called with a reference to the root component.
		 *
		 * @type {Object|Function}
		 * @public
		 */
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

		/**
		 * The position of the label relative to the primary content, `children`.
		 *
		 * @type {('above'|'after'|'before'|'below')}
		 * @public
		 */
		labelPosition: PropTypes.oneOf(['above', 'after', 'before', 'below']),

		/**
		 * Applies a selected style to the component
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Nodes to be inserted after `children` and hidden using `autoHide`.
		 *
		 * For LTR locales, the nodes are inserted to the right of the primary content. For RTL
		 * locales, the nodes are insterted to the left. If nothing is specified, nothing, not even
		 * an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotAfter: PropTypes.node,

		/**
		 * Nodes to be inserted before `children` and `label`.
		 *
		 * For LTR locales, the nodes are inserted to the left of the primary content. For RTL
		 * locales, the nodes are insterted to the right. If nothing is specified, nothing, not even
		 * an empty container, is rendered in this place.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node
	},

	defaultProps: {
		labelPosition: 'below'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['item', 'slotAfter', 'slotBefore']
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected})
	},

	render: ({children, componentRef, css, label, labelPosition, slotAfter, slotBefore, ...rest}) => {
		return (
			<UiItemBase
				data-webos-voice-intent="Select"
				component={Row}
				align="center"
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
