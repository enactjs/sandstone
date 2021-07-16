import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import TooltipLabel from '../TooltipLabel';

describe('TooltipDecorator', () => {
	describe('TooltipLabel', () => {
		test('should apply alignment when `centered` and `marquee`', () => {
			render(<TooltipLabel centered marquee>Label</TooltipLabel>);

			const expected = 'center';
			const tooltip = screen.getByText('Label');

			expect(tooltip).toHaveStyle({'text-align': expected});
		});

		test('should not apply alignment when `centered` but not `marquee`', () => {
			render(<TooltipLabel centered>Label</TooltipLabel>);

			const unexpected = 'center';
			const tooltip = screen.getByText('Label');

			expect(tooltip).not.toHaveStyle({'text-align': unexpected});
		});
	});
});
