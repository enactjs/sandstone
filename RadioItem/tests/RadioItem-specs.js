import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import RadioItem, {RadioItemBase} from '../RadioItem';

describe('RadioItem Specs', () => {

	test('should support a custom icon', () => {
		const {getByRole} = render(<RadioItemBase icon="check" selected>Hello RadioItem</RadioItemBase>);
		const radioItemElement = getByRole('checkbox');

		const expected = '✓';
		const actual = radioItemElement.children.item(1).textContent;

		expect(actual).toBe(expected);
	});

	test('should render `children`', () => {
		const {getByText} = render(<RadioItemBase>Hello RadioItem</RadioItemBase>);

		const actual = getByText('Hello RadioItem');

		expect(actual).toBeInTheDocument();
	});

	test('should render a disabled RadioItem when `disabled` is true', () => {
		const {getByRole} = render(<RadioItemBase disabled>Hello RadioItem</RadioItemBase>);
		const radioItem = getByRole('checkbox');

		expect(radioItem).toHaveAttribute('disabled');
	});

	test('should render a `slot before`', () => {
		const {getByText} = render(<RadioItemBase slotBefore="arrowup">Hello RadioItem</RadioItemBase>);

		const actual = getByText('arrowup');

		expect(actual).toBeInTheDocument();
	});

	test('should select RadioItem with click', () => {
		const {getAllByRole} = render(<RadioItem>Hello RadioItem</RadioItem>);
		const radioItem = getAllByRole('checkbox');

		fireEvent.click(radioItem[0]);

		const expected = 'selected';

		expect(radioItem[0]).toHaveClass(expected);
	});

	test('should not select RadioItem with click when disabled', () => {
		const {getAllByRole} = render(<RadioItem disabled>Hello RadioItem</RadioItem>);
		const radioItem = getAllByRole('checkbox');

		fireEvent.click(radioItem[0]);

		const expected = 'selected';

		expect(radioItem[0]).not.toHaveClass(expected);
	});
});
