import React from 'react';
import {mount} from 'enzyme';
import DatePicker from '../DatePicker';
import css from '../DatePicker.module.less';

describe('DatePicker', () => {

	test(
		'should emit an onChange event when changing a component picker',
		() => {
			const handleChange = jest.fn();
			const subject = mount(
				<DatePicker onChange={handleChange} open title="Date" value={new Date(2000, 6, 15)} locale="en-US" />
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
			<DatePicker open title="Date" value={new Date(2000, 0, 1)} locale="en-US" />
		);

		const yearPicker = subject.find(`DateComponentRangePicker.${css.year}`);

		const expected = 2000;
		const actual = yearPicker.prop('value');

		expect(actual).toBe(expected);
	});

	test('should set "dayAriaLabel" to day picker', () => {
		const label = 'custom day aria-label';
		const subject = mount(
			<DatePicker dayAriaLabel={label} open title="Date" value={new Date(2000, 0, 1)} />
		);

		const dayPicker = subject.find(`DateComponentRangePicker.${css.day}`);

		const expected = label;
		const actual = dayPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month aria-label';
		const subject = mount(
			<DatePicker monthAriaLabel={label} open title="Date" value={new Date(2000, 0, 1)} />
		);

		const monthPicker = subject.find(`DateComponentRangePicker.${css.month}`);

		const expected = label;
		const actual = monthPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year aria-label';
		const subject = mount(
			<DatePicker title="Date" value={new Date(2000, 0, 1)} yearAriaLabel={label} />
		);

		const yearPicker = subject.find(`DateComponentRangePicker.${css.year}`);

		const expected = label;
		const actual = yearPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month label';
		const subject = mount(
			<DatePicker monthAriaLabel={label} open title="Date" value={new Date(2000, 0, 1)} />
		);

		const monthPicker = subject.find(`DateComponentRangePicker.${css.month}`);

		const expected = label;
		const actual = monthPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year label';
		const subject = mount(
			<DatePicker title="Date" value={new Date(2000, 0, 1)} yearAriaLabel={label} />
		);

		const yearPicker = subject.find(`DateComponentRangePicker.${css.year}`);

		const expected = label;
		const actual = yearPicker.prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to day picker when voice control is disabled', () => {
		const subject = mount(
			<DatePicker title="Date" value={new Date(2000, 0, 1)} data-webos-voice-disabled />
		);

		const dayPicker = subject.find(`DateComponentRangePicker.${css.day}`);

		const expected = true;
		const actual = dayPicker.prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to month picker when voice control is disabled', () => {
		const subject = mount(
			<DatePicker title="Date" value={new Date(2000, 0, 1)} data-webos-voice-disabled />
		);

		const monthPicker = subject.find(`DateComponentRangePicker.${css.month}`);

		const expected = true;
		const actual = monthPicker.prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	test('should set "data-webos-voice-disabled" to year picker when voice control is disabled', () => {
		const subject = mount(
			<DatePicker title="Date" value={new Date(2000, 0, 1)} data-webos-voice-disabled />
		);

		const yearPicker = subject.find(`DateComponentRangePicker.${css.year}`);

		const expected = true;
		const actual = yearPicker.prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});
});
