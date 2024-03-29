import kind from '@enact/core/kind';
import {mapAndFilterChildren} from '@enact/core/util';
import Changeable from '@enact/ui/Changeable';
import {Children} from 'react';
import PropTypes from 'prop-types';

import Picker, {PickerItem} from '../Picker';

import css from './DateComponentPicker.module.less';

/**
 * {@link sandstone/internal/DataComponentPicker.DateComponentPickerBase} allows the selection of one
 * part of the date or time using a {@link sandstone/Picker.Picker}.
 *
 * @class DateComponentPickerBase
 * @memberof sandstone/internal/DateComponentPicker
 * @ui
 * @private
 */
const DateComponentPickerBase = kind({
	name: 'DateComponentPicker',

	propTypes: /** @lends sandstone/internal/DateComponentPicker.DateComponentPickerBase.prototype */ {
		/**
		 * Display values representing the `value` to select
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		children: PropTypes.arrayOf(PropTypes.string).isRequired,

		/**
		 * The value of the date component
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		value: PropTypes.number.isRequired,

		/**
		 * Sets the hint string read when focusing the picker.
		 *
		 * @type {String}
		 * @public
		 */
		accessibilityHint: PropTypes.string,

		/**
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current selected child and accessibilityHint text.
		 *
		 * @type {String}
		 * @memberof sandstone/internal/DateComponentPicker.DateComponentPickerBase.prototype
		 * @public
		 */
		'aria-valuetext': PropTypes.string,

		/**
		 * The label to display below the picker
		 *
		 * @type {String}
		 */
		label: PropTypes.string,

		/**
		 * By default, the picker will animate transitions between items if it has a defined
		 * `width`. Specifying `noAnimation` will prevent any transition animation for the
		 * component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * When `true`, the picker buttons operate in the reverse direction.
		 *
		 * @type {Boolean}
		 * @public
		 */
		reverse: PropTypes.bool,

		/*
		 * When `true`, allow the picker to continue from the opposite end of the list of options.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	styles: {
		css,
		className: 'dateComponentPicker'
	},

	computed: {
		children: ({children}) => mapAndFilterChildren(children, (child) => (
			<PickerItem marqueeDisabled>{child}</PickerItem>
		)),
		max: ({children}) => Children.count(children) - 1,
		voiceLabel: ({children}) => {
			return JSON.stringify(children);
		}
	},

	render: ({'aria-valuetext': ariaValuetext, accessibilityHint, children, label, max, noAnimation, reverse, value, voiceLabel, wrap, ...rest}) => (
		<Picker
			{...rest}
			accessibilityHint={(accessibilityHint == null) ? label : accessibilityHint}
			aria-valuetext={(accessibilityHint == null) ? ariaValuetext : null}
			data-webos-voice-labels-ext={voiceLabel}
			index={value}
			joined
			max={max}
			min={0}
			noAnimation={noAnimation}
			orientation="vertical"
			reverse={reverse}
			step={1}
			value={value}
			wrap={wrap}
		>
			{children}
		</Picker>
	)
});

/**
 * {@link sandstone/internal/DateComponentPickerBase.DateComponentPicker} allows the selection of one part of
 * the date (date, month, or year). It is a stateful component but allows updates by providing a new
 * `value` via props.
 *
 * @class DateComponentPicker
 * @memberof sandstone/internal/DateComponentPicker
 * @mixes ui/Changeable.Changeable
 * @ui
 * @private
 */
const DateComponentPicker = Changeable(
	DateComponentPickerBase
);

export default DateComponentPicker;
export {
	DateComponentPicker,
	DateComponentPickerBase
};
