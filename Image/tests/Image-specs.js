import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Image from '../Image';

const src = {
	hd: 'https://placehold.co/200x200',
	fhd: 'https://placehold.co/300x300',
	uhd: 'https://placehold.co/600x600'
};

describe('Image', () => {
	test('should select a src', () => {
		render(<Image src={src} />);
		const image = screen.getAllByRole('img')[1];

		// dispatching resize event for code coverage purposes
		fireEvent(window, new Event('resize'));

		const actual = image.getAttribute('src');
		const expected = 'https://placehold.co/300x300';

		expect(actual).toBe(expected);
	});

	test('should return a DOM node reference for `componentRef`', () => {
		const ref = jest.fn();
		render(<Image ref={ref} src={src} />);

		const expected = 'DIV';
		const actual = ref.mock.calls[0][0].nodeName;

		expect(actual).toBe(expected);
	});

	test('should render image with sizing \'fill\'', () => {
		render(<Image src={src} />);
		const image = screen.getAllByRole('img')[0];

		const expected = "image fill";

		expect(image).toHaveClass(expected);
	});

	test('should render image with sizing \'fit\'', () => {
		render(<Image src={src} sizing="fit" />);
		const image = screen.getAllByRole('img')[0];

		const expected = "image fit";

		expect(image).toHaveClass(expected);
	});

	test('should render image with sizing \'none\'', () => {
		render(<Image src={src} sizing="none" />);
		const image = screen.getAllByRole('img')[0];

		const expected = "image";

		expect(image).toHaveClass(expected);
	});
});
