import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Region from '../Region';

describe('Region', () => {
	describe('computed property', () => {
		describe('aria-label', () => {
			test('should use aria-label when set', () => {
				render(<Region title="Title" aria-label="ariaLabel" />);
				const region = screen.getByRole('region');

				expect(region).toHaveAttribute('aria-label', 'ariaLabel');
			});

			test('should use title when aria-label is not set', () => {
				render(<Region title="Title" />);
				const region = screen.getByRole('region');

				expect(region).toHaveAttribute('aria-label', 'Title');
			});
		});
	});
});
