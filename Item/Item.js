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
	delete rest.inline;
	// eslint-disable-next-line enact/prop-types
	delete rest.slotAfterSize;
	// eslint-disable-next-line enact/prop-types
	delete rest.slotBeforeSize;

	return <div {...rest} />;
};
const Marquee = MarqueeDecorator({invalidateProps: ['remeasure', 'inline', 'slotAfterSize', 'slotBeforeSize']}, MarqueeBase);

// eslint-disable-next-line enact/prop-types
const ItemContent = ({content, css, inline, label, labelPosition, marqueeOn, slotAfterSize, slotBeforeSize, ...rest}) => {
	const LabelPositionClassname = {
		[css.labelAbove]: labelPosition === 'above',
		[css.labelAfter]: labelPosition === 'after',
		[css.labelBefore]: labelPosition === 'before',
		[css.labelBelow]: labelPosition === 'below'
	};

	const orientation = (labelPosition === 'above' || labelPosition === 'below') ? 'vertical' : 'horizontal';

	const itemContentClasses = classnames(css.itemContent, LabelPositionClassname);
	const marqueeProps = {
		inline: inline,
		marqueeOn: marqueeOn,
		slotAfterSize: slotAfterSize,
		slotBeforeSize: slotBeforeSize
	};

	return (!label ? (
		<Cell {...rest} component={Marquee} className={classnames(itemContentClasses, css.content)} {...marqueeProps}>
			{content}
		</Cell>
	) : (
		<Cell {...rest} className={itemContentClasses}>
			<Layout orientation={orientation}>
				<Cell component={Marquee} className={css.content} {...marqueeProps} shrink>
					{content}
				</Cell>
				<Cell component={Marquee} className={css.label} {...marqueeProps} shrink>
					{label}
				</Cell>
			</Layout>
		</Cell>
	));
};

ItemContent.displayName = 'ItemContent';
ItemContent.propTypes = {
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
		 * The method which receives the reference node to the slotAfter element, used to determine
		 * the `slotAfterSize`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		slotAfterRef: EnactPropTypes.ref,

		/**
		 * The size for slotAfter.
		 * This size is set by ItemMeasurementDecorator for invalidating Marquee.
		 *
		 * @type {String}
		 * @private
		 */
		slotAfterSize: PropTypes.string,

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
		slotBefore: PropTypes.node,

		/**
		 * The method which receives the reference node to the slotBefore element, used to determine
		 * the `slotBeforeSize`.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		slotBeforeRef: EnactPropTypes.ref,

		/**
		 * The size for slotBefore.
		 * This size is set by ItemMeasurementDecorator for invalidating Marquee.
		 *
		 * @type {String}
		 * @private
		 */
		slotBeforeSize: PropTypes.string
	},

	defaultProps: {
		labelPosition: 'below',
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: ['item', 'itemContent', 'content', 'label', 'bg', 'slotAfter', 'slotBefore', 'selected']
	},

	computed: {
		className: ({centered, label, selected, size, styler}) => styler.append({centered, selected, hasLabel: label != null}, size),
		label: ({label}) => (typeof label === 'number' ? label.toString() : label)
	},

	render: ({centered, children, componentRef, css, inline, label, labelPosition, marqueeOn, slotAfter, slotAfterRef, slotAfterSize, slotBefore, slotBeforeRef, slotBeforeSize, ...rest}) => {
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
				<Cell className={slotBefore ? css.slotBefore : null} shrink>
					<span ref={slotBeforeRef} className={css.slotSizer}>
						{slotBefore}
					</span>
				</Cell>
				<ItemContent
					content={children}
					css={css}
					label={label}
					labelPosition={labelPosition}
					marqueeOn={marqueeOn}
					shrink={inline}
					inline={inline}
					slotAfterSize={slotAfterSize}
					slotBeforeSize={slotBeforeSize}
				/>
				<Cell className={slotAfter ? css.slotAfter : null} shrink>
					<span ref={slotAfterRef} className={css.slotSizer}>
						{slotAfter}
					</span>
				</Cell>
			</UiItemBase>
		);
	}
});

const ItemMeasurementDecorator = (Wrapped) => {
	return function ItemMeasurementDecorator (props) { // eslint-disable-line no-shadow
		const {ref: slotAfterRef, measurement: {width: slotAfterWidth = 0} = {}} = useMeasurable() || {};
		const {ref: slotBeforeRef, measurement: {width: slotBeforeWidth = 0} = {}} = useMeasurable() || {};

		const measurableProps = {
			slotAfterRef,
			slotBeforeRef,
			slotAfterSize: slotAfterWidth,
			slotBeforeSize: slotBeforeWidth
		};

		return <Wrapped {...props} {...measurableProps} />;
	};
};

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
	Spottable,
	MarqueeController({marqueeOnFocus: true}),
	ItemMeasurementDecorator,
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
const Item = Pure(ItemDecorator(ItemBase));

export default Item;
export {
	Item,
	ItemBase,
	ItemDecorator
};
