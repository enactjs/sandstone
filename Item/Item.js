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

import classnames from 'classnames';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Slottable from '@enact/ui/Slottable';
import {ItemBase as UiItemBase, ItemDecorator as UiItemDecorator} from '@enact/ui/Item';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import {useMeasurable} from '@enact/ui/Measurable';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import {MarqueeDecorator, MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';

import componentCss from './Item.module.less';

const MarqueeBase = ({...rest}) => {
	// eslint-disable-next-line enact/prop-types
	delete rest.contentSize;

	return <div {...rest} />;
};
const Marquee = MarqueeDecorator({invalidateProps: ['remeasure', 'contentSize']}, MarqueeBase);

// eslint-disable-next-line enact/prop-types
const ItemContent = ({componentRef, content, contentSize, css, label, labelPosition, marqueeOn, ...rest}) => {
	const LabelPositionClassname = {
		[css.labelAbove]: labelPosition === 'above',
		[css.labelAfter]: labelPosition === 'after',
		[css.labelBefore]: labelPosition === 'before',
		[css.labelBelow]: labelPosition === 'below'
	};

	const orientation = (labelPosition === 'above' || labelPosition === 'below') ? 'vertical' : 'horizontal';

	const itemContentClasses = classnames(css.itemContent, LabelPositionClassname);
	const marqueeProps = {
		contentSize,
		marqueeOn
	};

	return (
		<Cell {...rest} ref={componentRef} className={itemContentClasses}>
			{(!label ?
				<Cell component={Marquee} className={css.content} {...marqueeProps}>
					{content}
				</Cell> :
				<Layout orientation={orientation}>
					<Cell component={Marquee} className={css.content} {...marqueeProps} shrink>
						{content}
					</Cell>
					<Cell component={Marquee} className={css.label} {...marqueeProps} shrink>
						{label}
					</Cell>
				</Layout>
			)}
		</Cell>
	);
};

ItemContent.displayName = 'ItemContent';
ItemContent.propTypes = {
	componentRef: EnactPropTypes.ref,
	content: PropTypes.any,
	css: PropTypes.object,
	label: PropTypes.any,
	labelPosition: PropTypes.any
};

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
		 * The method which receives the reference node to the content element, used to determine
		 * the `contentSize`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		contentRef: EnactPropTypes.ref,

		/**
		  * The size for content.
		  * This size is set by ItemMeasurementDecorator for invalidating Marquee.
		  *
		  * @type {Number}
		  * @private
		  */
		contentSize: PropTypes.number,

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
		 * The size of the item.
		 *
		 * @type {('large'|'small')}
		 * @default 'large'
		 * @private
		 */
		size: PropTypes.oneOf(['large', 'small']),

		/*
		 * State of possible skin variants.
		 *
		 * Used to scale the `itemSize` of the `VirtualList` based on large-text mode
		 *
		 * @type {Object}
		 */
		skinVariants: PropTypes.object,

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
		labelPosition: 'below',
		size: 'large',
		skinVariants: {}
	},

	styles: {
		css: componentCss,
		publicClassNames: ['item', 'itemContent', 'content', 'label', 'bg', 'slotAfter', 'slotBefore', 'selected']
	},

	computed: {
		className: ({centered, label, selected, size, styler}) => styler.append({centered, selected, hasLabel: label != null}, size),
		label: ({label}) => (typeof label === 'number' ? label.toString() : label)
	},

	render: ({centered, children, componentRef, contentRef, contentSize, css, inline, label, labelPosition, marqueeOn, slotAfter, slotBefore, skinVariants, ...rest}) => {
		delete rest.size;

		const keys = Object.keys(rest);
		const voiceProps = (!keys.includes('data-webos-voice-label') && !keys.includes('data-webos-voice-labels') && label && typeof label === 'string' && children && children[0] && typeof children[0] === 'string') ? {'data-webos-voice-labels': JSON.stringify([label, children[0]])} : {};

		return (
			<UiItemBase
				data-webos-voice-intent="Select"
				component={Row}
				align={centered ? 'center center' : 'center'}
				ref={componentRef}
				{...voiceProps}
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
					componentRef={contentRef}
					content={children}
					contentSize={contentSize}
					css={css}
					label={label}
					labelPosition={labelPosition}
					marqueeOn={skinVariants.animationOff ? 'off' : marqueeOn}
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

const ItemMeasurementDecorator = (Wrapped) => {
	return function ItemMeasurementDecorator (props) { // eslint-disable-line no-shadow
		const {ref: contentRef, measurement: {width: contentWidth = 0} = {}} = useMeasurable();

		const measurableProps = {
			contentRef,
			contentSize: contentWidth
		};

		return <Wrapped {...props} {...measurableProps} />;
	};
};

/**
 * Sandstone specific item behaviors to apply to {@link sandstone/Item.ItemBase|Item}.
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
	Spottable,
	MarqueeController({marqueeOnFocus: true}),
	ItemMeasurementDecorator,
	Skinnable({variantsProp: 'skinVariants'})
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
const Item = Pure(ItemDecorator(ItemBase));

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
