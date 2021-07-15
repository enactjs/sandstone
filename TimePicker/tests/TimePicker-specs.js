import ilib from 'ilib';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimePicker, {timeToLocaleString} from '../TimePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('TimePicker', () => {
	// Suite-wide setup

	test('should emit an onChange event when changing a component picker',
		() => {
			const handleChange = jest.fn();
			const {getAllByText} = render(
				<TimePicker onChange={handleChange} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />
			);

			const expected = 1;
			const hourPicker = getAllByText('▲')[0];
			userEvent.click(hourPicker);

			expect(handleChange).toBeCalledTimes(expected);
		}
	);

	test('should accept a JavaScript Date for its value prop', () => {
		const {getByText} = render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} locale="en-US" />
		);

		const minutePicker = getByText('30');
		const expected = 'item';
		const actual = minutePicker.className;

		expect(actual).toContain(expected);
	});

	test('should set "hourAriaLabel" to hour picker', () => {
		const label = 'custom hour aria-label';
		const {getByLabelText} = render(
			<TimePicker hourAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const hourPicker = getByLabelText(label);
		const expected = 'hour';
		const actual = hourPicker.className;

		expect(hourPicker).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "meridiemAriaLabel" to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		const {getByLabelText} = render(
			<TimePicker meridiemAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const meridiemPicker = getByLabelText(label);
		const expected = 'meridiem';
		const actual = meridiemPicker.className;

		expect(meridiemPicker).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "minuteAriaLabel" to minute picker', () => {
		const label = 'custom minute aria-label';
		const {getByLabelText} = render(
			<TimePicker minuteAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);

		const minutePicker = getByLabelText(label);
		const expected = 'minute';
		const actual = minutePicker.className;

		expect(minutePicker).toBeInTheDocument();
		expect(actual).toContain(expected);
	});

	test('should set "data-webos-voice-disabled" to hour picker when voice control is disabled', () => {
		const {getByLabelText} = render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);

		const hourPicker = getByLabelText('12 hour change a value with up down button');
		const expected = 'data-webos-voice-disabled';

		expect(hourPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to merdiem picker when voice control is disabled', () => {
		const {getByLabelText} = render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);

		const merdiemPicker = getByLabelText('AM change a value with up down button');
		const expected = 'data-webos-voice-disabled';

		expect(merdiemPicker).toHaveAttribute(expected);
	});

	test('should set "data-webos-voice-disabled" to minute picker when voice control is disabled', () => {
		const {getByLabelText} = render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);

		const minutePicker = getByLabelText('0 minute change a value with up down button');
		// The minute is 0 because it does not change based on props, this needs to be fixed in timePicker
		const expected = 'data-webos-voice-disabled';

		expect(minutePicker).toHaveAttribute(expected);
	});

	test('should format a date the same as the label', () => {
		const time = new Date(2000, 0, 1, 12, 30);
		const {getByTestId} = render(
			<TimePicker data-testid="timePicker" value={time} locale="en-US" />
		);

		const Header = getByTestId('timePicker').children.item(0);
		const expected = timeToLocaleString(time);
		const actual = Header.textContent;

		expect(actual).toBe(expected);
	});

	test('should format a date the same as the label in another locale', () => {
		ilib.setLocale('ar-SA');
		const time = new Date(2000, 0, 1, 12, 30);
		const {getByTestId} = render(
			<TimePicker data-testid="timePicker" value={time} locale="ar-SA" />
		);

		const Header = getByTestId('timePicker').children.item(0);
		const expected = timeToLocaleString(time);
		const actual = Header.textContent;

		expect(actual).toBe(expected);
	});
});
