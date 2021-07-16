import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {HeadingBase} from '../Heading';

describe('Heading Specs', () => {

	test('should render a Heading with content', () => {
		const content = 'Hello Heading!';
		render(<HeadingBase data-testid="heading">{content}</HeadingBase>);
		const heading = screen.getByTestId('heading').textContent;

		expect(heading).toBe(content);
	});

	test('should add the showLine class', () => {
		render(<HeadingBase data-testid="heading" showLine>check</HeadingBase>);
		const heading = screen.getByTestId('heading');

		const expected = 'showLine';

		expect(heading).toHaveClass(expected);
	});

	test('should have large class if `size` is large', () => {
		render(<HeadingBase data-testid="heading" size="large">Hello Heading</HeadingBase>);
		const heading = screen.getByTestId('heading');

		const expected = 'large';

		expect(heading).toHaveClass(expected);
	});

	test('should have small class if `size` is small', () => {
		render(<HeadingBase data-testid="heading" size="small">Hello Heading</HeadingBase>);
		const heading = screen.getByTestId('heading');

		const expected = 'small';

		expect(heading).toHaveClass(expected);
	});

	test('should have tiny class if `size` is tiny', () => {
		render(<HeadingBase data-testid="heading" size="tiny">Hello Heading</HeadingBase>);
		const heading = screen.getByTestId('heading');

		const expected = 'tiny';

		expect(heading).toHaveClass(expected);
	});
});
