import {forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {coerceArray, memoize, setDefaultProps} from '@enact/core/util';
import ilib from '@enact/i18n';
import DateFmt from 'ilib/lib/DateFmt';
import LocaleInfo from 'ilib/lib/LocaleInfo';
import PropTypes from 'prop-types';

function generalizeDay (day, firstDayOfWeek) {
	return ((day + firstDayOfWeek) % 7);
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
	};

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
		};
	}

	return memoLocaleState(dayNameLength + locale, dayNameLength);
}

const calendarSelectorDecoratorDefaultProps = {
	dayNameLength: 'long',
};

/**
 * Applies Sandstone specific behaviors to {@link sandstone/Calendar.Calendar|Calendar}.
 *
 * @hoc
 * @memberof sandstone/Calendar
 * @mixes ui/Changeable.Changeable
 * @mixes sandstone/Skinnable.Skinnable
 * @omit onChange
 * @omit value
 * @omit defaultValue
 * @private
 */
const CalendarSelectorDecorator = hoc((config, Wrapped) => {
	const CalendarSelector = (props) => {
		const calendarSelectorDecoratorProps = setDefaultProps(props, calendarSelectorDecoratorDefaultProps);
		const {dayNameLength, locale, selectedDate, ...rest} = calendarSelectorDecoratorProps;

		const state = getLocaleState(dayNameLength, locale);

		const abbreviatedDayNames = orderDays(state.abbreviatedDayNames, state);
		// const fullDayNames = orderDays(state.fullDayNames, state);

		return (
			<Wrapped
				{...rest}
				abbreviatedDayNames={abbreviatedDayNames}
				firstDayOfWeek={state.firstDayOfWeek}
				ilibData={state}
				//onSelect={handleSelect}
			/>
		);
	};

	CalendarSelector.displayName = 'CalendarSelectorDecorator';

	CalendarSelector.propTypes = /** @lends sandstone/DayPicker.DaySelectorDecorator.prototype */ {
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
		 * @type {('short'|'medium'|'long'|'full')}
		 * @default 'long'
		 * @public
		 */
		dayNameLength: PropTypes.oneOf(['short', 'medium', 'long', 'full']),

		/**
		 * Current locale.
		 *
		 * @type {String}
		 * @public
		 */
		locale: PropTypes.string,

		/**
		 * Called when a day is selected or unselected.
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
	};

	CalendarSelector.defaultPropValues = calendarSelectorDecoratorDefaultProps;

	return CalendarSelector;
});

export default CalendarSelectorDecorator;
export {
	CalendarSelectorDecorator
};
