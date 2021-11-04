import ilib from 'ilib';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker, {dateToLocaleString} from '../DatePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.
describe('DatePicker', () => {
	test('should emit an onChange event when changing a component picker', () => {
		const handleChange = jest.fn();
		render(<DatePicker onChange={handleChange} value={new Date(2000, 6, 15)} locale="en-US" />);
		const monthPickerUp = screen.getAllByText('▲')[0];

		userEvent.click(monthPickerUp);

		const expected = 1;

		expect(handleChange).toBeCalledTimes(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} locale="en-US" />);
		const year = screen.getByText('2000');

		expect(year).toBeInTheDocument();
	});

	test('should set "dayAriaLabel" to day picker', () => {
		const label = 'custom day aria-label';
		render(<DatePicker dayAriaLabel={label} value={new Date(2000, 0, 1)} />);
		const dayPicker = screen.getByLabelText(label);

		const expected = 'day';

		expect(dayPicker).toBeInTheDocument();
		expect(dayPicker).toHaveClass(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month aria-label';
		render(<DatePicker monthAriaLabel={label} value={new Date(2000, 0, 1)} />);
		const monthPicker = screen.getByLabelText(label);

		const expected = 'month';

		expect(monthPicker).toBeInTheDocument();
		expect(monthPicker).toHaveClass(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year aria-label';
		render(<DatePicker value={new Date(2000, 0, 1)} yearAriaLabel={label} />);
		const yearPicker = screen.getByLabelText(label);

		const expected = 'year';

		expect(yearPicker).toBeInTheDocument();
		expect(yearPicker).toHaveClass(expected);
	});

	test('should set "data-webos-voice-disabled" to day picker when voice control is disabled', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />);
		const dayPicker = screen.getByLabelText('1 day change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(dayPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to month picker when voice control is disabled', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />);
		const monthPicker = screen.getByLabelText('1 month change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(monthPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to year picker when voice control is disabled', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />);
		const yearPicker = screen.getByLabelText('1900 year change a value with up down button');
		// The year is 1900 because it does not change based on props, this needs to be fixed in datePicker

		const expected = 'data-webos-voice-disabled';

		expect(yearPicker).toHaveAttribute(expected);
	});

	test('should format a date the same as the label', () => {
		const date = new Date(2000, 0, 1);
		render(<DatePicker value={date} locale="en-US" />);
		const header = screen.getByText(dateToLocaleString(date)).parentElement.parentElement;

		const expected = 'heading';

		expect(header).toHaveClass(expected);
	});

	test('should format a date the same as the label in another locale', () => {
		ilib.setLocale('ar-SA');
		const date = new Date(2000, 0, 1);
		render(<DatePicker value={date} locale="ar-SA" />);
		const header = screen.getByText(dateToLocaleString(date)).parentElement.parentElement;

		const expected = 'heading';

		expect(header).toHaveClass(expected);
	});

	test('should not display Heading', () => {
		const date = new Date(2000, 0, 1);
		render(<DatePicker value={date} locale="en-US" noLabel />);
		const header = screen.queryByText(dateToLocaleString(date));

		expect(header).toBeNull();
	});
});
