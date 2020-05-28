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

import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
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
		css: componentCss,
		className: 'itemContent'
	},

	computed: {
		className: ({labelPosition, styler}) => styler.append({
			labelAbove: labelPosition === 'above',
			labelAfter: labelPosition === 'after',
			labelBefore: labelPosition === 'before',
			labelBelow: labelPosition === 'below'
		}),
		orientation: ({labelPosition}) => {
			return (labelPosition === 'above' || labelPosition === 'below') ? 'vertical' : 'horizontal';
		}
	},

	// eslint-disable-next-line enact/prop-types
	render: ({orientation, content, css, label, marqueeOn, styler, ...rest}) => {
		delete rest.labelPosition;

		if (!label) {
			return (
				<Cell {...rest} component={Marquee} className={styler.append(css.content)} marqueeOn={marqueeOn}>
					{content}
				</Cell>
			);
		} else {
			return (
				<Cell {...rest}>
					<Layout orientation={orientation}>
						<Cell component={Marquee} className={css.content} marqueeOn={marqueeOn} shrink>
							{content}
						</Cell>
						<Cell component={Marquee} className={css.label} marqueeOn={marqueeOn} shrink>
							{label}
						</Cell>
					</Layout>
				</Cell>
			);
		}
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
		 * Centers the slots and content.
		 *
		 * @type {Boolean}
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * Called with a reference to the root component.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `item` - The root class name
		 * * `slotBefore` - The slot (container) preceding the text of this component
		 * * `slotAfter` - The slot (container) following the text of this component
		 * * `selected` - Applied to a `selected` button
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
		 * Applies inline styling to the item.
		 *
		 * @type {Boolean}
		 * @public
		 */
		inline: PropTypes.bool,

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
		 * Determines what triggers the marquee to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

		/**
		 * Applies a selected style to the component.
		 *
		 * @type {Boolean}
		 * @private
		 */
		selected: PropTypes.bool,

		/**
		 * Nodes to be inserted after `children`.
		 *
		 * For LTR locales, the nodes are inserted to the right of the primary content. For RTL
		 * locales, the nodes are inserted to the left. If nothing is specified, nothing, not even
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
		 * locales, the nodes are inserted to the right. If nothing is specified, nothing, not even
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
		publicClassNames: ['item', 'bg', 'slotAfter', 'slotBefore', 'selected']
	},

	computed: {
		className: ({centered, label, selected, styler}) => styler.append({centered, selected, hasLabel: label != null}),
		label: ({label}) => (typeof label === 'number' ? label.toString() : label)
	},

	render: ({centered, children, componentRef, css, inline, label, labelPosition, marqueeOn, slotAfter, slotBefore, ...rest}) => {
		return (
			<UiItemBase
				data-webos-voice-intent="Select"
				component={Row}
				align={centered ? 'center center' : 'center'}
				ref={componentRef}
				{...rest}
				inline={inline}
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
					marqueeOn={marqueeOn}
					shrink={inline}
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
 * @mixes ui/Item.ItemDecorator
 * @mixes ui/Slottable.Slottable
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Marquee.MarqueeController
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const ItemDecorator = compose(
	UiItemDecorator,
	Slottable({slots: ['label', 'slotAfter', 'slotBefore']}),
	Pure,
	Spottable,
	MarqueeController({marqueeOnFocus: true, invalidateProps: ['inline']}),
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
