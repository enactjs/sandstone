import ilib from '@enact/i18n';
import {fireEvent, render} from '@testing-library/react';

import DayPicker, {getSelectedDayString} from '../DayPicker';


describe('DayPicker', () => {

	test('should not select any item when there is no passed prop `selected`', () => {
		const {getAllByRole} = render(<DayPicker />);
		expect(getAllByRole('checkbox', {checked: false}));
	});

	test('should select day when passed prop `selected`', () => {
		const {getAllByRole} = render(<DayPicker selected={[1]} />);

		const selectedDay = getAllByRole('checkbox')[2];
		expect(selectedDay.className).toContain('selected');
	});

	test('should emit an onSelect event when selecting days', () => {
		const handleSelect = jest.fn();
		const {getAllByRole} = render(<DayPicker onSelect={handleSelect} />);

		const item = getAllByRole('checkbox')[2];
		fireEvent.click(item);
		expect(handleSelect).toHaveBeenCalled();
	});

	test('should not emit an onSelect event when disabled', () => {
		const handleSelect = jest.fn();
		const {getAllByRole} = render(<DayPicker onSelect={handleSelect} disabled />);

		const item = getAllByRole('checkbox')[2];
		fireEvent.click(item);
		expect(handleSelect).not.toHaveBeenCalled();
	});

	test('should include `content` in onSelect event payload which respects dayNameLength', () => {
		const handleSelect = jest.fn();
		const {getByText} = render(<DayPicker onSelect={handleSelect} dayNameLength="short" />);

		// select Monday
		const item = getByText('Monday');
		fireEvent.click(item);

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

	// ilib isn't working correctly with unit tests so this block must be skipped
	describe.skip('with alternate first day of week', () => {
		test('should accept and emit a generalized selected array', () => {
			ilib.setLocale('es-ES');

			const handleSelect = jest.fn();
			const {getAllByRole} = render(<DayPicker onSelect={handleSelect} defaultSelected={[0]} />);

			// select Lunes (Monday) which is the first day of the week for es-ES
			const item = getAllByRole('checkbox')[0];
			fireEvent.click(item);

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
