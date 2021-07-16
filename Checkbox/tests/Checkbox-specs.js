import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox, {CheckboxBase} from '../Checkbox';

describe('CheckboxItem Specs', () => {

	test('should not include the selected class when not selected', () => {
		render(<CheckboxBase />);
		const checkboxElement = screen.getByRole('checkbox');

		expect(checkboxElement.className).not.toContain('selected');
	});

	test('should not be checked', () => {
		render(<CheckboxBase />);

		const actual = screen.getByRole('checkbox');

		expect(actual).toHaveAttribute('aria-checked', 'false');
	});

	test('should add the selected class when given the selected prop', () => {
		render(<CheckboxBase selected />);
		const checkboxElement = screen.getByRole('checkbox');

		const expected = 'selected';

		expect(checkboxElement).toHaveClass(expected);
	});

	test('should be checked when initiated with `selected` prop', () => {
		render(<CheckboxBase selected />);

		const actual = screen.getByRole('checkbox');

		expect(actual).toHaveAttribute('aria-checked', 'true');
	});

	test('should add the indeterminate class when given the indeterminate prop', () => {
		render(<CheckboxBase indeterminate />);

		const actual = screen.getByRole('checkbox');
		const expected = 'indeterminate';

		expect(actual).toHaveClass(expected);
	});

	test('should not include the indeterminate class when not indeterminate', () => {
		render(<CheckboxBase />);

		const actual = screen.getByRole('checkbox');
		const expected = 'indeterminate';

		expect(actual).not.toHaveClass(expected);
	});

	test('should prioritize indeterminate over selected', () => {
		render(<CheckboxBase indeterminate selected indeterminateIcon="Ind" />);

		const actual = screen.getByRole('checkbox').textContent;
		const expected = 'Ind';

		expect(actual).toBe(expected);
	});

	test('should check the checkbox with one click', () => {
		render(<Checkbox />);

		const actual = screen.getByRole('checkbox');
		const expected = 'selected';

		userEvent.click(actual);

		expect(actual).toHaveClass(expected);
	});

	test('should uncheck the checkbox with two clicks', () => {
		render(<Checkbox />);

		const actual = screen.getByRole('checkbox');
		const expected = 'selected';

		userEvent.click(actual);
		userEvent.click(actual);

		expect(actual).not.toHaveClass(expected);
	});
});
