import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {ColorPickerPOC} from '../ColorPickerPOC';
import ColorPickerGrid from '../ColorPickerGrid';
import ColorPickerSpectrum from '../ColorPickerSpectrum';
import ColorPickerSlider from '../ColorPickerSlider';

describe('ColorPickerPOC', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Grid ColorPicker', () => {
		test('should emit a selectedColorHandler event when selecting a color from the grid', async () => {
			const onClickHandler = jest.fn();
			const selectedColorHandler = jest.fn();
			const user = userEvent.setup();
			const {container} = render(
				<ColorPickerGrid onClick={onClickHandler} selectedColorHandler={selectedColorHandler} />
			);
			const colorsColumnDiv = container.querySelectorAll('.colorsColumn');
			const secondColorBlock = colorsColumnDiv[0].querySelectorAll('.colorBlock')[0];

			await user.click(secondColorBlock);
			expect(onClickHandler).toHaveBeenCalled();
			expect(selectedColorHandler).toHaveBeenCalled();
		});
	});

	// describe('Spectrum ColorPicker', () => {
	// 	beforeEach(() => {
	// 		// Create a mock canvas element
	// 		const mockCanvas = document.createElement('canvas');
	// 		const mockContext = mockCanvas.getContext('2d');
	//
	// 		// Mock the methods you need
	// 		mockContext.createLinearGradient = jest.fn(() => ({
	// 			addColorStop: jest.fn(),
	// 		}));
	//
	// 		// Replace the global context with the mock
	// 		global.HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);
	// 	});
	//
	// 	test('initial render', async () => {
	// 		await render(<ColorPickerSpectrum />);
	// 		screen.debug();
	// 	});
	// });

	describe('Slider ColorPicker', () => {
		const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
		const changeSliderValueByKey = async (element, steps, decrease) => {
			const keyCode = decrease ? 37 : 39;
			activate(element);

			for (let i = 0; i < steps; i++) {
				await fireEvent.keyDown(element, {keyCode: keyCode});
			}
		};

		const sliderValues = (elements) => {
			const values = [];

			elements.forEach(element => {
				values.push(element.getAttribute('aria-valuetext'));
			});

			return values;
		};

		test('should change the value of red/green/blue sliders', async () => {
			const selectedColorHandler = jest.fn();
			const selectedColor = "#eb4034";

			render(<ColorPickerSlider selectedColor={selectedColor} selectedColorHandler={selectedColorHandler} />);
			const sliders = screen.getAllByRole('slider');
			const [red, green, blue] = sliderValues(sliders);

			await changeSliderValueByKey(sliders[0], 30);
			fireEvent.blur(sliders[0]);
			await changeSliderValueByKey(sliders[1], 30, true);
			fireEvent.blur(sliders[1]);
			await changeSliderValueByKey(sliders[2], 30, true);
			fireEvent.blur(sliders[2]);

			const [changedRed, changedGreen, changedBlue] = sliderValues(sliders);

			expect(red).not.toEqual(changedRed);
			expect(green).not.toEqual(changedGreen);
			expect(blue).not.toEqual(changedBlue);
		});

		test('should emit a selectedColorHandler event when changing sliders\' value', async () => {
			const selectedColorHandler = jest.fn();
			const selectedColor = "#eb4034";

			render(<ColorPickerSlider selectedColor={selectedColor} selectedColorHandler={selectedColorHandler} />);
			const sliders = screen.getAllByRole('slider');

			await changeSliderValueByKey(sliders[0], 30);
			fireEvent.blur(sliders[0]);
			expect(selectedColorHandler).toHaveBeenCalled();

			await changeSliderValueByKey(sliders[1], 30, true);
			fireEvent.blur(sliders[1]);
			expect(selectedColorHandler).toHaveBeenCalled();

			await changeSliderValueByKey(sliders[2], 30, true);
			fireEvent.blur(sliders[2]);
			expect(selectedColorHandler).toHaveBeenCalled();
		});
	});
});
