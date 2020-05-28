/**
 * Sandstone styled item components with a toggleable checkbox.
 *
 * @example
 * <CheckboxItem onToggle={console.log}>
 * 	Item with a Checkbox
 * </CheckboxItem>
 *
 * @module sandstone/CheckboxItem
 * @exports CheckboxItem
 * @exports CheckboxItemBase
 * @exports CheckboxItemDecorator
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Toggleable from '@enact/ui/Toggleable';

import {CheckboxBase} from '../Checkbox';
import Item from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './CheckboxItem.module.less';

const Checkbox = Skinnable(CheckboxBase);
Checkbox.displayName = 'Checkbox';

/**
 * A Sandstone-styled item with a checkbox component.
 *
 * `CheckboxItem` may be used to allow the user to select a single option or used as part of a
 * [Group]{@link ui/Group} when multiple [selections]{@link ui/Group.Group.select} are possible.
 *
 * Usage:
 * ```
 * <CheckboxItem
 * 	defaultSelected={selected}
 * 	onToggle={handleToggle}
 * >
 *  Item with a Checkbox
 * </CheckboxItem>
 * ```
 *
 * @class CheckboxItemBase
 * @memberof sandstone/CheckboxItem
 * @extends sandstone/Item.Item
 * @omit iconComponent
 * @ui
 * @public
 */
const CheckboxItemBase = kind({
	name: 'CheckboxItem',

	propTypes: /** @lends sandstone/CheckboxItem.CheckboxItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `checkboxItem` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon content.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link sandstone/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @type {String|Object}
		 * @public
		 */
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Enables the "indeterminate" state.
		 *
		 * An indeterminate, mixed, or half-selected state is typically used in a hierarchy or group
		 * to represent that some, not all, children are selected.
		 *
		 * NOTE: This does not prevent updating the `selected` state. Applications must control this
		 * property directly.
		 *
		 * @type {Boolean}
		 * @public
		 */
		indeterminate: PropTypes.bool,

		/**
		 * The icon to be used in the `indeterminate` state.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link sandstone/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @type {String}
		 * @public
		 */
		indeterminateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * If true the checkbox will be selected.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool
	},

	styles: {
		css: componentCss,
		className: 'checkboxItem',
		publicClassNames: ['checkboxItem']
	},

	render: ({children, css, icon, indeterminate, indeterminateIcon, selected, ...rest}) => (
		<Item
			aria-checked={selected}
			data-webos-voice-intent="SelectCheckItem"
			role="checkbox"
			{...rest}
			selected={selected}
			css={css}
		>
			<Checkbox
				selected={selected}
				indeterminate={indeterminate}
				indeterminateIcon={indeterminateIcon}
				slot="slotBefore"
			>
				{icon}
			</Checkbox>
			{children}
		</Item>
	)
});

/**
 * Adds interactive functionality to `CheckboxItem`.
 *
 * @class CheckboxItemDecorator
 * @memberof sandstone/CheckboxItem
 * @mixes ui/Toggleable.Toggleable
 * @hoc
 * @public
 */
const CheckboxItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'})
);

/**
 * A Sandstone-styled item with a checkbox component.
 *
 * `CheckboxItem` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class CheckboxItem
 * @memberof sandstone/CheckboxItem
 * @extends sandstone/CheckboxItem.CheckboxItemBase
 * @mixes sandstone/CheckboxItem.CheckboxItemDecorator
 * @ui
 * @public
 */
const CheckboxItem = CheckboxItemDecorator(CheckboxItemBase);

export default CheckboxItem;
export {
	CheckboxItem,
	CheckboxItemBase,
	CheckboxItemDecorator
};
