import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import {DateComponentRangePicker} from '../internal/DateComponentPicker';
import DateTime from '../internal/DateTime';

import css from './DatePicker.module.less';

/**
 * A date selection component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [DatePicker]{@link sandstone/DatePicker.DatePicker}.
 *
 * @class DatePickerBase
 * @memberof sandstone/DatePicker
 * @ui
 * @public
 */
const DatePickerBase = kind({
	name: 'DatePickerBase',

	propTypes:  /** @lends sandstone/DatePicker.DatePickerBase.prototype */ {
		/**
		 * The `day` component of the Date.
		 *
		 * The value should be a number between 1 and `maxDays`.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		day: PropTypes.number.isRequired,

		/**
		 * The number of days in the month.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		maxDays: PropTypes.number.isRequired,

		/**
		 * The number of months in the year.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		maxMonths: PropTypes.number.isRequired,

		/**
		 * The `month` component of the Date.
		 *
		 * The value should be a number between 1 and `maxMonths`.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		month: PropTypes.number.isRequired,

		/**
		 * The order in which the component pickers are displayed.
		 *
		 * The value should be an array of 3 strings containing one of `'m'`, `'d'`, and `'y'`.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		order: PropTypes.arrayOf(PropTypes.oneOf(['m', 'd', 'y'])).isRequired,

		/**
		 * The `year` component of the Date.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		year: PropTypes.number.isRequired,

		/**
		 * Disables voice control.
		 *
		 * @type {Boolean}
		 * @memberof sandstone/DatePicker.DatePickerBase.prototype
		 * @public
		 */
		'data-webos-voice-disabled': PropTypes.bool,

		/**
		 * The "aria-label" for the day picker.
		 *
		 * If not specified, the "aria-label" for the day picker will be
		 * a combination of the current value and 'day change a value with up down button'.
		 * If specified, its value will override a whole aria-label.
		 *
		 * @type {String}
		 * @public
		 */
		dayAriaLabel: PropTypes.string,

		/**
		 * Disables the `DatePicker`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The primary text of the `DatePicker`.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * The maximum selectable `year` value.
		 *
		 * @type {Number}
		 * @default 2099
		 * @public
		 */
		maxYear: PropTypes.number,

		/**
		 * The minimum selectable `year` value.
		 *
		 * @type {Number}
		 * @default 1900
		 * @public
		 */
		minYear: PropTypes.number,

		/**
		 * The "aria-label" for the month picker.
		 *
		 * If not specified, the "aria-label" for the month picker will be
		 * a combination of the current value and 'month change a value with up down button'.
		 * If specified, its value will override a whole aria-label.
		 *
		 * @type {String}
		 * @public
		 */
		monthAriaLabel: PropTypes.string,

		/**
		 * Called when the `date` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeDate: PropTypes.func,

		/**
		 * Called when the `month` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMonth: PropTypes.func,

		/**
		 * Called when the `year` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeYear: PropTypes.func,

		/**
		 * Called when the component is removed when it had focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Called prior to focus leaving the picker when the 5-way left key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightLeft: PropTypes.func,

		/**
		 * Called prior to focus leaving the picker when the 5-way right key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightRight: PropTypes.func,

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Disables 5-way spotlight from navigating into the component.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * The "aria-label" for the year picker.
		 *
		 * If not specified, the "aria-label" for the year picker will be
		 * a combination of the current value and 'year change a value with up down button'.
		 * If specified, its value will override a whole aria-label.
		 *
		 * @type {String}
		 * @public
		 */
		yearAriaLabel: PropTypes.string
	},

	defaultProps: {
		maxYear: 2099,
		minYear: 1900,
		disabled: false,
		spotlightDisabled: false
	},

	styles: {
		css,
		className: 'datePicker'
	},

	render: ({
		'data-webos-voice-disabled': voiceDisabled,
		disabled,
		day,
		dayAriaLabel,
		maxDays,
		maxMonths,
		maxYear,
		minYear,
		month,
		monthAriaLabel,
		onChangeDate,
		onChangeMonth,
		onChangeYear,
		onSpotlightDisappear,
		onSpotlightLeft,
		onSpotlightRight,
		order,
		rtl,
		spotlightDisabled,
		year,
		yearAriaLabel,
		...rest
	}) => {
		const
			dayAccessibilityHint = $L('day'),
			monthAccessibilityHint = $L('month'),
			yearAccessibilityHint = $L('year');

		return (
			<DateTime {...rest}>
				{order.map((picker, index) => {
					const isFirst = index === 0;
					const isLast = index === order.length - 1;
					const isLeft = isFirst && !rtl || isLast && rtl;
					const isRight = isFirst && rtl || isLast && !rtl;

					switch (picker) {
						case 'd':
							return (
								<DateComponentRangePicker
									accessibilityHint={dayAccessibilityHint}
									aria-label={dayAriaLabel}
									className={css.day}
									disabled={disabled}
									data-webos-voice-disabled={voiceDisabled}
									data-webos-voice-group-label={dayAccessibilityHint}
									key="day-picker"
									max={maxDays}
									min={1}
									onChange={onChangeDate}
									onSpotlightDisappear={onSpotlightDisappear}
									onSpotlightLeft={isLeft ? onSpotlightLeft : null}
									onSpotlightRight={isRight ? onSpotlightRight : null}
									spotlightDisabled={spotlightDisabled}
									value={day}
									width={4}
									wrap
								/>
							);
						case 'm':
							return (
								<DateComponentRangePicker
									accessibilityHint={monthAccessibilityHint}
									aria-label={monthAriaLabel}
									className={css.month}
									disabled={disabled}
									data-webos-voice-disabled={voiceDisabled}
									data-webos-voice-group-label={monthAccessibilityHint}
									key="month-picker"
									max={maxMonths}
									min={1}
									onChange={onChangeMonth}
									onSpotlightDisappear={onSpotlightDisappear}
									onSpotlightLeft={isLeft ? onSpotlightLeft : null}
									onSpotlightRight={isRight ? onSpotlightRight : null}
									spotlightDisabled={spotlightDisabled}
									value={month}
									width={4}
									wrap
								/>
							);
						case 'y':
							return (
								<DateComponentRangePicker
									accessibilityHint={yearAccessibilityHint}
									aria-label={yearAriaLabel}
									className={css.year}
									disabled={disabled}
									data-webos-voice-disabled={voiceDisabled}
									data-webos-voice-group-label={yearAccessibilityHint}
									key="year-picker"
									max={maxYear}
									min={minYear}
									onChange={onChangeYear}
									onSpotlightDisappear={onSpotlightDisappear}
									onSpotlightLeft={isLeft ? onSpotlightLeft : null}
									onSpotlightRight={isRight ? onSpotlightRight : null}
									spotlightDisabled={spotlightDisabled}
									value={year}
									width={4}
								/>
							);
					}
					return null;
				})}
			</DateTime>
		);
	}
});

export default DatePickerBase;
export {
	DatePickerBase
};
