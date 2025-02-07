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

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useMemo, useState} from 'react';

import BodyText from '../BodyText';
import Button, {ButtonBase} from '../Button';
import Dropdown from '../Dropdown';
import Skinnable from '../Skinnable';

import {CalendarSelectorDecorator} from './CalendarSelectorDecorator';
import {
	getConvertedAndLocalDate,
	getDaysOfYear,
	getStartDayOfMonth,
	isToday
} from './utils';

import componentCss from './Calendar.module.less';

const SpottableButton = Spottable(ButtonBase);

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
const CalendarBase = ({abbreviatedDayNames, css, disabled = false, firstDayOfWeek, monthsOfYear, selectedDate, setSelectedDate, years}) => {
	const [today, setToday] = useState(selectedDate);
	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getFullYear());

	const days = useMemo(() => getDaysOfYear(year), [year]);
	const startDay = getStartDayOfMonth(firstDayOfWeek, month, year);
	const yearIndex = years.findIndex((value) => new RegExp(`${year}`).test(value));

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
		if (disabled) return;

		const day = event.target.textContent ? event.target.textContent : event.target.parentElement.textContent;
		const newDate = new Date(year, month, day);
		const {convertedDate, localDateString} = getConvertedAndLocalDate(year, month + 1, day);
		if (setSelectedDate) setSelectedDate({localDate: localDateString, selectedDate: convertedDate});
		setToday(newDate);
	}, [disabled, month, setSelectedDate, year]);

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
						{monthsOfYear}
					</Dropdown>
					<Dropdown
						disabled={disabled}
						onClose={handleYear}
						selected={yearIndex}
						style={{margin: 0}}
						width="tiny"
					>
						{years}
					</Dropdown>
				</Cell>
				<Cell shrink>
					<Button
						disabled={disabled || (year === parseInt(years[0]) && month === 0)}
						onClick={handleArrowDecrement}
						icon="arrowsmallleft"
						iconOnly
						size="small"
					/>
					<Button
						disabled={disabled || (year === parseInt(years[years.length - 1]) && month === 11)}
						onClick={handleArrowIncrement}
						icon="arrowsmallright"
						iconOnly
						size="small"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell className={componentCss.body}>
					{abbreviatedDayNames.map((d) => (
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
									{d > 0 ?
										<SpottableButton
											className={classNames(componentCss.dayNumber, isToday(today, d, month, year) ? componentCss.isToday : '')}
											css={css}
											disabled={disabled}
											onClick={handleDaySelect}
										>
											{d}
										</SpottableButton> :
										<></>
									}
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
	 * List of days names of the week, in short format, for the current locale.
	 *
	 * @type {Array}
	 * @private
	 */
	abbreviatedDayNames: PropTypes.array,

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
	 * First day the week, for the current locale.
	 *
	 * @type {Array}
	 * @private
	 */
	firstDayOfWeek:	PropTypes.number,

	/**
	 * List of month names of the year, for the current locale.
	 *
	 * @type {Array}
	 * @private
	 */
	monthsOfYear: PropTypes.array,

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
	setSelectedDate: PropTypes.func,

	/**
	 * List of years for the current locale.
	 *
	 * @type {Array}
	 * @private
	 */
	years: PropTypes.array
};

/**
 * Applies Sandstone specific behaviors to {@link sandstone/Calendar.CalendarBase|Calendar} components.
 *
 * @hoc
 * @memberof sandstone/Calendar
 * @mixes sandstone/Skinnable.Skinnable
 * @private
 */
const CalendarDecorator = compose(
	I18nContextDecorator({localeProp: 'locale'}),
	CalendarSelectorDecorator,
	Skinnable
);

/**
 * A calendar component, ready to use in Sandstone applications.
 *
 * @class Calendar
 * @memberof sandstone/Calendar
 * @extends sandstone/Calendar.CalendarBase
 * @ui
 * @private
 */
const Calendar = CalendarDecorator(CalendarBase);

export default Calendar;
export {
	Calendar,
	CalendarBase
};
