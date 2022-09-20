import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';
import matchMediaPolyfill from 'mq-polyfill'

import Image from '../Image';

const src = {
	hd: 'https://via.placeholder.com/200x200',
	fhd: 'https://via.placeholder.com/300x300',
	uhd: 'https://via.placeholder.com/600x600'
};

const resizeWindow = (x, y) => {
	window.innerWidth = x;
	window.innerHeight = y;
	window.outerWidth = x;
	window.outerHeight = y;
	window.dispatchEvent(new Event('resize'));
};

matchMediaPolyfill(window)
window.resizeTo = function resizeTo(width, height) {
	Object.assign(this, {
		innerWidth: width,
		innerHeight: height,
		outerWidth: width,
		outerHeight: height,
	}).dispatchEvent(new this.Event('resize'))
}

describe('Image', () => {
	test('should select a src', () => {
		render(<Image src={src} />);

		const image = screen.getAllByRole('img')[1];

		const actual = image.getAttribute('src');
		const expected = 'https://via.placeholder.com/300x300';

		expect(actual).toBe(expected);
	});

	test('should return a DOM node reference for `componentRef`', () => {
		const ref = jest.fn();
		render(<Image ref={ref} src={src} />);

		const expected = 'DIV';
		const actual = ref.mock.calls[0][0].nodeName;

		expect(actual).toBe(expected);
	});

	test('sizing fill', () => {
		render(<Image src={src} />);
		const image = screen.getAllByRole('img')[0];

		const expected = "image fill";

		expect(image).toHaveClass(expected);
	});

	test('sizing fit', () => {
		render(<Image src={src} sizing="fit" />);
		const image = screen.getAllByRole('img')[0];

		const expected = "image fit";

		expect(image).toHaveClass(expected);
	});

	test('sizing none', () => {
		render(<Image src={src} sizing="none" />);
		const image = screen.getAllByRole('img')[0];

		const expected = "image";

		expect(image).toHaveClass(expected);
	});

	// Tried to set the width and height of window with window.resize or global.innerWidth/global.innerHeight
	// in order for `Image` to get the correct image source based on window resolution.
	// On each try, Image gets the src.fhd link.
	test('resize 2', async () => {

		const {rerender} = render(<Image src={src.fhd} />);
		screen.debug()
		act(() => window.resizeTo(999, 600));
		rerender(<Image src={src.hd} />);
		screen.debug()
		console.log('1111', window.innerHeight, window.innerWidth);
		console.log('121111', window.outerHeight, window.outerWidth);

	});
});
