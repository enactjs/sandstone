import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormCheckboxItem, {FormCheckboxItemBase} from '../FormCheckboxItem';
import Icon from '../../Icon';

describe('FormCheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		render(<FormCheckboxItemBase icon="trash">Hello FormCheckboxItem</FormCheckboxItemBase>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox');

		const actual = formCheckboxItemElement[1].textContent.codePointAt();
		const expected = 983077; // decimal converted charCode of Unicode 'trash' character

		expect(actual).toBe(expected);
	});

	test('should have correct text', () => {
		render(<FormCheckboxItemBase>Hello FormCheckboxItem</FormCheckboxItemBase>);
		const element = screen.getByText(/Hello FormCheckboxItem/i);

		expect(element).toBeInTheDocument();
	});

	test('should select with click', async () => {
		const user = userEvent.setup();
		render(<FormCheckboxItem>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0];

		const expected = 'selected';

		await user.click(formCheckboxItemElement);

		expect(formCheckboxItemElement).toHaveClass(expected);
	});

	test('should deselect by clicking twice', async () => {
		const user = userEvent.setup();
		render(<FormCheckboxItem>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0];

		const expected = 'selected';

		await user.click(formCheckboxItemElement);
		await user.click(formCheckboxItemElement);

		expect(formCheckboxItemElement).not.toHaveClass(expected);
	});

	test('should be disabled when `disabled` prop is true', () => {
		render(<FormCheckboxItem disabled>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0];

		const expected = 'disabled';

		expect(formCheckboxItemElement).toHaveAttribute(expected);
	});

	test('should have the `-` icon when indeterminate', () => {
		render(<FormCheckboxItem indeterminate>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemIcon = screen.getAllByRole('checkbox')[1];

		const expected = '-';

		expect(formCheckboxItemIcon).toHaveTextContent(expected);
	});

	test('should have the `-` icon when indeterminate even when clicked', async () => {
		const user = userEvent.setup();
		render(<FormCheckboxItem indeterminate>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0];

		await user.click(formCheckboxItemElement);

		const formCheckboxItemIcon = screen.getAllByRole('checkbox')[1];
		const expected = '-';

		expect(formCheckboxItemIcon).toHaveTextContent(expected);
	});

	test('should support a custom indeterminate icon', () => {
		render(
			<FormCheckboxItemBase
				indeterminate
				indeterminateIcon="trash"
			>
				Hello FormCheckboxItem
			</FormCheckboxItemBase>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox');

		const actual = formCheckboxItemElement[1].textContent.codePointAt();
		const expected = 983077; // decimal converted charCode of Unicode 'trash' character

		expect(actual).toBe(expected);
	});

	test('should support slotBefore', () => {
		render(<FormCheckboxItem slotBefore={<Icon>minus</Icon>}>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0].children.item(1).children;

		const expected = 2;

		expect(formCheckboxItemElement).toHaveLength(expected);
	});

	test('should have inline class when `inline` prop is true', () => {
		render(<FormCheckboxItem inline>Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItem = screen.getAllByRole('checkbox')[0];

		const expected = 'inline';

		expect(formCheckboxItem).toHaveClass(expected);
	});

	test('should support label', () => {
		render(<FormCheckboxItem label="LabelText">Hello FormCheckboxItem</FormCheckboxItem>);
		const label = screen.getByText('LabelText').parentElement.parentElement;

		const expectedClass = 'label';

		expect(label).toBeInTheDocument();
		expect(label).toHaveClass(expectedClass);
	});

	test('should have label default position `below`', () => {
		render(<FormCheckboxItem label="LabelText">Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0].lastElementChild;

		const expectedClass = 'labelBelow';

		expect(formCheckboxItemElement).toHaveClass(expectedClass);
	});

	test('should have class labelAfter when position is set to `after`', () => {
		render(<FormCheckboxItem label="LabelText" labelPosition="after">Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0].lastElementChild;

		const expectedClass = 'labelAfter';

		expect(formCheckboxItemElement).toHaveClass(expectedClass);
	});

	test('should have class labelAbove when position is set to `above`', () => {
		render(<FormCheckboxItem label="LabelText" labelPosition="above">Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0].lastElementChild;

		const expectedClass = 'labelAbove';

		expect(formCheckboxItemElement).toHaveClass(expectedClass);
	});

	test('should have class labelBefore when position is set to `before`', () => {
		render(<FormCheckboxItem label="LabelText" labelPosition="before">Hello FormCheckboxItem</FormCheckboxItem>);
		const formCheckboxItemElement = screen.getAllByRole('checkbox')[0].lastElementChild;

		const expectedClass = 'labelBefore';

		expect(formCheckboxItemElement).toHaveClass(expectedClass);
	});
});
