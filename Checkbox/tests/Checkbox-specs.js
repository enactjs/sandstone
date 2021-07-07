import {render, fireEvent} from '@testing-library/react';

import Checkbox, {CheckboxBase} from '../Checkbox';

describe('CheckboxItem Specs', () => {

	test('should not include the selected class when not selected', () => {
		const {getByRole} = render(<CheckboxBase />);
		const checkboxElement = getByRole('checkbox');

		expect(checkboxElement.className).not.toContain('selected');
	});

	test('should not be checked', () => {
		const {getByRole} = render(<CheckboxBase />);
		expect(getByRole('checkbox', {checked: false}));
	});

	test('should add the selected class when given the selected prop', () => {
		const {getByRole} = render(<CheckboxBase selected />);
		const checkboxElement = getByRole('checkbox');

		expect(checkboxElement.className).toContain('selected');
	});

	test('should be checked when initiated with `selected` prop', () => {
		const {getByRole} = render(<CheckboxBase selected />);
		expect(getByRole('checkbox', {checked: true}));
	});

	test('should add the indeterminate class when given the indeterminate prop', () => {
		const {getByRole} = render(<CheckboxBase indeterminate />);
		expect(getByRole('checkbox').className).toContain('indeterminate');
	});

	test('should not include the indeterminate class when not indeterminate', () => {
		const {getByRole} = render(<CheckboxBase />);
		expect(getByRole('checkbox').className).not.toContain('indeterminate');
	});

	test('should prioritize indeterminate over selected', () => {
		const {getByRole} = render(<CheckboxBase indeterminate selected indeterminateIcon="Ind" />);
		expect(getByRole('checkbox').textContent).toBe('Ind');
	});

	test('should check the checkbox with one click', () => {
		const {getByRole} = render(<Checkbox />);
		const checkboxElement = getByRole('checkbox');

		fireEvent.click(checkboxElement);

		expect(checkboxElement.className).toContain('selected');
	});

	test('should uncheck the checkbox with two clicks', () => {
		const {getByRole} = render(<Checkbox />);
		const checkboxElement = getByRole('checkbox');

		fireEvent.click(checkboxElement);
		fireEvent.click(checkboxElement);

		expect(checkboxElement.className).not.toContain('selected');
	});
});
