import ilib from '@enact/i18n';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DayPicker, {getSelectedDayString} from '../DayPicker';

describe('DayPicker', () => {

	test('should not select any item when there is no passed prop `selected`', () => {
		render(<DayPicker />);

		const actual = screen.getAllByRole('checkbox')[0];

		expect(actual).toHaveAttribute('aria-checked', 'false');
	});

	test('should select day when passed prop `selected`', () => {
		render(<DayPicker selected={[1]} />);
		const selectedDay = screen.getAllByRole('checkbox')[2];

		const expected = 'selected';

		expect(selectedDay).toHaveClass(expected);
	});

	test('should emit an onSelect event when selecting days', () => {
		const handleSelect = jest.fn();
		render(<DayPicker onSelect={handleSelect} />);
		const item = screen.getAllByRole('checkbox')[2];

		userEvent.click(item);

		expect(handleSelect).toHaveBeenCalled();
	});

	test('should include `content` in onSelect event payload which respects dayNameLength', () => {
		const handleSelect = jest.fn();
		render(<DayPicker onSelect={handleSelect} dayNameLength="short" />);

		// select Monday
		const item = screen.getByText('Monday');
		userEvent.click(item);

		const expected = {
			// M is the "short" value from ilib for Monday
			content: 'M'
		};
		const actual = handleSelect.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should return `None` when selected is null', () => {
		const label = getSelectedDayString(null, 'None');
		const expected = 'None';

		expect(label).toBe(expected);
	});

	test('should return `None` when selected is empty', () => {
		const label = getSelectedDayString([], 'None');
		const expected = 'None';

		expect(label).toBe(expected);
	});

	test('should return `Every Weekend` when all selected', () => {
		const selected = [0, 6];
		const label = getSelectedDayString(selected);
		const expected = 'Every Weekend';

		expect(label).toBe(expected);
	});

	test('should return `Every Weekday` when all selected', () => {
		const selected = [1, 2, 3, 4, 5];
		const label = getSelectedDayString(selected);
		const expected = 'Every Weekday';

		expect(label).toBe(expected);
	});

	test('should return `Every Day` when all selected', () => {
		const selected = [0, 1, 2, 3, 4, 5, 6];
		const label = getSelectedDayString(selected);
		const expected = 'Every Day';

		expect(label).toBe(expected);
	});

	// ilib isn't working correctly with unit tests so this block must be skipped
	describe.skip('with alternate first day of week', () => {
		test('should accept and emit a generalized selected array', () => {
			ilib.setLocale('es-ES');

			const handleSelect = jest.fn();
			render(<DayPicker onSelect={handleSelect} defaultSelected={[0]} />);

			// select Lunes (Monday) which is the first day of the week for es-ES
			const item = screen.getAllByRole('checkbox')[0];
			userEvent.click(item);

			const expected = {
				// Expect Sunday (0) and Monday (1) to be selected
				selected: [0, 1]
			};
			const actual = handleSelect.mock.calls[0][0];

			// If ilib isn't loading correctly, actual will be null because we will have unselected
			// Sunday instead of selecting Monday.
			expect(actual).toMatchObject(expected);
		});
	});
});
