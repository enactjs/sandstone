import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {IconBase as Icon} from '../Icon';

describe('Icon Specs', () => {
	test('should return the correct Unicode value for named icon \'star\'', () => {
		render(<Icon data-testid="icon">star</Icon>);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided \'star\' hex value', () => {
		render(<Icon data-testid="icon">0x0F0028</Icon>);

		const expected = 983080; // decimal converted charCode of character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided HTML entity as hex value', () => {
		render(<Icon data-testid="icon">&#x2605;</Icon>);

		const expected = 9733; // decimal converted charCode of character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided Unicode reference', () => {
		render(<Icon data-testid="icon">\u0F0028</Icon>);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support high code point Unicode values', () => {
		render(<Icon data-testid="icon">{String.fromCodePoint(0x0F0028)}</Icon>);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support preset size "large"', () => {
		render(<Icon data-testid="icon" size="large">star</Icon>);

		const expected = 'large';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support preset size "medium"', () => {
		render(<Icon data-testid="icon" size="medium">star</Icon>);

		const expected = 'medium';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support preset size "small"', () => {
		render(<Icon data-testid="icon" size="small">star</Icon>);

		const expected = 'small';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support preset size "tiny"', () => {
		render(<Icon data-testid="icon" size="tiny">star</Icon>);

		const expected = 'tiny';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support arbitrary custom numeric sizes that scale to the correct value', () => {
		render(<Icon data-testid="icon" size={96}>star</Icon>);

		const icon = screen.getByTestId('icon');

		// surprisingly this returns 8rem, instead of what you'd expect
		// with a base pxToRem value of 48px, which would be 2rem.
		// Tests must run at a tiny simulated screen size.
		expect(icon).toHaveStyle({'--icon-size': '8rem'});
	});
});
