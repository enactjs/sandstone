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
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';

import Checkbox from '../Checkbox';
import Skinnable from '../Skinnable';

import componentCss from './FormCheckbox.module.less';

/**
 * A component that represents a Boolean state, and looks like a Checkbox.
 *
 * @class FormCheckbox
 * @memberof sandstone/FormCheckbox
 * @public
 */
const FormCheckboxBase = kind({
	name: 'FormCheckbox',

	propTypes: /** @lends sandstone/FormCheckbox.FormCheckbox.prototype */ {
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
		selected: false
	},

	computed: {
		className: ({selected, styler}) => styler.append({
			selected
		})
	},

	styles: {
		css: componentCss,
		className: 'formCheckbox',
		publicClassNames: ['formCheckbox', 'selected']
	},

	render: ({css, selected, ...rest}) => (
		<Checkbox
			{...rest}
			css={css}
			selected={selected}
		/>
	)
});

const FormCheckboxDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Spottable,
	Skinnable
);

const FormCheckbox = FormCheckboxDecorator(FormCheckboxBase);

export default FormCheckbox;

export {
	FormCheckbox,
	FormCheckboxBase,
	FormCheckboxDecorator
};
