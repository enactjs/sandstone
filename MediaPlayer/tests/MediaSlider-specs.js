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
	beforeEach(() => {
		global.Element.prototype.getBoundingClientRect = jest.fn(() => {
			return {
				width: 1000,
				height: 100,
				top: 0,
				left: 0,
				bottom: 50,
				right: 500
			};
		});
	});

	test('should forward `onFocus` when focused', () => {
		const handleFocus = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onFocus={handleFocus} />
		);

		const slider = screen.getByTestId('mediaslider-id');
		focus(slider);

		expect(handleFocus).toBeCalled();
	});

	test('should forward `onBlur` when blurred', () => {
		const handleBlur = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onBlur={handleBlur} />
		);

		const slider = screen.getByTestId('mediaslider-id');
		blur(slider);

		expect(handleBlur).toBeCalled();
	});

	test('should forward `onKeyDown` when key pressed', () => {
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

	test('should forward `onKeyUp` when active', () => {
		const handleKeyUp = jest.fn();

		render(
			<MediaSlider defaultValue={0} data-testid="mediaslider-id" onKeyUp={handleKeyUp} />
		);

		const slider = screen.getByTestId('mediaslider-id');

		activate(slider);

		expect(handleKeyUp).toBeCalled();
	});

	test('should forward `onKnobMove` when mouseOver event occurs', () => {
		const handleKnobMove = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onKnobMove={handleKnobMove} />
		);

		const slider = screen.getByTestId('mediaslider-id');

		fireEvent.mouseOver(slider, {clientX: 10});

		expect(handleKnobMove).toBeCalled();
	});

	test('should forward `onKnobMove` when mouseMove event occurs', () => {
		const handleKnobMove = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onKnobMove={handleKnobMove} />
		);

		const slider = screen.getByTestId('mediaslider-id');

		fireEvent.mouseEnter(slider);
		fireEvent.mouseMove(slider, {clientX: 10});

		expect(handleKnobMove).toBeCalled();
	});

	test('should forward `onKnobMove` when touchMove event occurs', () => {
		const handleKnobMove = jest.fn();

		render(
			<MediaSlider data-testid="mediaslider-id" onKnobMove={handleKnobMove} />
		);

		const slider = screen.getByTestId('mediaslider-id');

		focus(slider);

		const touches = [{clientX: 10}];
		fireEvent.touchMove(slider, {touches});

		expect(handleKnobMove).toBeCalled();
	});
});
