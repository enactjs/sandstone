/**
 * Provides Sandstone styled form item component and interactive toggleable checkbox.
 *
 * @example
 * <FormCheckboxItem>A Checkbox for a form</FormCheckboxItem>
 *
 * @module sandstone/FormCheckboxItem
 * @exports FormCheckboxItem
 * @exports FormCheckboxItemBase
 */

import kind from '@enact/core/kind';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import FormCheckbox from '../FormCheckbox';
import Item from '../Item';
import Skinnable from '../Skinnable';

import componentCss from './FormCheckboxItem.module.less';

/**
 * Renders a form item with a checkbox component. Useful to show a selected state on an item inside a form.
 *
 * @class FormCheckboxItem
 * @memberof sandstone/FormCheckboxItem
 * @public
 */
const FormCheckboxItemBase = kind({
	name: 'FormCheckboxItem',

	propTypes: /** @lends sandstone/FormCheckboxItem.FormCheckboxItem.prototype */ {
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
		 * If true it will be checked.
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

	styles: {
		css: componentCss,
		className: 'formCheckboxItem',
		publicClassNames: ['formCheckboxItem']
	},

	render: ({children, css, selected, ...rest}) => (
		<Item
			data-webos-voice-intent="SelectCheckItem"
			role="checkbox"
			{...rest}
			css={css}
		>
			<FormCheckbox slot="slotBefore" selected={selected} className={css.formCheckbox} css={css} />
			{children}
		</Item>
	)
});

const FormCheckboxItemDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Skinnable,
);

const FormCheckboxItem = FormCheckboxItemDecorator(FormCheckboxItemBase);

export default FormCheckboxItem;
export {
	FormCheckboxItem,
	FormCheckboxItemBase,
	FormCheckboxItemDecorator
};
