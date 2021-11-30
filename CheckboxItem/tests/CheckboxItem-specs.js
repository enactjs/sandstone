import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxItem, {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {

	test('should support a custom icon', () => {
		render(<CheckboxItemBase icon="trash">Hello CheckboxItem</CheckboxItemBase>);

		const checkboxItemElement = screen.getAllByRole('checkbox');

		const actual = checkboxItemElement[1].textContent.codePointAt();
		const expected = 983077; // decimal converted charCode of Unicode 'trash' character

		expect(actual).toBe(expected);
	});

	test('should have correct text', () => {
		render(<CheckboxItemBase>Hello CheckboxItem</CheckboxItemBase>);

		const element = screen.getByText(/Hello CheckboxItem/i);

		expect(element).toBeInTheDocument();
	});

	test('should select with click', () => {
		render(<CheckboxItem>Hello CheckboxItem</CheckboxItem>);

		const checkboxItemElement = screen.getAllByRole('checkbox')[0];
		const expected = 'selected';

		userEvent.click(checkboxItemElement);

		expect(checkboxItemElement).toHaveClass(expected);
	});

	test('should unselect with click twice', () => {
		render(<CheckboxItem>Hello CheckboxItem</CheckboxItem>);

		const checkboxItemElement = screen.getAllByRole('checkbox')[0];
		const expected = 'selected';

		userEvent.click(checkboxItemElement);
		userEvent.click(checkboxItemElement);

		expect(checkboxItemElement).not.toHaveClass(expected);
	});
});
