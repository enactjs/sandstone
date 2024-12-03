/**
 * Exports the {@link sandstone/internal/DateTimeDecorator.DateTimeDecorator} higher-order component
 *
 * @module sandstone/internal/DateTimeDecorator
 * @private
 */

import handle, {call, forKey, forProp, forward, forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {memoize} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight from '@enact/spotlight';
import Changeable from '@enact/ui/Changeable';
import DateFactory from 'ilib/lib/DateFactory';
import PropTypes from 'prop-types';
import {Component, useEffect, useState} from 'react';

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

	// const Decorator = class extends Component {
	// 	static displayName = 'DateTimeDecorator';
	//
	// 	static propTypes = /** @lends sandstone/internal/DateTimeDecorator.DateTimeDecorator.prototype */ {
	// 		/**
	// 		 * The current locale as a
	// 		 * {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag}.
	// 		 *
	// 		 * @type {String}
	// 		 * @public
	// 		 */
	// 		locale: PropTypes.string,
	//
	// 		/**
	// 		 * Handler for `onChange` events
	// 		 *
	// 		 * @type {Function}
	// 		 * @public
	// 		 */
	// 		onChange: PropTypes.func,
	//
	// 		/**
	// 		 * Handler for `onComplete` event
	// 		 *
	// 		 * @type {Function}
	// 		 * @public
	// 		 */
	// 		onComplete: PropTypes.func,
	//
	// 		/**
	// 		 * When `true`, the date picker is expanded to select a new date.
	// 		 *
	// 		 * @type {Boolean}
	// 		 * @public
	// 		 */
	// 		open: PropTypes.bool,
	//
	// 		/**
	// 		 * Indicates the content's text direction is right-to-left.
	// 		 *
	// 		 * @type {Boolean}
	// 		 * @private
	// 		 */
	// 		rtl: PropTypes.bool,
	//
	// 		/**
	// 		 * The selected date
	// 		 *
	// 		 * @type {Date}
	// 		 * @public
	// 		 */
	// 		value: PropTypes.instanceOf(Date)
	// 	};
	//
	// 	constructor (props) {
	// 		super(props);
	//
	// 		this.state = {
	// 			initialValue: null,
	// 			value: null
	// 		};
	//
	// 		const newValue = toTime(this.props.value);
	// 		const value = newValue || Date.now();
	//
	// 		// if no value was provided, we need to emit the onChange event for the generated value
	// 		if (!newValue) {
	// 			this.emitChange(this.toIDate(value));
	// 		}
	//
	// 		this.handlers = {};
	// 		if (handlers) {
	// 			Object.keys(handlers).forEach(name => {
	// 				this.handlers[name] = this.handlePickerChange.bind(this, handlers[name]);
	// 			});
	// 		}
	// 	}
	//
	// 	static getDerivedStateFromProps (props, state) {
	// 		let value = toTime(props.value);
	//
	// 		if (props.open && !props.disabled && state.initialValue == null && state.value == null) {
	// 			// when the expandable opens, we cache the prop value so it can be restored on
	// 			// cancel and set value to be the current time if unset in order to initialize the
	// 			// pickers
	// 			return {
	// 				initialValue: value,
	// 				value: value || Date.now()
	// 			};
	// 		} else if (state.value !== value) {
	// 			// always respect a value change from props
	// 			return {
	// 				value
	// 			};
	// 		}
	//
	// 		return null;
	// 	}
	//
	// 	/**
	// 	 * Converts a Date to an IDate
	// 	 *
	// 	 * @param	{Date}	time	Date object
	// 	 *
	// 	 * @returns	{IDate}			ilib Date object
	// 	 */
	// 	toIDate (time) {
	// 		if (time && this.props.locale) {
	// 			return DateFactory({
	// 				unixtime: time,
	// 				timezone: 'local'
	// 			});
	// 		}
	// 	}
	//
	// 	/**
	// 	 * Updates the internal value in state
	// 	 *
	// 	 * @param	{IDate}		value	ilib Date object
	// 	 *
	// 	 * @returns {Number}			Updated internal value
	// 	 */
	// 	updateValue = (value) => {
	// 		const {day, month, year} = value;
	// 		const maxDays = value.cal.getMonLength(month, year);
	// 		value.day = (day <= maxDays) ? day : maxDays;
	//
	// 		const date = DateFactory(value);
	// 		const newValue = date.getTimeExtended();
	// 		const changed =	this.props.value == null || this.props.value !== newValue;
	//
	// 		this.setState({
	// 			value: newValue
	// 		});
	//
	// 		if (changed) {
	// 			this.emitChange(date);
	// 		}
	//
	// 		return newValue;
	// 	};
	//
	// 	emitChange = (date) => {
	// 		forwardCustom('onChange', () => ({value: date ? date.getJSDate() : null}))(null, this.props);
	// 	};
	//
	// 	handlePickerChange = (handler, ev) => {
	// 		const value = this.toIDate(this.state.value);
	// 		handler(ev, value, memoizedI18nConfig(this.props.locale));
	// 		this.updateValue(value);
	// 	};
	//
	// 	handleCancel = () => {
	// 		const {initialValue, value} = this.state;
	//
	// 		// if we're cancelling, reset our state and emit an onChange with the initial value
	// 		this.setState({
	// 			value: null,
	// 			initialValue: null,
	// 			pickerValue: value
	// 		});
	//
	// 		if (initialValue !== value) {
	// 			this.emitChange(this.toIDate(initialValue));
	// 		}
	// 	};
	//
	// 	handleEnter = (ev) => {
	// 		if (ev.target && ev.target.dataset.lastElement === 'true') {
	// 			const value = this.state.value ? this.toIDate(this.state.value) : null;
	//
	// 			forwardCustom('onComplete', () => ({value: value ? value.getJSDate() : null}))(null, this.props);
	// 		} else {
	// 			Spotlight.move(this.props.rtl ? 'left' : 'right');
	// 		}
	// 	};
	//
	// 	handleKeyDown = handle(
	// 		forward('onKeyDown'),
	// 		forKey('enter'),
	// 		forProp('disabled', false),
	// 		call('handleEnter')
	// 	).bindAs(this, 'handleKeyDown');
	//
	// 	render () {
	// 		const value = this.toIDate(this.state.value);
	// 		// pickerValue is only set when cancelling to prevent the unexpected changing of the
	// 		// picker values before closing.
	// 		const pickerValue = this.state.pickerValue ? this.toIDate(this.state.pickerValue) : value;
	//
	// 		let label = null;
	// 		let props = null;
	// 		let order = defaultOrder;
	//
	// 		const i18nConfig = memoizedI18nConfig(this.props.locale);
	// 		if (i18nConfig) {
	// 			if (value) {
	// 				label = i18nConfig.formatter.format(value);
	// 			}
	// 			props = customProps(i18nConfig, pickerValue, this.props);
	// 			order = i18nConfig.order;
	// 		}
	//
	// 		const rest = Object.assign({}, this.props);
	// 		delete rest.onComplete;
	//
	// 		return (
	// 			<Wrapped
	// 				{...rest}
	// 				{...props}
	// 				{...this.handlers}
	// 				label={label}
	// 				onKeyDown={this.handleKeyDown}
	// 				order={order}
	// 				value={value}
	// 			/>
	// 		);
	// 	}
	// };

	const Decorator = (props) => {
		const newValue = toTime(props.value);

		const [initialValue, setInitialValue] = useState(null);
		const [value, setValue] = useState(newValue || Date.now());
		const [pickerValue, setPickerValue] = useState(null);

		const emitChange = (date) => {
			forwardCustom('onChange', () => ({value: date ? date.getJSDate() : null}))(null, props);
		};


		/**
		 * Converts a Date to an IDate
		 *
		 * @param	{Date}	time	Date object
		 *
		 * @returns	{IDate}			ilib Date object
		 */
		const toIDate = (time) => {
			if (time && props.locale) {
				return DateFactory({
					unixtime: time,
					timezone: 'local'
				});
			}
		}

		// if no value was provided, we need to emit the onChange event for the generated value
		if (!newValue) {
			emitChange(toIDate(value));
		}

		const handlePickerChange = (handler, ev) => {
			const newValue = toIDate(value);
			handler(ev, newValue, memoizedI18nConfig(props.locale));
			updateValue(newValue);
		};

		const localHandlers = {};
		if (handlers) {
			Object.keys(handlers).forEach(name => {
				localHandlers[name] = handlePickerChange.bind(this, handlers[name]);
			});
		}

		useEffect(() => {
			let newValue = toTime(props.value);

			if (props.open && !props.disabled && initialValue == null && value == null) {
				// when the expandable opens, we cache the prop value so it can be restored on
				// cancel and set value to be the current time if unset in order to initialize the
				// pickers
				setInitialValue(newValue);
				setValue(newValue || Date.now());
			} else if (value !== newValue) {
				// always respect a value change from props
				setValue(newValue);
			}
		}, [props]);

		/**
		 * Updates the internal value in state
		 *
		 * @param	{IDate}		value	ilib Date object
		 *
		 * @returns {Number}			Updated internal value
		 */
		const updateValue = (value) => {
			const {day, month, year} = value;
			const maxDays = value.cal.getMonLength(month, year);
			value.day = (day <= maxDays) ? day : maxDays;

			const date = DateFactory(value);
			const newValue = date.getTimeExtended();
			const changed =	props.value == null || props.value !== newValue;

			setValue(newValue);

			if (changed) {
				emitChange(date);
			}

			return newValue;
		};


		const handleCancel = () => {
			// if we're cancelling, reset our state and emit an onChange with the initial value
				setValue(null);
				setInitialValue(null);
				setPickerValue(value);

			if (initialValue !== value) {
				emitChange(toIDate(initialValue));
			}
		};

		const handleEnter = (ev) => {
			if (ev.target && ev.target.dataset.lastElement === 'true') {
				const newValue = value ? toIDate(value) : null;

				forwardCustom('onComplete', () => ({value: newValue ? newValue.getJSDate() : null}))(null, props);
			} else {
				Spotlight.move(props.rtl ? 'left' : 'right');
			}
		};

		const handleKeyDown = (ev) => {
			forward('onKeyDown');
			forKey('enter');
			forProp('disabled', false);
			handleEnter(ev);
		};

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
