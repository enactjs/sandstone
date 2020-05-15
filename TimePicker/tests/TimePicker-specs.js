import React from 'react';
import {mount} from 'enzyme';
import ilib from 'ilib';

import TimePicker, {timeToLocaleString} from '../TimePicker';
import css from '../TimePicker.module.less';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('TimePicker', () => {

	// Suite-wide setup

	test('should emit an onChange event when changing a component picker',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<TimePicker onChange={handleChange} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />
			);

			const base = subject.find('DateComponentRangePicker').first();
			base.prop('onChange')({value: 0});

			const expected = 1;
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		}
	);

	test('should accept a JavaScript Date for its value prop', () => {
		const subject = mount(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} locale="en-US" />
		);

		const minutePicker = subject.find(`.${css.minutePicker}`).at(0);

		const expected = 30;
		const actual = minutePicker.prop('value');

		expect(actual).toBe(expected);
	});

	test('should set "hourAriaLabel" to hour picker', () => {
		const label = 'custom hour aria-label';
		const subject = mount(
			<TimePicker hourAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const hourPicker = subject.find(`.${css.hourPicker}`).at(0);

		const expected = label;
		const actual = hourPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "meridiemAriaLabel" to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		const subject = mount(
			<TimePicker meridiemAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const meridiemPicker = subject.find(`.${css.meridiemPicker}`).at(0);

		const expected = label;
		const actual = meridiemPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "minuteAriaLabel" to minute picker', () => {
		const label = 'custom minute aria-label';
		const subject = mount(
			<TimePicker minuteAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const minutePicker = subject.find(`.${css.minutePicker}`).at(0);

		const expected = label;
		const actual = minutePicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to hour picker when voice control is disabled', () => {
		const subject = mount(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);

		const hourPicker = subject.find(`.${css.hourPicker}`).at(0);

		const expected = true;
		const actual = hourPicker.prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to merdiem picker when voice control is disabled', () => {
		const subject = mount(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);

		const meridiemPicker = subject.find(`.${css.meridiemPicker}`).at(0);

		const expected = true;
		const actual = meridiemPicker.prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to minute picker when voice control is disabled', () => {
		const subject = mount(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);

		const minutePicker = subject.find(`.${css.minutePicker}`).at(0);

		const expected = true;
		const actual = minutePicker.prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should format a date the same as the label', () => {
		const time = new Date(2000, 0, 1, 12, 30);
		const subject = mount(
			<TimePicker value={time} locale="en-US" />
		);

		const expected = subject.find('Heading').text();
		const actual = timeToLocaleString(time);

		expect(actual).toBe(expected);
	});

	test('should format a date the same as the label in another locale', () => {
		ilib.setLocale('ar-SA');
		const time = new Date(2000, 0, 1, 12, 30);
		const subject = mount(
			<TimePicker value={time} locale="ar-SA" />
		);

		const expected = subject.find('Heading').text();
		const actual = timeToLocaleString(time);

		expect(actual).toBe(expected);
	});
});
