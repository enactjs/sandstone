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

import ToggleIcon from '../ToggleIcon';
import Icon from '@enact/ui/Icon';

import css from './Checkbox.module.less';

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
		 * @see {@link sandstone/Icon.Icon.children}
		 * @type {String|Object}
		 * @default	'check'
		 * @public
		 */
		children: PropTypes.string
	},

	defaultProps: {
		children: 'check'
	},

	render: ({children, ...rest}) => {
		return (
			<ToggleIcon
				{...rest}
				css={css}
				iconComponent={Icon}
			>
				{children}
			</ToggleIcon>
		);
	}
});

export default CheckboxBase;
export {
	CheckboxBase as Checkbox,
	CheckboxBase
};
