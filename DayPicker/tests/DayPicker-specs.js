import ilib from '@enact/i18n';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DayPicker, {getSelectedDayString} from '../DayPicker';

describe('DayPicker', () => {
	test('should not select any item when there is no passed prop `selected`', () => {
		render(<DayPicker />);

		const allDays = screen.getAllByRole('checkbox');

		for (const day of allDays) {
			expect(day).toHaveAttribute('aria-checked', 'false');
		}
	});

	test('should select day when passed prop \'selected\'', () => {
		render(<DayPicker selected={[1]} />);
		const selectedDay = screen.getAllByRole('checkbox')[2];

		const expected = 'selected';

		expect(selectedDay).toHaveClass(expected);
	});

	test('should select day when passed prop \'selected\' as a number', () => {
		// We need to change the locale to firstDayOfWeek !== 0.
		// If firstDayOfWeek === 0, the number type check conditional statement
		// is skipped due to the fast execution path of localizeSelected(), which
		// reduces code coverage.
		ilib.setLocale('es-ES');

		render(<DayPicker locale="es-ES" selected={1} />);
		const selectedDay = screen.getAllByRole('checkbox')[1];

		const expected = 'selected';

		expect(selectedDay).toHaveClass(expected);
	});

	test('should emit an onSelect event with \'onSelect\' type when selecting days', async () => {
		ilib.setLocale('en-US');

		const handleSelect = jest.fn();
		const user = userEvent.setup();
		render(<DayPicker onSelect={handleSelect} />);
		const item = screen.getAllByRole('checkbox')[2];

		await user.click(item);

		expect(handleSelect).toHaveBeenCalledWith({content: 'Mon', selected: [1], type: 'onSelect'});
	});

	test('should include \'content\' in onSelect event payload which respects dayNameLength', async () => {
		const handleSelect = jest.fn();
		const user = userEvent.setup();
		render(<DayPicker onSelect={handleSelect} dayNameLength="short" />);

		// select Monday
		const item = screen.getByText('Monday');
		await user.click(item);

		const expected = {
			// M is the "short" value from ilib for Monday
			content: 'M'
		};
		const actual = handleSelect.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should return \'None\' when selected is null', () => {
		const label = getSelectedDayString(null, 'None');
		const expected = 'None';

		expect(label).toBe(expected);
	});

	test('should return \'None\' when selected is empty', () => {
		const label = getSelectedDayString([], 'None');
		const expected = 'None';

		expect(label).toBe(expected);
	});

	test('should return \'Every Weekend\' when all selected', () => {
		const selected = [0, 6];
		const label = getSelectedDayString(selected);
		const expected = 'Every Weekend';

		expect(label).toBe(expected);
	});

	test('should return \'Every Weekday\' when all selected', () => {
		const selected = [1, 2, 3, 4, 5];
		const label = getSelectedDayString(selected);
		const expected = 'Every Weekday';

		expect(label).toBe(expected);
	});

	test('should return \'Every Day\' when all selected', () => {
		const selected = [0, 1, 2, 3, 4, 5, 6];
		const label = getSelectedDayString(selected);
		const expected = 'Every Day';

		expect(label).toBe(expected);
	});

	describe('with alternate first day of week', () => {
		test('should accept and emit a generalized selected array', async () => {
			ilib.setLocale('es-ES');

			const handleSelect = jest.fn();
			const user = userEvent.setup();
			render(<DayPicker defaultSelected={[0]} locale="es-ES" onSelect={handleSelect} />);

			// select Lunes (Monday) which is the first day of the week for es-ES
			const item = screen.getAllByRole('checkbox')[0];
			await user.click(item);

			const expected = {
				// Expect Sunday (0) and Monday (1) to be selected
				selected: [0, 1]
			};
			const actual = handleSelect.mock.calls[0][0];

			expect(actual).toMatchObject(expected);
		});
	});
});
