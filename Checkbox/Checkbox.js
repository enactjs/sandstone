/**
 * Sandstone styled checkbox components.
 *
 * @example
 * <Checkbox onToggle={console.log} />
 *
 * @module sandstone/Checkbox
 * @exports Checkbox
 * @exports CheckboxBase
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Checkbox.module.less';

/**
 * A checkbox component, ready to use in Sandstone applications.
 *
 * `Checkbox` may be used independently to represent a toggleable state but is more commonly used as
 * part of [CheckboxItem]{@link sandstone/CheckboxItem}.
 *
 * Usage:
 * ```
 * <Checkbox selected />
 * ```
 *
 * @class CheckboxBase
 * @memberof sandstone/Checkbox
 * @extends sandstone/Icon.Icon
 * @ui
 * @public
 */
const CheckboxBase = kind({
	name: 'Checkbox',

	propTypes: /** @lends sandstone/Checkbox.CheckboxBase.prototype */ {
		/**
		 * The icon displayed when `selected`.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link sandstone/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution})
		 *
		 * @see {@link sandstone/Icon.IconBase.children}
		 * @type {String|Object}
		 * @default	'check'
		 * @public
		 */
		children: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `checkbox` - The root class name
		 * * `selected` - Applied when the `selected` prop is true
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

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
		 * @default false
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
		 * @default 'minus'
		 * @public
		 */
		indeterminateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Sets whether this control is in the 'on' or 'off' state. `true` for 'on', `false` for 'off'.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * Sets standalone rules to show spotlight background color.
		 *
		 * @type {Boolean}
		 * @private
		 */
		standalone: PropTypes.bool
	},

	defaultProps: {
		children: 'check',
		indeterminate: false,
		indeterminateIcon: 'minus',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'checkbox',
		publicClassNames: ['checkbox', 'selected']
	},

	computed: {
		className: ({indeterminate, selected, standalone, styler}) => styler.append({selected, standalone, indeterminate}),
		children: ({indeterminate, indeterminateIcon, children}) => (indeterminate ? indeterminateIcon : children) // This controls which icon to use, an not that icon's visual presence.
	},

	render: ({children, css, selected, ...rest}) => {
		delete rest.indeterminate;
		delete rest.indeterminateIcon;
		delete rest.standalone;

		return (
			<div
				{...rest}
				aria-checked={selected}
				role="checkbox"
			>
				<div className={css.bg} />
				<Icon
					size="tiny"
					className={css.icon}
				>
					{children}
				</Icon>
			</div>
		);
	}
});

/**
 * Adds interactive functionality to `Checkbox`.
 *
 * @class CheckboxDecorator
 * @memberof sandstone/Checkbox
 * @mixes ui/Toggleable.Toggleable
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @hoc
 * @public
 */
const CheckboxDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Touchable,
	Spottable,
	Skinnable
);

/**
 * A Sandstone-styled checkbox component.
 *
 * `Checkbox` will manage its `selected` state via [Toggleable]{@link ui/Toggleable} unless set
 * directly.
 *
 * @class Checkbox
 * @memberof sandstone/Checkbox
 * @extends sandstone/Checkbox.CheckboxBase
 * @mixes sandstone/Checkbox.CheckboxDecorator
 * @ui
 * @public
 */
const Checkbox = CheckboxDecorator(CheckboxBase);

export default Checkbox;
export {
	Checkbox,
	CheckboxBase,
	CheckboxDecorator
};
