import {render} from '@testing-library/react';

import {HeadingBase} from '../Heading';

describe('Heading Specs', () => {

	test('should render a Heading with content', () => {
		const content = 'Hello Heading!';
		const {getByTestId} = render(<HeadingBase data-testid="heading">{content}</HeadingBase>);
		const heading = getByTestId('heading').textContent;

		expect(heading).toBe(content);
	});

	test('should add the showLine class', () => {
		const {getByTestId} = render(<HeadingBase data-testid="heading" showLine>check</HeadingBase>);
		const heading = getByTestId('heading');

		const expected = 'showLine';
		const actual = heading.className;

		expect(actual).toContain(expected);
	});

	test('should have large class if `size` is large', () => {
		const {getByTestId} = render(<HeadingBase data-testid="heading" size="large">Hello Heading</HeadingBase>);
		const heading = getByTestId('heading');

		const expected = 'large';
		const actual = heading.className;

		expect(actual).toContain(expected);
	});

	test('should have small class if `size` is small', () => {
		const {getByTestId} = render(<HeadingBase data-testid="heading" size="small">Hello Heading</HeadingBase>);
		const heading = getByTestId('heading');

		const expected = 'small';
		const actual = heading.className;

		expect(actual).toContain(expected);
	});

	test('should have tiny class if `size` is tiny', () => {
		const {getByTestId} = render(<HeadingBase data-testid="heading" size="tiny">Hello Heading</HeadingBase>);
		const heading = getByTestId('heading');

		const expected = 'tiny';
		const actual = heading.className;

		expect(actual).toContain(expected);
	});
});
