/**
 * Sandstone styled calendar component and behavior.
 *
 * @example
 * <Calendar />
 *
 * @module sandstone/Calendar
 * @exports Calendar
 * @private
 */

import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import BodyText from '../BodyText';
import Button, {ButtonBase} from '../Button';
import Dropdown from '../Dropdown';
import Skinnable from '../Skinnable';

import {createYearList, getStartDayOfMonth, isLeapYear, isToday} from './utils';

import componentCss from './Calendar.module.less';

const SpottableButton = Spottable(ButtonBase);

const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
const YEARS = createYearList();
const defaultDate = new Date();

/**
 * The calendar base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/Calendar|Calendar}.
 *
 * @class CalendarBase
 * @memberof sandstone/Calendar
 * @ui
 * @private
 */
const CalendarBase = ({css, disabled = false, selectedDate = defaultDate, setSelectedDate}) => {
	const [today, setToday] = useState(selectedDate);
	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getFullYear());

	const days = isLeapYear(year) ? DAYS_LEAP : DAYS;
	const startDay = getStartDayOfMonth(month, year);
	const yearIndex = YEARS.indexOf(year.toString());

	useEffect(() => {
		setToday(selectedDate);
		setMonth(selectedDate.getMonth());
		setYear(selectedDate.getFullYear());
	}, [selectedDate]);

	const handleArrowDecrement = useCallback(() => {
		setMonth((mth) => {
			if (mth !== 0) return mth - 1;
			setYear((yr) => yr - 1);
			return 11;
		});
	}, []);

	const handleArrowIncrement = useCallback(() => {
		setMonth((mth) => {
			if (mth !== 11) return mth + 1;
			setYear((yr) => yr + 1);
			return 0;
		});
	}, []);

	const handleDaySelect = useCallback((event) => {
		const day = event.target.textContent ? event.target.textContent : event.target.parentElement.textContent;
		const newDate = new Date(year, month, day);
		if (setSelectedDate) setSelectedDate(newDate);
		setToday(newDate);
	}, [month, setSelectedDate, year]);

	const handleMonth = useCallback((event) => event.selected && setMonth(event.selected), []);

	const handleYear = useCallback((event) => event.data && setYear(parseInt(event.data)), []);

	return (
		<div className={componentCss.calendar}>
			<Row className={componentCss.header}>
				<Cell shrink>
					<Dropdown
						disabled={disabled}
						onClose={handleMonth}
						selected={month}
						style={{margin: 0}}
						width="small"
					>
						{MONTHS}
					</Dropdown>
					<Dropdown
						disabled={disabled}
						onClose={handleYear}
						selected={yearIndex}
						style={{margin: 0}}
						width="tiny"
					>
						{YEARS}
					</Dropdown>
				</Cell>
				<Cell shrink>
					<Button
						disabled={disabled || (year === parseInt(YEARS[0]) && month === 0)}
						onClick={handleArrowDecrement}
						icon="arrowsmallleft"
						iconOnly
						size="small"
					/>
					<Button
						disabled={disabled || (year === parseInt(YEARS[YEARS.length - 1]) && month === 11)}
						onClick={handleArrowIncrement}
						icon="arrowsmallright"
						iconOnly
						size="small"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell className={componentCss.body}>
					{DAYS_OF_THE_WEEK.map((d) => (
						<BodyText className={componentCss.dayName} css={css} key={d}>
							{d}
						</BodyText>
					))}
					{Array(days[month] + (startDay - 1))
						.fill(null)
						.map((_, index) => {
							const d = index - (startDay - 2);
							return (
								<div
									className={componentCss.day}
									key={index}
								>
									<SpottableButton
										className={componentCss.dayNumber}
										css={css}
										onClick={!disabled && handleDaySelect}
										style={{border: isToday(today, d, month, year) ? `1px solid white` : '', color: disabled && '#4c5059'}}
									>
										{d > 0 ? d : ''}
									</SpottableButton>
								</div>
							);
						})}
				</Cell>
			</Row>
		</div>
	);
};

CalendarBase.displayName = 'Calendar';

CalendarBase.propTypes = {/** @lends sandstone/Calendar.CalendarBase.prototype */
	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * `calendar` - The root class name
	 *
	 * @type {Object}
	 * @private
	 */
	css: PropTypes.object,

	/**
	 * Applies the `disabled` class.
	 *
	 * When `true`, the calendar is shown as disabled.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	disabled: PropTypes.bool,

	/**
	 * The selected day inside the Calendar.
	 *
	 * @type {Date}
	 * @private
	 */
	selectedDate: PropTypes.instanceOf(Date),

	/**
	 * Setter function for the `selectedDate` prop.
	 *
	 * @type {Function}
	 * @private
	 */
	setSelectedDate: PropTypes.func
};

/**
 * A calendar component, ready to use in Sandstone applications.
 *
 * @class Calendar
 * @memberof sandstone/Calendar
 * @extends sandstone/Calendar.CalendarBase
 * @ui
 * @private
 */
const Calendar = Skinnable(CalendarBase);

export default Calendar;
export {
	Calendar,
	CalendarBase
};
