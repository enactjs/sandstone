import ilib from 'ilib';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimePicker, {timeToLocaleString} from '../TimePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('TimePicker', () => {
	// Suite-wide setup

	test('should emit an onChange event when changing a component picker',
		() => {
			const handleChange = jest.fn();
			render(
				<TimePicker onChange={handleChange} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />
			);
			const hourPicker = screen.getAllByText('▲')[0];

			userEvent.click(hourPicker);

			const expected = 1;

			expect(handleChange).toBeCalledTimes(expected);
		}
	);

	test('should accept a JavaScript Date for its value prop', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} locale="en-US" />
		);
		const minutePicker = screen.getByText('30');

		const expected = 'item';

		expect(minutePicker).toHaveClass(expected);
	});

	test('should set "hourAriaLabel" to hour picker', () => {
		const label = 'custom hour aria-label';
		render(
			<TimePicker hourAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);
		const hourPicker = screen.getByLabelText(label);

		const expected = 'hourPicker';

		expect(hourPicker).toBeInTheDocument();
		expect(hourPicker).toHaveClass(expected);
	});

	test('should set "meridiemAriaLabel" to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		render(
			<TimePicker meridiemAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);
		const meridiemPicker = screen.getByLabelText(label);

		const expected = 'meridiemPicker';

		expect(meridiemPicker).toBeInTheDocument();
		expect(meridiemPicker).toHaveClass(expected);
	});

	test('should set "minuteAriaLabel" to minute picker', () => {
		const label = 'custom minute aria-label';
		render(
			<TimePicker minuteAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);
		const minutePicker = screen.getByLabelText(label);

		const expected = 'minutePicker';

		expect(minutePicker).toBeInTheDocument();
		expect(minutePicker).toHaveClass(expected);
	});

	test('should set "data-webos-voice-disabled" to hour picker when voice control is disabled', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);
		const hourPicker = screen.getByLabelText('12 hour change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(hourPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to merdiem picker when voice control is disabled', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);
		const merdiemPicker = screen.getByLabelText('AM change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(merdiemPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to minute picker when voice control is disabled', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);
		const minutePicker = screen.getByLabelText('0 minute change a value with up down button');
		// The minute is 0 because it does not change based on props, this needs to be fixed in timePicker

		const expected = 'data-webos-voice-disabled';

		expect(minutePicker).toHaveAttribute(expected);
	});

	test('should format a date the same as the label', () => {
		const time = new Date(2000, 0, 1, 12, 30);
		render(
			<TimePicker value={time} locale="en-US" />
		);
		const header = screen.getByText(timeToLocaleString(time)).parentElement.parentElement;

		const expected = 'heading';

		expect(header).toHaveClass(expected);
	});

	test('should format a date the same as the label in another locale', () => {
		ilib.setLocale('ar-SA');
		const time = new Date(2000, 0, 1, 12, 30);
		render(
			<TimePicker value={time} locale="ar-SA" />
		);
		const header = screen.getByText(timeToLocaleString(time)).parentElement.parentElement;

		const expected = 'heading';

		expect(header).toHaveClass(expected);
	});

	test('should not display Heading', () => {
		ilib.setLocale('en-US');
		const time = new Date(2000, 0, 1, 12, 30);
		render(
			<TimePicker value={time} locale="en-US" noLabel />
		);
		const header = screen.queryByText(timeToLocaleString(time));

		expect(header).toBeNull();
	});
});
