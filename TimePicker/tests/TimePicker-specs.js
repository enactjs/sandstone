import ilib from 'ilib';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimePicker, {timeToLocaleString} from '../TimePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('TimePicker', () => {
	// Suite-wide setup

	test('should emit an onChange event when changing the hour', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker onChange={handleChange} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />
		);
		const hourPicker = screen.getAllByText('▲')[0];

		await user.click(hourPicker);

		const expected = 1;
		const expectedType = {type: 'onChange', value: new Date(2000, 6, 15, 4, 30)};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toBeCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should emit an onChange event when changing the minute', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker onChange={handleChange} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />
		);
		const minutePicker = screen.getAllByText('▲')[1];

		await user.click(minutePicker);

		const expected = 1;
		const expectedType = {type: 'onChange', value: new Date(2000, 6, 15, 3, 31)};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toBeCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should emit an onChange event when changing the meridiem', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<TimePicker onChange={handleChange} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />
		);
		const meridiemPicker = screen.getAllByText('▲')[2];

		await user.click(meridiemPicker);

		const expected = 1;
		const expectedType = {type: 'onChange', value: new Date(2000, 6, 15, 15, 30)};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(handleChange).toBeCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should fire onComplete event with type when enter key pressed from the last picker', () => {
		const handleComplete = jest.fn();
		render(<TimePicker onComplete={handleComplete} value={new Date(2000, 6, 15, 3, 30)} locale="en-US" />);
		const meridiemPicker = screen.getByLabelText('AM change a value with up down button');

		act(() => meridiemPicker.focus());
		fireEvent.keyDown(meridiemPicker, {which: 13, keyCode: 13, code: 13});

		const expected = {type: 'onComplete', value: new Date(2000, 6, 15, 3, 30)};
		const actual = handleComplete.mock.calls.length && handleComplete.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} locale="en-US" />
		);
		const minutePicker = screen.getByText('30');

		const expected = 'item';

		expect(minutePicker).toHaveClass(expected);
	});

	test('should set \'hourAriaLabel\' to hour picker', () => {
		const label = 'custom hour aria-label';
		render(
			<TimePicker hourAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);
		const hourPicker = screen.getByLabelText(label);

		const expected = 'hourPicker';

		expect(hourPicker).toBeInTheDocument();
		expect(hourPicker).toHaveClass(expected);
	});

	test('should set \'meridiemAriaLabel\' to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		render(
			<TimePicker meridiemAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);
		const meridiemPicker = screen.getByLabelText(label);

		const expected = 'meridiemPicker';

		expect(meridiemPicker).toBeInTheDocument();
		expect(meridiemPicker).toHaveClass(expected);
	});

	test('should set \'minuteAriaLabel\' to minute picker', () => {
		const label = 'custom minute aria-label';
		render(
			<TimePicker minuteAriaLabel={label} value={new Date(2000, 0, 1, 12, 30)} />
		);
		const minutePicker = screen.getByLabelText(label);

		const expected = 'minutePicker';

		expect(minutePicker).toBeInTheDocument();
		expect(minutePicker).toHaveClass(expected);
	});

	test('should set \'data-webos-voice-disabled\' to hour picker when voice control is disabled', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);
		const hourPicker = screen.getByLabelText('12 hour change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(hourPicker).toHaveAttribute(expected);
	});

	test('should set \'data-webos-voice-disabled\' to meridiem picker when voice control is disabled', () => {
		render(
			<TimePicker value={new Date(2000, 0, 1, 12, 30)} data-webos-voice-disabled />
		);
		const merdiemPicker = screen.getByLabelText('AM change a value with up down button');

		const expected = 'data-webos-voice-disabled';

		expect(merdiemPicker).toHaveAttribute(expected);
	});

	test('should set \'data-webos-voice-disabled\' to minute picker when voice control is disabled', () => {
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
		const header = screen.getByText(timeToLocaleString(time), {collapseWhitespace: false}).parentElement.parentElement;

		const expected = 'heading';

		expect(header).toHaveClass(expected);
	});

	test('should format a date the same as the label in another locale', () => {
		ilib.setLocale('ar-SA');
		const time = new Date(2000, 0, 1, 12, 30);
		render(
			<TimePicker value={time} locale="ar-SA" />
		);
		const header = screen.getByText(timeToLocaleString(time), {collapseWhitespace: false}).parentElement.parentElement;

		const expected = 'heading';

		expect(header).toHaveClass(expected);
	});

	test('should not display Heading', () => {
		ilib.setLocale('en-US');
		const time = new Date(2000, 0, 1, 12, 30);
		render(
			<TimePicker value={time} locale="en-US" noLabel />
		);
		const header = screen.queryByText(timeToLocaleString(time), {collapseWhitespace: false});

		expect(header).toBeNull();
	});

	test('should change the meridiem to reflect the hour change', () => {
		const time = new Date(2000, 0, 1, 12, 30);
		const secondTime = new Date(2000, 0, 1, 11, 30);
		const {rerender} = render(
			<TimePicker locale="en-US" value={time} />
		);
		const firstTimeDisplayed = screen.queryByText('12:30 PM');

		rerender(
			<TimePicker locale="en-US" value={secondTime} />
		);
		const secondTimeDisplayed = screen.queryByText('11:30 AM');

		expect(firstTimeDisplayed).not.toBeNull();
		expect(secondTimeDisplayed).not.toBeNull();
	});

	test('check that the date is displayed correctly for cases of more than 2 meridiems', () => {
		ilib.setLocale('am-ET');
		const time = new Date(2000, 0, 1, 12, 30);
		const secondTime = new Date(2000, 0, 1, 11, 30);
		const {rerender} = render(
			<TimePicker locale="am-ET" value={time} />
		);
		const firstTimeDisplayed = screen.queryByText('6:30 ከሰዓት');

		rerender(
			<TimePicker locale="am-ET" value={secondTime} />
		);
		const secondTimeDisplayed = screen.queryByText('5:30 ጥዋት');

		expect(firstTimeDisplayed).not.toBeNull();
		expect(secondTimeDisplayed).not.toBeNull();
	});

	describe('#timeToLocaleString', () => {
		test('method should return \'null\' for an \'undefined\' time', () => {
			const time = timeToLocaleString(undefined);		// eslint-disable-line no-undefined

			expect(time).toBeNull();
		});
	});
});
