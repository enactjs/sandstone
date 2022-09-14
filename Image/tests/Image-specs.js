import '@testing-library/jest-dom';
import {render, rerender, screen} from '@testing-library/react';

import Image from '../Image';
import {act} from "react-dom/test-utils";
import ri, {selectSrc, getScreenType, scaleToRem, init} from '@enact/ui/resolution';

// const src={
// 	'hd': 'https://dummyimage.com/64/e048e0/0011ff',
// 	'fhd': 'https://dummyimage.com/128/e048e0/0011ff',
// 	'uhd': 'https://dummyimage.com/256/e048e0/0011ff'
// }
const src = {
	hd: 'http://via.placeholder.com/200x200',
	fhd: 'http://via.placeholder.com/300x300',
	uhd: 'http://via.placeholder.com/600x600'
};

// window.resizeTo = function resizeTo(width, height) {
// 	Object.assign(this, {
// 		innerWidth: width,
// 		innerHeight: height,
// 		outerWidth: width,
// 		outerHeight: height
// 	}).dispatchEvent(new this.Event("resize"));
// };
const resizeWindow = (x, y) => {
	window.innerWidth = x;
	window.innerHeight = y;
	window.dispatchEvent(new Event('resize'));
}

describe('Image', () => {
	test('should select a src', () => {
		render(<Image src={selectSrc(src)} />);

		const image = screen.getAllByRole('img')[1];

		const actual = image.getAttribute('src');
		const expected = 'http://via.placeholder.com/300x300';

		expect(actual).toBe(expected);
	});

	test('should return a DOM node reference for `componentRef`', () => {
		const ref = jest.fn();
		render(<Image ref={ref} src={src} />);

		const expected = 'DIV';
		const actual = ref.mock.calls[0][0].nodeName;

		expect(actual).toBe(expected);
	})

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
	test.skip('resize 2', async () => {
		// act(() => {
		// 	window.resizeTo(1280, 720);
		// });
		// global.innerWidth = 1280;
		// global.innerHeight = 720;
		// global.dispatchEvent(new Event('resize'));
		await resizeWindow(1280, 720)
		render(<Image src={selectSrc(src)} sizing='fit'/>)
		// console.log('1111', window.innerHeight, window.innerWidth);
		// console.log('121111', window.outerHeight, window.outerWidth);

		// act(() => {
		// 	window.resizeTo(1920, 1080);
		// });
		// console.log('2', getScreenType())
		// console.log('1', window.innerHeight, window.innerWidth);
		// console.log('12', window.outerHeight, window.outerWidth);
	});
});
