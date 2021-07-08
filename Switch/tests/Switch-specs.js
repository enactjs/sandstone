import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should not have `selected` className', () => {
		const {getByRole} = render(<SwitchBase />);
		const SwitchNotSelected = getByRole('button');

		const expected = 'selected';
		const actual = SwitchNotSelected.className;

		expect(actual).not.toContain(expected);
	});

	test('should have `selected` className', () => {
		const {getByRole} = render(<SwitchBase selected />);
		const SwitchSelected = getByRole('button');

		const expected = 'selected';
		const actual = SwitchSelected.className;

		expect(actual).toContain(expected);
	});

	test('should have `animated` className', () => {
		const {getByRole} = render(<SwitchBase />);
		const SwitchAnimated = getByRole('button');

		const expected = 'animated';
		const actual = SwitchAnimated.className;

		expect(actual).toContain(expected);
	});

	test('should not have `animated` className', () => {
		const {getByRole} = render(<SwitchBase noAnimation />);
		const SwitchNotAnimated = getByRole('button');

		const expected = 'animated';
		const actual = SwitchNotAnimated.className;

		expect(actual).not.toContain(expected);
	});

	test('toggle Switch', () => {
		const handleToggle = jest.fn();
		const {getByRole} = render(<Switch onToggle={handleToggle} />);
		const SwitchElement = getByRole('button');

		userEvent.click(SwitchElement);

		const expected = 'selected';
		const actual = SwitchElement.className;

		expect(actual).toContain(expected);

		const expectedTimes = 1;

		expect(handleToggle).toBeCalledTimes(expectedTimes);
	});
});
