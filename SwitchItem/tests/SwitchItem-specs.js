import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SwitchItem, {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem Specs', () => {
	test('should contain a Switch', () => {
		render(<SwitchItemBase />);

		const expected = 'switch';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveClass(expected);
	});

	test('should pass `selected` to Switch element', () => {
		render(<SwitchItemBase selected />);

		const expected = 'selected';
		const SwitchItemElement = screen.getAllByRole('button')[0];
		const SwitchElement = screen.getAllByRole('button')[1];

		expect(SwitchItemElement).toHaveClass(expected);
		expect(SwitchElement).toHaveClass(expected);
	});

	test('should toggle Switch', async () => {
		const handleToggle = jest.fn();
		const user = userEvent.setup();
		render(<SwitchItem onToggle={handleToggle} />);

		const actual = screen.getAllByRole('button')[1];

		await user.click(actual);

		const expectedClass = 'selected';
		expect(actual).toHaveClass(expectedClass);

		const expectedTimes = 1;
		expect(handleToggle).toBeCalledTimes(expectedTimes);
	});

	test('should render correct children', () => {
		render(<SwitchItem>Hello SwitchItem</SwitchItem>);
		const Child = screen.getByText(/Hello SwitchItem/i);

		expect(Child).toBeInTheDocument();
	});
});
