// Calendar utils.js
//

import calendarFactory from 'ilib/lib/CalendarFactory';
import DateFactory from 'ilib/lib/DateFactory';
import DateFmt from 'ilib/lib/DateFmt';

/*
 * Returns an array of local years.
 *
 * @returns	{Array<number>}	An array containing local year values.
 */
const createYearList = () => {
	let years = [];
	let startingPoint = 1900;
	while (years.length < 200) {
		const year = new DateFmt({length: 'full', type: 'date', date: 'y'}).format(new Date(startingPoint, 0, 1));
		years = [...years, year];
		startingPoint++;
	}
	return years;
};

/*
 * Returns the position of the first day of the current month.
 *
 * @returns {number} The position of the first day of the current month.
 */
const getStartDayOfMonth = (firstDayOfWeek, month, year) => {
	let startDate;
	const dayOfMonth = DateFactory({year: year, month: month + 1, day: 1}).getJSDate().getDay();

	if (firstDayOfWeek === 0) {
		startDate = dayOfMonth + 1;
	} else if (firstDayOfWeek === 1) {
		startDate = dayOfMonth;
	} else { // for locales where first day of week is Saturday
		startDate = dayOfMonth + 2;
	}

	return startDate === 0 ? 7 : startDate;
};

/*
 * Gets the number of days in each month for the local year.
 *
 * @returns	{Array}	An array where each element represents the number of days in a month for the current local year.
 */
const getDaysOfYear = (year) => {
	return Array(calendarFactory().getNumMonths(year))
		.fill(null)
		.map((_, index) => calendarFactory().getMonLength(index + 1, year));
};

/*
 * Checks if the given date is today.
 *
 * @returns	{Boolean}	Returns `true` if the date is today, otherwise `false`.
 */
const isToday = (today, day, month, year) => {
	return (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year);
};

/*
 * Returns the current local date and time.
 *
 * @returns	{Date}	The current local date and time as a Date object.
 */
const getLocalDate = () => {
	const {year, month, day, hour, minute, second} = new DateFactory({type: calendarFactory().type});

	return new Date(year, month - 1, day, hour, minute, second);
};

/*
 * Returns the local date in string format and as a Date object.
 *
 * @returns {{localDateString: String, convertedDate: Date}} An object containing:
 * - `localDateString` {String}: The local date in string format.
 * - `convertedDate` {Date}: The local date as a Date object.
 */
const getConvertedAndLocalDate = (year, month, day) => {
	const currentDate = new DateFactory().getJSDate();
	const localDate = new DateFactory({year, month, day});
	const dateFmt = new DateFmt({length: 'full'});

	const localDay = dateFmt.getDaysOfWeek()[localDate.getDayOfWeek()];
	const localMonth = dateFmt.getMonthsOfYear()[localDate.getMonths()];

	const convertedDate = DateFactory({year, month, day}).getJSDate();
	convertedDate.setHours(currentDate.getHours());
	convertedDate.setMinutes(currentDate.getMinutes());
	convertedDate.setSeconds(currentDate.getSeconds());

	const localDateString = `${localDay} ${localMonth} ${localDate.getDays()} ${localDate.getYears()}`;

	return {convertedDate, localDateString};
};

export {
	createYearList,
	getConvertedAndLocalDate,
	getDaysOfYear,
	getLocalDate,
	getStartDayOfMonth,
	isToday
};
