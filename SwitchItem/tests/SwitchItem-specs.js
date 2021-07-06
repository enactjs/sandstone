import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import SwitchItem, {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem Specs', () => {

	test('should contain a Switch', () => {

		const {getAllByRole} = render(<SwitchItemBase />);
		const Buttons = getAllByRole('button');

		expect(Buttons[1].className).toContain('switch');
	});

	test('should pass selected to Switch element', () => {

		const {getAllByRole} = render(<SwitchItemBase selected />);
		const Buttons = getAllByRole('button');

		expect(Buttons[0].className).toContain('selected');
		expect(Buttons[1].className).toContain('selected');
	});

	test('should toggle Switch', () => {
		const {getAllByRole} = render(<SwitchItem />);
		const Buttons = getAllByRole('button');

		fireEvent.click(Buttons[1]);

		expect(Buttons[1].className).toContain('selected');
	});

	test('should render correct children', () => {
		const {getByText} = render(<SwitchItem>Hello SwitchItem</SwitchItem>);
		const Child = getByText(/Hello SwitchItem/i);

		expect(Child).toBeInTheDocument();
	});
});
