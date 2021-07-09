import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SwitchItem, {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem Specs', () => {
	test('should contain a Switch', () => {
		const {getAllByRole} = render(<SwitchItemBase />);
		const Buttons = getAllByRole('button');

		const expected = 'switch';
		const actual = Buttons[1].className;

		expect(actual).toContain(expected);
	});

	test('should pass `selected` to Switch element', () => {
		const {getAllByRole} = render(<SwitchItemBase selected />);
		const Buttons = getAllByRole('button');

		const expected = 'selected';
		const SwitchItemElement = Buttons[0].className;
		const SwitchElement = Buttons[1].className;

		expect(SwitchItemElement).toContain(expected);
		expect(SwitchElement).toContain(expected);
	});

	test('should toggle Switch', () => {
		const handleToggle = jest.fn();
		const {getAllByRole} = render(<SwitchItem onToggle={handleToggle} />);
		const Buttons = getAllByRole('button');
		const Switch = Buttons[1];

		userEvent.click(Switch);

		const expected = 'selected';
		const actual = Switch.className;

		expect(actual).toContain(expected);

		const expectedTimes = 1;

		expect(handleToggle).toBeCalledTimes(expectedTimes);
	});

	test('should render correct children', () => {
		const {getByText} = render(<SwitchItem>Hello SwitchItem</SwitchItem>);
		const Child = getByText(/Hello SwitchItem/i);

		expect(Child).toBeInTheDocument();
	});
});
