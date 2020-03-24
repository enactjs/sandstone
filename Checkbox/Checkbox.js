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
import React from 'react';

import Icon from '../Icon';

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
 * @class Checkbox
 * @memberof sandstone/Checkbox
 * @extends sandstone/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const CheckboxBase = kind({
	name: 'Checkbox',

	propTypes: /** @lends sandstone/Checkbox.Checkbox.prototype */ {
		/**
		 * The icon displayed when `selected`.
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
		 * Sets whether this control is in the 'on' or 'off' state. `true` for 'on', `false` for 'off'.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool
	},

	defaultProps: {
		children: 'check',
		selected: false
	},

	styles: {
		css: componentCss,
		className: 'checkbox',
		publicClassNames: ['checkbox', 'selected']
	},

	computed: {
		className: ({children, selected, styler}) => styler.append({
			check: children === 'check',
			selected
		})
	},

	render: ({children, css, ...rest}) => {
		return (
			<Icon
				size="tiny"
				{...rest}
				css={css}
			>
				{children}
			</Icon>
		);
	}
});

export default CheckboxBase;
export {
	CheckboxBase as Checkbox,
	CheckboxBase
};
