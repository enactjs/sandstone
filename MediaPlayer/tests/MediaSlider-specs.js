import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import MediaSlider from '../MediaSlider';

const blur = (slider) => fireEvent.blur(slider);
const focus = (slider) => fireEvent.focus(slider);
const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);

describe('MediaSlider', () => {
	test('should fire `onFocus` when focused', () => {
		const handleFocus = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onFocus={handleFocus} />
		);

		const slider = screen.getByTestId('mediaslider-id');
		focus(slider);

		expect(handleFocus).toBeCalled();
	});
	test('should fire `onBlur` on blur', () => {
		const handleBlur = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onBlur={handleBlur} />
		);

		const slider = screen.getByTestId('mediaslider-id');
		blur(slider);

		expect(handleBlur).toBeCalled();
	});
	test('should fire `onKeyDown` when key pressed', () => {
		const handleKeyDown = jest.fn();

		render(
			<MediaSlider defaultValue={0} data-testid="mediaslider-id" onKeyDown={handleKeyDown} />
		);

		const slider = screen.getByTestId('mediaslider-id');

		rightKeyDown(slider);
		leftKeyDown(slider);

		const expected = 2;

		expect(handleKeyDown).toBeCalledTimes(expected);
	});
	test('should fire `onKeyUp` when active', () => {
		const handleKeyUp = jest.fn();

		render(
			<MediaSlider defaultValue={0} data-testid="mediaslider-id" onKeyUp={handleKeyUp} />
		);

		const slider = screen.getByTestId('mediaslider-id');

		activate(slider);

		expect(handleKeyUp).toBeCalled();
	});

});
