import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import RadioItem, {RadioItemBase} from '../RadioItem';

describe('RadioItem Specs', () => {

	test('should support a custom icon', () => {
		render(<RadioItemBase icon="check" selected>Hello RadioItem</RadioItemBase>);
		const radioItemElement = screen.getByRole('checkbox');

		const expected = '✓';
		const actual = radioItemElement.children.item(1).textContent;

		expect(actual).toBe(expected);
	});

	test('should render `children`', () => {
		render(<RadioItemBase>Hello RadioItem</RadioItemBase>);

		const actual = screen.getByText('Hello RadioItem');

		expect(actual).toBeInTheDocument();
	});

	test('should render a disabled RadioItem when `disabled` is true', () => {
		render(<RadioItemBase disabled>Hello RadioItem</RadioItemBase>);
		const radioItem = screen.getByRole('checkbox');

		expect(radioItem).toHaveAttribute('disabled');
	});

	test('should render a `slot before`', () => {
		render(<RadioItemBase slotBefore="arrowup">Hello RadioItem</RadioItemBase>);

		const actual = screen.getByText('arrowup');

		expect(actual).toBeInTheDocument();
	});

	test('should select RadioItem with click', () => {
		render(<RadioItem>Hello RadioItem</RadioItem>);
		const radioItem = screen.getAllByRole('checkbox');

		fireEvent.click(radioItem[0]);

		const expected = 'selected';

		expect(radioItem[0]).toHaveClass(expected);
	});

	test('should not select RadioItem with click when disabled', () => {
		render(<RadioItem disabled>Hello RadioItem</RadioItem>);
		const radioItem = screen.getAllByRole('checkbox');

		fireEvent.click(radioItem[0]);

		const expected = 'selected';

		expect(radioItem[0]).not.toHaveClass(expected);
	});
});
