/**
 * Sandstone styled checkmark icon inside a circle, primarily used inside the
 * [FormCheckboxItem]{@link sandstone/FormCheckboxItem.FormCheckboxItem}. This also has built-in
 * `Spotlight` support since `FormCheckboxItem` is a specialized [Item]{@link sandstone/Item} that
 * does not visually respond to focus; this child component shows focus instead.
 *
 * @example
 * <FormCheckbox />
 *
 * @module sandstone/FormCheckbox
 * @exports FormCheckbox
 * @exports FormCheckboxBase
 * @deprecated Will be removed in 1.0.0-beta.1.
 */

import deprecate from '@enact/core/internal/deprecate';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import ToggleIcon from '../ToggleIcon';

import componentCss from './FormCheckbox.module.less';

/**
 * A component that represents a Boolean state, and looks like a check mark in a circle.
 *
 * @class FormCheckbox
 * @memberof sandstone/FormCheckbox
 * @extends sandstone/ToggleIcon.ToggleIcon
 * @ui
 * @public
 */
const FormCheckboxBase = kind({
	name: 'FormCheckbox',

	propTypes: /** @lends sandstone/FormCheckbox.FormCheckbox.prototype */ {
		/**
		 * The icon to be shown when selected.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link ui/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution}).
		 *
		 * @type {String}
		 * @public
		 */
		children: PropTypes.string,
		css: PropTypes.object
	},

	defaultProps: {
		children: 'check'
	},

	styles: {
		css: componentCss
	},

	render: deprecate(({children, css, ...rest}) => (
		<ToggleIcon {...rest} css={css}>{children}</ToggleIcon>
	), {
		name: 'sandstone/FormCheckbox',
		until: '1.0.0-beta.1'
	})
});

export default FormCheckboxBase;
export {
	FormCheckboxBase as FormCheckbox,
	FormCheckboxBase
};
