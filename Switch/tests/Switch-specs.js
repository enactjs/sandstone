import {fireEvent, render} from '@testing-library/react';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should not have "selected" className', () => {
		const {getByRole} = render(<SwitchBase />);
		const SwitchSelected = getByRole('button');

		expect(SwitchSelected.className).not.toContain('selected');
	});

	test('should have "selected" className', () => {
		const {getByRole} = render(<SwitchBase selected />);
		const SwitchNotSelected = getByRole('button');

		expect(SwitchNotSelected.className).toContain('selected');
	});

	test('should have "animated" className', () => {
		const {getByRole} = render(<SwitchBase />);
		const SwitchAnimated = getByRole('button');

		expect(SwitchAnimated.className).toContain('animated');
	});

	test('should not have "animated" className', () => {
		const {getByRole} = render(<SwitchBase noAnimation />);
		const SwitchNotAnimated = getByRole('button');

		expect(SwitchNotAnimated.className).not.toContain('animated');
	});

	test('toggle Switch', () => {
		const {getByRole} = render(<Switch />);
		const SwitchElement = getByRole('button');

		fireEvent.click(SwitchElement);

		expect(SwitchElement.className).toContain('selected');
	});
});
