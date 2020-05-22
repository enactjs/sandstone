import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {coerceArray, memoize} from '@enact/core/util';
import ilib from '@enact/i18n';
import DateFmt from 'ilib/lib/DateFmt';
import LocaleInfo from 'ilib/lib/LocaleInfo';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';

const forwardSelect = forward('onSelect');
const SELECTED_DAY_TYPES = {
	EVERY_DAY: 0,
	EVERY_WEEKDAY: 1,
	EVERY_WEEKEND: 2,
	SELECTED_DAYS: 3,
	SELECTED_NONE: 4
};

function localizeDay (day, firstDayOfWeek) {
	return ((day - firstDayOfWeek + 7) % 7);
}

function generalizeDay (day, firstDayOfWeek) {
	return ((day + firstDayOfWeek) % 7);
}

// Accepts a "Sunday at index 0" selected array and returns a localized array with "firstDayOfWeek
// at index 0"
function generalizeSelected (selected, state) {
	if (state.firstDayOfWeek === 0 || !selected) {
		return selected;
	}

	return selected.map(v => generalizeDay(v, state.firstDayOfWeek)).sort();
}

// Accepts a localized selected array and returns a "Sunday at index 0" array
function localizeSelected (selected, state) {
	if (state.firstDayOfWeek === 0 || !selected) {
		return selected;
	}

	return selected.map(v => localizeDay(v, state.firstDayOfWeek));
}

const memoLocaleState = memoize((key, dayNameLength) => {
	const df = new DateFmt({length: 'full'});
	const sdf = new DateFmt({length: dayNameLength});
	const li = new LocaleInfo(ilib.getLocale());
	const daysOfWeek = df.getDaysOfWeek();
	const days = sdf.getDaysOfWeek();
	const firstDayOfWeek = li.getFirstDayOfWeek();

	const state = {
		abbreviatedDayNames: days,
		firstDayOfWeek,
		fullDayNames: daysOfWeek,
		weekendEnd: 0,
		weekendStart: 6
	};

	if (li.getWeekEndStart) {
		state.weekendStart = localizeDay(li.getWeekEndStart(), firstDayOfWeek);
	}

	if (li.getWeekEndEnd) {
		state.weekendEnd = localizeDay(li.getWeekEndEnd(), firstDayOfWeek);
	}

	return state;
});

// Accepts an array of names in "sunday at index 0" and returns a localized array
function orderDays (names, state) {
	const result = [];
	for (let i = 0; i < 7; i++) {
		const index = generalizeDay(i, state.firstDayOfWeek);
		result[i] = names[index];
	}

	return result;
}

function getLocaleState (dayNameLength, locale) {
	if (typeof window === 'undefined') {
		return {
			abbreviatedDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			firstDayOfWeek: 0,
			fullDayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			weekendEnd: 0,
			weekendStart: 6
		};
	}

	return memoLocaleState(dayNameLength + locale, dayNameLength);
}

/*
 * Determines which day type should be returned, based on the selected indices.
 *
 * @param {Number[]} [selected] Array of day indexes
 * @param {String[]} [dayNameLength] The format for names of days
 * @param {String[]} [locale]
 *
 * @returns {Number}
 */
function calcSelectedDayType (selected, state) {
	if (selected == null || !Array.isArray(selected)) return SELECTED_DAY_TYPES.SELECTED_NONE;

	let
		weekendStart = false,
		weekendEnd = false,
		index;

	const
		length = selected.length,
		weekendLength = state.weekendStart === state.weekendEnd ? 1 : 2;

	if (length === 0) return SELECTED_DAY_TYPES.SELECTED_NONE;
	if (length === 7) return SELECTED_DAY_TYPES.EVERY_DAY;

	for (let i = 0; i < length; i++) {
		index = selected[i];
		weekendStart = weekendStart || state.weekendStart === index;
		weekendEnd = weekendEnd || state.weekendEnd === index;
	}

	if (weekendStart && weekendEnd && length === weekendLength) {
		return SELECTED_DAY_TYPES.EVERY_WEEKEND;
	} else if (!weekendStart && !weekendEnd && length === 7 - weekendLength) {
		return SELECTED_DAY_TYPES.EVERY_WEEKDAY;
	} else {
		return SELECTED_DAY_TYPES.SELECTED_DAYS;
	}
}

/**
 * Determines whether it should return "Every Day", "Every Weekend", "Every Weekday" or list of
 * days for a given selected day type.
 *
 * @memberof sandstone/DayPicker
 * @param {(Number|Number[])?} selected Selected day(s)
 * @param {String} [noneText] String to be returned when no days are selected
 * @param {String} [dayNameLength] The format for names of days
 *
 * @returns {String} "Every Day", "Every Weekend", "Every Week", list of days or `noneText`
 */
function getSelectedDayString (selected, noneText = '', dayNameLength = 'long') {
	const
		everyDayText = $L('Every Day'),
		everyWeekdayText = $L('Every Weekday'),
		everyWeekendText = $L('Every Weekend'),
		locale = ilib.getLocale();

	const state = getLocaleState(dayNameLength, locale);

	if (selected != null) {
		selected = coerceArray(selected);
	}

	const type = calcSelectedDayType(selected, state);
	const format = (list) => {
		let separator = locale === 'fa-IR' ? '، ' : ', ';

		// sort the selected array with firstDayOfWeek first before mapping to text
		return list
			.slice()
			.sort((a, b) => localizeDay(a, state.firstDayOfWeek) - localizeDay(b, state.firstDayOfWeek))
			.map((dayIndex) => state.abbreviatedDayNames[dayIndex])
			.join(separator);
	};

	switch (type) {
		case SELECTED_DAY_TYPES.EVERY_DAY :
			return everyDayText;
		case SELECTED_DAY_TYPES.EVERY_WEEKEND :
			return everyWeekendText;
		case SELECTED_DAY_TYPES.EVERY_WEEKDAY :
			return everyWeekdayText;
		case SELECTED_DAY_TYPES.SELECTED_DAYS :
			return format(selected);
		case SELECTED_DAY_TYPES.SELECTED_NONE :
			return noneText;
	}
}

/**
 * Applies Sandstone specific behaviors to
 * [DayPicker]{@link sandstone/DayPicker.DayPicker}.
 *
 * @hoc
 * @memberof sandstone/DayPicker
 * @mixes ui/Changeable.Changeable
 * @mixes sandstone/Skinnable.Skinnable
 * @omit onChange
 * @omit value
 * @omit defaultValue
 * @private
 */
const DaySelectorDecorator = hoc((config, Wrapped) => {	// eslint-disable-line no-unused-vars
	return class extends React.Component {

		static displayName = 'DaySelectorDecorator'

		static propTypes = /** @lends sandstone/DayPicker.DaySelectorDecorator.prototype */ {
			/**
			 * The "aria-label" for the selector.
			 *
			 * @memberof sandstone/DayPicker.DaySelectorDecorator.prototype
			 * @type {String}
			 * @private
			 */
			'aria-label': PropTypes.string,

			/**
			 * The format for names of days.
			 *
			 * @type {String}
			 * @default 'long'
			 * @public
			 */
			dayNameLength: PropTypes.oneOf(['short', 'medium', 'long', 'full']),

			/**
			 * Applies a disabled style and prevents interacting with the component.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			disabled: PropTypes.bool,

			/**
			 * Current locale.
			 *
			 * @type {String}
			 * @public
			 */
			locale: PropTypes.string,

			/**
			 * Called when an day is selected or unselected.
			 *
			 * The event payload will be an object with the following members:
			 * * `selected` - An array of numbers representing the selected days, 0 indexed
			 * * `content` - Localized string representing the selected days
			 *
			 * @type {Function}
			 * @public
			 */
			onSelect: PropTypes.func,

			/**
			 * An array of numbers (0-indexed) representing the selected days of the week.
			 *
			 * @type {Number|Number[]}
			 * @public
			 */
			selected: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
		}

		static defaultProps = {
			dayNameLength: 'long',
			disabled: false
		}

		handleSelect = ({selected}) => {
			const {dayNameLength, locale} = this.props;
			const state = getLocaleState(dayNameLength, locale);

			// adjust the selected value beforehand so getSelectedDayString always operates on the
			// standard, "Sunday as index 0" format
			selected = generalizeSelected(selected, state);
			const content = getSelectedDayString(selected, '', dayNameLength);

			forwardSelect({selected, content}, this.props);
		}

		render () {
			const {dayNameLength, locale, selected, ...rest} = this.props;
			const state = getLocaleState(dayNameLength, locale);

			const localSelected = localizeSelected(selected, state);
			const abbreviatedDayNames = orderDays(state.abbreviatedDayNames, state);
			const fullDayNames = orderDays(state.fullDayNames, state);

			delete rest.everyDayText;
			delete rest.everyWeekdayText;
			delete rest.everyWeekendText;
			delete rest.selected;

			return (
				<Wrapped
					{...rest}
					onSelect={this.handleSelect}
					selected={localSelected}
				>
					{abbreviatedDayNames.map((children, index) => ({
						children,
						// "short" dayNameLength can result in the same name so adding index
						key: `${index} ${children}`,
						'aria-label': fullDayNames[index]
					}))}
				</Wrapped>
			);
		}
	};
});

export default DaySelectorDecorator;
export {
	DaySelectorDecorator,
	getSelectedDayString
};
