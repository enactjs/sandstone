import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import BodyText from '../BodyText';

describe('BodyText Specs', () => {

	test('should support multi-line content', () => {
		render(<BodyText data-testid="bodyText" />);
		const bodyText = screen.getByTestId('bodyText');

		const expected = 'P';
		const actual = bodyText.nodeName;
		expect(actual).toBe(expected);
	});

	test('should support single-line marqueeing content when `noWrap` is true', () => {
		render(<BodyText data-testid="bodyText" noWrap />);
		const bodyText = screen.getByTestId('bodyText');
		const marquee = bodyText.children.item(0);

		const expected = 'marquee';

		expect(marquee).toHaveClass(expected);
	});

	test('should include the noWrap class if `noWrap` is true', () => {
		render(<BodyText data-testid="bodyText" noWrap />);
		const bodyText = screen.getByTestId('bodyText');

		const expected = 'noWrap';

		expect(bodyText).toHaveClass(expected);
	});

	test('should have small class if `size` is small', () => {
		render(<BodyText data-testid="bodyText" size="small" />);
		const bodyText = screen.getByTestId('bodyText');

		const expected = 'small';

		expect(bodyText).toHaveClass(expected);
	});

	test('should have `centered` class if `centered` is true', () => {
		render(<BodyText data-testid="bodyText" centered />);
		const bodyText = screen.getByTestId('bodyText');

		const expected = 'centered';

		expect(bodyText).toHaveClass(expected);
	});
});
