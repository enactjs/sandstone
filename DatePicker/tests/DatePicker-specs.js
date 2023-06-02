import ilib from 'ilib';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker, {dateToLocaleString} from '../DatePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.
describe('DatePicker', () => {
	test('should emit an onChange event with type when changing the day', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<DatePicker onChange={handleChange} value={new Date(2000, 6, 15)} locale="en-US" />);
		const dayPickerUp = screen.getAllByText('▲')[1];

		await user.click(dayPickerUp);

		const expected = 1;
		const expectedType = {type: 'onChange', value: new Date(2000, 6, 16)};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toBeCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should emit an onChange event with type when changing the month', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<DatePicker onChange={handleChange} value={new Date(2000, 6, 15)} locale="en-US" />);
		const monthPickerUp = screen.getAllByText('▲')[0];

		await user.click(monthPickerUp);

		const expected = 1;
		const expectedType = {type: 'onChange', value: new Date(2000, 7, 15)};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toBeCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should emit an onChange event with type when changing the year', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<DatePicker onChange={handleChange} value={new Date(2000, 6, 15)} locale="en-US" />);
		const yearPickerUp = screen.getAllByText('▲')[2];

		await user.click(yearPickerUp);

		const expected = 1;
		const expectedType = {type: 'onChange', value: new Date(2001, 6, 15)};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toBeCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should fire onComplete event with type when enter key pressed from the last picker', () => {
		const handleComplete = jest.fn();
		render(<DatePicker onComplete={handleComplete} value={new Date(2000, 6, 15)} locale="en-US" />);
		const year = screen.getByLabelText('2000 year change a value with up down button');

		act(() => year.focus());
		fireEvent.keyDown(year, {which: 13, keyCode: 13, code: 13});

		const expected = {type: 'onComplete', value: new Date(2000, 6, 15)};
		const actual = handleComplete.mock.calls.length && handleComplete.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should fire onSpotlightLeft event with type when spotlight is leaving via left key', () => {
		const handleSpotlight = jest.fn();
		render(<DatePicker onSpotlightLeft={handleSpotlight} value={new Date(2000, 6, 15)} locale="en-US" />);
		const month = screen.getByLabelText('7 month change a value with up down button');

		act(() => month.focus());
		fireEvent.keyDown(month, {which: 37, keyCode: 37, code: 37});

		const expected = {type: 'onSpotlightLeft'};
		const actual = handleSpotlight.mock.calls.length && handleSpotlight.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should fire onSpotlightRight event with type when spotlight is leaving via right key', () => {
		const handleSpotlight = jest.fn();
		render(<DatePicker onSpotlightRight={handleSpotlight} value={new Date(2000, 6, 15)} locale="en-US" />);
		const year = screen.getByLabelText('2000 year change a value with up down button');

		act(() => year.focus());
		fireEvent.keyDown(year, {which: 39, keyCode: 39, code: 39});

		const expected = {type: 'onSpotlightRight'};
		const actual = handleSpotlight.mock.calls.length && handleSpotlight.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} locale="en-US" />);
		const year = screen.getByText('2000');

		expect(year).toBeInTheDocument();
	});

	test('should set \'dayAriaLabel\' to day picker', () => {
		const label = 'custom day aria-label';
		render(<DatePicker dayAriaLabel={label} value={new Date(2000, 0, 1)} />);
		const dayPicker = screen.getByLabelText(label);

		const expected = 'day';

		expect(dayPicker).toBeInTheDocument();
		expect(dayPicker).toHaveClass(expected);
	});

	test('should set \'monthAriaLabel\' to month picker', () => {
		const label = 'custom month aria-label';
		render(<DatePicker monthAriaLabel={label} value={new Date(2000, 0, 1)} />);
		const monthPicker = screen.getByLabelText(label);

		const expected = 'month';

		expect(monthPicker).toBeInTheDocument();
		expect(monthPicker).toHaveClass(expected);
	});

	test('should set \'yearAriaLabel\' to year picker', () => {
		const label = 'custom year aria-label';
		render(<DatePicker value={new Date(2000, 0, 1)} yearAriaLabel={label} />);
		const yearPicker = screen.getByLabelText(label);

		const expected = 'year';

		expect(yearPicker).toBeInTheDocument();
		expect(yearPicker).toHaveClass(expected);
	});

	test('should set \'data-webos-voice-disabled\' to day picker when voice control is disabled', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />);
		const dayPicker = screen.getByLabelText('1 day change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(dayPicker).toHaveAttribute(expected);
	});

	test('should set \'data-webos-voice-disabled\' to month picker when voice control is disabled', () => {
		render(<DatePicker value={new Date(2000, 0, 1)} data-webos-voice-disabled />);
		const monthPicker = screen.getByLabelText('1 month change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(monthPicker).toHaveAttribute(expected);
	});

	test('should set \'data-webos-voice-disabled\' to year picker when voice control is disabled', () => {
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

	describe('#dateToLocaleString', () => {
		test('method should return \'null\' for an \'undefined\' date', () => {
			const actual = dateToLocaleString(undefined);		// eslint-disable-line no-undefined

			expect(actual).toBeNull();
		});
	});
});
