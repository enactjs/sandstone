import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should not have `selected` className', () => {
		render(<SwitchBase />);

		const unexpected = 'selected';
		const actual = screen.getByRole('button');

		expect(actual).not.toHaveClass(unexpected);
	});

	test('should have `selected` className', () => {
		render(<SwitchBase selected />);

		const expected = 'selected';
		const actual = screen.getByRole('button');

		expect(actual).toHaveClass(expected);
	});

	test('should have `animated` className', () => {
		render(<SwitchBase />);

		const expected = 'animated';
		const actual = screen.getByRole('button');

		expect(actual).toHaveClass(expected);
	});

	test('should not have `animated` className when `noAnimation`', () => {
		render(<SwitchBase noAnimation />);

		const unexpected = 'animated';
		const actual = screen.getByRole('button');

		expect(actual).not.toHaveClass(unexpected);
	});

	test('toggle Switch', async () => {
		const handleToggle = jest.fn();
		const user = userEvent.setup();
		render(<Switch onToggle={handleToggle} />);

		const actual = screen.getByRole('button');

		await user.click(actual);

		const expectedClass = 'selected';
		expect(actual).toHaveClass(expectedClass);

		const expectedTimes = 1;
		expect(handleToggle).toBeCalledTimes(expectedTimes);
	});
});
