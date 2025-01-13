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

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import BodyText from '../BodyText';
import Button, {ButtonBase} from '../Button';
import Dropdown from '../Dropdown';
import Skinnable from '../Skinnable';

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

const CalendarBase = kind({
	name: 'Calendar',

	functional: true,

	propTypes: /** @lends sandstone/Calendar.CalendarBase.prototype */ {
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
		 * The `day` component of the Date.
		 *
		 * @type {Number}
		 * @rivate
		 */
		day: PropTypes.number,

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
		 * The `month` component of the Date.
		 *
		 * @type {String}
		 * @private
		 */
		month: PropTypes.string,

		/**
		 * The `year` component of the Date.
		 *
		 * @type {Number}
		 * @private
		 */
		year: PropTypes.number
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	render: ({css, disabled = false}) => {
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
		const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'];
		const today = new Date();

		const month = today.getMonth();
		const year = today.getFullYear();
		const yearIndex = YEARS.indexOf(year.toString());

		const getStartDayOfMonth = () => {
			const startDate = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
			return startDate === 0 ? 7 : startDate;
		};

		const startDay = getStartDayOfMonth(today);

		const isLeapYear = () => {
			return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		};

		const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

		return (
			<div className={css.calendar}>
				<Row className={css.header}>
					<Cell shrink>
						<Dropdown disabled={disabled} selected={month} style={{margin: 0}} width="small">{MONTHS}</Dropdown>
						<Dropdown disabled={disabled} selected={yearIndex} style={{margin: 0}} width="tiny">{YEARS}</Dropdown>
					</Cell>
					<Cell shrink>
						<Button disabled={disabled} icon="arrowsmallleft" iconOnly size="small" />
						<Button disabled={disabled} icon="arrowsmallright" iconOnly size="small" />
					</Cell>
				</Row>
				<Row>
					<Cell className={css.body}>
						{DAYS_OF_THE_WEEK.map((d) => (
							<BodyText className={css.day} css={css} key={d}>
								{d}
							</BodyText>
						))}
						{Array(days[month] + (startDay - 1))
							.fill(null)
							.map((_, index) => {
								const d = index - (startDay - 2);
								return (
									<div
										className={css.day}
										key={index}
									>
										<SpottableButton
											css={css}
											disabled={disabled}
											style={{border: d === today.getDate() ? `1px solid white` : ''}}
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
	}
});

/**
 * Applies Sandstone specific behaviors to {@link sandstone/Calendar.CalendarBase|Calendar} components.
 *
 * @hoc
 * @memberof sandstone/Calendar
 * @mixes sandstone/Skinnable.Skinnable
 * @private
 */
const CalendarDecorator = compose(
	Skinnable
);

/**
 * A calendar component, ready to use in Sandstone applications.
 *
 * @class Calendar
 * @memberof sandstone/Calendar
 * @extends sandstone/Calendar.CalendarBase
 * @mixes sandstone/Calendar.CalendarDecorator
 * @ui
 * @private
 */
const Calendar = CalendarDecorator(CalendarBase);

export default Calendar;
export {
	Calendar,
	CalendarBase,
	CalendarDecorator
};
