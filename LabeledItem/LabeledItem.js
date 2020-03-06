/**
 * Provides Sandstone styled item with a label below.
 *
 * @example
 * <LabeledItem label="Label">Hello LabeledItem</LabeledItem>
 *
 * @module sandstone/LabeledItem
 * @exports LabeledItem
 * @exports LabeledItemBase
 */

import deprecate from '@enact/core/internal/deprecate';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import Touchable from '@enact/ui/Touchable';
import Spottable from '@enact/spotlight/Spottable';

import Icon from '../Icon';
import {ItemBase} from '../Item';
import {Marquee, MarqueeController} from '../Marquee';
import Skinnable from '../Skinnable';

const Controller = MarqueeController(
	{marqueeOnFocus: true},
	Touchable(
		Spottable(
			ItemBase
		)
	)
);

import componentCss from './LabeledItem.module.less';

/**
 * A focusable component that combines marquee-able text content with a synchronized
 * marquee-able text label.
 *
 * @class LabeledItemBase
 * @memberof sandstone/LabeledItem
 * @extends sandstone/Item.ItemBase
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Touchable.Touchable
 * @mixes sandstone/Marquee.MarqueeController
 * @ui
 * @public
 */
const LabeledItemBase = kind({
	name: 'LabeledItem',

	propTypes: /** @lends sandstone/LabeledItem.LabeledItemBase.prototype */ {
		/**
		 * The node to be displayed as the main content of the item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledItem` - The root class name
		 * * `icon` - Applied to the icon
		 * * `label` - Applied to the label
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
		 * Determines what triggers the `LabelItem`'s marquee to start its animation.
		 *
		 * @type {('focus'|'hover'|'render')}
		 * @default 'focus'
		 * @public
		 */
		marqueeOn: PropTypes.oneOf(['focus', 'hover', 'render']),

		/**
		 * Icon to be displayed next to the title text.
		 *
		 * @type {String|Object}
		 * @public
		 */
		titleIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	styles: {
		css: componentCss,
		className: 'labeledItem',
		publicClassNames: ['labeledItem', 'icon', 'label']
	},

	render: deprecate(({children, css, disabled, label, marqueeOn, titleIcon, ...rest}) => (
		<Controller disabled={disabled} {...rest} css={css}>
			<div className={css.text}>
				<Marquee disabled={disabled} className={css.title} marqueeOn={marqueeOn}>{children}</Marquee>
				{(titleIcon != null) ? <Icon size="small" className={css.icon}>{titleIcon}</Icon> : null}
			</div>
			{(label != null) ? <Marquee disabled={disabled} className={css.label} marqueeOn={marqueeOn}>{label}</Marquee> : null}
		</Controller>
	), {
		name: 'sandstone/LabeledItem',
		replacedBy: 'sandstone/Item'
	})
});

/**
 * A Sandstone styled labeled item with built-in support for marqueed text and Spotlight focus.
 *
 * @class LabeledItem
 * @memberof sandstone/LabeledItem
 * @extends sandstone/LabeledItem.LabeledItemBase
 * @mixes sandstone/Skinnable.Skinnable
 * @ui
 * @public
 */
const LabeledItem = Pure(
	Skinnable(
		LabeledItemBase
	)
);

export default LabeledItem;
export {LabeledItem, LabeledItemBase};
