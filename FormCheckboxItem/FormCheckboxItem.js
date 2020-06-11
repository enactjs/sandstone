/**
 * Provides Sandstone styled form item component and interactive toggleable checkbox.
 *
 * @example
 * <FormCheckboxItem>A Checkbox for a form</FormCheckboxItem>
 *
 * @module sandstone/FormCheckboxItem
 * @exports FormCheckboxItem
 * @exports FormCheckboxItemBase
 * @exports FormCheckboxItemDecorator
 */

import kind from '@enact/core/kind';
import Slottable from '@enact/ui/Slottable';
import Toggleable from '@enact/ui/Toggleable';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';
import {CheckboxBase} from '../Checkbox';
import Item from '../Item';

import componentCss from './FormCheckboxItem.module.less';

const Checkbox = Spottable(Skinnable(CheckboxBase));

/**
 * A Sandstone-styled form item with a checkbox component.
 *
 * Useful to show a selected state on an item inside a form.
 *
 * @class FormCheckboxItemBase
 * @memberof sandstone/FormCheckboxItem
 * @extends sandstone/Item.Item
 * @ui
 * @public
 */
const FormCheckboxItemBase = kind({
	name: 'FormCheckboxItem',

	propTypes: /** @lends sandstone/FormCheckboxItem.FormCheckboxItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `formCheckboxItem` - The root class name
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
		 * Controls the presence of the checkmark icon.
		 *
		 * @type {Boolean}
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Nodes to be inserted after the checkbox and before `children`.
		 *
		 * @type {Node}
		 * @public
		 */
		slotBefore: PropTypes.node
	},

	styles: {
		css: componentCss,
		className: 'formCheckboxItem',
		publicClassNames: ['formCheckboxItem']
	},

	render: ({checkboxClassName, children, css, icon, indeterminate, indeterminateIcon, selected, slotBefore, ...rest}) => (
		<Item
			data-webos-voice-intent="SelectCheckItem"
			role="checkbox"
			{...rest}
			aria-checked={selected}
			css={css}
			selected={selected}
		>
			<slotBefore>
				<Checkbox
					className={slotBefore ? css.checkbox : null}
					indeterminate={indeterminate}
					indeterminateIcon={indeterminateIcon}
					selected={selected}
				>
					{icon}
				</Checkbox>
				{slotBefore}
			</slotBefore>
			{children}
		</Item>
	)
});

/**
 * Adds interactive functionality to `FormCheckboxItem`.
 *
 * @class FormCheckboxItemDecorator
 * @memberof sandstone/FormCheckboxItem
 * @mixes ui/Toggleable.Toggleable
 * @hoc
 * @public
 */
const FormCheckboxItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Slottable({slots: ['slotBefore']})
);

/**
 * A Sandstone-styled form item with a checkbox component.
 *
 * `FormCheckboxItem` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless
 * set directly.
 *
 * @class FormCheckboxItem
 * @memberof sandstone/FormCheckboxItem
 * @extends sandstone/FormCheckboxItem.FormCheckboxItemBase
 * @mixes sandstone/FormCheckboxItem.FormCheckboxItemDecorator
 * @ui
 * @public
 */
const FormCheckboxItem = FormCheckboxItemDecorator(FormCheckboxItemBase);

export default FormCheckboxItem;
export {
	FormCheckboxItem,
	FormCheckboxItemBase,
	FormCheckboxItemDecorator
};
