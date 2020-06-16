import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
import {DateComponentPicker, DateComponentRangePicker} from '../internal/DateComponentPicker';
import DateTime from '../internal/DateTime';

import css from './TimePicker.module.less';

// values to use in hour picker for 24 and 12 hour locales
const hours24 = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
	'12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
];
const hours12 = [
	'12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
	'12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'
];

/**
 * {@link sandstone/TimePicker/TimePickerBase.HourPicker} is a utility component to prevent the
 * animation of the picker when the display text doesn't change for 12-hour locales.
 *
 * @class HourPicker
 * @memberof sandstone/TimePicker/TimePickerBase
 * @ui
 * @private
 */
class HourPicker extends React.Component {
	static propTypes = {
		hasMeridiem: PropTypes.bool,
		value: PropTypes.number
	}

	constructor (props) {
		super(props);

		this.state = {
			noAnimation: false,
			prevValue: props.value
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevValue !== props.value) {
			const hours = props.hasMeridiem ? hours12 : hours24;

			return {
				noAnimation: hours[state.prevValue] === hours[props.value],
				prevValue: props.value
			};
		}

		return null;
	}

	render () {
		const {hasMeridiem, ...rest} = this.props;
		const hours = hasMeridiem ? hours12 : hours24;

		return (
			<DateComponentPicker {...rest} noAnimation={this.state.noAnimation}>
				{hours}
			</DateComponentPicker>
		);
	}
}

/**
* {@link sandstone/TimePicker.TimePickerBase} is the stateless functional time picker
* component. Should not be used directly but may be composed within another component as it is
* within {@link sandstone/TimePicker.TimePicker}.
*
* @class TimePickerBase
* @memberof sandstone/TimePicker
* @ui
* @public
*/
const TimePickerBase = kind({
	name: 'TimePickerBase',

	propTypes: /** @lends sandstone/TimePicker.TimePickerBase.prototype */ {
		/**
		 * The `hour` component of the time.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		hour: PropTypes.number.isRequired,

		/**
		 * The `meridiem` component of the time.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		meridiem: PropTypes.number.isRequired,

		/**
		 * The `minute` component of the time.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		minute: PropTypes.number.isRequired,

		/**
		 * The order in which the component pickers are displayed.
		 *
		 * Should be an array of 2 or 3 strings containing one of `'h'`, `'k'`, `'m'`, and `'a'`.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		order: PropTypes.arrayOf(PropTypes.oneOf(['h', 'k', 'm', 'a'])).isRequired,

		/**
		 * Disables voice control.
		 *
		 * @type {Boolean}
		 * @memberof sandstone/TimePicker.TimePickerBase.prototype
		 * @public
		 */
		'data-webos-voice-disabled': PropTypes.bool,

		/**
		 * Disables the `TimePicker`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The "aria-label" for the hour picker
		 *
		 * If not specified, the "aria-label" for the hour picker will be
		 * a combination of the current value and 'hour change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		hourAriaLabel: PropTypes.string,

		/**
		 * The primary text of `TimePicker`.
		 *
		 * @type {String}
		 * @public
		 */
		label: PropTypes.string,

		/**
		 * The "aria-label" for the meridiem picker.
		 *
		 * @type {String}
		 * @default 'change a value with up down button'
		 * @public
		 */
		meridiemAriaLabel: PropTypes.string,

		/**
		 * The hint string read when focusing the meridiem picker.
		 *
		 * @type {String}
		 * @public
		 */
		meridiemLabel: PropTypes.string,

		/**
		 * Array of meridiem labels to display.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		meridiems: PropTypes.arrayOf(PropTypes.string),

		/**
		 * The "aria-label" for the minute picker.
		 *
		 * If not specified, the "aria-label" for the minute picker will be
		 * a combination of the current value and 'minute change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		minuteAriaLabel: PropTypes.string,

		/**
		 * Called on changes in the `hour` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeHour: PropTypes.func,

		/**
		 * Called on changes in the `meridiem` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMeridiem: PropTypes.func,

		/**
		 * Called on changes in the `minute` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMinute: PropTypes.func,

		/**
		 * Called when the component is removed while retaining focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Called when the focus leaves the picker when the 5-way left key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightLeft: PropTypes.func,

		/**
		 * Called when the focus leaves the picker when the 5-way right key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightRight: PropTypes.func,

		/**
		 * Set content to RTL.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Disables spotlight navigation into the component.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		spotlightDisabled: PropTypes.bool
	},

	defaultProps: {
		disabled: false,
		spotlightDisabled: false
	},

	styles: {
		css,
		className: 'timePicker'
	},

	computed: {
		hasMeridiem: ({order}) => order.indexOf('a') >= 0,
		meridiemPickerWidth: ({meridiem, meridiems}) => meridiems[meridiem].length * 2
	},

	render: ({
		'data-webos-voice-disabled': voiceDisabled,
		disabled,
		hasMeridiem,
		hour,
		hourAriaLabel,
		meridiem,
		meridiemAriaLabel,
		meridiemLabel,
		meridiemPickerWidth,
		meridiems,
		minute,
		minuteAriaLabel,
		onChangeHour,
		onChangeMeridiem,
		onChangeMinute,
		onSpotlightDisappear,
		onSpotlightLeft,
		onSpotlightRight,
		order,
		rtl,
		spotlightDisabled,
		...rest
	}) => {
		const
			hourAccessibilityHint = $L('hour'),
			minuteAccessibilityHint = $L('minute');

		return (
			<DateTime {...rest} css={css}>
				{order.map((picker, index) => {
					// although we create a component array based on the provided
					// order, we ultimately force order in CSS for RTL
					const isFirst = index === 0;
					const isLast = index === order.length - 1;
					// meridiem will always be the left-most control in RTL, regardless of the provided order
					const isLeft = rtl && picker === 'a' || isFirst && !rtl;
					// minute will always be the right-most control in RTL, regardless of the provided order
					const isRight = rtl && picker === 'm' || isLast && !rtl;

					switch (picker) {
						case 'h':
						case 'k':
							return (
								<React.Fragment key="hour-picker">
									<HourPicker
										accessibilityHint={hourAccessibilityHint}
										aria-label={hourAriaLabel}
										className={css.hourPicker}
										disabled={disabled}
										data-webos-voice-disabled={voiceDisabled}
										data-webos-voice-group-label={hourAccessibilityHint}
										hasMeridiem={hasMeridiem}
										onChange={onChangeHour}
										onSpotlightDisappear={onSpotlightDisappear}
										onSpotlightLeft={isLeft ? onSpotlightLeft : null}
										onSpotlightRight={isRight ? onSpotlightRight : null}
										spotlightDisabled={spotlightDisabled}
										value={hour}
										width={4}
										wrap
									/>
									<span className={css.timeSeparator}>:</span>
								</React.Fragment>
							);
						case 'm':
							return (
								<DateComponentRangePicker
									accessibilityHint={minuteAccessibilityHint}
									aria-label={minuteAriaLabel}
									className={css.minutePicker}
									disabled={disabled}
									data-webos-voice-disabled={voiceDisabled}
									data-webos-voice-group-label={minuteAccessibilityHint}
									key="minute-picker"
									max={59}
									min={0}
									onChange={onChangeMinute}
									onSpotlightDisappear={onSpotlightDisappear}
									onSpotlightLeft={isLeft ? onSpotlightLeft : null}
									onSpotlightRight={isRight ? onSpotlightRight : null}
									padded
									spotlightDisabled={spotlightDisabled}
									value={minute}
									width={4}
									wrap
								/>
							);
						case 'a':
							return (
								<DateComponentPicker
									aria-label={meridiemAriaLabel}
									aria-valuetext={meridiems ? meridiems[meridiem] : null}
									className={css.meridiemPicker}
									disabled={disabled}
									data-webos-voice-disabled={voiceDisabled}
									data-webos-voice-group-label={meridiemLabel}
									key="meridiem-picker"
									onChange={onChangeMeridiem}
									onSpotlightDisappear={onSpotlightDisappear}
									onSpotlightLeft={isLeft ? onSpotlightLeft : null}
									onSpotlightRight={isRight ? onSpotlightRight : null}
									reverse
									spotlightDisabled={spotlightDisabled}
									value={meridiem}
									width={meridiemPickerWidth}
									wrap
								>
									{meridiems}
								</DateComponentPicker>
							);
					}

					return null;
				})}
			</DateTime>
		);
	}
});

export default TimePickerBase;
export {TimePickerBase};
