import '@testing-library/jest-dom';
import {render, fireEvent} from '@testing-library/react';

import CheckboxItem, {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {

	test('should support a custom icon', () => {
		const {getAllByRole} = render(<CheckboxItemBase icon="trash">Hello CheckboxItem</CheckboxItemBase>);

		const checkboxItemElement = getAllByRole('checkbox');
		const actual = checkboxItemElement[1].textContent.codePointAt();
		const expected = 983077;

		expect(actual).toBe(expected);
	});

	test('should have correct text', () => {
		const {getByText} = render(<CheckboxItemBase>Hello CheckboxItem</CheckboxItemBase>);

		const element = getByText(/Hello CheckboxItem/i);
		expect(element).toBeInTheDocument();
	});

	test('should select with click', () => {
		const {getAllByRole} = render(<CheckboxItem>Hello CheckboxItem</CheckboxItem>);

		const checkboxItemElement = getAllByRole('checkbox');

		fireEvent.click(checkboxItemElement[0]);

		expect(checkboxItemElement[0].className).toContain('selected');
	});

	test('should select with click', () => {
		const {getAllByRole} = render(<CheckboxItem>Hello CheckboxItem</CheckboxItem>);

		const checkboxItemElement = getAllByRole('checkbox');

		fireEvent.click(checkboxItemElement[0]);
		fireEvent.click(checkboxItemElement[0]);

		expect(checkboxItemElement[0].className).not.toContain('selected');
	});
});
