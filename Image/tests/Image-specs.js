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

window.resizeTo = function resizeTo(width, height) {
	Object.assign(this, {
		innerWidth: width,
		innerHeight: height,
		outerWidth: width,
		outerHeight: height
	}).dispatchEvent(new this.Event("resize"));
};

describe('Image', () => {
	// Tried to set the width and height of window with window.resize or global.innerWidth/global.innerHeight
	// in order for `Image` to get the correct image source based on window resolution.
	// On each try, Image gets the src.fhd link.
	test('resize 2', () => {
		// act(() => {
		// 	window.resizeTo(1280, 720);
		// });
		global.innerWidth = 1280;
		global.innerHeight = 720;
		global.dispatchEvent(new Event('resize'));
		render(<Image src={selectSrc(src)} />)
		screen.debug();
		console.log('1', getScreenType())
		// console.log('1111', window.innerHeight, window.innerWidth);
		// console.log('121111', window.outerHeight, window.outerWidth);

		// act(() => {
		// 	window.resizeTo(1920, 1080);
		// });
		// console.log('2', getScreenType())
		// console.log('1', window.innerHeight, window.innerWidth);
		// console.log('12', window.outerHeight, window.outerWidth);
	});

	// test('resize', () => {
	// 	const handleResize = jest.fn(() => {
	// 		if (width !== width1 && height !== height1) return true;
	// 	});
	// 	const handleError = jest.fn();
	// 	const width = 200;
	// 	const height = 200;
	// 	const {rerender} = render(
	// 		<div role="divTest">
	// 			<Image
	// 				onResize={handleResize}
	// 				style={{width: `${width}px`, height: `${height}px`}}
	// 				src={`http://via.placeholder.com/${width}x${height}`}
	// 			/>
	// 		</div>
	// 	);
	// 	screen.debug();
	//
	// 	const width1 = 300;
	// 	const height1 = 300;
	// 	rerender(
	// 		<Image
	// 			onResize={handleResize}
	// 			style={{width: `${width}px`, height: `${height}px`}}
	// 			src={`http://via.placeholder.com/${width1}x${height1}`}
	// 		/>
	// 	);
	// 	screen.debug();
	// 	expect(handleResize()).toBe(true);
	// 	// setTimeout(() => console.log('2', window.innerWidth, window.innerHeight), 200);
	//
	// 	// const expected = 0;
	// 	// const actual = handleResize.mock.calls[0];
	// 	// act(() => {
	// 	// 	window.resizeTo(2000, 900);
	// 	// });
	// 	// expect(handleError).toHaveBeenCalled();
	// 	// console.log(handleError.mock.calls)
	// 	// screen.debug();
	//
	// 	// expect(handleResize).not.toHaveBeenCalled();
	// 	//
	// 	// rerender(<Image onResize={handleResize} src={{'hd': 'https://dummyimage.com/64/e048e0/0011ff'}} />);
	// 	// screen.debug();
	// 	// const actual1 = handleResize.mock.calls.length;
	// 	// console.log(actual1)
	//
	// 	// expect(handleResize).toHaveBeenCalled();
	// });
});
