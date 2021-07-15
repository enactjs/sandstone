import ilib from 'ilib';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker, {dateToLocaleString} from '../DatePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('DatePicker', () => {
	test('should emit an onChange event when changing a component picker', () => {
		const handleChange = jest.fn();
		const {getAllByText} = render(
			<DatePicker onChange={handleChange} value={new Date(2000, 6, 15)} locale="en-US" />
		);

		const expected = 1;
		const monthPickerUp = getAllByText('▲')[0];
		userEvent.click(monthPickerUp);

		expect(handleChange).toBeCalledTimes(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		const {getByText} = render(
			<DatePicker value={new Date(2000, 0, 1)} locale="en-US" />
		);

		const year = getByText('2000');
		const expected = 'item';
		const actual = year.className;

		expect(year).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "dayAriaLabel" to day picker', () => {
		const label = 'custom day aria-label';
		const {getByLabelText} = render(
			<DatePicker dayAriaLabel={label} value={new Date(2000, 0, 1)} />
		);

		const dayPicker = getByLabelText(label);
		const expected = 'day';
		const actual = dayPicker.className;

		expect(dayPicker).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month aria-label';
		const {getByLabelText} = render(
			<DatePicker monthAriaLabel={label} value={new Date(2000, 0, 1)} />
		);

		const monthPicker = getByLabelText(label);
		const expected = 'month';
		const actual = monthPicker.className;

		expect(monthPicker).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year aria-label';
		const {getByLabelText} = render(
			<DatePicker value={new Date(2000, 0, 1)} yearAriaLabel={label} />
		);

		const yearPicker = getByLabelText(label);
		const expected = 'year';
		const actual = yearPicker.className;

		expect(yearPicker).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "data-webos-voice-disabled" to day picker when voice control is disabled', () => {
		const {getByLabelText} = render(
			<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />
		);

		const dayPicker = getByLabelText('1 day change a value with up down button');
		const expected = 'data-webos-voice-disabled';

		expect(dayPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to month picker when voice control is disabled', () => {
		const {getByLabelText} = render(
			<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />
		);

		const monthPicker = getByLabelText('1 month change a value with up down button');
		const expected = 'data-webos-voice-disabled';

		expect(monthPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to year picker when voice control is disabled', () => {
		const {getByLabelText} = render(
			<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />
		);

		const yearPicker = getByLabelText('1900 year change a value with up down button');
		// The year is 1900 because it does not change based on props, this needs to be fixed in datePicker
		const expected = 'data-webos-voice-disabled';

		expect(yearPicker).toHaveAttribute(expected);
	});

	test('should format a date the same as the label', () => {
		const date = new Date(2000, 0, 1);
		const {getByTestId} = render(
			<DatePicker data-testid="datePicker" value={date} locale="en-US" />
		);

		const Header = getByTestId('datePicker').children.item(0);
		const expected = dateToLocaleString(date);
		const actual = Header.textContent;

		expect(actual).toBe(expected);
	});

	test('should format a date the same as the label in another locale', () => {
		ilib.setLocale('ar-SA');
		const date = new Date(2000, 0, 1);
		const {getByTestId} = render(
			<DatePicker data-testid="datePicker" value={date} locale="ar-SA" />
		);

		const Header = getByTestId('datePicker').children.item(0);
		const expected = dateToLocaleString(date);
		const actual = Header.textContent;

		expect(actual).toBe(expected);
	});
});
