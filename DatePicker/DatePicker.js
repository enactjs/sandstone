/**
 * Date selection components and behaviors.
 *
 * @example
 * <DatePicker onChange={console.log} />
 *
 * @module sandstone/DatePicker
 * @exports DatePicker
 * @exports DatePickerBase
 * @exports dateToLocaleString
 */

import Pure from '@enact/ui/internal/Pure';
import DateFactory from 'ilib/lib/DateFactory';
import DateFmt from 'ilib/lib/DateFmt';

import {DateTimeDecorator} from '../internal/DateTime';
import Skinnable from '../Skinnable';

import DatePickerBase from './DatePickerBase';

// Label formatter
let formatter;
const labelFormatter = () => formatter || (formatter = new DateFmt({
	date: 'dmwy',
	length: 'full',
	timezone: 'local',
	useNative: false
}));

const dateTimeConfig = {
	customProps: function (i18n, value, props) {
		const values = {
			maxMonths: 12,
			maxDays: 31,
			year: 1900,
			month: 1,
			day: 1
		};

		if (value && i18n) {
			values.year = value.getYears();
			values.month = value.getMonths();
			values.day = value.getDays();
			values.maxMonths = i18n.formatter.cal.getNumMonths(values.year);
			values.maxDays = i18n.formatter.cal.getMonLength(values.month, values.year);
			values.maxYear = i18n.toLocalYear(props.maxYear || DatePickerBase.defaultProps.maxYear);
			values.minYear = i18n.toLocalYear(props.minYear || DatePickerBase.defaultProps.minYear);
		}

		return values;
	},
	defaultOrder: ['d', 'm', 'y'],
	handlers: {
		onChangeDate: (ev, value) => {
			value.day = ev.value;
			return value;
		},

		onChangeMonth: (ev, value) => {
			value.month = ev.value;
			return value;
		},

		onChangeYear: (ev, value) => {
			value.year = ev.value;
			return value;
		}
	},
	i18n: function () {
		const order = labelFormatter().getTemplate()
			.replace(/'.*?'/g, '')
			.match(/([mdy]+)/ig)
			.map(s => s[0].toLowerCase());

		/*
		 * Converts a gregorian year to local year
		 *
		 * @param	{Number}	year	gregorian year
		 *
		 * @returns	{Number}		local year
		 */
		const toLocalYear = (year) => {
			return DateFactory({
				julianday: DateFactory({
					year,
					type: 'gregorian',
					month: 1,
					day: 1,
					timezone: 'local'
				}).getJulianDay(),
				timezone: 'local'
			}).getYears();
		};

		return {formatter: labelFormatter(), order, toLocalYear};
	}
};

/**
 * A date selection component, ready to use in Sandstone applications.
 *
 * `DatePicker` may be used to select the year, month, and day. It uses a standard `Date` object for
 * its `value` which can be shared as the `value` for a
 * [TimePicker]{@link sandstone/TimePicker.TimePicker} to select both a date and time.
 *
 * By default, `DatePicker` maintains the state of its `value` property. Supply the
 * `defaultValue` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `value` at creation time and update it in response to
 * `onChange` events.
 *
 * Usage:
 * ```
 * <DatePicker
 *  defaultValue={selectedDate}
 *  onChange={handleChange}
 * />
 * ```
 *
 * @class DatePicker
 * @memberof sandstone/DatePicker
 * @extends sandstone/DatePicker.DatePickerBase
 * @mixes ui/Toggleable.Toggleable
 * @mixes ui/RadioDecorator.RadioDecorator
 * @mixes ui/Changeable.Changeable
 * @omit day
 * @omit maxDays
 * @omit maxMonths
 * @omit month
 * @omit order
 * @omit year
 * @ui
 * @public
 */
const DatePicker = Pure(
	Skinnable(
		DateTimeDecorator(
			dateTimeConfig,
			DatePickerBase
		)
	)
);

/**
 * The initial value used when `value` is not set.
 *
 * @name defaultValue
 * @type {Date}
 * @memberof sandstone/DatePicker.DatePicker.prototype
 * @public
 */

/**
 * The selected date
 *
 * @name value
 * @type {Date}
 * @memberof sandstone/DatePicker.DatePicker.prototype
 * @public
 */

/**
 * Converts a standard `Date` object into a locale-specific string.
 *
 * @function
 * @memberof sandstone/DatePicker
 * @param {Date} date `Date` to convert
 * @returns {String?} Converted date or `null` if `date` is invalid
 */
const dateToLocaleString = (date) => {
	if (!date) {
		return null;
	}

	return labelFormatter().format(date);
};

export default DatePicker;
export {
	DatePicker,
	DatePickerBase,
	dateToLocaleString
};
