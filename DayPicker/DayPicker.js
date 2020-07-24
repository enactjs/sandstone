/**
 * Sandstone styled day picker components.
 *
 * @example
 * <DayPicker
 *   selected={[2, 3]}
 *   onSelect={console.log}
 * />
 *
 * @module sandstone/DayPicker
 * @exports DayPicker
 * @exports DayPickerBase
 * @exports getSelectedDayString
 */

import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import CheckboxItem from '../CheckboxItem';
import Skinnable from '../Skinnable';

import {DaySelectorDecorator, getSelectedDayString} from './DaySelectorDecorator';

import css from './DayPicker.module.less';

/**
 * A day of the week selection component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [DayPicker]{@link sandstone/DayPicker.DayPicker}.
 *
 * @class DayPickerBase
 * @memberof sandstone/DayPicker
 * @extends ui/Group.Group
 * @omit children
 * @ui
 * @public
 */
const DayPickerBase = kind({
	name: 'DayPicker',

	propTypes: /** @lends sandstone/DayPicker.DayPicker.prototype */ {
		/**
		 * Disables all days in this picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called when an day is selected or unselected.
		 *
		 * The event payload will be an object with the following members:
		 * * `selected` - An array of numbers representing the selected days, 0 indexed where Sunday
		 *   is represented by 0
		 *
		 * @type {Function}
		 * @public
		 */
		onSelect: PropTypes.func,

		/**
		 * An array of numbers (0 indexed where Sunday is 0) representing the selected days of the
		 * week.
		 *
		 * @type {Number|Number[]}
		 * @public
		 */
		selected: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.number)
		])
	},

	styles: {
		css,
		className: 'dayPicker'
	},

	computed: {
		children: ({children}) => children.map(child => child['aria-label'])
	},

	render: ({disabled, ...rest}) => {
		return (
			<Group
				{...rest}
				component="div"
				childComponent={CheckboxItem}
				itemProps={{className: css.item, disabled}}
				role={null}
				select="multiple"
				selectedProp="selected"
			/>
		);
	}
});

const DayPickerDecorator = compose(
	Pure,
	Changeable({change: 'onSelect', prop: 'selected'}),
	I18nContextDecorator({localeProp: 'locale'}),
	DaySelectorDecorator,
	Skinnable
);

/**
 * A day of the week selection component, ready to use in Sandstone applications.
 *
 * By default, `DayPicker` maintains the state of its `selected` property. Supply the
 * `selected` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `selected` at creation time and update it in response to
 * `onChange` events.
 *
 * Usage:
 * ```
 * <DayPicker
 *   selected={[2, 3]}
 *   onSelect={handleSelect}
 * />
 * ```
 *
 * @class DayPicker
 * @memberof sandstone/DayPicker
 * @extends sandstone/DayPicker.DayPickerBase
 * @mixes ui/Changeable.Changeable
 * @omit onChange
 * @omit value
 * @omit defaultValue
 * @ui
 * @public
 */
const DayPicker = DayPickerDecorator(DayPickerBase);

/**
 * The "aria-label" for the component.
 *
 * By default, "aria-label" is set to the full names of the selected days or
 * the custom text when the weekend, week days, or all days is selected.
 *
 * @name aria-label
 * @type {String}
 * @memberof sandstone/DayPicker.DayPicker.prototype
 * @public
 */

/**
 * The initial value used when `selected` is not set.
 *
 * @name selected
 * @type {Number|Number[]}
 * @memberof sandstone/DayPicker.DayPicker.prototype
 * @public
 */

/**
 * Disables DayPicker and the control becomes non-interactive.
 *
 * @name disabled
 * @type {Boolean}
 * @default false
 * @memberof sandstone/DayPicker.DayPicker.prototype
 * @public
 */

export default DayPicker;
export {
	DayPicker,
	DayPickerBase,
	getSelectedDayString
};
