/**
 * Exports the {@link sandstone/internal/DateTimeDecorator.DateTimeDecorator} higher-order component
 *
 * @module sandstone/internal/DateTimeDecorator
 * @private
 */

import {forKey, forProp, forward, forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {is} from '@enact/core/keymap';
import {memoize} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight from '@enact/spotlight';
import Changeable from '@enact/ui/Changeable';
import DateFactory from 'ilib/lib/DateFactory';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

/*
 * Converts a JavaScript Date to unix time
 *
 * @param	{Date}	date	A Date to convert
 *
 * @returns	{undefined}
 */
const toTime = (date) => {
	return date && date.getTime();
};

const isEnter = is('enter');

/**
 * {@link sandstone/internal/DateTimeDecorator.DateTimeDecorator} provides common behavior for
 * {@link sandstone/DatePicker.DatePicker} and {@link sandstone/TimePicker.TimePicker}.
 *
 * @class DateTimeDecorator
 * @memberof sandstone/internal/DateTimeDecorator
 * @mixes ui/Changeable.Changeable
 * @hoc
 * @private
 */
const DateTimeDecorator = hoc((config, Wrapped) => {
	const {customProps, defaultOrder, handlers, i18n} = config;

	const memoizedI18nConfig = memoize((/* locale */) => {
		// Guard for isomorphic builds
		if (typeof window !== 'undefined' && i18n) {
			return i18n();
		}
		return null;
	});

	const Decorator = (props) => {
		const newValue = toTime(props.value);
		const [initialValue, setInitialValue] = useState(null);
		const [value, setValue] = useState(newValue || Date.now());
		const [pickerValue, setPickerValue] = useState(null);

		const emitChange = (date) => {
			forwardCustom('onChange', () => ({value: date ? date.getJSDate() : null}))(null, props);
		};

		/*
		 * Converts a Date to an IDate
		 *
		 * @param	{Date}	time	Date object
		 *
		 * @returns	{IDate}			ilib Date object
		 */
		const toIDate = useCallback((time) => {
			if (time && props.locale) {
				return DateFactory({
					unixtime: time,
					timezone: 'local'
				});
			}
		}, [props.locale]);

		// if no value was provided, we need to emit the onChange event for the generated value
		useEffect(() => {
			if (!newValue) {
				emitChange(toIDate(value));
			}
		}, []); // eslint-disable-line react-hooks/exhaustive-deps

		/*
		 * Updates the internal value in state
		 *
		 * @param	{IDate}		updatedValue	ilib Date object
		 *
		 * @returns {Number}			Updated internal value
		 */
		const updateValue = (updatedValue) => {
			const {day, month, year} = updatedValue;
			const maxDays = updatedValue.cal.getMonLength(month, year);
			updatedValue.day = (day <= maxDays) ? day : maxDays;

			const date = DateFactory(updatedValue);
			const newUpdateValue = date.getTimeExtended();
			const changed = props.value == null || props.value !== newUpdateValue;

			setValue(newUpdateValue);

			if (changed) {
				emitChange(date);
			}

			return newUpdateValue;
		};

		const handlePickerChange = (handler, ev) => {
			const changedValue = toIDate(value);
			handler(ev, changedValue, memoizedI18nConfig(props.locale));
			updateValue(changedValue);
		};

		const localHandlers = {};
		if (handlers) {
			Object.keys(handlers).forEach(name => {
				localHandlers[name] = handlePickerChange.bind(this, handlers[name]);
			});
		}

		useEffect(() => {
			let newestValue = toTime(props.value);

			if (props.open && !props.disabled && initialValue == null && value == null) {
				// when the expandable opens, we cache the prop value so it can be restored on
				// cancel and set value to be the current time if unset in order to initialize the
				// pickers
				setInitialValue(newestValue);
				setValue(newestValue || Date.now());
			} else if (value !== newestValue) {
				// always respect a value change from props
				setValue(newestValue);
			}
		}, [initialValue, props, value]);

		const handleCancel = () => { // eslint-disable-line no-unused-vars
			// if we're cancelling, reset our state and emit an onChange with the initial value
			setValue(null);
			setInitialValue(null);
			setPickerValue(value);

			if (initialValue !== value) {
				emitChange(toIDate(initialValue));
			}
		};

		const handleEnter = useCallback((ev) => {
			if (ev.target && ev.target.dataset.lastElement === 'true') {
				const newestValue = value ? toIDate(value) : null;

				forwardCustom('onComplete', () => ({value: newestValue ? newestValue.getJSDate() : null}))(null, props);
			} else {
				Spotlight.move(props.rtl ? 'left' : 'right');
			}
		}, [props, toIDate, value]);

		const handleKeyDown = useCallback((ev) => {
			forward('onKeyDown');
			forKey('enter');
			forProp('disabled', false);
			if (isEnter(ev.keyCode)) handleEnter(ev);
		}, [handleEnter]);

		const finalValue = toIDate(value);
		// pickerValue is only set when cancelling to prevent the unexpected changing of the
		// picker values before closing.
		const finalPickerValue = pickerValue ? toIDate(pickerValue) : finalValue;

		let label = null;
		let finalProps = null;
		let order = defaultOrder;

		const i18nConfig = memoizedI18nConfig(props.locale);
		if (i18nConfig) {
			if (finalValue) {
				label = i18nConfig.formatter.format(finalValue);
			}
			finalProps = customProps(i18nConfig, finalPickerValue, props);
			order = i18nConfig.order;
		}

		const rest = Object.assign({}, props);
		delete rest.onComplete;

		return (
			<Wrapped
				{...rest}
				{...finalProps}
				{...localHandlers}
				label={label}
				onKeyDown={handleKeyDown}
				order={order}
				value={finalValue}
			/>
		);
	};

	Decorator.displayName = 'DateTimeDecorator';

	Decorator.propTypes = /** @lends sandstone/internal/DateTimeDecorator.DateTimeDecorator.prototype */ {
		/**
		 * The current locale as a
		 * {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag}.
		 *
		 * @type {String}
		 * @public
		 */
		locale: PropTypes.string,

		/**
		 * Handler for `onChange` events
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Handler for `onComplete` event
		 *
		 * @type {Function}
		 * @public
		 */
		onComplete: PropTypes.func,

		/**
		 * When `true`, the date picker is expanded to select a new date.
		 *
		 * @type {Boolean}
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The selected date
		 *
		 * @type {Date}
		 * @public
		 */
		value: PropTypes.instanceOf(Date)
	};

	return I18nContextDecorator(
		{rtlProp: 'rtl', localeProp: 'locale'},
		Changeable(
			Decorator
		)
	);
});

export default DateTimeDecorator;
export {DateTimeDecorator};
